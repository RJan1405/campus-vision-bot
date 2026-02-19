import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Trash2, Download, Bot, User, Sparkles, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { allEvents } from "@/data/events";
import { instituteInfo, faculty as fallbackFaculty, programs } from "@/data/institute";
import { loadCampusData, type CampusData } from "@/lib/campusData";
import { queryStudentsByProgram, queryAllStudents, isDbAvailable } from "@/lib/campusDb";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What events are available at TecXplore 3.0?",
  "Who are enrolled in cyber security program?",
  "List faculty and their expertise",
  "Which events allow AI tools?",
  "Who is the director of AMTICS?",
  "List all students in CSE",
  "Events under ₹100",
  "Students enrolled in machine learning",
];

async function getAIResponse(query: string, campus: CampusData | null): Promise<string> {
  const q = query.toLowerCase();
  const faculty = campus?.faculty?.length ? campus.faculty : fallbackFaculty;
  const eventsText = campus?.eventsRulesText ?? "";
  const students = campus?.students ?? [];

  // Helper: Extract name from any query that mentions a person (supports "expertise of X", "X's email", "who is X", etc.)
  const extractNameFromQuery = (query: string): string | null => {
    const clean = (s: string) => s.replace(/\s+(from|in|students|faculty|student|professor|designation|email|expertise|area|interest).*$/i, "").replace(/'s\s*$/i, "").trim();
    const patterns = [
      /who is (.+?)(?:\s+from|\s+in|\s*$)/i,
      /tell me about (.+?)(?:\s+from|\s+in|\s*$)/i,
      /find (.+?)(?:\s+from|\s+in|\s*$)/i,
      /show (.+?)(?:\s+from|\s+in|\s*$)/i,
      /(.+?)(?:\s+from|\s+in)\s+(students|faculty|student|professor)/i,
      // "what are expertise of ms vidhi sutaria", "expertise of X", "what is X's expertise"
      /(?:what are|what is|tell me|get me|give me)\s+(?:the\s+)?(?:expertise|expertise of|email|email of|designation|designation of)\s+(?:of\s+)?(.+?)(?:\s*\?|\s*$)/i,
      /(?:expertise|email|designation|area|interest)s?\s+of\s+(.+?)(?:\s*\?|\s*$)/i,
      /(.+?)'s\s+(?:expertise|email|designation|areas?|interest)/i,
      // "ms vidhi sutaria expertise", "vidhi sutaria email", "vidhi sutaria's expertise"
      /(?:mr|mrs|ms|dr)\.?\s*(.+?)(?:\s+(?:expertise|email|designation)|\s*'s|\s*$)/i,
      /^(.+?)\s+(?:expertise|email|designation)\s*$/im,
    ];
    for (const pattern of patterns) {
      const match = query.match(pattern);
      if (match && match[1]) {
        const name = clean(match[1].trim());
        if (name.length > 2) return name;
      }
    }
    return null;
  };

  // Helper: What field is the user asking for? (expertise, email, designation, or full details)
  const getRequestedField = (q: string): "expertise" | "email" | "designation" | "full" => {
    if (/\bexpertise\b|\barea(?:s)?\s+of\s+interest\b|\binterest\b|\bspecialization\b/i.test(q)) return "expertise";
    if (/\bemail\b|\bcontact\b|\bmail\b/i.test(q)) return "email";
    if (/\bdesignation\b|\bposition\b|\brole\b/i.test(q)) return "designation";
    return "full";
  };

  // For students: elective, branch, enrollment
  const getRequestedStudentField = (q: string): "elective" | "branch" | "enrollment" | "email" | "full" => {
    if (/\belective\b|\bsubject\b/i.test(q)) return "elective";
    if (/\bbranch\b|\bprogram\b|\bcourse\b/i.test(q)) return "branch";
    if (/\benrollment\b|\benrollment\s+no\b|\broll\b/i.test(q)) return "enrollment";
    if (/\bemail\b|\bcontact\b/i.test(q)) return "email";
    return "full";
  };

  // Helper: Check if query is asking for a specific person (not a list)
  const isSpecificPersonQuery = (q: string): boolean => {
    return /who is|tell me about|find|show|details of|information about/i.test(q) &&
      !/list|all|every|show all|list all/i.test(q);
  };

  // Helper: Fuzzy name matching (handles partial matches, case-insensitive)
  const matchesName = (fullName: string, searchName: string): boolean => {
    const normalize = (s: string) => s.toLowerCase().replace(/[^\w\s]/g, "").trim();
    const normalizedFull = normalize(fullName);
    const normalizedSearch = normalize(searchName);
    const searchParts = normalizedSearch.split(/\s+/).filter(p => p.length > 1);
    if (searchParts.length === 0) return false;
    // Match if all search parts appear in the full name (in order or not)
    return searchParts.every(part => normalizedFull.includes(part)) ||
      normalizedFull.includes(normalizedSearch);
  };

  // Name-based search - check context first ("from students" vs "from faculty")
  const extractedName = extractNameFromQuery(query);
  const isFromStudents = q.includes("from students") || (q.includes("student") && !q.includes("faculty") && !q.includes("professor"));
  const isFromFaculty = q.includes("from faculty") || ((q.includes("faculty") || q.includes("professor")) && !q.includes("from students"));
  const requestedField = getRequestedField(q);
  const requestedStudentField = getRequestedStudentField(q);
  const askingForFacultyAttribute = /expertise|email|designation|area|interest|specialization/i.test(q);
  const askingForStudentAttribute = /elective|branch|enrollment|email/i.test(q);

  // DB-backed: Extract program/elective name from various query patterns
  const extractProgramFromQuery = (query: string): string | null => {
    // Clean query: remove trailing punctuation but keep the content
    const cleanQuery = query.trim().replace(/[?.!]+$/, "").trim();
    const patterns = [
      // "who are enrolled in cyber security program" / "who are enrolled in cyber program" - capture full name before "program"
      /who\s+(?:are|is)\s+enrolled\s+in\s+(?:the\s+)?(.+?)(?:\s+program)?\s*$/i,
      // "students enrolled in X" / "list students enrolled in X"
      /(?:fetch\s+all\s+)?(?:list\s+)?(?:all\s+)?students?\s+enrolled\s+in\s+(?:the\s+)?(.+?)(?:\s+program)?\s*$/i,
      // "enrolled in cyber security" / "enrolled in cyber program"
      /enrolled\s+in\s+(?:the\s+)?(.+?)(?:\s+program)?\s*$/i,
      // "who are in cyber security program" / "who are in cyber program"
      /who\s+(?:are|is)\s+in\s+(?:the\s+)?(.+?)(?:\s+program)?\s*$/i,
      // "fetch all students in cyber security program" / "students in CSE" / "list students in machine learning"
      /(?:fetch\s+all\s+)?(?:list\s+)?(?:all\s+)?students?\s+in\s+(?:the\s+)?(.+?)(?:\s+program)?\s*$/i,
      // "students in X" (fallback)
      /students?\s+in\s+(?:the\s+)?(.+?)(?:\s+program)?\s*$/i,
      // "cyber security students" / "CSE students" - capture everything before "students"
      /(.+?)\s+students?\s*$/i,
    ];
    for (const pattern of patterns) {
      const match = cleanQuery.match(pattern);
      if (match && match[1]) {
        let program = match[1].trim().replace(/[?.!]+$/, "").trim();
        // Remove trailing "program" if it was captured separately
        program = program.replace(/\s+program\s*$/i, "").trim();
        // Skip if it's too short or matches common words
        if (program.length > 1 && !/^(the|a|an|all|list|fetch|show|get|who|are|is|students?|enrolled|in)$/i.test(program)) {
          return program;
        }
      }
    }
    return null;
  };

  const programName = extractProgramFromQuery(query);
  if (programName) {
    try {
      if (await isDbAvailable()) {
        const list = await queryStudentsByProgram(programName);
        if (list.length === 0) return `No students found in **${programName}** (checked branch and electives). Try "list all students" or another program name like "CSE", "Cyber Security", "Machine Learning".`;
        const lines = list.map(s => `- **${s.name}** — ${s.branch} | Elective IV: ${s.elective4 || "—"}`).join("\n");
        return `## Students in **${programName}** (${list.length} found)\n\n${lines}`;
      }
    } catch (e) {
      console.error("DB query error:", e);
      // Fall through to CSV-based logic if DB fails
    }
  }

  // "fetch all students" / "list all students" (DB)
  if (/fetch\s+all\s+students|list\s+all\s+students|get\s+all\s+students/i.test(query)) {
    try {
      if (await isDbAvailable()) {
        const list = await queryAllStudents();
        const lines = list.map(s => `- **${s.name}** — ${s.branch} | ${s.enrollmentNo}`).join("\n");
        return `## All students (${list.length} total)\n\n${lines}`;
      }
    } catch (_) { }
  }

  // Exact-answer: "what are expertise of ms vidhi sutaria" → try faculty by name, return that field only
  if (extractedName && askingForFacultyAttribute && !q.includes("list") && !q.includes("all")) {
    const matches = faculty.filter(f => matchesName(f.name || "", extractedName));
    if (matches.length === 1) {
      const f = matches[0];
      if (requestedField === "expertise") return `**${f.name}**'s expertise: ${f.expertise}`;
      if (requestedField === "email") return `**${f.name}**'s email: ${f.email}`;
      if (requestedField === "designation") return `**${f.name}**'s designation: ${f.designation}`;
      return `## ${f.name}\n\n**Designation:** ${f.designation}\n**Email:** ${f.email}\n**Expertise:** ${f.expertise}`;
    } else if (matches.length === 0) {
      return `No faculty member found matching "${extractedName}". Check the name or ask for a list of faculty.`;
    }
  }

  // Exact-answer: "what is X's elective" / "email of X" (student) → try students by name
  if (students.length > 0 && extractedName && askingForStudentAttribute && !q.includes("list") && !q.includes("all")) {
    const matches = students.filter(s => matchesName(s.name || "", extractedName));
    if (matches.length === 1) {
      const s = matches[0];
      if (requestedStudentField === "elective") return `**${s.name}**'s electives: Programme Elective IV — ${s.elective4}; Programme Elective II — ${s.elective2}; Industrial Practice — ${s.industrialPractice}`;
      if (requestedStudentField === "email") return `**${s.name}**'s email: ${s.email}`;
      if (requestedStudentField === "branch") return `**${s.name}**'s branch: ${s.branch}`;
      if (requestedStudentField === "enrollment") return `**${s.name}**'s enrollment no: ${s.enrollmentNo}`;
      return `## Student: ${s.name}\n\n**Enrollment No:** ${s.enrollmentNo}\n**Email:** ${s.email}\n**Branch:** ${s.branch}\n**Programme Elective IV:** ${s.elective4}\n**Programme Elective II:** ${s.elective2}\n**Industrial Practice & Skills Elective II:** ${s.industrialPractice}`;
    } else if (matches.length === 0) {
      return `No student found matching "${extractedName}" in the division data. Check the name or ask for a list.`;
    }
  }

  // Name-based search for students (who is X from students / tell me about X when student context)
  if (students.length > 0 && extractedName && (isFromStudents || (isSpecificPersonQuery(q) && !isFromFaculty && !askingForFacultyAttribute))) {
    const matches = students.filter(s => matchesName(s.name || "", extractedName));
    if (matches.length === 1) {
      const s = matches[0];
      return `## Student: ${s.name}\n\n**Enrollment No:** ${s.enrollmentNo}\n**Email:** ${s.email}\n**Branch:** ${s.branch}\n**Programme Elective IV:** ${s.elective4}\n**Programme Elective II:** ${s.elective2}\n**Industrial Practice & Skills Elective II:** ${s.industrialPractice}`;
    } else if (matches.length > 1) {
      const list = matches.slice(0, 5).map(s => `- **${s.name}** (${s.enrollmentNo}) — ${s.branch}`).join("\n");
      return `## Found ${matches.length} students matching "${extractedName}"\n\n${list}${matches.length > 5 ? `\n...and ${matches.length - 5} more.` : ""}\n\n_Please specify the full name or enrollment number for exact match._`;
    } else if (matches.length === 0 && isFromStudents) {
      return `No student found matching "${extractedName}" in the Sem 4 division data. Try asking for a list of students or check the spelling.`;
    }
  }

  // Name-based search for faculty (who is X from faculty / tell me about X when faculty context)
  if (extractedName && (isFromFaculty || (isSpecificPersonQuery(q) && !isFromStudents)) && !q.includes("list") && !q.includes("all")) {
    const matches = faculty.filter(f => matchesName(f.name || "", extractedName));
    if (matches.length === 1) {
      const f = matches[0];
      if (requestedField !== "full") {
        if (requestedField === "expertise") return `**${f.name}**'s expertise: ${f.expertise}`;
        if (requestedField === "email") return `**${f.name}**'s email: ${f.email}`;
        if (requestedField === "designation") return `**${f.name}**'s designation: ${f.designation}`;
      }
      return `## Faculty: ${f.name}\n\n**Designation:** ${f.designation}\n**Email:** ${f.email}\n**Areas of Interest / Expertise:** ${f.expertise}`;
    } else if (matches.length > 1) {
      const list = matches.slice(0, 5).map(f => `- **${f.name}** (${f.designation}) — ${f.email}`).join("\n");
      return `## Found ${matches.length} faculty members matching "${extractedName}"\n\n${list}${matches.length > 5 ? `\n...and ${matches.length - 5} more.` : ""}\n\n_Please specify the full name for exact match._`;
    } else if (matches.length === 0 && isFromFaculty) {
      return `No faculty member found matching "${extractedName}". Try asking for a list of faculty members or check the spelling.`;
    }
  }

  // Director (use first faculty from data if it's the director)
  if (q.includes("director") || q.includes("head") || q.includes("vishvajit")) {
    const dir = faculty.find(f => /director|vishvajit/i.test(f.name || f.designation));
    if (dir) {
      return `**${dir.name}** is the ${dir.designation} of AMTICS.\n\n📧 Email: ${dir.email}\n🔬 Expertise: ${dir.expertise}`;
    }
    return `**Dr. Vishvajit Bakrola** is the I/C Director of AMTICS.\n\n📧 Email: vishvajit.bakrola@utu.ac.in\n🔬 Expertise: ML, Deep Learning, AI, Robotics, NLP, Brain Computer Interface, IoT, Quantum/Neuromorphic Computing`;
  }

  // Faculty list (only if not asking for a specific person and no name extracted)
  if ((q.includes("faculty") || q.includes("professor") || q.includes("teacher")) &&
    !isSpecificPersonQuery(q) &&
    (q.includes("list") || q.includes("all") || (!extractedName && !isFromFaculty))) {
    const list = faculty.slice(0, 10).map(f => `- **${f.name}** (${f.designation}) — ${f.expertise}`).join("\n");
    const more = faculty.length > 10 ? `\n\n...and ${faculty.length - 10} more. ` : "";
    return `## AMTICS Faculty\n\n${list}${more}\n\nThe institute has **${faculty.length}** faculty members (from campus data).\n\n_Ask "who is [name] from faculty" for specific details._`;
  }

  // Programs / fees
  if (q.includes("program") || q.includes("course") || q.includes("btech") || q.includes("b.tech") || q.includes("mtech") || q.includes("m.tech") || q.includes("fee")) {
    const list = programs.map(p => `- **${p.name}** — ${p.duration} | ${p.fee}`).join("\n");
    return `## Academic Programs at AMTICS\n\n${list}\n\n📋 Admission via ACPC or Direct. Eligibility: 12th pass or Diploma.`;
  }

  // AI allowed events
  if (q.includes("ai allowed") || q.includes("ai tool") || q.includes("allow ai")) {
    const aiEvents = allEvents.filter(e => e.aiAllowed);
    if (aiEvents.length === 0) return "Most TecXplore events **do not allow AI tools**. The Chatbot Challenge is the only event where AI integration is expected as part of the solution.";
    const list = aiEvents.map(e => `- **${e.name}** (${e.category}) — ${e.fee}`).join("\n");
    return `## Events Where AI is Allowed\n\n${list}`;
  }

  // Under ₹100
  if (q.includes("under") && (q.includes("100") || q.includes("₹100"))) {
    const cheap = allEvents.filter(e => {
      const match = e.fee.match(/₹(\d+)/);
      return match && parseInt(match[1]) < 100;
    });
    const list = cheap.map(e => `- **${e.name}** — ${e.fee} (${e.category})`).join("\n");
    return `## Events Under ₹100\n\n${list || "No events found under ₹100."}`;
  }

  // Specific event search
  for (const event of allEvents) {
    if (q.includes(event.name.toLowerCase()) || q.includes(event.id.replace(/-/g, " "))) {
      const specs = event.additionalInfo ? Object.entries(event.additionalInfo).map(([k, v]) => `- **${k}:** ${v}`).join("\n") : "";
      return `## ${event.name}\n\n${event.synopsis}\n\n**Category:** ${event.category}\n**Team Size:** ${event.teamSize}\n**Fee:** ${event.fee}\n**AI Allowed:** ${event.aiAllowed ? "Yes ✅" : "No ❌"}\n\n### Judging Criteria\n${event.judgingCriteria.map(c => `- ${c}`).join("\n")}${specs ? `\n\n### Specifications\n${specs}` : ""}`;
    }
  }

  // Compare
  if (q.includes("compare") || q.includes("vs") || q.includes("versus") || q.includes("difference")) {
    return "You can compare any two events on the **[Comparison Page](/compare)**! Select two events and see them side by side with all details.";
  }

  // About AMTICS
  if (q.includes("amtics") || q.includes("institute") || q.includes("college") || q.includes("about")) {
    return `## ${instituteInfo.name}\n\n${instituteInfo.overview}\n\n📍 **Location:** ${instituteInfo.location}\n🏛️ **University:** ${instituteInfo.university}\n🏅 **Accreditation:** ${instituteInfo.accreditation}`;
  }

  // Events list
  if (q.includes("event") || q.includes("tecxplore") || q.includes("list")) {
    const cats = {
      Technical: allEvents.filter(e => e.category === "technical"),
      "Non-Technical": allEvents.filter(e => e.category === "non-technical"),
      Robotics: allEvents.filter(e => e.category === "robotics"),
      "E-Sports": allEvents.filter(e => e.category === "esports"),
      "Fun Zone": allEvents.filter(e => e.category === "funzone"),
    };
    let result = "## TecXplore 3.0 Events\n\n";
    for (const [cat, events] of Object.entries(cats)) {
      result += `### ${cat}\n${events.map(e => `- **${e.name}** — ${e.fee}`).join("\n")}\n\n`;
    }
    return result;
  }

  // Admission
  if (q.includes("admission") || q.includes("eligib") || q.includes("apply")) {
    return `## Admission to AMTICS\n\n**Routes:** ${instituteInfo.admissionRoute.join(", ")}\n**Eligibility:** ${instituteInfo.eligibility}\n\nVisit the institute page for more details!`;
  }

  // Coordinators / contacts (from real events rules text)
  if (eventsText && (q.includes("coordinator") || q.includes("contact") || q.includes("core member") || q.includes("event head"))) {
    const section = eventsText.match(/(?:CORE MEMBERS|FACULTY COORDINATOR|EVENT HEAD|COORDINATORS)[\s\S]*?(?=\n\n[A-Z]|$)/i);
    if (section) {
      const excerpt = section[0].slice(0, 1200).trim();
      return `## TecXplore 3.0 – Coordinators & Contacts\n\nFrom the official events data:\n\n${excerpt}\n\n_Ask for a specific event name to get its coordinator and fee._`;
    }
  }

  // Students / division / elective (from real division CSV)
  if (students.length > 0 && (q.includes("student") || q.includes("elective") || q.includes("sem 4") || q.includes("division") || q.includes("enrollment"))) {
    // Specific enrollment number lookup (e.g. "enrollment no 202403103510225" or "202403103510225")
    const enrollmentMatch = query.match(/\b(\d{10,})\b/);
    if (enrollmentMatch) {
      const enrollmentNo = enrollmentMatch[1];
      const match = students.find(s => (s.enrollmentNo || "").replace(/\s/g, "") === enrollmentNo);
      if (match) {
        return `## Student: ${match.name}\n\n**Enrollment No:** ${match.enrollmentNo}\n**Email:** ${match.email}\n**Branch:** ${match.branch}\n**Programme Elective IV:** ${match.elective4}\n**Programme Elective II:** ${match.elective2}\n**Industrial Practice & Skills Elective II:** ${match.industrialPractice}`;
      }
      return `No student found with enrollment number **${enrollmentNo}** in the Sem 4 division data. Please check the number or ask for a list by elective/division.`;
    }
    // Name-based search already handled above, skip if it's a specific person query
    if (isSpecificPersonQuery(q) && extractedName) {
      // Already handled in the name-based search block above - skip to avoid duplicate
    } else if (q.includes("elective") && !q.includes("list") && !q.includes("which") && !q.includes("who")) {
      const match = students.find(s => s.name?.toLowerCase().includes(q.split(/\s+/).find(w => w.length > 2) || ""));
      if (match) {
        return `## Student: ${match.name}\n\n**Enrollment:** ${match.enrollmentNo}\n**Branch:** ${match.branch}\n**Programme Elective IV:** ${match.elective4}\n**Programme Elective II:** ${match.elective2}\n**Industrial Practice Elective:** ${match.industrialPractice}`;
      }
    }
    if (q.includes("cyber security") || q.includes("elective")) {
      const withCyber = students.filter(s => /cyber security/i.test(s.elective4 || "") || /cyber security/i.test(s.elective2 || ""));
      const list = withCyber.map(s => `- **${s.name}** — ${s.elective4 || s.elective2}`).join("\n");
      return `## Students with Cyber Security / related elective\n\n${list}\n\n_Total: ${withCyber.length} students (Sem 4 division data)._`;
    }
    const list = students.map(s => `- ${s.name} (${s.branch}) — ${s.elective4 || "—"}`).join("\n");
    return `## Sem 4 Division (complete list)\n\n${list}\n\n_Total **${students.length}** students in the division._`;
  }

  // Default
  return `I'm the AMTICS Smart Campus AI Assistant! I can help you with:\n\n- 🏛️ **Institute Information** — overview, faculty, facilities\n- 🎓 **Academic Programs** — B.Tech, M.Tech details & fees\n- 🏆 **TecXplore Events** — rules, fees, judging criteria\n- 🔍 **Smart Filtering** — find events by budget, type, team size\n- 📊 **Event Comparison** — compare any two events\n\nTry asking: *"What events are under ₹100?"* or *"Tell me about the Chatbot Challenge"*`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Welcome! I'm the **AMTICS Smart Campus AI Assistant**. I answer from real campus data (faculty, events, Sem 4 division). Ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [campusData, setCampusData] = useState<CampusData | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadCampusData().then(setCampusData);
  }, []);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      const response = await getAIResponse(text, campusData);
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (isListening) {
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Chat cleared! Ask me anything about AMTICS or TecXplore 3.0." }]);
  };

  const downloadChat = () => {
    const text = messages.map(m => `${m.role === "user" ? "You" : "AI"}: ${m.content}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "amtics-chat.txt";
    a.click();
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-4rem)] flex gap-4">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-72 shrink-0 glass rounded-xl p-4 overflow-y-auto">
          <h3 className="font-display font-semibold text-primary text-sm mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> Suggested Questions
          </h3>
          <div className="space-y-2 mb-6">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <ChevronRight className="w-3 h-3 shrink-0 text-primary" />
                <span className="line-clamp-2">{q}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto space-y-2">
            <button onClick={clearChat} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
              <Trash2 className="w-4 h-4" /> Clear Chat
            </button>
            <button onClick={downloadChat} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">
              <Download className="w-4 h-4" /> Download Chat
            </button>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 flex flex-col glass rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-foreground text-sm">AMTICS AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Smart Campus Guide • TecXplore 3.0</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={chatRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${msg.role === "user" ? "bg-secondary" : "bg-primary/15"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4 text-foreground" /> : <Bot className="w-4 h-4 text-primary" />}
                  </div>
                  <div className={`max-w-[75%] rounded-xl px-4 py-3 text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                    <div className="prose prose-sm prose-invert max-w-none [&_h2]:text-base [&_h2]:font-display [&_h2]:font-semibold [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-display [&_h3]:font-semibold [&_h3]:mb-1 [&_ul]:space-y-0.5 [&_p]:mb-1.5 [&_strong]:text-primary">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-secondary rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex gap-2">
              <button
                onClick={toggleVoice}
                className={`p-2.5 rounded-xl transition-all ${isListening ? "bg-destructive text-destructive-foreground animate-pulse" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage(input)}
                placeholder="Ask about events, programs, institute..."
                className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 hover:bg-primary/90 transition-all neon-glow"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

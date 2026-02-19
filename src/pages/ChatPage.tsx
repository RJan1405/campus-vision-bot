import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, MicOff, Trash2, Download, Bot, User, Sparkles, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { allEvents } from "@/data/events";
import { instituteInfo, faculty, programs } from "@/data/institute";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What events are available at TecXplore 3.0?",
  "Tell me about the Chatbot Challenge",
  "What are the fees for B.Tech CSE?",
  "Which events allow AI tools?",
  "Who is the director of AMTICS?",
  "Compare Valorant and BGMI events",
  "Events under ₹100",
  "What is the Robo War arena size?",
];

function getAIResponse(query: string): string {
  const q = query.toLowerCase();

  // Director
  if (q.includes("director") || q.includes("head") || q.includes("vishvajit")) {
    return `**Dr. Vishvajit Bakrola** is the I/C Director of AMTICS.\n\n📧 Email: vishvajit.bakrola@utu.ac.in\n🔬 Expertise: ML, Deep Learning, AI, Robotics, NLP, Brain Computer Interface, IoT, Quantum/Neuromorphic Computing`;
  }

  // Faculty
  if (q.includes("faculty") || q.includes("professor") || q.includes("teacher")) {
    const list = faculty.slice(0, 6).map(f => `- **${f.name}** (${f.designation}) — ${f.expertise}`).join("\n");
    return `## AMTICS Faculty\n\n${list}\n\n...and ${faculty.length - 6} more faculty members. The institute has ${faculty.length} faculty members specializing in various areas of computer science and technology.`;
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

  // Default
  return `I'm the AMTICS Smart Campus AI Assistant! I can help you with:\n\n- 🏛️ **Institute Information** — overview, faculty, facilities\n- 🎓 **Academic Programs** — B.Tech, M.Tech details & fees\n- 🏆 **TecXplore Events** — rules, fees, judging criteria\n- 🔍 **Smart Filtering** — find events by budget, type, team size\n- 📊 **Event Comparison** — compare any two events\n\nTry asking: *"What events are under ₹100?"* or *"Tell me about the Chatbot Challenge"*`;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "👋 Welcome! I'm the **AMTICS Smart Campus AI Assistant**. Ask me about TecXplore events, institute info, programs, or anything AMTICS!\n\nTry a suggested question or type your own." }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getAIResponse(text);
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

import { Program, FacultyMember, MagazineArticle, PlacementEntry } from "./types";

export const instituteInfo = {
  name: "Asha M. Tarsadia Institute of Computer Science and Technology",
  shortName: "AMTICS",
  university: "Uka Tarsadia University (UTU)",
  location: "Maliba Campus, Gopal Vidyanagar, Bardoli–Mahuva Road, Surat, Gujarat, India",
  accreditation: "NAAC-accredited (UTU ecosystem)",
  overview: "AMTICS is a constituent institute of Uka Tarsadia University, Gujarat. The institute focuses exclusively on computer science and emerging technology education, offering undergraduate and postgraduate programs designed to meet modern industry needs. It's a hub of innovation and excellence in Computer Science education with industry-aligned, skill-based programs.",
  mission: [
    "Provide strong foundation in computer science fundamentals",
    "Offer exposure to advanced technologies",
    "Focus on research and innovation",
    "Develop problem-solving skills",
    "Prepare graduates for successful IT careers"
  ],
  admissionRoute: ["ACPC (Gujarat Admission Committee)", "Direct admission route"],
  eligibility: "Pass 12th board exam OR diploma",
  contact: {
    email: "excusemeamtics@gmail.com",
    blog: "excusemeamtics.blog"
  },
  facilities: ["Computer Laboratories", "Classrooms", "Library", "Research Labs"]
};

export const programs: Program[] = [
  { name: "B.Tech Computer Science Engineering", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Core computer science with focus on algorithms, data structures, software engineering, and modern computing paradigms." },
  { name: "B.Tech Computer Engineering", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Blend of hardware and software engineering with focus on computer systems design and architecture." },
  { name: "B.Tech Software Engineering", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Specialized in software development lifecycle, methodologies, quality assurance, and project management." },
  { name: "B.Tech AI & Machine Learning", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Focus on artificial intelligence, deep learning, neural networks, NLP, and intelligent systems." },
  { name: "B.Tech Cyber Security", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Network security, ethical hacking, cryptography, digital forensics, and information security." },
  { name: "B.Tech Cloud Computing", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Cloud architectures, virtualization, containerization, distributed systems, and cloud services." },
  { name: "B.Tech Information Technology", duration: "4 Years", fee: "₹3.34 Lakhs (total)", type: "UG", description: "Information systems, web technologies, databases, and IT infrastructure management." },
  { name: "Integrated M.Tech CSE", duration: "5 Years", fee: "Contact Institute", type: "Integrated", description: "Deep focus on core CS plus advanced research knowledge in a 5-year integrated program." },
  { name: "M.Tech CSE", duration: "2 Years", fee: "Contact Institute", type: "PG", description: "Advanced computer science with research focus. Intake: 120 students." }
];

export const faculty: FacultyMember[] = [
  { name: "Dr. Vishvajit Bakrola", designation: "I/C Director", email: "vishvajit.bakrola@utu.ac.in", expertise: "ML, Deep Learning, AI, Robotics, NLP, Brain Computer Interface, IoT, Quantum/Neuromorphic Computing" },
  { name: "Mr. Jay Patel", designation: "Assistant Professor", email: "jay.patel@utu.ac.in", expertise: "Industrial Automation, Renewable Energy, Smart Switchgear, Electric Vehicles, Digital Electronics" },
  { name: "Ms. Dipashree Patel", designation: "Assistant Professor", email: "dipashree.patel@utu.ac.in", expertise: "Real Analysis, Linear Algebra, Discrete Mathematics, Abstract Algebra" },
  { name: "Ms. Vibhuti Patel", designation: "Assistant Professor", email: "vibhuti.patel@utu.ac.in", expertise: "Power System, Industrial Automation, Instrumentation" },
  { name: "Ms. Vidhi Sutaria", designation: "Assistant Professor", email: "vidhi.sutaria@utu.ac.in", expertise: "Cloud Computing, Information Network Security" },
  { name: "Ms. Urvishabahen Patel", designation: "Assistant Professor", email: "urvisha.patel@utu.ac.in", expertise: "Machine Learning, Data Science with Python, Computer Vision, Image Processing" },
  { name: "Mr. Aakash Parmar", designation: "Assistant Professor", email: "aakash.parmar@utu.ac.in", expertise: "AI, ML, Soft Computing, Digital Forensics, Data Structures, Python, Operating Systems" },
  { name: "Ms. Vidhi Patel", designation: "Assistant Professor", email: "vidhi.patel@utu.ac.in", expertise: "Data Structure, Web Designing/Development, Compiler Design, Software Engineering" },
  { name: "Ms. Halak Patel", designation: "Assistant Professor", email: "halak.patel@utu.ac.in", expertise: "DBMS, Analysis and Design Algorithm, Web Design, Software Modeling" },
  { name: "Ms. Roshni Patel", designation: "Assistant Professor", email: "roshni.patel@utu.ac.in", expertise: "Data Mining, Web Designing/Development, Operating System, DBMS" },
  { name: "Ms. Mitaliben Patel", designation: "Assistant Professor", email: "mitali.cpatel@utu.ac.in", expertise: "Computer Network, Web Designing/Development, Software Engineering" },
  { name: "Mr. Santosh Saha", designation: "Assistant Professor", email: "santosh.saha@utu.ac.in", expertise: "DBMS, OS, OOPS, Mobile Computing, ML, Cyber Security, IoT" },
  { name: "Mr. Vishvendu Bhatt", designation: "Assistant Professor", email: "vishvendu.bhatt@utu.ac.in", expertise: "Machine Learning, Information Security, Android Development, Computer Networks, Cloud Computing" },
  { name: "Mr. Dipesh Shahane", designation: "Assistant Professor", email: "dipesh.shahane@utu.ac.in", expertise: "Operating Systems" },
  { name: "Mr. Dharmesh Kokani", designation: "Assistant Professor", email: "dharmesh.kokani@utu.ac.in", expertise: "C, OOPs, Java, Python, DBMS, Web Development, Software Engineering" },
  { name: "Mr. Amit Kumar", designation: "Assistant Professor", email: "amit.kumar@utu.ac.in", expertise: "5G, Wireless Communication, Signal Processing, Digital Logic, Control Systems" },
  { name: "Mr. Ankur Gamit", designation: "Assistant Professor", email: "ankur.gamit@utu.ac.in", expertise: "Machine Learning, Deep Learning, NLP, Databases, Web Development" },
  { name: "Ms. Ridhdhi Naik", designation: "Assistant Professor", email: "ridhdhi.naik@utu.ac.in", expertise: "ML, AI, Data Science, IoT, Data Structures, Wireless Communication" }
];

export const magazineArticles: MagazineArticle[] = [
  { title: "AMTICS Teachers' Day Celebration", author: "AMTICS Magazine Team", summary: "AMTICS celebrated Teachers' Day on September 4, 2025 with flower garlands, gratitude cards, dances, singing, poetry, games and dare challenges." },
  { title: "Book Review: The Midnight Library", author: "Yasvi Piyush Chokhawala (7th Semester)", summary: "A reflective review of Matt Haig's novel about choices, regrets, and infinite possibilities through protagonist Nora Seed's journey in a mysterious library between life and death." },
  { title: "Art: Grace in Colors", author: "Yasvi Piyush Chokhawala (7th Semester, B.Tech CSE)", summary: "\"Grace flows where colors dance — a whisper of divinity in every feather.\"" },
  { title: "Fortnight Flash: Placement Data", author: "AMTICS Magazine Team", summary: "Coverage of placement drives from September 1-15, 2025 featuring companies like Cialfor Research Labs, Grow Solutions, Codesdot Solutions." }
];

export const placements: PlacementEntry[] = [
  { company: "Cialfor Research Labs (P) Ltd.", roles: "Web Developer, AI & ML, Python Developer", date: "September 2025" },
  { company: "Grow Solutions", roles: "Business Analyst, DevOps", date: "September 2025" },
  { company: "Codesdot Solutions", roles: "Flutter Developer, DBA", date: "September 2025" }
];

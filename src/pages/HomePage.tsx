import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bot, Search, Mic, GitCompare, Filter, Sparkles, Zap, Shield, Code } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  { icon: Search, title: "Smart Event Search", desc: "Find any TecXplore event instantly with AI-powered search" },
  { icon: Mic, title: "Voice Assistant", desc: "Ask questions using voice — hands-free interaction" },
  { icon: GitCompare, title: "Event Comparison", desc: "Compare two events side by side for quick decisions" },
  { icon: Filter, title: "AI Filtering", desc: "Filter events by budget, team size, category, and more" },
];

const techStack = [
  { icon: Zap, name: "React + TypeScript" },
  { icon: Sparkles, name: "Framer Motion" },
  { icon: Bot, name: "AI Integration" },
  { icon: Shield, name: "Tailwind CSS" },
  { icon: Code, name: "Vite" },
];

const team = [
  { name: "AbdulKadir Shaikh", role: "Team Lead" },
  { name: "Pratham Khatri", role: "Developer" },
];

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(185_100%_50%/0.08)_0%,transparent_70%)]" />
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-primary" />
              TecXplore 3.0 — Chatbot Competition
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="mb-4">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/15 flex items-center justify-center neon-glow-strong mb-6">
              <Bot className="w-10 h-10 text-primary" />
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6"
          >
            <span className="text-foreground">AMTICS</span>{" "}
            <span className="text-gradient">Smart Campus</span>
            <br />
            <span className="text-foreground">AI Assistant</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Your intelligent guide to AMTICS institute information, TecXplore events,
            academic programs, and everything campus — powered by AI.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold text-primary-foreground bg-primary hover:bg-primary/90 neon-glow transition-all duration-300 hover:neon-glow-strong"
            >
              <Sparkles className="w-5 h-5" />
              Start Exploring
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-display font-semibold glass hover:bg-secondary transition-all text-foreground"
            >
              <Bot className="w-5 h-5" />
              Ask AI
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 {...fadeUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-3xl font-display font-bold text-center mb-12 text-gradient">
            Key Features
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, y: -4 }}
                className="glass rounded-xl p-6 text-center hover:neon-glow hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-3xl font-display font-bold mb-10 text-gradient">
            Tech Stack
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {techStack.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl glass text-sm font-medium text-foreground"
              >
                <t.icon className="w-4 h-4 text-primary" /> {t.name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 mb-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 {...fadeUp} viewport={{ once: true }} whileInView="animate" initial="initial" className="text-3xl font-display font-bold mb-10 text-gradient">
            Team Members
          </motion.h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-xl p-6 w-56 text-center hover:neon-glow transition-all"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-3 text-primary font-display font-bold text-xl">
                  {m.name.charAt(0)}
                </div>
                <h3 className="font-display font-semibold text-foreground">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
        <p>AMTICS Smart Campus AI Assistant — Built for TecXplore 3.0</p>
        <p className="mt-1">Asha M. Tarsadia Institute of Computer Science and Technology</p>
      </footer>
    </Layout>
  );
}

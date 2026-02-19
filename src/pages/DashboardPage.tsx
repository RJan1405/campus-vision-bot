import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, GraduationCap, Newspaper, Trophy, PartyPopper, Bot as RobotIcon, Gamepad2, Tent, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { LayoutDashboard } from "lucide-react";

const cards = [
  { icon: BookOpen, title: "Institute Information", desc: "Overview, mission, facilities & contact", path: "/institute", color: "from-blue-500/20 to-blue-600/5" },
  { icon: GraduationCap, title: "Academic Programs", desc: "B.Tech, M.Tech & Integrated programs", path: "/programs", color: "from-green-500/20 to-green-600/5" },
  { icon: Newspaper, title: "Magazine & Placements", desc: "Issue 25 articles & placement data", path: "/magazine", color: "from-orange-500/20 to-orange-600/5" },
  { icon: Trophy, title: "Technical Events", desc: "Figma, Chatbot, Tech Olympic & more", path: "/events?tab=technical", color: "from-cyan-500/20 to-cyan-600/5" },
  { icon: PartyPopper, title: "Non-Technical Events", desc: "Reel-a-Twist, Talent, CanvaVerse & more", path: "/events?tab=non-technical", color: "from-pink-500/20 to-pink-600/5" },
  { icon: RobotIcon, title: "Robotics", desc: "Robo War, Robo Soccer & Track Race", path: "/events?tab=robotics", color: "from-red-500/20 to-red-600/5" },
  { icon: Gamepad2, title: "E-Sports", desc: "Valorant, BGMI & Free Fire", path: "/events?tab=esports", color: "from-purple-500/20 to-purple-600/5" },
  { icon: Tent, title: "Fun Zone", desc: "IPL Royale, Roadies & Traitors", path: "/events?tab=funzone", color: "from-yellow-500/20 to-yellow-600/5" },
  { icon: MessageSquare, title: "AI Assistant", desc: "Ask any question about AMTICS or events", path: "/chat", color: "from-emerald-500/20 to-emerald-600/5" },
];

export default function DashboardPage() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <PageHeader
          title="Smart Dashboard"
          subtitle="Navigate to any section of AMTICS Smart Campus AI Assistant"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><LayoutDashboard className="w-7 h-7 text-primary" /></div>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={card.path}>
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass rounded-xl p-6 h-full hover:neon-glow hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

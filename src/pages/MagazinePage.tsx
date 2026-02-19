import { useState } from "react";
import { motion } from "framer-motion";
import { Newspaper, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import GlassCard from "@/components/GlassCard";
import { magazineArticles, placements } from "@/data/institute";

export default function MagazinePage() {
  const [tab, setTab] = useState<"magazine" | "placement">("magazine");

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <PageHeader
          title="Magazine & Placements"
          subtitle="AMTICS Issue 25 and recent placement data"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><Newspaper className="w-7 h-7 text-primary" /></div>}
        />

        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setTab("magazine")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${tab === "magazine" ? "bg-primary text-primary-foreground neon-glow" : "glass text-muted-foreground"}`}
          >
            <Newspaper className="w-4 h-4" /> Magazine
          </button>
          <button
            onClick={() => setTab("placement")}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${tab === "placement" ? "bg-primary text-primary-foreground neon-glow" : "glass text-muted-foreground"}`}
          >
            <Briefcase className="w-4 h-4" /> Placements
          </button>
        </div>

        {tab === "magazine" && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-5 mb-6 text-center">
              <h3 className="font-display font-bold text-lg text-gradient mb-1">Excuse Me AMTICS!</h3>
              <p className="text-sm text-muted-foreground">Issue 25 • September 15, 2025 • Fortnight Flash</p>
            </div>
            {magazineArticles.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <GlassCard hover={false}>
                  <h3 className="font-display font-semibold text-foreground mb-1">{a.title}</h3>
                  <p className="text-xs text-primary mb-2">By {a.author}</p>
                  <p className="text-sm text-muted-foreground">{a.summary}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "placement" && (
          <div className="space-y-4">
            <div className="glass rounded-xl p-5 mb-6 text-center">
              <h3 className="font-display font-bold text-lg text-gradient mb-1">Placement Drive</h3>
              <p className="text-sm text-muted-foreground">September 1 – 15, 2025</p>
            </div>
            {placements.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <GlassCard hover={false}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-display font-semibold text-foreground">{p.company}</h3>
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Roles: {p.roles}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

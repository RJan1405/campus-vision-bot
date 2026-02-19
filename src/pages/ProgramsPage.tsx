import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import GlassCard from "@/components/GlassCard";
import { programs } from "@/data/institute";

export default function ProgramsPage() {
  const [filter, setFilter] = useState<"all" | "UG" | "PG" | "Integrated">("all");
  const filtered = filter === "all" ? programs : programs.filter(p => p.type === filter);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <PageHeader
          title="Academic Programs"
          subtitle="Explore B.Tech, M.Tech & Integrated programs at AMTICS"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><GraduationCap className="w-7 h-7 text-primary" /></div>}
        />

        <div className="flex justify-center gap-2 mb-8">
          {(["all", "UG", "PG", "Integrated"] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filter === f ? "bg-primary text-primary-foreground neon-glow" : "glass text-muted-foreground hover:text-foreground"}`}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <GlassCard hover={false} className="h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-primary/15 text-primary">{p.type}</span>
                  <span className="text-xs text-muted-foreground">{p.duration}</span>
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
                <div className="mt-auto pt-3 border-t border-border text-sm font-medium text-primary">{p.fee}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

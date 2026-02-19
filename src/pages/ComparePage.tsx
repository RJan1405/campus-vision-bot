import { useState } from "react";
import { motion } from "framer-motion";
import { GitCompare, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { allEvents } from "@/data/events";

export default function ComparePage() {
  const [event1Id, setEvent1Id] = useState("");
  const [event2Id, setEvent2Id] = useState("");

  const e1 = allEvents.find(e => e.id === event1Id);
  const e2 = allEvents.find(e => e.id === event2Id);

  const rows = [
    { label: "Category", v1: e1?.category, v2: e2?.category },
    { label: "Team Size", v1: e1?.teamSize, v2: e2?.teamSize },
    { label: "Fee", v1: e1?.fee, v2: e2?.fee },
    { label: "AI Allowed", v1: e1?.aiAllowed ? "Yes ✅" : "No ❌", v2: e2?.aiAllowed ? "Yes ✅" : "No ❌" },
    { label: "Individual", v1: e1?.individual ? "Yes" : "No", v2: e2?.individual ? "Yes" : "No" },
    { label: "Judging Criteria Count", v1: e1?.judgingCriteria.length.toString(), v2: e2?.judgingCriteria.length.toString() },
    { label: "Rules Count", v1: e1?.rules.length.toString(), v2: e2?.rules.length.toString() },
  ];

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <PageHeader
          title="Event Comparison"
          subtitle="Compare any two TecXplore events side by side"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><GitCompare className="w-7 h-7 text-primary" /></div>}
        />

        {/* Selectors */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center mb-10">
          <select
            value={event1Id}
            onChange={e => setEvent1Id(e.target.value)}
            className="w-full sm:w-64 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 glass"
          >
            <option value="">Select Event 1</option>
            {allEvents.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>

          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <ArrowRight className="w-5 h-5 text-primary" />
          </div>

          <select
            value={event2Id}
            onChange={e => setEvent2Id(e.target.value)}
            className="w-full sm:w-64 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 glass"
          >
            <option value="">Select Event 2</option>
            {allEvents.map(e => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>
        </div>

        {/* Comparison */}
        {e1 && e2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Headers */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-sm font-display font-semibold text-muted-foreground">Attribute</div>
              <div className="glass rounded-xl p-4 text-center">
                <h3 className="font-display font-bold text-gradient text-lg">{e1.name}</h3>
                <p className="text-xs text-muted-foreground capitalize mt-1">{e1.category}</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <h3 className="font-display font-bold text-gradient text-lg">{e2.name}</h3>
                <p className="text-xs text-muted-foreground capitalize mt-1">{e2.category}</p>
              </div>
            </div>

            {/* Table rows */}
            <div className="space-y-2">
              {rows.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 gap-3 items-center"
                >
                  <div className="text-sm font-medium text-muted-foreground">{row.label}</div>
                  <div className="glass rounded-lg px-4 py-3 text-sm text-foreground text-center capitalize">{row.v1 || "-"}</div>
                  <div className="glass rounded-lg px-4 py-3 text-sm text-foreground text-center capitalize">{row.v2 || "-"}</div>
                </motion.div>
              ))}
            </div>

            {/* Synopsis comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="glass rounded-xl p-5">
                <h4 className="font-display font-semibold text-sm text-primary mb-2">Synopsis — {e1.name}</h4>
                <p className="text-sm text-muted-foreground">{e1.synopsis}</p>
              </div>
              <div className="glass rounded-xl p-5">
                <h4 className="font-display font-semibold text-sm text-primary mb-2">Synopsis — {e2.name}</h4>
                <p className="text-sm text-muted-foreground">{e2.synopsis}</p>
              </div>
            </div>
          </motion.div>
        )}

        {(!e1 || !e2) && (
          <div className="text-center py-16 text-muted-foreground">
            <GitCompare className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="font-display text-lg">Select two events to compare</p>
            <p className="text-sm mt-1">Choose from the dropdowns above</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Filter, IndianRupee } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import { allEvents } from "@/data/events";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function FilterPage() {
  const [budget, setBudget] = useState(1000);
  const [individual, setIndividual] = useState(false);
  const [teamOnly, setTeamOnly] = useState(false);
  const [aiAllowed, setAiAllowed] = useState(false);
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return allEvents.filter(e => {
      const feeMatch = e.fee.match(/₹(\d+)/);
      const fee = feeMatch ? parseInt(feeMatch[1]) : 0;
      if (fee > budget) return false;
      if (individual && !e.individual) return false;
      if (teamOnly && e.individual) return false;
      if (aiAllowed && !e.aiAllowed) return false;
      if (category !== "all" && e.category !== category) return false;
      return true;
    });
  }, [budget, individual, teamOnly, aiAllowed, category]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <PageHeader
          title="Smart Filter"
          subtitle="Find the perfect events using intelligent filtering"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><Filter className="w-7 h-7 text-primary" /></div>}
        />

        {/* Filter Panel */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Budget */}
            <div>
              <label className="text-sm font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-primary" /> Budget: ₹{budget}
              </label>
              <Slider value={[budget]} onValueChange={(v) => setBudget(v[0])} max={1000} min={0} step={10} className="mt-2" />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm font-display font-semibold text-foreground mb-3 block">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-secondary rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">All Categories</option>
                <option value="technical">Technical</option>
                <option value="non-technical">Non-Technical</option>
                <option value="robotics">Robotics</option>
                <option value="esports">E-Sports</option>
                <option value="funzone">Fun Zone</option>
              </select>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground">Individual Only</label>
                <Switch checked={individual} onCheckedChange={(v) => { setIndividual(v); if (v) setTeamOnly(false); }} />
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground">Team Only</label>
                <Switch checked={teamOnly} onCheckedChange={(v) => { setTeamOnly(v); if (v) setIndividual(false); }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm text-foreground">AI Allowed Only</label>
                <Switch checked={aiAllowed} onCheckedChange={setAiAllowed} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">{filtered.length} event{filtered.length !== 1 ? "s" : ""} found</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <EventCard event={event} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16 text-muted-foreground">
              <Filter className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="font-display text-lg">No events match your filters</p>
              <p className="text-sm mt-1">Try adjusting the budget or category</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

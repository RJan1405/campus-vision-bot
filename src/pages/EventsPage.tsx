import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import EventCard from "@/components/EventCard";
import { technicalEvents, nonTechnicalEvents, roboticsEvents, esportsEvents, funZoneEvents } from "@/data/events";

const tabs = [
  { id: "technical", label: "Technical", events: technicalEvents },
  { id: "non-technical", label: "Non-Technical", events: nonTechnicalEvents },
  { id: "robotics", label: "Robotics", events: roboticsEvents },
  { id: "esports", label: "E-Sports", events: esportsEvents },
  { id: "funzone", label: "Fun Zone", events: funZoneEvents },
];

export default function EventsPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "technical";
  const [activeTab, setActiveTab] = useState(initialTab);
  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <PageHeader
          title="TecXplore 3.0 Events"
          subtitle="Explore all technical, non-technical, robotics, e-sports and fun zone events"
          icon={<div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center neon-glow"><Trophy className="w-7 h-7 text-primary" /></div>}
        />

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? "bg-primary text-primary-foreground neon-glow" : "glass text-muted-foreground hover:text-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentTab.events.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

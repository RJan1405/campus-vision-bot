import { TecXploreEvent } from "@/data/types";
import GlassCard from "./GlassCard";
import { Badge } from "@/components/ui/badge";
import { Users, IndianRupee, Bot, Eye } from "lucide-react";
import { useState } from "react";
import EventDetailModal from "./EventDetailModal";

export default function EventCard({ event }: { event: TecXploreEvent }) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <>
      <GlassCard onClick={() => setShowDetail(true)}>
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-display font-semibold text-lg text-foreground">{event.name}</h3>
          <div className="flex gap-1.5">
            {event.aiAllowed && (
              <Badge variant="outline" className="border-primary/50 text-primary text-xs">
                <Bot className="w-3 h-3 mr-1" /> AI
              </Badge>
            )}
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.synopsis}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {event.teamSize}</span>
          <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /> {event.fee}</span>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <Eye className="w-3.5 h-3.5" /> View Details
          </button>
        </div>
      </GlassCard>

      {showDetail && <EventDetailModal event={event} onClose={() => setShowDetail(false)} />}
    </>
  );
}

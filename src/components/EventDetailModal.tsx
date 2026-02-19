import { TecXploreEvent } from "@/data/types";
import { motion } from "framer-motion";
import { X, Users, IndianRupee, Bot, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  event: TecXploreEvent;
  onClose: () => void;
}

export default function EventDetailModal({ event, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative glass-strong rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto neon-glow"
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg hover:bg-secondary text-muted-foreground">
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-display font-bold text-2xl text-gradient mb-2">{event.name}</h2>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="border-border text-muted-foreground capitalize">{event.category}</Badge>
          {event.aiAllowed && <Badge variant="outline" className="border-primary/50 text-primary"><Bot className="w-3 h-3 mr-1" /> AI Allowed</Badge>}
          <Badge variant="outline" className="border-border text-muted-foreground">
            <Users className="w-3 h-3 mr-1" /> {event.teamSize}
          </Badge>
          <Badge variant="outline" className="border-border text-muted-foreground">
            <IndianRupee className="w-3 h-3 mr-1" /> {event.fee}
          </Badge>
        </div>

        <p className="text-foreground/80 text-sm mb-6">{event.synopsis}</p>

        {event.additionalInfo && (
          <div className="mb-5">
            <h4 className="font-display font-semibold text-sm text-primary mb-2">Specifications</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(event.additionalInfo).map(([key, val]) => (
                <div key={key} className="bg-secondary/50 rounded-lg p-2.5">
                  <div className="text-xs text-muted-foreground">{key}</div>
                  <div className="text-sm font-medium text-foreground">{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-5">
          <h4 className="font-display font-semibold text-sm text-primary mb-2">Judging Criteria</h4>
          <ul className="space-y-1.5">
            {event.judgingCriteria.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {c}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-primary mb-2">Rules</h4>
          <ul className="space-y-1.5">
            {event.rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" /> {r}
              </li>
            ))}
          </ul>
        </div>

        {event.contactPerson && (
          <div className="mt-5 pt-4 border-t border-border text-sm text-muted-foreground">
            Contact: {event.contactPerson} {event.contactPhone && `(${event.contactPhone})`}
          </div>
        )}
      </motion.div>
    </div>
  );
}

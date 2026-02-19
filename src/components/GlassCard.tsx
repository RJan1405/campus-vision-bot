import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className = "", hover = true, onClick }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={`glass rounded-xl p-6 transition-all duration-300 ${hover ? "cursor-pointer hover:neon-glow hover:border-primary/30" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}

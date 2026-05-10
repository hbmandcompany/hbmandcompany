"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  accent?: "gold" | "garnet" | "ice" | "none";
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className = "",
  hoverable = true,
  accent = "gold",
  padding = "md",
  onClick,
}: GlassCardProps) {
  const accentColors = {
    gold: "hover:border-gold/30 hover:shadow-card-hover",
    garnet: "hover:border-garnet/40 hover:shadow-garnet-glow",
    ice: "hover:border-ice/40",
    none: "",
  };

  const paddings = {
    sm: "p-5 md:p-6",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={clsx(
        "glass-panel relative overflow-hidden",
        paddings[padding],
        hoverable && [
          "cursor-pointer transition-all duration-400",
          accentColors[accent],
        ],
        className
      )}
    >
      {/* Inner gold shimmer on hover */}
      {hoverable && accent === "gold" && (
        <div className="absolute inset-0 bg-gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      )}
      {children}
    </motion.div>
  );
}

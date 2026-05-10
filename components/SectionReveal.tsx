"use client";

import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; scroll choreography removed so content always mounts visible. */
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  once?: boolean;
}

/** Static wrapper — avoids Framer-driven opacity:0 streaks that hid blocks below the hero. */
export default function SectionReveal({
  children,
  className = "",
}: SectionRevealProps) {
  return <div className={className}>{children}</div>;
}

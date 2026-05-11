"use client";

import { clsx } from "clsx";

export type DeskStatusTone = "green" | "amber" | "red" | "blue" | "purple" | "neutral" | "gold";

const toneClasses: Record<DeskStatusTone, { bg: string; text: string }> = {
  green: { bg: "bg-desk-green-dim/20", text: "text-desk-green" },
  amber: { bg: "bg-desk-amber-dim/20", text: "text-desk-amber" },
  red: { bg: "bg-desk-red-dim/20", text: "text-desk-red" },
  blue: { bg: "bg-desk-blue-dim/20", text: "text-desk-blue" },
  purple: { bg: "bg-desk-purple-dim/20", text: "text-desk-purple" },
  neutral: { bg: "bg-silver-ghost/40", text: "text-silver-dim/70" },
  gold: { bg: "bg-gold/15", text: "text-gold" },
};

export function StatusPill({
  label,
  tone = "neutral",
  className,
}: {
  label: string;
  tone?: DeskStatusTone;
  className?: string;
}) {
  const t = toneClasses[tone];
  return (
    <span className={clsx("desk-pill inline-flex items-center", t.bg, t.text, className)}>{label}</span>
  );
}


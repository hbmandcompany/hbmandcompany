"use client";

import { clsx } from "clsx";
import type { DeskStatusTone } from "./StatusPill";

const toneClasses: Record<DeskStatusTone, { bg: string; text: string }> = {
  green: { bg: "bg-[#d4e4d9]", text: "text-desk-green" },
  amber: { bg: "bg-[#ebe0c8]", text: "text-desk-amber" },
  red: { bg: "bg-[#ead4d4]", text: "text-desk-red" },
  blue: { bg: "bg-[#d4dce6]", text: "text-desk-blue" },
  purple: { bg: "bg-[#e0d4e6]", text: "text-desk-purple" },
  neutral: { bg: "bg-[#dcd0b8]", text: "text-[#6a5843]" },
  gold: { bg: "bg-[#ebe0cc]", text: "text-[#8d6f4d]" },
};

export function PaperStatusPill({
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
    <span
      className={clsx(
        "inline-flex items-center rounded px-2.5 py-1 font-robinhood text-[10px] uppercase tracking-[0.14em]",
        t.bg,
        t.text,
        className
      )}
    >
      {label}
    </span>
  );
}

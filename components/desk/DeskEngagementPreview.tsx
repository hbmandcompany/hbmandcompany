"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";

const chartBars = [
  { day: "Mon", pct: 60 },
  { day: "Tue", pct: 45 },
  { day: "Wed", pct: 80 },
  { day: "Thu", pct: 55 },
  { day: "Fri", pct: 90 },
  { day: "Sat", pct: 40 },
  { day: "Sun", pct: 30 },
];

export function DeskEngagementPreview() {
  return (
    <Link
      href="/desk/newsroom/analytics"
      className={clsx(
        "group block rounded-md p-5 transition-all duration-200",
        deskPaper.card,
        "hover:border-[#8d6f4d] hover:shadow-[0_12px_40px_rgba(32,22,13,0.12)]"
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className={clsx("font-robinhood text-[11px] uppercase tracking-[0.24em]", deskPaper.inkLabel)}>
          Engagement
        </div>
        <span className={clsx("font-robinhood text-[10px] uppercase tracking-wider opacity-0 transition-opacity group-hover:opacity-100", deskPaper.accent)}>
          Open analytics →
        </span>
      </div>
      <div className="mb-4 flex items-baseline gap-4">
        <span className={clsx("font-robinhood text-xs", deskPaper.inkHeading)}>Total Views: 14.2K</span>
        <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>Avg Read Time: 4m 12s</span>
      </div>
      <div className="flex h-28 items-end justify-between gap-2">
        {chartBars.map((bar) => (
          <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-24 w-full flex-col justify-end overflow-hidden rounded-sm bg-[#dcd0b8]">
              <div className="w-full bg-[#8d6f4d] transition-all group-hover:bg-[#6a5843]" style={{ height: `${bar.pct}%` }} />
            </div>
            <span className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>{bar.day}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

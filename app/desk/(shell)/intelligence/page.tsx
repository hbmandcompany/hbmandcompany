"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { StatusPill } from "@/components/desk/StatusPill";

type Brief = {
  id: string;
  date: string;
  title: string;
  category: "Regulatory" | "Markets" | "Protocol" | "Counterparty";
  unread: boolean;
};

const briefs: Brief[] = [
  { id: "b1", date: "May 11", title: "Weekly intelligence brief published — APAC regulatory summary", category: "Regulatory", unread: true },
  { id: "b2", date: "May 09", title: "L2 fees outlook — Base vs Arbitrum", category: "Markets", unread: false },
  { id: "b3", date: "May 06", title: "Oracle integrity review — PIOL feeds", category: "Protocol", unread: true },
  { id: "b4", date: "May 02", title: "Counterparty checklist update — custody segmentation", category: "Counterparty", unread: false },
];

function catTone(c: Brief["category"]) {
  switch (c) {
    case "Regulatory":
      return "purple" as const;
    case "Markets":
      return "amber" as const;
    case "Protocol":
      return "blue" as const;
    case "Counterparty":
    default:
      return "neutral" as const;
  }
}

export default function DeskIntelligencePage() {
  const [onlyUnread, setOnlyUnread] = useState(false);

  const list = useMemo(() => {
    const out = onlyUnread ? briefs.filter((b) => b.unread) : briefs;
    return out;
  }, [onlyUnread]);

  return (
    <div className="px-6 py-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="font-cormorant text-2xl font-semibold text-cream">Intelligence</div>
          <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">Briefs and research notes.</div>
        </div>
        <button
          type="button"
          onClick={() => setOnlyUnread((v) => !v)}
          className={clsx(
            "rounded-md border border-white/[0.06] bg-charcoal/30 px-4 py-2",
            "font-robinhood text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ease-luxury",
            onlyUnread ? "text-gold border-gold/20" : "text-silver-dim/50 hover:text-silver"
          )}
        >
          {onlyUnread ? "Unread only" : "All briefs"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {list.map((b) => (
          <article
            key={b.id}
            className={clsx(
              "glass-panel-dark p-5 transition-colors duration-300 ease-luxury",
              "border border-white/[0.04] hover:border-gold/20"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-robinhood text-[11px] text-silver-dim/40">{b.date}</div>
              {b.unread ? <span className="h-2 w-2 rounded-full bg-gold" aria-label="Unread" /> : null}
            </div>
            <div className="mt-3 font-robinhood text-[13px] text-cream/80">{b.title}</div>
            <div className="mt-4">
              <StatusPill label={b.category} tone={catTone(b.category)} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


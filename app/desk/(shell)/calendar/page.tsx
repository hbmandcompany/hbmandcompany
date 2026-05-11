"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { StatusPill } from "@/components/desk/StatusPill";

type Event = { id: string; date: number; time: string; title: string; tone: "gold" | "amber" | "blue" };

const events: Event[] = [
  { id: "e1", date: 11, time: "10:00", title: "Station Chief sync — Dallas desk", tone: "blue" },
  { id: "e2", date: 11, time: "15:30", title: "Treasury risk review", tone: "amber" },
  { id: "e3", date: 14, time: "12:00", title: "Proposal #47 quorum check", tone: "gold" },
  { id: "e4", date: 18, time: "09:00", title: "PIOL v2 spec review", tone: "blue" },
];

export default function DeskCalendarPage() {
  const [selectedDay, setSelectedDay] = useState(11);

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const dayEvents = useMemo(() => events.filter((e) => e.date === selectedDay), [selectedDay]);

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="font-cormorant text-2xl font-semibold text-cream">Calendar</div>
        <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">Month grid with meetings and events.</div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="glass-panel-dark p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <div className="font-robinhood text-[13px] text-cream/80">May 2026</div>
            <div className="font-robinhood text-[11px] uppercase tracking-[0.22em] text-silver-dim/35">Month view</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
              <div key={d} className="pb-1 text-center font-robinhood text-[10px] uppercase tracking-[0.22em] text-silver-dim/35">
                {d}
              </div>
            ))}
            {days.map((d) => {
              const has = events.some((e) => e.date === d);
              const active = d === selectedDay;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDay(d)}
                  className={clsx(
                    "relative flex h-10 items-center justify-center rounded-md border text-[12px] transition-colors duration-300 ease-luxury",
                    active ? "border-gold/30 bg-gold/10 text-cream" : "border-white/[0.04] bg-void text-silver-dim/55 hover:bg-charcoal-light/50"
                  )}
                >
                  <span className="font-robinhood tabular-nums">{d}</span>
                  {has ? <span className="absolute bottom-1.5 h-[5px] w-[5px] rounded-full bg-gold/70" /> : null}
                </button>
              );
            })}
          </div>
        </section>

        <aside className="glass-panel-dark p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-robinhood text-[13px] text-cream/80">Day</div>
            <div className="font-robinhood text-[11px] text-silver-dim/40">
              May <span className="tabular-nums">{selectedDay}</span>
            </div>
          </div>

          {dayEvents.length ? (
            <div className="space-y-3">
              {dayEvents.map((e) => (
                <div key={e.id} className="rounded-lg border border-white/[0.04] bg-charcoal/30 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-robinhood text-[11px] text-gold-dim">{e.time}</div>
                    <StatusPill label="Meeting" tone={e.tone === "amber" ? "amber" : e.tone === "blue" ? "blue" : "gold"} />
                  </div>
                  <div className="mt-2 font-robinhood text-[13px] text-cream/75">{e.title}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-white/[0.04] bg-charcoal/20 p-6 font-robinhood text-[13px] text-silver-dim/55">
              No scheduled items.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}


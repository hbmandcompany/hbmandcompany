"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";
import { PaperStatusPill } from "./PaperStatusPill";
import { storyDeadlines, type CalendarDeadline } from "./desk-stories-data";

export type CalendarEvent = {
  id: string;
  month: number;
  date: number;
  time: string;
  title: string;
  tone: "gold" | "amber" | "blue";
};

type DayModalItem =
  | { kind: "meeting"; id: string; time: string; title: string; tone: CalendarEvent["tone"] }
  | { kind: "deadline"; id: string; title: string; section: string };

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const defaultEvents: CalendarEvent[] = [
  { id: "e1", month: 5, date: 11, time: "10:00", title: "Station Chief sync — Dallas desk", tone: "blue" },
  { id: "e2", month: 5, date: 11, time: "15:30", title: "Treasury risk review", tone: "amber" },
  { id: "e3", month: 5, date: 14, time: "12:00", title: "Proposal #47 quorum check", tone: "gold" },
  { id: "e4", month: 5, date: 18, time: "09:00", title: "PIOL v2 spec review", tone: "blue" },
  { id: "e5", month: 5, date: 23, time: "11:00", title: "Editorial standup — newsroom", tone: "gold" },
];

type ModalTarget = { month: number; date: number } | null;

const DISPLAY_YEAR = 2026;
const DISPLAY_MONTH = 5;

export function DeskNewsroomCalendar({
  events = defaultEvents,
  deadlines = storyDeadlines,
}: {
  events?: CalendarEvent[];
  deadlines?: CalendarDeadline[];
}) {
  const [modalTarget, setModalTarget] = useState<ModalTarget>(null);

  const today = useMemo(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1, date: now.getDate() };
  }, []);

  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);

  const modalItems = useMemo((): DayModalItem[] => {
    if (!modalTarget) return [];
    const meetings = events
      .filter((e) => e.month === modalTarget.month && e.date === modalTarget.date)
      .map(
        (e): DayModalItem => ({
          kind: "meeting",
          id: e.id,
          time: e.time,
          title: e.title,
          tone: e.tone,
        })
      );
    const dayDeadlines = deadlines
      .filter((d) => d.month === modalTarget.month && d.date === modalTarget.date)
      .map(
        (d): DayModalItem => ({
          kind: "deadline",
          id: d.id,
          title: d.title,
          section: d.section,
        })
      );
    return [...dayDeadlines, ...meetings];
  }, [modalTarget, events, deadlines]);

  function openDay(month: number, date: number) {
    setModalTarget({ month, date });
  }

  function formatModalDate(month: number, date: number) {
    return `${MONTH_LABELS[month - 1]} ${date}`;
  }

  function isToday(day: number) {
    return today.year === DISPLAY_YEAR && today.month === DISPLAY_MONTH && today.date === day;
  }

  return (
    <>
      <section className={clsx("rounded-md p-5", deskPaper.card)}>
        <div className="mb-4">
          <div className={clsx("font-robinhood text-[13px]", deskPaper.inkHeading)}>May 2026</div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div
              key={`${d}-${i}`}
              className={clsx("pb-1 text-center font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}
            >
              {d}
            </div>
          ))}
          {days.map((d) => {
            const todayCell = isToday(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => openDay(DISPLAY_MONTH, d)}
                aria-current={todayCell ? "date" : undefined}
                aria-label={todayCell ? `Today, May ${d}` : `May ${d}`}
                className={clsx(
                  "relative flex h-10 items-center justify-center rounded-md border text-[12px] transition-colors duration-200",
                  todayCell
                    ? "border-[#8d6f4d] bg-[#8d6f4d] text-[#f2e6d1] shadow-[0_0_0_2px_rgba(141,111,77,0.35)]"
                    : clsx(deskPaper.border, "bg-[#f2e6d1] text-[#4b3b29] hover:bg-[#e4d6bc] hover:text-[#20160d]")
                )}
              >
                <span className={clsx("font-robinhood tabular-nums", todayCell && "font-semibold")}>{d}</span>
              </button>
            );
          })}
        </div>
      </section>

      {modalTarget !== null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#20160d]/30 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label={`Events for ${formatModalDate(modalTarget.month, modalTarget.date)}`}
          onClick={() => setModalTarget(null)}
        >
          <div
            className={clsx("w-full max-w-md overflow-hidden rounded-lg", deskPaper.dropdown)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={clsx("flex items-center justify-between border-b px-5 py-4", deskPaper.border)}>
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
                  Day
                </div>
                <div className={clsx("mt-1 font-cormorant text-2xl", deskPaper.inkHeading)}>
                  {formatModalDate(modalTarget.month, modalTarget.date)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalTarget(null)}
                className={clsx(
                  "rounded-md px-3 py-1.5 font-robinhood text-[11px] uppercase tracking-wider",
                  deskPaper.inkMeta,
                  deskPaper.hover
                )}
              >
                Close
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {modalItems.length ? (
                <div className="space-y-3">
                  {modalItems.map((item) =>
                    item.kind === "deadline" ? (
                      <div key={item.id} className={clsx("rounded-lg border border-[#b85c38]/25 p-4", deskPaper.panelRaised)}>
                        <div className="flex items-center justify-between gap-3">
                          <PaperStatusPill label="Deadline" tone="red" />
                          <span className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkMeta)}>
                            {item.section}
                          </span>
                        </div>
                        <div className={clsx("mt-2 font-robinhood text-[13px]", deskPaper.inkHeading)}>{item.title}</div>
                      </div>
                    ) : (
                      <div key={item.id} className={clsx("rounded-lg p-4", deskPaper.panelRaised)}>
                        <div className="flex items-center justify-between gap-3">
                          <div className={clsx("font-robinhood text-[11px]", deskPaper.accent)}>{item.time}</div>
                          <PaperStatusPill
                            label="Meeting"
                            tone={item.tone === "amber" ? "amber" : item.tone === "blue" ? "blue" : "gold"}
                          />
                        </div>
                        <div className={clsx("mt-2 font-robinhood text-[13px]", deskPaper.inkHeading)}>{item.title}</div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div
                  className={clsx(
                    "rounded-lg p-6 text-center font-robinhood text-[13px]",
                    deskPaper.panel,
                    deskPaper.inkMeta
                  )}
                >
                  No scheduled items.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

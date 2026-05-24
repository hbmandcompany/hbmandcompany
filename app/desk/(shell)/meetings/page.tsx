"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { IconSearch } from "@/components/desk/desk-icons";
import { meetings, type MeetingItem } from "@/components/desk/desk-meetings-data";

const PAGE_SIZE = 3;

function SectionHeading({
  title,
  search,
  onSearchChange,
  searchLabel,
}: {
  title: string;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchLabel?: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      <div className={clsx("h-px flex-1", deskPaper.divider)} />
      {search !== undefined && onSearchChange ? (
        <div className="relative w-full max-w-[200px]">
          <IconSearch className={clsx("pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2", deskPaper.inkLabel)} />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Quick search…"
            aria-label={searchLabel ?? "Search meetings"}
            className={clsx(
              "h-8 w-full rounded-md border pl-8 pr-2 font-robinhood text-[11px] outline-none transition-colors",
              deskPaper.input
            )}
          />
        </div>
      ) : null}
    </div>
  );
}

function Pagination({
  page,
  pageCount,
  onPrev,
  onNext,
}: {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={clsx("mt-auto flex items-center justify-between border-t pt-3", deskPaper.border)}>
      <button
        type="button"
        disabled={page === 0}
        onClick={onPrev}
        className={clsx(
          "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
          deskPaper.inkMeta,
          deskPaper.hover
        )}
      >
        Prev
      </button>
      <span className={clsx("font-robinhood text-[10px]", deskPaper.inkLabel)}>
        {page + 1} / {pageCount}
      </span>
      <button
        type="button"
        disabled={page >= pageCount - 1}
        onClick={onNext}
        className={clsx(
          "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
          deskPaper.inkMeta,
          deskPaper.hover
        )}
      >
        Next
      </button>
    </div>
  );
}

function matchesMeetingSearch(row: MeetingItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [row.title, row.date, row.time, row.host, row.type, row.room, row.duration].join(" ").toLowerCase().includes(q);
}

function statusLabel(status: MeetingItem["status"]) {
  switch (status) {
    case "live":
      return "Live now";
    case "upcoming":
      return "Upcoming";
    case "past":
      return "Completed";
  }
}

function statusTone(status: MeetingItem["status"]) {
  switch (status) {
    case "live":
      return "green" as const;
    case "upcoming":
      return "blue" as const;
    case "past":
      return "neutral" as const;
  }
}

export default function DeskMeetingsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);

  const liveMeeting = useMemo(() => meetings.find((m) => m.status === "live"), []);
  const upcoming = useMemo(() => meetings.filter((m) => m.status === "upcoming"), []);
  const past = useMemo(() => meetings.filter((m) => m.status === "past"), []);

  const filteredUpcoming = useMemo(
    () => upcoming.filter((row) => matchesMeetingSearch(row, search)),
    [search, upcoming]
  );

  const pageCount = Math.max(1, Math.ceil(filteredUpcoming.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = useMemo(
    () => filteredUpcoming.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE),
    [filteredUpcoming, safePage]
  );

  function handleSearch(value: string) {
    setSearch(value);
    setPage(0);
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-8">
        <h1 className={clsx("font-cormorant text-4xl", deskPaper.inkHeading)}>Meetings</h1>
      </div>

      {liveMeeting ? (
        <section className={clsx("mb-6 rounded-md border p-5", deskPaper.card, deskPaper.borderStrong)}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <PaperStatusPill label="Live now" tone="green" />
                <span className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>
                  {liveMeeting.date} · {liveMeeting.time}
                </span>
              </div>
              <h2 className={clsx("font-cormorant text-2xl", deskPaper.inkHeading)}>{liveMeeting.title}</h2>
              <div className={clsx("mt-2 font-robinhood text-[12px]", deskPaper.inkBody)}>
                Host {liveMeeting.host} · {liveMeeting.room} · {liveMeeting.duration}
              </div>
            </div>
            <button
              type="button"
              className={clsx(
                "rounded-md border px-5 py-2.5 font-robinhood text-[11px] uppercase tracking-[0.2em] transition-colors",
                "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]"
              )}
            >
              Join meeting
            </button>
          </div>
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <section className={clsx("flex min-h-0 flex-col rounded-md p-5", deskPaper.card)}>
          <SectionHeading
            title="Upcoming"
            search={search}
            onSearchChange={handleSearch}
            searchLabel="Search upcoming meetings"
          />

          <div className={clsx("overflow-hidden rounded-md border", deskPaper.border, "bg-[#f2e6d1]")}>
            <div
              className={clsx(
                "hidden grid-cols-[1.2fr_0.7fr_0.6fr_0.7fr_0.6fr_80px] gap-2 border-b px-3 py-2 md:grid",
                deskPaper.border,
                deskPaper.pageAlt
              )}
            >
              {["Meeting", "Date", "Time", "Host", "Type", ""].map((h) => (
                <div key={h || "action"} className={clsx("font-robinhood text-[9px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
                  {h}
                </div>
              ))}
            </div>

            {pageRows.length === 0 ? (
              <div className={clsx("px-4 py-8 text-center font-robinhood text-[12px]", deskPaper.inkMeta)}>
                No meetings match your search.
              </div>
            ) : (
              pageRows.map((row, index) => (
                <div
                  key={row.id}
                  className={clsx(
                    "grid grid-cols-1 gap-2 border-b px-3 py-3 last:border-b-0 md:grid-cols-[1.2fr_0.7fr_0.6fr_0.7fr_0.6fr_80px] md:items-center md:gap-2",
                    index === pageRows.length - 1 ? "border-b-0" : deskPaper.border,
                    "bg-[#f2e6d1] hover:bg-[#ebe0cc]"
                  )}
                >
                  <div>
                    <div className={clsx("line-clamp-2 font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                      {row.title}
                    </div>
                    <div className={clsx("mt-0.5 font-robinhood text-[10px]", deskPaper.inkMeta)}>{row.room}</div>
                  </div>
                  <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{row.date}</div>
                  <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{row.time}</div>
                  <div className={clsx("font-robinhood text-[12px]", deskPaper.inkMeta)}>{row.host}</div>
                  <div>
                    <PaperStatusPill label={row.type} tone={row.tone} className="scale-90" />
                  </div>
                  <div>
                    <button
                      type="button"
                      className={clsx(
                        "rounded border px-2 py-1 font-robinhood text-[9px] uppercase tracking-wider transition-colors",
                        deskPaper.border,
                        deskPaper.inkMeta,
                        deskPaper.hover
                      )}
                    >
                      Join
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <Pagination
            page={safePage}
            pageCount={pageCount}
            onPrev={() => setPage((p) => Math.max(0, p - 1))}
            onNext={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
          />
        </section>

        <section className={clsx("rounded-md p-5", deskPaper.card)}>
          <SectionHeading title="Recent" />

          <div className="space-y-2">
            {past.map((row) => (
              <div
                key={row.id}
                className={clsx("rounded-md border px-4 py-3", deskPaper.border, "bg-[#f2e6d1] hover:bg-[#ebe0cc]")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className={clsx("font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                      {row.title}
                    </div>
                    <div className={clsx("mt-1 font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>
                      {row.date} · {row.time}
                    </div>
                  </div>
                  <PaperStatusPill label={statusLabel(row.status)} tone={statusTone(row.status)} className="scale-90 shrink-0" />
                </div>
                <div className={clsx("mt-2 font-robinhood text-[11px]", deskPaper.inkMeta)}>
                  {row.host} · {row.duration}
                </div>
              </div>
            ))}
          </div>

          <div className={clsx("mt-5 rounded-md border p-4", deskPaper.border, "bg-[#f2e6d1]")}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.18em]", deskPaper.inkLabel)}>
              Quick dial-in
            </div>
            <div className={clsx("mt-2 font-robinhood text-[13px] tabular-nums", deskPaper.inkHeading)}>+1 (214) 555-0147</div>
            <div className={clsx("mt-1 font-robinhood text-[11px]", deskPaper.inkMeta)}>Meeting ID · 482 901 773</div>
          </div>
        </section>
      </div>
    </div>
  );
}

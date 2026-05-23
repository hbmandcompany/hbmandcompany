"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";

export type EditorThread = {
  id: string;
  initials: string;
  name: string;
  role: string;
  message: string;
  time: string;
  unread: boolean;
};

const allThreads: EditorThread[] = [
  {
    id: "t1",
    initials: "EV",
    name: "Elena Vasquez",
    role: "Editor in Chief",
    message:
      "Good work on the Federal Reserve piece. Please add a pull quote before the third paragraph and tighten the lede. Check sources on paragraph 6.",
    time: "9:41 AM today",
    unread: true,
  },
  {
    id: "t2",
    initials: "ML",
    name: "Marcus Lin",
    role: "Managing Editor",
    message:
      "The Dallas hedge fund story needs a conflict of interest disclosure added. Legal flagged it.",
    time: "Yesterday",
    unread: true,
  },
  {
    id: "t3",
    initials: "SM",
    name: "Sophie Maier",
    role: "Copy Desk",
    message: "Base Layer story has two AP Style violations. See tracked changes.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: "t4",
    initials: "EV",
    name: "Elena Vasquez",
    role: "Editor in Chief",
    message: "Can you tighten the sovereign wealth fund lede before noon? Markets desk is watching.",
    time: "3 days ago",
    unread: true,
  },
  {
    id: "t5",
    initials: "ML",
    name: "Marcus Lin",
    role: "Managing Editor",
    message: "Strong draft on municipal toll systems. Add one more on-the-record source.",
    time: "4 days ago",
    unread: false,
  },
  {
    id: "t6",
    initials: "SM",
    name: "Sophie Maier",
    role: "Copy Desk",
    message: "Headline deck approved. Slug is locked for publish window.",
    time: "5 days ago",
    unread: false,
  },
];

const PAGE_SIZE = 2;

function SectionHeading({ title, badge }: { title: string; badge?: number }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      {badge && badge > 0 ? (
        <span className="rounded-full bg-[#8d6f4d] px-2 py-0.5 font-robinhood text-[9px] uppercase tracking-wider text-[#f2e6d1]">
          {badge} new
        </span>
      ) : null}
      <div className={clsx("h-px flex-1", deskPaper.divider)} />
    </div>
  );
}

export function DeskEditorThreads() {
  const [page, setPage] = useState(0);
  const [threads, setThreads] = useState(allThreads);
  const [activeId, setActiveId] = useState<string | null>(allThreads[0]?.id ?? null);

  const unreadCount = useMemo(() => threads.filter((t) => t.unread).length, [threads]);
  const pageCount = Math.ceil(threads.length / PAGE_SIZE);
  const pageThreads = useMemo(
    () => threads.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [threads, page]
  );
  const active = threads.find((t) => t.id === activeId) ?? pageThreads[0];

  function openThread(id: string) {
    setActiveId(id);
    setThreads((cur) => cur.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  }

  return (
    <section>
      <SectionHeading title="FROM THE EDITOR" badge={unreadCount} />

      <div className={clsx("overflow-hidden rounded-md border", deskPaper.border)}>
        <div className={clsx("max-h-48 space-y-0 overflow-y-auto border-b", deskPaper.border)}>
          {pageThreads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => openThread(thread.id)}
              className={clsx(
                "flex w-full cursor-pointer gap-3 px-3 py-3 text-left transition-colors",
                active?.id === thread.id ? "bg-[#dcd0b8]" : "bg-[#ebe0cc]",
                deskPaper.cardHover
              )}
            >
              {thread.unread ? (
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#8d6f4d] ring-2 ring-[#ebe0cc]" />
              ) : (
                <span className="mt-2 h-2 w-2 shrink-0" />
              )}
              <div
                className={clsx(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-robinhood text-[10px]",
                  deskPaper.border,
                  deskPaper.pageAlt,
                  deskPaper.inkHeading
                )}
              >
                {thread.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className={clsx("font-robinhood text-[13px] font-medium", deskPaper.inkHeading)}>
                    {thread.name}
                  </span>
                  <span className={clsx("shrink-0 font-robinhood text-[10px]", deskPaper.inkMeta)}>{thread.time}</span>
                </div>
                <p className={clsx("mt-1 line-clamp-1 font-robinhood text-[12px]", deskPaper.inkBody)}>
                  {thread.message}
                </p>
              </div>
            </button>
          ))}
        </div>

        {active ? (
          <div className={clsx("space-y-3 p-4", deskPaper.pageAlt)}>
            <div className="flex items-center gap-3">
              <div
                className={clsx(
                  "flex h-10 w-10 items-center justify-center rounded-full border font-robinhood text-[11px]",
                  deskPaper.border,
                  deskPaper.card,
                  deskPaper.inkHeading
                )}
              >
                {active.initials}
              </div>
              <div>
                <div className={clsx("font-robinhood text-[13px] font-medium", deskPaper.inkHeading)}>{active.name}</div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.accent)}>
                  {active.role}
                </div>
              </div>
              <div className={clsx("ml-auto font-robinhood text-[10px]", deskPaper.inkMeta)}>{active.time}</div>
            </div>
            <div className={clsx("rounded-lg p-4 font-robinhood text-[13px] leading-relaxed", deskPaper.card, deskPaper.inkBody)}>
              {active.message}
            </div>
            <div className="flex gap-2">
              <input
                placeholder="Reply to editor..."
                className={clsx("flex-1 rounded-md border px-3 py-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
              />
              <button
                type="button"
                className="rounded-md border border-[#8d6f4d] bg-[#8d6f4d] px-4 py-2 font-robinhood text-[10px] uppercase tracking-wider text-[#f2e6d1]"
              >
                Send
              </button>
            </div>
          </div>
        ) : null}

        <div className={clsx("flex items-center justify-between border-t px-3 py-2", deskPaper.border, deskPaper.pageAlt)}>
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
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
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className={clsx(
              "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export function useEditorUnreadCount() {
  return useMemo(() => allThreads.filter((t) => t.unread).length, []);
}

"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { deskInboxItems, type DeskInboxCategory, type DeskInboxItem } from "@/components/desk/desk-inbox-data";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { IconSearch, IconStar } from "@/components/desk/desk-icons";

type InboxTab = "All" | DeskInboxCategory;

const tabs: InboxTab[] = ["All", "Editor", "Stories", "Wallet", "Meetings"];
const PAGE_SIZE = 5;

function matchesSearch(item: DeskInboxItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [item.source, item.subject, item.preview, item.category].join(" ").toLowerCase().includes(q);
}

export default function DeskMailboxPage() {
  const [tab, setTab] = useState<InboxTab>("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<DeskInboxItem[]>(deskInboxItems);
  const [selectedId, setSelectedId] = useState<string>(deskInboxItems[0]?.id ?? "");

  const unreadCount = useMemo(() => items.filter((i) => i.unread).length, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const tabMatch = tab === "All" || item.category === tab;
      return tabMatch && matchesSearch(item, search);
    });
  }, [items, tab, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = useMemo(
    () => filtered.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE),
    [filtered, safePage]
  );

  const selected = useMemo(() => items.find((i) => i.id === selectedId) ?? filtered[0] ?? null, [items, selectedId, filtered]);

  function selectItem(id: string) {
    setSelectedId(id);
    setItems((cur) => cur.map((x) => (x.id === id ? { ...x, unread: false } : x)));
  }

  function handleTab(next: InboxTab) {
    setTab(next);
    setPage(0);
  }

  function handleSearch(value: string) {
    setSearch(value);
    setPage(0);
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={clsx("font-cormorant text-4xl", deskPaper.inkHeading)}>Mailbox</h1>
        </div>
        {unreadCount > 0 ? (
          <span className={clsx("rounded-full px-3 py-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.activeNav)}>
            {unreadCount} unread
          </span>
        ) : null}
      </div>

      <div className={clsx("mb-4 flex flex-wrap items-center gap-3 rounded-md border px-3 py-2.5", deskPaper.border, deskPaper.pageAlt)}>
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTab(t)}
            className={clsx(
              "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
              tab === t ? clsx(deskPaper.borderStrong, "bg-[#f2e6d1]", deskPaper.inkHeading) : clsx(deskPaper.border, deskPaper.inkMeta, deskPaper.hover)
            )}
          >
            {t}
          </button>
        ))}
        <div className="relative ml-auto w-full max-w-[220px] sm:w-auto">
          <IconSearch className={clsx("pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2", deskPaper.inkLabel)} />
          <input
            type="search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Quick search…"
            aria-label="Search mailbox"
            className={clsx(
              "h-8 w-full rounded-md border pl-8 pr-2 font-robinhood text-[11px] outline-none transition-colors",
              deskPaper.input
            )}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className={clsx("flex min-h-[480px] flex-col overflow-hidden rounded-md border", deskPaper.card, deskPaper.border)}>
          {pageItems.length === 0 ? (
            <div className={clsx("px-4 py-12 text-center font-robinhood text-[12px]", deskPaper.inkMeta)}>No messages match your filters.</div>
          ) : (
            pageItems.map((item) => {
              const active = selected?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectItem(item.id)}
                  className={clsx(
                    "relative flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors last:border-b-0",
                    deskPaper.border,
                    active ? "bg-[#dcd0b8]" : item.unread ? "bg-[#ebe0cc]" : "bg-[#f2e6d1]",
                    !active && deskPaper.cardHover
                  )}
                >
                  {item.unread ? <span className="absolute left-0 top-0 h-full w-[3px] bg-[#8d6f4d]" /> : null}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className={clsx("truncate font-robinhood text-[12px] font-medium", deskPaper.inkHeading)}>{item.source}</span>
                      <span className={clsx("shrink-0 font-robinhood text-[10px] tabular-nums", deskPaper.inkMeta)}>{item.tsLabel}</span>
                    </div>
                    <div className={clsx("mt-0.5 truncate font-robinhood text-[13px]", item.unread ? deskPaper.inkHeading : deskPaper.inkBody)}>
                      {item.subject}
                    </div>
                    <div className={clsx("mt-1 line-clamp-1 font-robinhood text-[12px]", deskPaper.inkMeta)}>{item.preview}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <PaperStatusPill label={item.category} tone="neutral" className="scale-90" />
                      {item.priority && item.priority !== "Normal" ? (
                        <PaperStatusPill
                          label={item.priority}
                          tone={item.priority === "Urgent" ? "red" : "amber"}
                          className="scale-90"
                        />
                      ) : null}
                    </div>
                  </div>
                  {item.starred ? <IconStar className={clsx("mt-1 h-4 w-4 shrink-0", deskPaper.accent)} /> : null}
                </button>
              );
            })
          )}

          <div className={clsx("mt-auto flex items-center justify-between border-t px-4 py-3", deskPaper.border)}>
            <button
              type="button"
              disabled={safePage === 0}
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
              {safePage + 1} / {pageCount}
            </span>
            <button
              type="button"
              disabled={safePage >= pageCount - 1}
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
        </section>

        <section className={clsx("rounded-md border p-6", deskPaper.card, deskPaper.border)}>
          {selected ? (
            <>
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.inkLabel)}>{selected.source}</div>
                  <h2 className={clsx("mt-1 font-cormorant text-2xl leading-snug", deskPaper.inkHeading)}>{selected.subject}</h2>
                  <div className={clsx("mt-2 font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{selected.tsLabel}</div>
                </div>
                <div className="flex items-center gap-2">
                  {selected.starred ? <IconStar className={clsx("h-4 w-4", deskPaper.accent)} /> : null}
                  <PaperStatusPill label={selected.category} tone="neutral" />
                </div>
              </div>
              <div className={clsx("whitespace-pre-line font-robinhood text-[14px] leading-relaxed", deskPaper.inkBody)}>{selected.body}</div>
            </>
          ) : (
            <div className={clsx("py-16 text-center font-robinhood text-[13px]", deskPaper.inkMeta)}>Select a message to read.</div>
          )}
        </section>
      </div>
    </div>
  );
}

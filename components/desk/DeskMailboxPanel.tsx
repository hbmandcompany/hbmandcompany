"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";
import { deskInboxItems, type DeskInboxItem } from "./desk-inbox-data";
import { PaperStatusPill } from "./PaperStatusPill";
import { IconStar } from "./desk-icons";

type InboxTab = "All" | DeskInboxItem["category"];

const tabs: InboxTab[] = ["All", "Tasks", "Governance", "Wallet", "Calendar", "Submissions"];

export function DeskMailboxPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<InboxTab>("All");
  const [items, setItems] = useState<DeskInboxItem[]>(deskInboxItems);

  const list = useMemo(() => {
    if (tab === "All") return items;
    return items.filter((i) => i.category === tab);
  }, [items, tab]);

  const unreadCount = useMemo(() => items.filter((i) => i.unread).length, [items]);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className={clsx(
        "absolute right-0 top-[calc(100%+8px)] z-50 w-[min(100vw-2rem,420px)] overflow-hidden rounded-lg",
        deskPaper.dropdown
      )}
    >
      <div className={clsx("border-b px-4 py-4", deskPaper.border)}>
        <div className="flex items-center justify-between">
          <div className={clsx("font-cormorant text-xl", deskPaper.inkHeading)}>Mailbox</div>
          {unreadCount > 0 ? (
            <span className={clsx("rounded-full px-2 py-0.5 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.activeNav)}>
              {unreadCount} unread
            </span>
          ) : null}
        </div>
      </div>

      <div className={clsx("flex gap-3 overflow-x-auto border-b px-3 py-2", deskPaper.border)}>
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={clsx(
              "shrink-0 border-b-2 pb-1 font-robinhood text-[10px] uppercase tracking-[0.18em] transition-colors",
              tab === t
                ? clsx(deskPaper.accentBorder, deskPaper.inkHeading)
                : clsx("border-transparent", deskPaper.inkMeta, "hover:text-[#20160d]")
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-h-[min(60vh,480px)] overflow-y-auto">
        {list.map((it) => (
          <button
            key={it.id}
            type="button"
            onClick={() => setItems((cur) => cur.map((x) => (x.id === it.id ? { ...x, unread: false } : x)))}
            className={clsx(
              "relative flex w-full items-start gap-3 border-b px-4 py-3 text-left transition-colors",
              deskPaper.border,
              it.unread ? "bg-[#ebe0cc]" : "bg-[#f2e6d1]",
              deskPaper.cardHover
            )}
          >
            {it.unread ? <span className="absolute left-0 top-0 h-full w-[3px] bg-[#8d6f4d]" /> : null}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className={clsx("truncate font-robinhood text-[12px] font-medium", deskPaper.inkHeading)}>
                  {it.source}
                </span>
                <span className={clsx("shrink-0 font-robinhood text-[10px]", deskPaper.inkMeta)}>{it.tsLabel}</span>
              </div>
              <div className={clsx("mt-0.5 truncate font-robinhood text-[13px]", it.unread ? deskPaper.inkHeading : deskPaper.inkBody)}>
                {it.subject}
              </div>
              <div className={clsx("mt-1 line-clamp-2 font-robinhood text-[12px]", deskPaper.inkMeta)}>{it.preview}</div>
              {it.priority ? (
                <div className="mt-2">
                  <PaperStatusPill
                    label={it.priority}
                    tone={it.priority === "Urgent" ? "red" : it.priority === "High" ? "amber" : "neutral"}
                  />
                </div>
              ) : null}
            </div>
            {it.starred ? <IconStar className={clsx("mt-1 h-4 w-4 shrink-0", deskPaper.accent)} /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

export function useMailboxUnreadCount() {
  return useMemo(() => deskInboxItems.filter((i) => i.unread).length, []);
}

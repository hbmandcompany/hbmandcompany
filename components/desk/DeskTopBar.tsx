"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "./DeskContext";
import { deskNav, type DeskNavItem } from "./desk-routes";
import { deskPaper } from "./desk-paper";
import { writerNav } from "./writer-routes";
import { DeskMailboxPanel } from "./DeskMailboxPanel";
import { deskInboxItems } from "./desk-inbox-data";
import {
  IconCalendar,
  IconChevronDown,
  IconFileText,
  IconFiles,
  IconGear,
  IconLandmark,
  IconLayoutGrid,
  IconMailbox,
  IconScrollText,
  IconSearch,
  IconSend,
  IconStar,
  IconUsers,
  IconVideo,
  IconVote,
  IconWallet,
} from "./desk-icons";

function iconFor(key: DeskNavItem["icon"]) {
  switch (key) {
    case "mail":
      return IconMailbox;
    case "star":
      return IconStar;
    case "grid":
      return IconLayoutGrid;
    case "calendar":
      return IconCalendar;
    case "video":
      return IconVideo;
    case "scroll":
      return IconScrollText;
    case "vote":
      return IconVote;
    case "wallet":
      return IconWallet;
    case "landmark":
      return IconLandmark;
    case "file":
      return IconFileText;
    case "search":
      return IconSearch;
    case "send":
      return IconSend;
    case "files":
      return IconFiles;
    case "users":
      return IconUsers;
    case "gear":
      return IconGear;
    default:
      return IconUsers;
  }
}

function mergeNavItems(): DeskNavItem[] {
  const seen = new Set<string>();
  const out: DeskNavItem[] = [];
  for (const item of [...deskNav, ...writerNav]) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    out.push(item);
  }
  return out;
}

export function DeskTopBar() {
  const pathname = usePathname();
  const { user } = useDesk();
  const [q, setQ] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mailboxOpen, setMailboxOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const mailboxRef = useRef<HTMLDivElement>(null);

  const mailboxUnread = useMemo(() => deskInboxItems.filter((i) => i.unread).length, []);

  const grouped = useMemo(() => {
    const map = new Map<string, DeskNavItem[]>();
    for (const item of mergeNavItems()) {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return Array.from(map.entries());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setMailboxOpen(false);
  }, [pathname]);

  return (
    <header
      className={clsx(
        "relative z-40 flex h-14 shrink-0 items-center justify-between gap-4 border-b px-6",
        deskPaper.pageAlt,
        deskPaper.border
      )}
    >
      <Link href="/desk/newsroom" className="hidden shrink-0 select-none sm:block">
        <div className={clsx("font-cormorant text-[15px] font-light uppercase tracking-[0.22em]", deskPaper.inkHeading)}>
          HBM <span className={deskPaper.accent}>&amp;</span> Company
        </div>
      </Link>

      <div className="relative hidden flex-1 justify-center md:flex">
        <div
          className={clsx(
            "relative w-full max-w-[480px] transition-[max-width,border-color] duration-300 ease-luxury",
            "focus-within:max-w-[560px]"
          )}
        >
          <IconSearch className={clsx("pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", deskPaper.inkLabel)} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search inbox, boards, proposals..."
            className={clsx(
              "h-10 w-full rounded-lg border pl-10 pr-4 font-robinhood text-[13px] outline-none transition-colors duration-300 ease-luxury",
              deskPaper.input
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div ref={mailboxRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setMailboxOpen((v) => !v);
              setMenuOpen(false);
            }}
            className={clsx(
              "relative rounded-md p-2 transition-colors",
              deskPaper.inkMeta,
              mailboxOpen ? deskPaper.panelRaised : deskPaper.hover,
              "hover:text-[#20160d]"
            )}
            aria-label="Mailbox"
            aria-expanded={mailboxOpen}
          >
            <IconMailbox className="h-[18px] w-[18px]" />
            {mailboxUnread > 0 ? (
              <span className="absolute right-[7px] top-[7px] flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#8d6f4d] px-0.5 font-robinhood text-[8px] text-[#f2e6d1]">
                {mailboxUnread}
              </span>
            ) : null}
          </button>
          <DeskMailboxPanel open={mailboxOpen} onClose={() => setMailboxOpen(false)} />
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
              setMailboxOpen(false);
            }}
            className={clsx(
              "flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
              menuOpen ? deskPaper.panelRaised : deskPaper.hover
            )}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            aria-label="Profile and navigation menu"
          >
            <div className={clsx("flex h-8 w-8 items-center justify-center rounded-full border font-robinhood text-[11px]", deskPaper.avatar)}>
              {user.initials}
            </div>
            <IconChevronDown
              className={clsx("h-4 w-4 transition-transform duration-200", deskPaper.inkMeta, menuOpen ? "rotate-180" : "")}
            />
          </button>

          {menuOpen ? (
            <div className={clsx("absolute right-0 top-[calc(100%+8px)] z-50 w-[min(100vw-2rem,320px)] overflow-hidden rounded-lg", deskPaper.dropdown)}>
              <div className={clsx("border-b px-4 py-4", deskPaper.border)}>
                <div className={clsx("font-robinhood text-[13px] font-medium", deskPaper.inkHeading)}>{user.name}</div>
                <div className={clsx("mt-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.accent)}>
                  {user.role}
                  {user.vertical ? ` · ${user.vertical}` : ""}
                  {user.station ? ` · ${user.station}` : ""}
                </div>
              </div>

              <nav className="max-h-[min(60vh,420px)] overflow-y-auto px-2 py-2">
                {grouped.map(([section, items]) => (
                  <div key={section} className="mb-3 last:mb-0">
                    <div className={clsx("px-3 pb-1.5 font-robinhood text-[10px] uppercase tracking-[0.25em]", deskPaper.inkLabel)}>
                      {section}
                    </div>
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        const active = pathname === item.href;
                        const Icon = iconFor(item.icon);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuOpen(false)}
                            className={clsx(
                              "flex items-center gap-3 rounded-md px-3 py-2 font-robinhood text-[13px] transition-colors duration-200",
                              active
                                ? clsx(deskPaper.activeNav, "border-l-2 pl-[10px]", deskPaper.accentBorder)
                                : clsx(deskPaper.inkBody, deskPaper.hover, "hover:text-[#20160d]")
                            )}
                          >
                            <Icon className={clsx("h-4 w-4 shrink-0", active ? deskPaper.accent : deskPaper.inkMeta)} />
                            {item.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}

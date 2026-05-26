"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "./DeskContext";
import { type DeskNavItem } from "./desk-routes";
import { deskPaper } from "./desk-paper";
import { writerNav } from "./writer-routes";
import { mailboxUnreadCount } from "./desk-inbox-data";
import { isWriterShellPath } from "./writer-shell";
import { getDeskLoginPath } from "@/lib/site-urls";
import { clearDeskRoleCookie } from "./desk-auth-cookie";
import { GlobalSearchTrigger } from "./global-search/GlobalSearchTrigger";
import {
  IconAnalytics,
  IconCalendar,
  IconChevronDown,
  IconFileText,
  IconFiles,
  IconGear,
  IconLandmark,
  IconLayoutGrid,
  IconLogOut,
  IconMailbox,
  IconScrollText,
  IconSearch,
  IconSend,
  IconStar,
  IconUsers,
  IconVideo,
  IconVideoConference,
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
    case "analytics":
      return IconAnalytics;
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

export function DeskTopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useDesk();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const mailboxUnread = useMemo(() => mailboxUnreadCount(), []);

  const grouped = useMemo(() => {
    const map = new Map<string, DeskNavItem[]>();
    for (const item of writerNav) {
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
        <div className="flex items-baseline gap-2.5">
          <div className={clsx("font-cormorant text-[15px] font-light uppercase tracking-[0.22em]", deskPaper.inkHeading)}>
            HBM <span className={deskPaper.accent}>&amp;</span> Company
          </div>
          {isWriterShellPath(pathname) ? (
            <span className={clsx("font-robinhood text-[10px] uppercase tracking-[0.14em]", deskPaper.inkMeta)}>
              Editorial Newsroom
            </span>
          ) : null}
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 items-center justify-center px-2">
        <GlobalSearchTrigger />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Link
            href="/desk/meetings"
            className={clsx(
              "rounded-md p-2.5 transition-colors",
              deskPaper.inkMeta,
              pathname === "/desk/meetings" ? deskPaper.panelRaised : deskPaper.hover,
              "hover:text-[#20160d]"
            )}
            aria-label="Conferencing"
          >
            <IconVideoConference className="h-[26px] w-[26px]" />
          </Link>

          <Link
            href="/desk/mailbox"
            className={clsx(
              "relative rounded-md p-2.5 transition-colors",
              deskPaper.inkMeta,
              pathname === "/desk/mailbox" ? deskPaper.panelRaised : deskPaper.hover,
              "hover:text-[#20160d]"
            )}
            aria-label="Mailbox"
          >
            <IconMailbox className="h-[21px] w-[21px]" />
            {mailboxUnread > 0 ? (
              <span className="absolute right-[6px] top-[6px] flex h-[14px] min-w-[14px] items-center justify-center rounded-full bg-[#8d6f4d] px-0.5 font-robinhood text-[8px] text-[#f2e6d1]">
                {mailboxUnread}
              </span>
            ) : null}
          </Link>
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setMenuOpen((v) => !v);
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
                      {section === "ACCOUNT" ? (
                        <button
                          type="button"
                          onClick={() => {
                            setMenuOpen(false);
                            clearDeskRoleCookie();
                            router.push(getDeskLoginPath());
                          }}
                          className={clsx(
                            "flex w-full items-center gap-3 rounded-md px-3 py-2 font-robinhood text-[13px] transition-colors duration-200",
                            deskPaper.inkBody,
                            deskPaper.hover,
                            "hover:text-[#20160d]"
                          )}
                        >
                          <IconLogOut className={clsx("h-4 w-4 shrink-0", deskPaper.inkMeta)} />
                          Logout
                        </button>
                      ) : null}
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

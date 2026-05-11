"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "./DeskContext";
import { deskNav } from "./desk-routes";
import {
  IconCalendar,
  IconChevronDown,
  IconCollapse,
  IconFileText,
  IconFiles,
  IconGear,
  IconLandmark,
  IconLayoutGrid,
  IconMail,
  IconScrollText,
  IconSearch,
  IconSend,
  IconStar,
  IconUsers,
  IconVideo,
  IconVote,
  IconWallet,
} from "./desk-icons";

function iconFor(key: (typeof deskNav)[number]["icon"]) {
  switch (key) {
    case "mail":
      return IconMail;
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

export function DeskSidebar() {
  const pathname = usePathname();
  const { user } = useDesk();
  const [collapsed, setCollapsed] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof deskNav>();
    for (const item of deskNav) {
      if (!map.has(item.section)) map.set(item.section, []);
      map.get(item.section)!.push(item);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <aside
      className={clsx(
        "flex h-dvh shrink-0 flex-col border-r border-white/[0.04] bg-obsidian",
        "transition-[width] duration-300 ease-luxury",
        collapsed ? "w-16" : "w-[260px]"
      )}
    >
      <div className={clsx("px-4 pb-4 pt-5", collapsed ? "px-3" : "px-4")}>
        <div className={clsx("select-none", collapsed ? "hidden" : "block")}>
          <div className="font-cormorant text-[15px] font-light uppercase tracking-[0.22em] text-cream/70">
            HBM <span className="text-gold/60">&amp;</span> Company
          </div>
          <div className="mt-1 font-robinhood text-[10px] uppercase tracking-[0.3em] text-silver-dim/40">
            Desk
          </div>
        </div>
      </div>

      <nav className={clsx("min-h-0 flex-1 overflow-y-auto px-2", collapsed ? "px-2" : "px-2")}>
        {grouped.map(([section, items]) => (
          <div key={section} className="mb-6">
            <div
              className={clsx(
                "px-3 pb-2 font-robinhood text-[10px] uppercase tracking-[0.25em] text-silver-dim/30",
                collapsed ? "sr-only" : ""
              )}
            >
              {section}
            </div>
            <div className="space-y-1">
              {items.map((item) => {
                const active = pathname === item.href;
                const Icon = iconFor(item.icon);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "group flex items-center gap-3 rounded-md px-3 py-2.5",
                      "font-robinhood text-[13px] font-normal transition-colors duration-300 ease-luxury",
                      active
                        ? "bg-charcoal-light text-cream/90"
                        : "text-silver-dim/60 hover:bg-charcoal/50 hover:text-silver",
                      active ? "border-l-2 border-gold pl-[10px]" : ""
                    )}
                  >
                    <Icon
                      className={clsx(
                        "h-[18px] w-[18px] shrink-0 text-silver-dim/50",
                        active ? "text-gold/70" : "group-hover:text-silver/70"
                      )}
                    />
                    <span className={clsx("truncate", collapsed ? "sr-only" : "")}>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mt-auto px-4 pb-4">
        <div className="gold-rule my-4 opacity-70" />

        <div className={clsx("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-silver-ghost bg-charcoal text-[11px] text-cream/70">
            {user.initials}
          </div>
          <div className={clsx("min-w-0", collapsed ? "sr-only" : "")}>
            <div className="truncate font-robinhood text-[13px] text-cream/80">{user.name}</div>
            <div className="truncate font-robinhood text-[10px] uppercase tracking-wider text-gold-dim/80">
              {user.role}
              {user.vertical ? ` · ${user.vertical}` : ""}
              {user.station ? ` · ${user.station}` : ""}
            </div>
          </div>
          <div className={clsx("ml-auto flex items-center gap-2", collapsed ? "sr-only" : "")}>
            <Link
              href="/desk/settings"
              className="rounded-md p-2 text-silver-dim/40 transition-colors hover:bg-white/[0.04] hover:text-silver-dim"
              aria-label="Settings"
            >
              <IconGear className="h-[18px] w-[18px]" />
            </Link>
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="rounded-md p-2 text-silver-dim/40 transition-colors hover:bg-white/[0.04] hover:text-silver-dim"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <IconCollapse className="h-[18px] w-[18px]" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className={clsx(
              "rounded-md p-2 text-silver-dim/40 transition-colors hover:bg-white/[0.04] hover:text-silver-dim",
              collapsed ? "" : "hidden"
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <IconChevronDown className={clsx("h-[18px] w-[18px]", collapsed ? "-rotate-90" : "")} />
          </button>
        </div>
      </div>
    </aside>
  );
}


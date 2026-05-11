"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "./DeskContext";
import { deskBreadcrumb } from "./desk-routes";
import { IconBell, IconChevronDown, IconSearch } from "./desk-icons";

export function DeskTopBar() {
  const pathname = usePathname();
  const { user } = useDesk();
  const [q, setQ] = useState("");

  const crumb = useMemo(() => deskBreadcrumb(pathname), [pathname]);

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/[0.04] bg-void px-6">
      <div className="min-w-0 font-robinhood text-[13px] text-silver-dim/50">
        <span className="uppercase tracking-[0.18em]">{crumb.section}</span>
        <span className="mx-2 text-silver-ghost">/</span>
        <span className="text-cream/80">{crumb.page}</span>
      </div>

      <div className="relative hidden flex-1 justify-center md:flex">
        <div
          className={clsx(
            "relative w-full max-w-[480px] transition-[max-width,border-color] duration-300 ease-luxury",
            "focus-within:max-w-[560px]"
          )}
        >
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-silver-dim/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search inbox, boards, proposals..."
            className={clsx(
              "h-10 w-full rounded-lg border border-silver-ghost bg-charcoal pl-10 pr-4",
              "font-robinhood text-[13px] text-cream/80 placeholder:text-silver-dim/30",
              "outline-none transition-colors duration-300 ease-luxury focus:border-gold/30"
            )}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="relative rounded-md p-2 text-silver-dim/50 transition-colors hover:bg-white/[0.04] hover:text-silver"
          aria-label="Notifications"
        >
          <IconBell className="h-[18px] w-[18px]" />
          <span className="absolute right-[9px] top-[9px] h-[6px] w-[6px] rounded-full bg-gold" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.04]"
          aria-label="User menu"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-silver-ghost bg-charcoal text-[10px] text-cream/75">
            {user.initials}
          </div>
          <IconChevronDown className="h-4 w-4 text-silver-dim/40" />
        </button>
      </div>
    </header>
  );
}


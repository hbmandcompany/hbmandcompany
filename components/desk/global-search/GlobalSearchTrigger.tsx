"use client";

import { clsx } from "clsx";
import { deskPaper } from "../desk-paper";
import { IconSearch } from "../desk-icons";
import { useGlobalSearch } from "./useGlobalSearch";

export function GlobalSearchTrigger({ className }: { className?: string }) {
  const { open } = useGlobalSearch();

  return (
    <div className={clsx("flex w-full max-w-[560px] items-center justify-center", className)}>
      <button
        type="button"
        onClick={open}
        className={clsx(
          "relative hidden h-10 w-full items-center rounded-lg border pl-10 pr-16 text-left transition-[max-width,border-color] duration-300 ease-luxury md:flex",
          deskPaper.input,
          "hover:border-[#8d6f4d]/55"
        )}
        aria-label="Open command palette"
      >
        <IconSearch className={clsx("pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", deskPaper.inkLabel)} />
        <span className={clsx("truncate font-robinhood text-[13px]", deskPaper.inkLabel)}>
          Search, ask, or run a command…
        </span>
        <kbd
          className={clsx(
            "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border px-1.5 py-0.5 font-robinhood text-[10px]",
            deskPaper.border,
            deskPaper.inkMeta
          )}
        >
          ⌘K
        </kbd>
      </button>

      <button
        type="button"
        onClick={open}
        className={clsx(
          "rounded-md p-2.5 transition-colors md:hidden",
          deskPaper.inkMeta,
          deskPaper.hover,
          "hover:text-[#20160d]"
        )}
        aria-label="Open command palette"
      >
        <IconSearch className="h-5 w-5" />
      </button>
    </div>
  );
}

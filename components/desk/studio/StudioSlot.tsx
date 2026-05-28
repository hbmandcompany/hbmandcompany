"use client";

import { clsx } from "clsx";
import type { HomepageStudioSlot } from "@/lib/desk/homepage-studio";
import { HOMEPAGE_STUDIO_SLOT_LABELS } from "@/lib/desk/homepage-studio";

export function StudioSlot({
  slotId,
  selected,
  isDraft,
  onSelect,
  children,
  className,
}: {
  slotId: HomepageStudioSlot;
  selected: boolean;
  isDraft: boolean;
  onSelect?: (slot: HomepageStudioSlot) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx("studio-slot relative", onSelect && "cursor-pointer", className)}
      onClick={
        onSelect
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(slotId);
            }
          : undefined
      }
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(slotId);
              }
            }
          : undefined
      }
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
    >
      {children}
      {onSelect ? (
        <>
          <div
            className={clsx(
              "pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-all",
              selected ? "ring-2 ring-gold shadow-[0_0_0_1px_rgba(201,169,98,0.35)]" : "ring-1 ring-transparent hover:ring-gold/35",
            )}
            aria-hidden
          />
          <span
            className={clsx(
              "pointer-events-none absolute left-2 top-2 z-30 rounded px-2 py-0.5 font-mono-hbm text-[8px] uppercase tracking-[0.18em]",
              isDraft ? "bg-gold/90 text-void" : "bg-obsidian/85 text-silver-dim/80 ring-1 ring-white/10",
            )}
          >
            {isDraft ? "Your story" : HOMEPAGE_STUDIO_SLOT_LABELS[slotId]}
          </span>
        </>
      ) : null}
    </div>
  );
}

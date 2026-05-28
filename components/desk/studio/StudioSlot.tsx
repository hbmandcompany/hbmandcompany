"use client";

import { clsx } from "clsx";
import type { HomepageStudioCanvasConfig, HomepageStudioSlot } from "@/lib/desk/homepage-studio";
import { HOMEPAGE_STUDIO_SLOT_LABELS } from "@/lib/desk/homepage-studio";

export function StudioSlot({
  slotId,
  studio,
  selected,
  hovered,
  isDraft,
  onSelect,
  onHover,
  children,
  className,
}: {
  slotId: HomepageStudioSlot;
  studio?: HomepageStudioCanvasConfig;
  selected?: boolean;
  hovered?: boolean;
  isDraft: boolean;
  onSelect?: (slot: HomepageStudioSlot) => void;
  onHover?: (slot: HomepageStudioSlot | null) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const isSelected = selected ?? studio?.selectedSlot === slotId;
  const isHovered = hovered ?? studio?.hoveredSlot === slotId;
  const selectHandler = onSelect ?? studio?.onSelectSlot;
  const hoverHandler = onHover ?? studio?.onHoverSlot;
  const interactive = Boolean(selectHandler);

  return (
    <div
      className={clsx("studio-slot relative", interactive && "cursor-pointer", className)}
      data-slot-id={slotId}
      data-hovered={isHovered || undefined}
      data-selected={isSelected || undefined}
      onClick={
        selectHandler
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              selectHandler(slotId);
            }
          : undefined
      }
      onMouseEnter={hoverHandler ? () => hoverHandler(slotId) : undefined}
      onMouseLeave={hoverHandler ? () => hoverHandler(null) : undefined}
      onKeyDown={
        selectHandler
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectHandler(slotId);
              }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
      {interactive ? (
        <>
          <div
            className={clsx(
              "pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-all duration-200",
              isSelected && "bg-gold/[0.08] ring-2 ring-gold shadow-[0_0_0_1px_rgba(201,169,98,0.35)]",
              isHovered && !isSelected && "bg-gold/[0.14] ring-2 ring-gold/95 shadow-[0_0_32px_rgba(201,169,98,0.55)]",
              isHovered && isSelected && "bg-gold/[0.12] shadow-[0_0_36px_rgba(201,169,98,0.65)]",
              !isHovered && !isSelected && "ring-1 ring-transparent hover:ring-gold/35",
            )}
            aria-hidden
          />
          <span
            className={clsx(
              "pointer-events-none absolute left-2 top-2 z-30 rounded px-2 py-0.5 font-mono-hbm text-[8px] uppercase tracking-[0.18em] transition-colors",
              isDraft ? "bg-gold/90 text-void" : "bg-obsidian/85 text-silver-dim/80 ring-1 ring-white/10",
              isHovered && !isDraft && "bg-gold/80 text-void ring-gold/40",
            )}
          >
            {isDraft ? "Your story" : HOMEPAGE_STUDIO_SLOT_LABELS[slotId]}
          </span>
        </>
      ) : null}
    </div>
  );
}

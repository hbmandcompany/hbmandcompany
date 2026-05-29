"use client";

import { useEffect, useRef } from "react";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import {
  HOMEPAGE_STUDIO_SLOT_GROUPS,
  HOMEPAGE_STUDIO_SLOT_LABELS,
  type HomepageStudioSlot,
} from "@/lib/desk/homepage-studio";

function scrollSlotIntoPanel(container: HTMLElement, button: HTMLElement) {
  const containerRect = container.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const pad = 8;

  if (buttonRect.top >= containerRect.top + pad && buttonRect.bottom <= containerRect.bottom - pad) {
    return;
  }

  if (buttonRect.top < containerRect.top + pad) {
    container.scrollTop -= containerRect.top - buttonRect.top + pad;
  } else if (buttonRect.bottom > containerRect.bottom - pad) {
    container.scrollTop += buttonRect.bottom - containerRect.bottom + pad;
  }
}

export function StudioPlacementPanel({
  placementSlot,
  selectedSlot,
  hoveredSlot,
  scrollOnHover,
  onSelectSlot,
  onHoverSlot,
  onClearHover,
}: {
  placementSlot: HomepageStudioSlot;
  selectedSlot: HomepageStudioSlot | null;
  hoveredSlot: HomepageStudioSlot | null;
  /** When true, scroll the list to keep the hovered slot visible (preview → panel sync only). */
  scrollOnHover?: boolean;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
  onHoverSlot: (slot: HomepageStudioSlot) => void;
  onClearHover: () => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Map<HomepageStudioSlot, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (!scrollOnHover || !hoveredSlot) return;
    const container = listRef.current;
    const button = slotRefs.current.get(hoveredSlot);
    if (!container || !button) return;

    scrollSlotIntoPanel(container, button);
  }, [scrollOnHover, hoveredSlot]);

  return (
    <section
      className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}
      data-studio-placement-panel
      onMouseLeave={(e) => {
        const next = e.relatedTarget;
        if (next instanceof Node && e.currentTarget.contains(next)) return;
        onClearHover();
      }}
    >
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Placement</div>
      <p className={clsx("mt-1 font-robinhood text-[11px] leading-relaxed", deskPaper.inkMeta)}>
        Hover a slot to illuminate it on the preview — and vice versa.
      </p>

      <div ref={listRef} className="mt-3 max-h-[min(52vh,520px)] space-y-4 overflow-y-auto pr-1">
        {HOMEPAGE_STUDIO_SLOT_GROUPS.map((group) => {
          const groupHovered = hoveredSlot ? group.slots.includes(hoveredSlot) : false;
          return (
            <div key={group.label}>
              <div
                className={clsx(
                  "mb-1.5 font-robinhood text-[9px] uppercase tracking-[0.18em] transition-colors",
                  groupHovered ? "text-[#6c4320]" : deskPaper.inkLabel,
                )}
              >
                {group.label}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.slots.map((slot) => {
                  const active = placementSlot === slot;
                  const selected = selectedSlot === slot;
                  const illuminated = hoveredSlot === slot;
                  return (
                    <button
                      key={slot}
                      ref={(el) => {
                        if (el) slotRefs.current.set(slot, el);
                        else slotRefs.current.delete(slot);
                      }}
                      type="button"
                      onClick={() => onSelectSlot(slot)}
                      onMouseEnter={() => onHoverSlot(slot)}
                      className={clsx(
                        "rounded-md border px-2 py-1 font-robinhood text-[10px] ring-2 ring-transparent transition-[color,background-color,border-color,box-shadow] duration-200",
                        illuminated
                          ? "border-[#c9a962] bg-[#eadbc1] text-[#20160d] shadow-[0_0_16px_rgba(201,169,98,0.35)] ring-[#c9a962]/60"
                          : active || selected
                            ? clsx(deskPaper.activeNav, deskPaper.inkHeading, "border-[#8d6f4d]")
                            : clsx(deskPaper.border, deskPaper.inkMeta, deskPaper.hover),
                      )}
                    >
                      {HOMEPAGE_STUDIO_SLOT_LABELS[slot]}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

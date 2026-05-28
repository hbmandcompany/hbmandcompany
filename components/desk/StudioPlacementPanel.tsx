"use client";

import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import {
  HOMEPAGE_STUDIO_SLOT_GROUPS,
  HOMEPAGE_STUDIO_SLOT_LABELS,
  type HomepageStudioSlot,
} from "@/lib/desk/homepage-studio";

export function StudioPlacementPanel({
  placementSlot,
  selectedSlot,
  hoveredSlot,
  onSelectSlot,
  onHoverSlot,
}: {
  placementSlot: HomepageStudioSlot;
  selectedSlot: HomepageStudioSlot | null;
  hoveredSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
  onHoverSlot: (slot: HomepageStudioSlot | null) => void;
}) {
  return (
    <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)} data-studio-placement-panel>
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Placement</div>
      <p className={clsx("mt-1 font-robinhood text-[11px] leading-relaxed", deskPaper.inkMeta)}>
        Hover a slot to illuminate it on the preview — and vice versa.
      </p>

      <div className="mt-3 max-h-[min(52vh,520px)] space-y-4 overflow-y-auto pr-1">
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
                      type="button"
                      onClick={() => onSelectSlot(slot)}
                      onMouseEnter={() => onHoverSlot(slot)}
                      onMouseLeave={() => onHoverSlot(null)}
                      className={clsx(
                        "rounded-md border px-2 py-1 font-robinhood text-[10px] transition-all duration-200",
                        illuminated
                          ? "border-[#c9a962] bg-[#eadbc1] text-[#20160d] shadow-[0_0_16px_rgba(201,169,98,0.35)] ring-2 ring-[#c9a962]/60"
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

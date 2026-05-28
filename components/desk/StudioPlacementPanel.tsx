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
  onSelectSlot,
  onEditFields,
}: {
  placementSlot: HomepageStudioSlot;
  selectedSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
  onEditFields: () => void;
}) {
  return (
    <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}>
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Placement</div>
      <p className={clsx("mt-1 font-robinhood text-[11px] leading-relaxed", deskPaper.inkMeta)}>
        Choose where this story appears on the front page.
      </p>

      <div className="mt-3 space-y-4">
        {HOMEPAGE_STUDIO_SLOT_GROUPS.map((group) => (
          <div key={group.label}>
            <div className={clsx("mb-1.5 font-robinhood text-[9px] uppercase tracking-[0.18em]", deskPaper.inkLabel)}>
              {group.label}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {group.slots.map((slot) => {
                const active = placementSlot === slot;
                const selected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => onSelectSlot(slot)}
                    className={clsx(
                      "rounded-md border px-2 py-1 font-robinhood text-[10px] transition-colors",
                      active || selected
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
        ))}
      </div>

      {selectedSlot ? (
        <button
          type="button"
          onClick={onEditFields}
          className={clsx(
            "mt-4 w-full rounded-md border py-2 font-robinhood text-[10px] uppercase tracking-wider",
            deskPaper.border,
            deskPaper.accent,
            deskPaper.hover,
          )}
        >
          Edit full story →
        </button>
      ) : null}
    </section>
  );
}

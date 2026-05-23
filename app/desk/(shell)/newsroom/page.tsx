"use client";

import { useMemo } from "react";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { DeskNewsroomCalendar } from "@/components/desk/DeskNewsroomCalendar";
import { DeskEngagementPreview } from "@/components/desk/DeskEngagementPreview";
import { DeskStoryQueue } from "@/components/desk/DeskStoryQueue";

export default function NewsroomPage() {
  const today = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  return (
    <div className="flex min-h-[calc(100dvh-56px)] gap-6 px-6 py-6">
      <div className="min-w-0 flex-[0.65] space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <span className={clsx("font-cormorant text-sm uppercase tracking-[0.18em]", deskPaper.inkHeading)}>
              Editorial Newsroom
            </span>
            <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>{today}</span>
          </div>
          <div className={clsx("mt-3 h-px w-full", deskPaper.divider)} />
        </div>

        <DeskNewsroomCalendar />

        <DeskEngagementPreview />
      </div>

      <aside className="min-w-0 flex-[0.35] space-y-8">
        <DeskStoryQueue />
      </aside>
    </div>
  );
}

"use client";

import { DeskNewsroomCalendar } from "@/components/desk/DeskNewsroomCalendar";
import { DeskEngagementPreview } from "@/components/desk/DeskEngagementPreview";
import { DeskSubmissions } from "@/components/desk/DeskSubmissions";
import { DeskStoryQueue } from "@/components/desk/DeskStoryQueue";

export default function NewsroomPage() {
  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col gap-6 px-6 py-6 lg:flex-row">
      <div className="min-w-0 flex-[0.62] space-y-6">
        <DeskNewsroomCalendar />
        <DeskEngagementPreview />
      </div>

      <aside className="min-w-0 flex-[0.38] space-y-6">
        <DeskStoryQueue />
        <DeskSubmissions />
      </aside>
    </div>
  );
}

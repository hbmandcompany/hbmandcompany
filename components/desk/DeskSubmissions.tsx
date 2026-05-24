"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";
import { PaperStatusPill } from "./PaperStatusPill";
import { deskSubmissions, submissionsNeedingAction, type DeskSubmissionItem } from "./desk-submissions-data";

const PAGE_SIZE = 2;

function SectionHeading({ title, badge }: { title: string; badge?: number }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      {badge && badge > 0 ? (
        <span className="rounded-full bg-[#8d6f4d] px-2 py-0.5 font-robinhood text-[9px] uppercase tracking-wider text-[#f2e6d1]">
          {badge} open
        </span>
      ) : null}
      <div className={clsx("h-px flex-1", deskPaper.divider)} />
    </div>
  );
}

export function DeskSubmissions() {
  const [page, setPage] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(deskSubmissions[0]?.id ?? null);

  const actionCount = submissionsNeedingAction();
  const pageCount = Math.max(1, Math.ceil(deskSubmissions.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = useMemo(
    () => deskSubmissions.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE),
    [safePage]
  );
  const active = deskSubmissions.find((s) => s.id === activeId) ?? pageItems[0];

  function selectItem(item: DeskSubmissionItem) {
    setActiveId(item.id);
  }

  return (
    <section>
      <SectionHeading title="Submissions" badge={actionCount} />

      <div className={clsx("overflow-hidden rounded-md border", deskPaper.border)}>
        <div className={clsx("border-b", deskPaper.border)}>
          {pageItems.map((item) => {
            const isActive = active?.id === item.id;
            const needsAction = item.status !== "Approved";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectItem(item)}
                className={clsx(
                  "flex w-full gap-3 border-b px-3 py-3 text-left transition-colors last:border-b-0",
                  deskPaper.border,
                  isActive ? "bg-[#dcd0b8]" : needsAction ? "bg-[#ebe0cc]" : "bg-[#f2e6d1]",
                  deskPaper.cardHover
                )}
              >
                {needsAction ? (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#8d6f4d]" />
                ) : (
                  <span className="w-2 shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className={clsx("line-clamp-2 font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                      {item.headline}
                    </div>
                    <PaperStatusPill label={item.status} tone={item.tone} className="shrink-0 scale-90" />
                  </div>
                  <div className={clsx("mt-1 font-robinhood text-[10px] tabular-nums", deskPaper.inkMeta)}>
                    {item.submitted} · {item.reviewer}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {active ? (
          <div className={clsx("space-y-3 p-4", deskPaper.pageAlt)}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>
                  {active.section}
                </div>
                <div className={clsx("mt-1 font-robinhood text-[12px]", deskPaper.inkBody)}>{active.note}</div>
              </div>
              <Link
                href={`/desk/newsroom/editor?story=${active.storyId}`}
                className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.accent)}
              >
                Open article →
              </Link>
            </div>
            <div className={clsx("grid grid-cols-2 gap-3 rounded-md border p-3", deskPaper.border, "bg-[#f2e6d1]")}>
              <div>
                <div className={clsx("font-robinhood text-[9px] uppercase tracking-wider", deskPaper.inkLabel)}>Submitted</div>
                <div className={clsx("mt-0.5 font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{active.submitted}</div>
              </div>
              <div>
                <div className={clsx("font-robinhood text-[9px] uppercase tracking-wider", deskPaper.inkLabel)}>Reviewer</div>
                <div className={clsx("mt-0.5 font-robinhood text-[12px]", deskPaper.inkBody)}>{active.reviewer}</div>
              </div>
            </div>
          </div>
        ) : null}

        <div className={clsx("flex items-center justify-between border-t px-3 py-2", deskPaper.border, deskPaper.pageAlt)}>
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className={clsx(
              "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Prev
          </button>
          <span className={clsx("font-robinhood text-[10px]", deskPaper.inkLabel)}>
            {safePage + 1} / {pageCount}
          </span>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className={clsx(
              "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

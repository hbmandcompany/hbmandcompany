"use client";

import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { DeskEmptyState } from "@/components/desk/DeskEmptyState";
import { articleToDeskSubmission } from "@/components/desk/desk-article-mappers";
import type { DeskSubmissionItem } from "@/components/desk/desk-submission-types";
import { fetchArchivePipelineClient } from "@/lib/supabase/queries/articles.client";

function statusTone(status: DeskSubmissionItem["status"]) {
  switch (status) {
    case "Approved":
      return "green" as const;
    case "Returned":
      return "red" as const;
    case "In review":
      return "blue" as const;
    default:
      return "amber" as const;
  }
}

export default function DeskSubmissionsPage() {
  const [rows, setRows] = useState<DeskSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPipeline() {
      setLoading(true);
      setLoadError(null);
      const result = await fetchArchivePipelineClient();

      if (cancelled) return;

      if (result.error) {
        setLoadError(result.error.message);
        setRows([]);
      } else {
        setRows((result.data ?? []).map(articleToDeskSubmission));
      }

      setLoading(false);
    }

    void loadPipeline();
    return () => {
      cancelled = true;
    };
  }, []);

  const sortedRows = useMemo(() => rows, [rows]);

  return (
    <div className={clsx("desk-app min-h-[calc(100dvh-56px)] px-6 py-8", deskPaper.page, deskPaper.ink)}>
      <div className="mb-6">
        <div className={clsx("font-cormorant text-3xl", deskPaper.inkHeading)}>Submissions</div>
        <p className={clsx("mt-2 font-robinhood text-sm", deskPaper.inkBody)}>
          Editorial pipeline — drafts and stories awaiting review.
        </p>
        {loadError ? (
          <p className={clsx("mt-2 font-robinhood text-[12px] text-desk-red")}>{loadError}</p>
        ) : null}
      </div>

      <section className={clsx("overflow-hidden rounded-md border", deskPaper.border, deskPaper.card)}>
        <div className={clsx("grid grid-cols-[minmax(260px,1fr)_140px_160px_110px] border-b px-3 py-2", deskPaper.border, deskPaper.pageAlt)}>
          {["Article", "Status", "Reviewer", "Submitted"].map((h) => (
            <div key={h} className={clsx("font-robinhood text-[10px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
              {h}
            </div>
          ))}
        </div>

        {loading ? (
          <div className={clsx("px-4 py-10 font-robinhood text-[12px]", deskPaper.inkMeta)}>Loading submissions…</div>
        ) : sortedRows.length === 0 ? (
          <DeskEmptyState title="No submissions in the pipeline." subtitle="Stories will appear here when writers save or submit work." />
        ) : (
          sortedRows.map((row) => (
            <div
              key={row.id}
              className={clsx(
                "grid grid-cols-1 gap-2 border-b px-3 py-3 last:border-b-0 md:grid-cols-[minmax(260px,1fr)_140px_160px_110px] md:items-center",
                deskPaper.border,
                "bg-[#f2e6d1] hover:bg-[#ebe0cc]",
              )}
            >
              <div>
                <div className={clsx("font-robinhood text-[13px] font-medium leading-snug", deskPaper.inkHeading)}>{row.headline}</div>
                <div className={clsx("mt-0.5 font-robinhood text-[10px] uppercase tracking-wide", deskPaper.inkMeta)}>{row.section}</div>
              </div>
              <div>
                <PaperStatusPill label={row.status} tone={statusTone(row.status)} />
              </div>
              <div className={clsx("font-robinhood text-[12px]", deskPaper.inkBody)}>{row.reviewer}</div>
              <div className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{row.submitted}</div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

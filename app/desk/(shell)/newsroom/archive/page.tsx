"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { IconSearch } from "@/components/desk/desk-icons";
import type { ArchiveHistoryItem, ArchiveSubmissionItem } from "@/components/desk/desk-archive-types";
import { ArticleWeightBadge } from "@/components/desk/ArticleWeightBadge";
import { articleToArchiveHistory, articleToArchiveSubmission } from "@/components/desk/desk-article-mappers";
import { DeskEmptyState } from "@/components/desk/DeskEmptyState";
import {
  fetchArchivePipelineClient,
  fetchArchivePublishedClient,
} from "@/lib/supabase/queries/articles.client";

const PAGE_SIZE = 3;

function SectionHeading({
  title,
  search,
  onSearchChange,
  searchLabel,
}: {
  title: string;
  search: string;
  onSearchChange: (value: string) => void;
  searchLabel: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      <div className={clsx("h-px flex-1", deskPaper.divider)} />
      <div className="relative w-full max-w-[200px]">
        <IconSearch className={clsx("pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2", deskPaper.inkLabel)} />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Quick search…"
          aria-label={searchLabel}
          className={clsx(
            "h-8 w-full rounded-md border pl-8 pr-2 font-robinhood text-[11px] outline-none transition-colors",
            deskPaper.input
          )}
        />
      </div>
    </div>
  );
}

function Pagination({
  page,
  pageCount,
  onPrev,
  onNext,
}: {
  page: number;
  pageCount: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className={clsx("mt-auto flex items-center justify-between border-t pt-3", deskPaper.border)}>
      <button
        type="button"
        disabled={page === 0}
        onClick={onPrev}
        className={clsx(
          "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
          deskPaper.inkMeta,
          deskPaper.hover
        )}
      >
        Prev
      </button>
      <span className={clsx("font-robinhood text-[10px]", deskPaper.inkLabel)}>
        {page + 1} / {pageCount}
      </span>
      <button
        type="button"
        disabled={page >= pageCount - 1}
        onClick={onNext}
        className={clsx(
          "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
          deskPaper.inkMeta,
          deskPaper.hover
        )}
      >
        Next
      </button>
    </div>
  );
}

function matchesHistorySearch(row: ArchiveHistoryItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [row.headline, row.section, row.published, row.words, row.status, row.weight ?? ""].join(" ").toLowerCase().includes(q);
}

function matchesSubmissionSearch(row: ArchiveSubmissionItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [row.headline, row.section, row.submitted, row.reviewer, row.status].join(" ").toLowerCase().includes(q);
}

function usePaginatedRows<T>(rows: T[], page: number, pageSize: number) {
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = useMemo(
    () => rows.slice(safePage * pageSize, safePage * pageSize + pageSize),
    [rows, safePage, pageSize]
  );
  return { pageRows, pageCount, safePage };
}

export default function NewsroomArchivePage() {
  const [historySearch, setHistorySearch] = useState("");
  const [historyPage, setHistoryPage] = useState(0);
  const [submissionSearch, setSubmissionSearch] = useState("");
  const [submissionPage, setSubmissionPage] = useState(0);
  const [archiveHistory, setArchiveHistory] = useState<ArchiveHistoryItem[]>([]);
  const [archiveSubmissions, setArchiveSubmissions] = useState<ArchiveSubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadArchive() {
      setLoading(true);
      setLoadError(null);

      const [published, pipeline] = await Promise.all([
        fetchArchivePublishedClient(),
        fetchArchivePipelineClient(),
      ]);

      if (cancelled) return;

      if (published.error || pipeline.error) {
        setLoadError(published.error?.message ?? pipeline.error?.message ?? "Failed to load archive.");
        setArchiveHistory([]);
        setArchiveSubmissions([]);
      } else {
        setArchiveHistory((published.data ?? []).map(articleToArchiveHistory));
        setArchiveSubmissions((pipeline.data ?? []).map(articleToArchiveSubmission));
      }

      setLoading(false);
    }

    void loadArchive();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredHistory = useMemo(
    () => archiveHistory.filter((row) => matchesHistorySearch(row, historySearch)),
    [archiveHistory, historySearch]
  );
  const filteredSubmissions = useMemo(
    () => archiveSubmissions.filter((row) => matchesSubmissionSearch(row, submissionSearch)),
    [archiveSubmissions, submissionSearch]
  );

  const { pageRows: pageHistory, pageCount: historyPageCount, safePage: safeHistoryPage } = usePaginatedRows(
    filteredHistory,
    historyPage,
    PAGE_SIZE
  );
  const { pageRows: pageSubmissions, pageCount: submissionPageCount, safePage: safeSubmissionPage } = usePaginatedRows(
    filteredSubmissions,
    submissionPage,
    PAGE_SIZE
  );

  function handleHistorySearch(value: string) {
    setHistorySearch(value);
    setHistoryPage(0);
  }

  function handleSubmissionSearch(value: string) {
    setSubmissionSearch(value);
    setSubmissionPage(0);
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-8">
        <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
          ← Back to newsroom
        </Link>
        <h1 className={clsx("mt-3 font-cormorant text-4xl", deskPaper.inkHeading)}>Archive</h1>
        <p className={clsx("mt-2 max-w-2xl font-robinhood text-sm", deskPaper.inkBody)}>
          Published history and editorial submissions for your byline.
        </p>
        {loadError ? (
          <p className={clsx("mt-2 font-robinhood text-[12px] text-desk-red", deskPaper.inkBody)}>{loadError}</p>
        ) : null}
        {loading ? (
          <p className={clsx("mt-2 font-robinhood text-[12px]", deskPaper.inkMeta)}>Loading archive…</p>
        ) : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className={clsx("flex min-h-0 flex-col rounded-md p-5", deskPaper.card)}>
          <SectionHeading
            title="History"
            search={historySearch}
            onSearchChange={handleHistorySearch}
            searchLabel="Search history"
          />
          <div className={clsx("overflow-hidden rounded-md border", deskPaper.border, "bg-[#f2e6d1]")}>
            <div
              className={clsx(
                "hidden grid-cols-[1fr_0.7fr_0.6fr_0.6fr_90px] gap-2 border-b px-3 py-2 md:grid",
                deskPaper.border,
                deskPaper.pageAlt
              )}
            >
              {["Article", "Published", "Words", "Weight", "Status"].map((h) => (
                <div key={h} className={clsx("font-robinhood text-[9px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
                  {h}
                </div>
              ))}
            </div>
            {loading ? (
              <div className={clsx("px-4 py-8 text-center font-robinhood text-[12px]", deskPaper.inkMeta)}>
                Loading…
              </div>
            ) : pageHistory.length === 0 ? (
              <DeskEmptyState title="No published articles yet." subtitle="Published stories will appear in your archive." />
            ) : (
              pageHistory.map((row, index) => (
                <div
                  key={row.id}
                  className={clsx(
                    "grid grid-cols-1 gap-2 border-b px-3 py-3 last:border-b-0 md:grid-cols-[1fr_0.7fr_0.6fr_0.6fr_90px] md:items-center md:gap-2",
                    index === pageHistory.length - 1 ? "border-b-0" : deskPaper.border,
                    "bg-[#f2e6d1] hover:bg-[#ebe0cc]"
                  )}
                >
                  <div>
                    <div className={clsx("line-clamp-2 font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                      {row.headline}
                    </div>
                    <div className={clsx("mt-0.5 font-robinhood text-[10px] uppercase tracking-wide", deskPaper.inkMeta)}>{row.section}</div>
                  </div>
                  <div className={clsx("font-robinhood text-[12px]", deskPaper.inkBody)}>{row.published}</div>
                  <div className={clsx("font-robinhood text-[12px]", deskPaper.inkMeta)}>{row.words}</div>
                  <div>
                    <ArticleWeightBadge weight={row.weight} />
                  </div>
                  <div>
                    <PaperStatusPill label={row.status} tone={row.tone} className="scale-90" />
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            page={safeHistoryPage}
            pageCount={historyPageCount}
            onPrev={() => setHistoryPage((p) => Math.max(0, p - 1))}
            onNext={() => setHistoryPage((p) => Math.min(historyPageCount - 1, p + 1))}
          />
        </section>

        <section className={clsx("flex min-h-0 flex-col rounded-md p-5", deskPaper.card)}>
          <SectionHeading
            title="Submissions"
            search={submissionSearch}
            onSearchChange={handleSubmissionSearch}
            searchLabel="Search submissions"
          />
          <div className={clsx("overflow-hidden rounded-md border", deskPaper.border, "bg-[#f2e6d1]")}>
            <div
              className={clsx(
                "hidden grid-cols-[1fr_0.7fr_0.8fr_90px] gap-2 border-b px-3 py-2 md:grid",
                deskPaper.border,
                deskPaper.pageAlt
              )}
            >
              {["Article", "Submitted", "Reviewer", "Status"].map((h) => (
                <div key={h} className={clsx("font-robinhood text-[9px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
                  {h}
                </div>
              ))}
            </div>
            {loading ? (
              <div className={clsx("px-4 py-8 text-center font-robinhood text-[12px]", deskPaper.inkMeta)}>
                Loading…
              </div>
            ) : pageSubmissions.length === 0 ? (
              <DeskEmptyState title="No submissions in the pipeline." subtitle="Draft and in-review stories will show here." />
            ) : (
              pageSubmissions.map((row, index) => (
                <div
                  key={row.id}
                  className={clsx(
                    "grid grid-cols-1 gap-2 border-b px-3 py-3 last:border-b-0 md:grid-cols-[1fr_0.7fr_0.8fr_90px] md:items-center md:gap-2",
                    index === pageSubmissions.length - 1 ? "border-b-0" : deskPaper.border,
                    "bg-[#f2e6d1] hover:bg-[#ebe0cc]"
                  )}
                >
                  <div>
                    <div className={clsx("line-clamp-2 font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                      {row.headline}
                    </div>
                    <div className={clsx("mt-0.5 font-robinhood text-[10px] uppercase tracking-wide", deskPaper.inkMeta)}>{row.section}</div>
                  </div>
                  <div className={clsx("font-robinhood text-[12px]", deskPaper.inkBody)}>{row.submitted}</div>
                  <div className={clsx("font-robinhood text-[12px]", deskPaper.inkMeta)}>{row.reviewer}</div>
                  <div>
                    <PaperStatusPill label={row.status} tone={row.tone} className="scale-90" />
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            page={safeSubmissionPage}
            pageCount={submissionPageCount}
            onPrev={() => setSubmissionPage((p) => Math.max(0, p - 1))}
            onNext={() => setSubmissionPage((p) => Math.min(submissionPageCount - 1, p + 1))}
          />
        </section>
      </div>
    </div>
  );
}

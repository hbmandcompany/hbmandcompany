"use client";

import { clsx } from "clsx";
import type { Article } from "@/lib/supabase/types";
import { ArticleWeightBadge } from "./ArticleWeightBadge";
import { EditorSitePreview } from "./EditorSitePreview";
import { countWords, formatRelativeTimestamp } from "./desk-article-mappers";
import { deskPaper } from "./desk-paper";
import { DeskEmptyState } from "./DeskEmptyState";
import type { EditorImageState } from "./EditorImagePanel";

type ReviewTab = "Needs Review" | "Published" | "Drafts" | "Rejected";

function articleImage(article: Article): EditorImageState | null {
  if (!article.hero_image_url) return null;
  return {
    url: article.hero_image_url,
    alt: article.title,
    caption: "",
    fileName: "",
  };
}

export function EditorReviewDashboard({
  tab,
  onTabChange,
  articles,
  loading,
  loadError,
  selectedId,
  onSelect,
  rejectionNotes,
  onRejectionNotesChange,
  onApprovePublish,
  onReject,
  onSaveDraft,
  onUnpublish,
  onDelete,
  actionPending,
  actionError,
}: {
  tab: ReviewTab;
  onTabChange: (tab: ReviewTab) => void;
  articles: Article[];
  loading: boolean;
  loadError: string | null;
  selectedId: string | null;
  onSelect: (id: string) => void;
  rejectionNotes: string;
  onRejectionNotesChange: (value: string) => void;
  onApprovePublish: () => void;
  onReject: () => void;
  onSaveDraft: () => void;
  onUnpublish: () => void;
  onDelete: () => void;
  actionPending: boolean;
  actionError: string | null;
}) {
  const tabs: ReviewTab[] = ["Needs Review", "Published", "Drafts", "Rejected"];
  const selected = articles.find((a) => a.id === selectedId) ?? articles[0] ?? null;

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col">
      <div className={clsx("border-b px-6 py-4", deskPaper.border, deskPaper.pageAlt)}>
        <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.28em]", deskPaper.inkLabel)}>
          Editor in Chief
        </div>
        <h1 className={clsx("mt-1 font-cormorant text-3xl", deskPaper.inkHeading)}>Review Dashboard</h1>
      </div>

      {loadError ? (
        <div className={clsx("border-b px-6 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>
          {loadError}
        </div>
      ) : null}

      {actionError ? (
        <div className={clsx("border-b px-6 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>
          {actionError}
        </div>
      ) : null}

      <div className="grid flex-1 lg:grid-cols-[2fr_3fr]">
        <div className={clsx("border-r", deskPaper.border)}>
          <div className={clsx("flex flex-wrap gap-1 border-b px-3 py-2", deskPaper.border, deskPaper.pageAlt)}>
            {tabs.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onTabChange(t)}
                className={clsx(
                  "rounded px-2.5 py-1 font-robinhood text-[10px] uppercase tracking-[0.14em] transition-colors",
                  tab === t
                    ? clsx(deskPaper.activeNav, deskPaper.inkHeading)
                    : clsx(deskPaper.inkMeta, deskPaper.hover, "hover:text-[#20160d]"),
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="max-h-[calc(100dvh-180px)] overflow-y-auto">
            {loading ? (
              <div className={clsx("px-4 py-8 font-robinhood text-[12px]", deskPaper.inkMeta)}>Loading articles…</div>
            ) : articles.length === 0 ? (
              <DeskEmptyState
                title="No articles in this queue."
                subtitle="Articles will appear here as writers submit work."
              />
            ) : (
              articles.map((article) => {
                const active = selected?.id === article.id;
                const words = countWords(article.body) + countWords(article.title);
                return (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => onSelect(article.id)}
                    className={clsx(
                      "w-full border-b px-4 py-3 text-left transition-colors",
                      deskPaper.border,
                      active ? "bg-[#dcd0b8]" : "bg-[#f2e6d1] hover:bg-[#ebe0cc]",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className={clsx("line-clamp-2 font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                        {article.title}
                      </div>
                      <ArticleWeightBadge weight={article.weight} />
                    </div>
                    <div className={clsx("mt-2 flex flex-wrap gap-x-3 gap-y-1 font-robinhood text-[10px]", deskPaper.inkMeta)}>
                      <span>{article.author_id ?? "Unassigned"}</span>
                      <span>{words.toLocaleString()} words</span>
                      <span>{formatRelativeTimestamp(article.updated_at)}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="flex flex-col">
          {selected ? (
            <>
              <div className="flex-1 overflow-y-auto p-6">
                <EditorSitePreview
                  headline={selected.title}
                  dek={selected.excerpt ?? ""}
                  body={selected.body ?? ""}
                  section="Desk"
                  byline={selected.author_id ?? "Contributor"}
                  image={articleImage(selected)}
                  weight={selected.weight}
                />
              </div>

              <div className={clsx("space-y-3 border-t p-6", deskPaper.border, deskPaper.pageAlt)}>
                {tab === "Needs Review" ? (
                  <>
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={onApprovePublish}
                      className={clsx(
                        "w-full rounded-md border py-2.5 font-robinhood text-[10px] uppercase tracking-[0.18em] disabled:opacity-50",
                        "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]",
                      )}
                    >
                      Approve and Publish
                    </button>
                    <textarea
                      value={rejectionNotes}
                      onChange={(e) => onRejectionNotesChange(e.target.value)}
                      placeholder="Rejection notes for the writer…"
                      rows={3}
                      className={clsx("w-full rounded-md border px-3 py-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
                    />
                    <button
                      type="button"
                      disabled={actionPending || !rejectionNotes.trim()}
                      onClick={onReject}
                      className={clsx(
                        "w-full rounded border py-2 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-50",
                        deskPaper.border,
                        deskPaper.inkBody,
                        deskPaper.hover,
                      )}
                    >
                      Reject with Notes
                    </button>
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={onSaveDraft}
                      className={clsx(
                        "w-full rounded border py-2 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-50",
                        deskPaper.border,
                        deskPaper.inkMeta,
                        deskPaper.hover,
                      )}
                    >
                      Save as Draft
                    </button>
                  </>
                ) : null}

                {tab === "Published" ? (
                  <button
                    type="button"
                    disabled={actionPending}
                    onClick={onUnpublish}
                    className={clsx(
                      "w-full rounded border py-2 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-50",
                      deskPaper.border,
                      deskPaper.inkBody,
                      deskPaper.hover,
                    )}
                  >
                    Unpublish
                  </button>
                ) : null}

                {tab === "Drafts" || tab === "Rejected" ? (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={onApprovePublish}
                      className={clsx(
                        "w-full rounded-md border py-2.5 font-robinhood text-[10px] uppercase tracking-[0.18em] disabled:opacity-50",
                        "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]",
                      )}
                    >
                      Approve and Publish
                    </button>
                    <button
                      type="button"
                      disabled={actionPending}
                      onClick={onDelete}
                      className={clsx(
                        "w-full rounded border py-2 font-robinhood text-[10px] uppercase tracking-wider text-desk-red disabled:opacity-50",
                        deskPaper.border,
                        deskPaper.hover,
                      )}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <DeskEmptyState title="Select an article to review." subtitle="Choose a story from the queue on the left." />
          )}
        </div>
      </div>
    </div>
  );
}

export type { ReviewTab };

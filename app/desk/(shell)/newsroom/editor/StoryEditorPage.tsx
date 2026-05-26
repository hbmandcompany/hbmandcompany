"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { EditorImagePanel, type EditorImageState } from "@/components/desk/EditorImagePanel";
import { EditorSitePreview } from "@/components/desk/EditorSitePreview";
import { EditorHomepagePreview } from "@/components/desk/EditorHomepagePreview";
import { ARTICLE_WEIGHT_OPTIONS } from "@/components/desk/ArticleWeightBadge";
import { countWords, deskStatusFromArticle, slugifyTitle } from "@/components/desk/desk-article-mappers";
import {
  fetchArticleByIdClient,
  publishArticleClient,
  saveArticleDraftClient,
  submitArticleForReviewClient,
} from "@/lib/supabase/queries/articles.client";
import type { ArticleStatus } from "@/lib/supabase/types";

const defaultDraft = {
  section: "Finance",
  status: "DRAFT" as const,
  tone: "neutral" as const,
};

type EditorView = "write" | "preview";

export default function StoryEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storyId = searchParams.get("story");
  const { user } = useDesk();

  const [articleId, setArticleId] = useState<string | null>(storyId);
  const [loading, setLoading] = useState(Boolean(storyId));
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [articleStatus, setArticleStatus] = useState<ArticleStatus>("draft");

  const [view, setView] = useState<EditorView>("write");
  const [headline, setHeadline] = useState("");
  const [dek, setDek] = useState("");
  const [body, setBody] = useState("");
  const [section, setSection] = useState(defaultDraft.section);
  const [weight, setWeight] = useState("");
  const [heroImage, setHeroImage] = useState<EditorImageState | null>(null);

  useEffect(() => {
    setArticleId(storyId);
  }, [storyId]);

  useEffect(() => {
    if (!storyId) {
      setLoading(false);
      return;
    }

    const id = storyId;
    let cancelled = false;

    async function loadArticle() {
      setLoading(true);
      setLoadError(null);
      const result = await fetchArticleByIdClient(id);

      if (cancelled) return;

      if (result.error) {
        setLoadError(result.error.message);
        setLoading(false);
        return;
      }

      if (result.data) {
        const article = result.data;
        setHeadline(article.title);
        setDek(article.excerpt ?? "");
        setBody(article.body ?? "");
        setWeight(article.weight ?? "");
        setArticleStatus(article.status);
        if (article.hero_image_url) {
          setHeroImage({
            url: article.hero_image_url,
            alt: article.title,
            caption: "",
            fileName: "",
          });
        }
      }

      setLoading(false);
    }

    void loadArticle();
    return () => {
      cancelled = true;
    };
  }, [storyId]);

  useEffect(() => {
    return () => {
      if (heroImage?.url.startsWith("blob:")) URL.revokeObjectURL(heroImage.url);
    };
  }, [heroImage?.url]);

  function updateHeroImage(next: EditorImageState | null) {
    setHeroImage((prev) => {
      if (prev?.url.startsWith("blob:") && prev.url !== next?.url) URL.revokeObjectURL(prev.url);
      return next;
    });
  }

  const wordCount = useMemo(() => countWords([headline, dek, body].join(" ")), [headline, dek, body]);

  const { label: status, tone } = useMemo(() => {
    if (loading) return { label: defaultDraft.status, tone: defaultDraft.tone };
    return deskStatusFromArticle(articleStatus);
  }, [loading, articleStatus]);

  const buildPayload = useCallback(
    () => ({
      title: headline.trim() || "Untitled draft",
      slug: slugifyTitle(headline.trim() || "Untitled draft"),
      excerpt: dek.trim() || null,
      body: body.trim() || null,
      status: articleStatus,
      hero_image_url: heroImage?.url && !heroImage.url.startsWith("blob:") ? heroImage.url : null,
      author_id: null,
      weight: weight || null,
    }),
    [headline, dek, body, articleStatus, heroImage, weight],
  );

  async function persist(action: "draft" | "review" | "publish"): Promise<boolean> {
    if (!weight) {
      setSaveError("Select a weight before saving.");
      return false;
    }

    setSaving(true);
    setSaveError(null);

    const base = buildPayload();
    let result;

    if (action === "draft") {
      result = await saveArticleDraftClient(articleId, { ...base, status: "draft", published_at: null });
    } else if (action === "review") {
      result = await submitArticleForReviewClient(articleId, base);
    } else {
      result = await publishArticleClient(articleId, base);
    }

    setSaving(false);

    if (result.error) {
      setSaveError(result.error.message);
      return false;
    }

    if (result.data) {
      setArticleId(result.data.id);
      setArticleStatus(result.data.status);
      setLastSavedAt(new Date());

      if (!articleId) {
        router.replace(`/desk/newsroom/editor?mode=write&story=${result.data.id}`);
      }
    }

    return true;
  }

  if (loading) {
    return (
      <div className={clsx("flex min-h-[calc(100dvh-56px)] items-center justify-center font-robinhood text-sm", deskPaper.inkMeta)}>
        Loading story…
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col">
      <div className={clsx("flex flex-wrap items-center justify-between gap-3 border-b px-6 py-3", deskPaper.border, deskPaper.pageAlt)}>
        <div className="flex items-center gap-4">
          <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
            ← Desk
          </Link>
          <PaperStatusPill label={status} tone={tone} />
          <span className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{wordCount.toLocaleString()} words</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className={clsx("flex rounded-md border p-0.5", deskPaper.border)}>
            <button
              type="button"
              onClick={() => setView("write")}
              className={clsx(
                "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                view === "write" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover),
              )}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setView("preview")}
              className={clsx(
                "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                view === "preview" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover),
              )}
            >
              Site preview
            </button>
          </div>
          <button
            type="button"
            disabled={saving}
            onClick={() => void persist("draft")}
            className={clsx(
              "rounded border px-4 py-2 font-robinhood text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50",
              deskPaper.border,
              deskPaper.inkMeta,
              deskPaper.hover,
            )}
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void persist("review")}
            className={clsx(
              "rounded border px-4 py-2 font-robinhood text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50",
              deskPaper.border,
              deskPaper.inkMeta,
              deskPaper.hover,
            )}
          >
            Submit for review
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => void persist("publish")}
            className={clsx(
              "rounded-md border px-4 py-2 font-robinhood text-[10px] uppercase tracking-[0.18em] transition-colors disabled:opacity-50",
              "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]",
            )}
          >
            Publish
          </button>
        </div>
      </div>

      {loadError ? (
        <div className={clsx("border-b px-6 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>
          {loadError}
        </div>
      ) : null}

      {saveError ? (
        <div className={clsx("border-b px-6 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>
          {saveError}
        </div>
      ) : null}

      <div className="grid flex-1 gap-6 px-6 py-6 lg:grid-cols-[1fr_280px]">
        <div>
          {view === "write" ? (
            <div className={clsx("rounded-md border p-6", deskPaper.card, deskPaper.border)}>
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Headline"
                className={clsx(
                  "mb-4 w-full border-0 bg-transparent font-cormorant text-3xl outline-none placeholder:text-[#9a8262]/60",
                  deskPaper.inkHeading,
                )}
              />
              <input
                value={dek}
                onChange={(e) => setDek(e.target.value)}
                placeholder="Dek — one-line summary for the story card"
                className={clsx(
                  "mb-6 w-full border-0 border-b bg-transparent pb-3 font-robinhood text-[15px] outline-none placeholder:text-[#9a8262]/60",
                  deskPaper.border,
                  deskPaper.inkBody,
                )}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing…"
                rows={18}
                className={clsx(
                  "w-full resize-none border-0 bg-transparent font-robinhood text-[15px] leading-[1.75] outline-none placeholder:text-[#9a8262]/60",
                  deskPaper.inkBody,
                )}
              />
            </div>
          ) : (
            <EditorSitePreview
              headline={headline}
              dek={dek}
              body={body}
              section={section}
              byline={user.name}
              image={heroImage}
              weight={weight}
            />
          )}
        </div>

        <aside className="space-y-4">
          <EditorImagePanel image={heroImage} onImageChange={updateHeroImage} />

          <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Filing</div>
            <div className="mt-3 space-y-3">
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Section</div>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className={clsx("h-9 w-full rounded-md border px-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
                >
                  {["Finance", "Markets", "Investigations", "Technology", "Texas Business", "Infrastructure"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Weight</div>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className={clsx("h-9 w-full rounded-md border px-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
                >
                  <option value="">Select weight…</option>
                  {ARTICLE_WEIGHT_OPTIONS.map((w) => (
                    <option key={w} value={w}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Assigned editor</div>
                <div className={clsx("font-robinhood text-[13px]", deskPaper.inkBody)}>Elena Vasquez</div>
              </div>
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Due</div>
                <div className={clsx("font-robinhood text-[13px] tabular-nums", deskPaper.inkBody)}>Set deadline in desk</div>
              </div>
            </div>
          </section>

          <EditorHomepagePreview headline={headline} dek={dek} category={section} image={heroImage} compact />

          <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Editor notes</div>
            <p className={clsx("mt-3 font-robinhood text-[12px] leading-relaxed", deskPaper.inkMeta)}>
              {articleStatus === "review"
                ? "Awaiting editor review. You will be notified when notes are returned."
                : "No open notes. Submit when ready for editorial review."}
            </p>
          </section>

          <section className={clsx("rounded-md border p-4", deskPaper.border, "bg-[#f2e6d1]")}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Auto-save</div>
            <div className={clsx("mt-2 font-robinhood text-[12px]", lastSavedAt ? "text-desk-green" : deskPaper.inkMeta)}>
              {lastSavedAt ? `Saved ${lastSavedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}` : "Not saved yet"}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

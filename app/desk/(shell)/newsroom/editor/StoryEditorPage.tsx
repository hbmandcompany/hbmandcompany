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
import { LiveArticleEditor } from "@/components/desk/LiveArticleEditor";
import { LiveStudioHomepage } from "@/components/desk/LiveStudioHomepage";
import { StudioPlacementPanel } from "@/components/desk/StudioPlacementPanel";
import { ARTICLE_WEIGHT_OPTIONS } from "@/components/desk/ArticleWeightBadge";
import { countWords, deskStatusFromArticle, slugifyTitle } from "@/components/desk/desk-article-mappers";
import {
  fetchArticleByIdClient,
  publishArticleClient,
  saveArticleDraftClient,
  submitArticleForReviewClient,
} from "@/lib/supabase/queries/articles.client";
import type { ArticleStatus } from "@/lib/supabase/types";
import type { HomepageStudioSlot } from "@/lib/desk/homepage-studio";

const defaultDraft = {
  section: "Finance",
  status: "Live Studio" as const,
  tone: "neutral" as const,
};

type StudioTab = "homepage" | "write" | "preview";

function StudioTabBar({
  active,
  onHomepage,
  onWrite,
  onPreview,
}: {
  active: StudioTab;
  onHomepage: () => void;
  onWrite: () => void;
  onPreview: () => void;
}) {
  return (
    <div className={clsx("flex flex-wrap items-center rounded-md border p-0.5", deskPaper.border)}>
      <button
        type="button"
        onClick={onHomepage}
        className={clsx(
          "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
          active === "homepage" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover),
        )}
      >
        Homepage
      </button>

      <span className={clsx("mx-1 h-5 w-px shrink-0", deskPaper.border)} aria-hidden />

      <button
        type="button"
        onClick={onWrite}
        className={clsx(
          "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
          active === "write" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover),
        )}
      >
        Write
      </button>
      <button
        type="button"
        onClick={onPreview}
        className={clsx(
          "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
          active === "preview" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover),
        )}
      >
        Preview
      </button>
    </div>
  );
}

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

  const [studioTab, setStudioTab] = useState<StudioTab>("homepage");
  const [placementSlot, setPlacementSlot] = useState<HomepageStudioSlot>("editorial-top-0");
  const [selectedSlot, setSelectedSlot] = useState<HomepageStudioSlot | null>("editorial-top-0");
  const [hoveredSlot, setHoveredSlot] = useState<HomepageStudioSlot | null>(null);

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

  function selectPlacement(slot: HomepageStudioSlot) {
    setSelectedSlot(slot);
    setPlacementSlot(slot);
  }

  function handleCanvasSlot(slot: HomepageStudioSlot) {
    selectPlacement(slot);
    setStudioTab("write");
  }

  const wordCount = useMemo(() => countWords([headline, dek, body].join(" ")), [headline, dek, body]);

  const statusDisplay = useMemo(() => {
    if (loading) return { label: defaultDraft.status, tone: defaultDraft.tone };
    const mapped = deskStatusFromArticle(articleStatus);
    if (mapped.label === "DRAFT") return { label: "Live Studio", tone: mapped.tone };
    return mapped;
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
        <div className="flex min-w-0 flex-wrap items-center gap-4">
          <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
            ← Desk
          </Link>
          <PaperStatusPill label={statusDisplay.label} tone={statusDisplay.tone} />
          <span className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{wordCount.toLocaleString()} words</span>
        </div>

        <StudioTabBar
          active={studioTab}
          onHomepage={() => setStudioTab("homepage")}
          onWrite={() => setStudioTab("write")}
          onPreview={() => setStudioTab("preview")}
        />

        <div className="flex flex-wrap items-center gap-2">
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
        <div className={clsx("border-b px-6 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>{loadError}</div>
      ) : null}
      {saveError ? (
        <div className={clsx("border-b px-6 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>{saveError}</div>
      ) : null}

      <div className="grid flex-1 gap-6 px-6 py-6 lg:grid-cols-[1fr_280px]">
        <div className="min-w-0">
          {studioTab === "homepage" ? (
            <LiveStudioHomepage
              storyId={articleId}
              headline={headline}
              dek={dek}
              section={section}
              heroImage={heroImage}
              onHeadlineChange={setHeadline}
              onDekChange={setDek}
              selectedSlot={selectedSlot}
              placementSlot={placementSlot}
              hoveredSlot={hoveredSlot}
              onSelectSlot={handleCanvasSlot}
              onHoverSlot={setHoveredSlot}
            />
          ) : studioTab === "write" ? (
            <LiveArticleEditor
              headline={headline}
              dek={dek}
              body={body}
              section={section}
              byline={user.name}
              image={heroImage}
              weight={weight}
              onHeadlineChange={setHeadline}
              onDekChange={setDek}
              onBodyChange={setBody}
            />
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

          {studioTab === "homepage" ? (
            <StudioPlacementPanel
              placementSlot={placementSlot}
              selectedSlot={selectedSlot}
              hoveredSlot={hoveredSlot}
              onSelectSlot={selectPlacement}
              onHoverSlot={setHoveredSlot}
              onEditFields={() => setStudioTab("write")}
            />
          ) : null}

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
            </div>
          </section>

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

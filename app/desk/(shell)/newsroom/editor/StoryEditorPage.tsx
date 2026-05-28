"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { EditorImagePanel, type EditorImageState } from "@/components/desk/EditorImagePanel";
import { LiveArticleEditor } from "@/components/desk/LiveArticleEditor";
import { LiveStudioHomepage } from "@/components/desk/LiveStudioHomepage";
import { StudioPlacementPanel } from "@/components/desk/StudioPlacementPanel";
import { ARTICLE_WEIGHT_OPTIONS } from "@/components/desk/ArticleWeightBadge";
import { countWords, deskStatusFromArticle, slugifyTitle } from "@/components/desk/desk-article-mappers";
import { articleToBriefing } from "@/lib/desk/article-to-briefing";
import {
  buildStudioHeroProps,
  buildStudioHomepageSections,
  resolveSlotCardFields,
  type HomepageStudioSlot,
  type SlotCardFields,
} from "@/lib/desk/homepage-studio";
import {
  fetchArticleByIdClient,
  fetchPublishedArticlesClient,
  publishArticleClient,
  saveArticleDraftClient,
  submitArticleForReviewClient,
  updateArticleClient,
} from "@/lib/supabase/queries/articles.client";
import type { ArticleStatus } from "@/lib/supabase/types";

const defaultDraft = {
  section: "Finance",
  status: "Live Studio" as const,
  tone: "neutral" as const,
};

type StudioView = "homepage" | "write";

type CardBaseline = SlotCardFields & { slot: HomepageStudioSlot };

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

  const [studioView, setStudioView] = useState<StudioView>("homepage");
  const [placementSlot, setPlacementSlot] = useState<HomepageStudioSlot>("editorial-top-0");
  const [selectedSlot, setSelectedSlot] = useState<HomepageStudioSlot | null>("editorial-top-0");
  const [hoveredSlot, setHoveredSlot] = useState<HomepageStudioSlot | null>(null);
  const [focusedSlot, setFocusedSlot] = useState<HomepageStudioSlot | null>(null);

  const [headline, setHeadline] = useState("");
  const [dek, setDek] = useState("");
  const [body, setBody] = useState("");
  const [section, setSection] = useState(defaultDraft.section);
  const [weight, setWeight] = useState("");
  const [heroImage, setHeroImage] = useState<EditorImageState | null>(null);

  const [cardHeadline, setCardHeadline] = useState("");
  const [cardDek, setCardDek] = useState("");
  const [cardStoryId, setCardStoryId] = useState<string | null>(null);
  const [cardBaseline, setCardBaseline] = useState<CardBaseline | null>(null);
  const [savedDraftBaseline, setSavedDraftBaseline] = useState({ headline: "", dek: "", body: "" });

  const [publishedBriefings, setPublishedBriefings] = useState<ReturnType<typeof articleToBriefing>[] | null>(null);
  const hoverClearRef = useRef<number | null>(null);

  const handleHoverSlot = useCallback((slot: HomepageStudioSlot | null) => {
    if (slot) {
      if (hoverClearRef.current !== null) {
        window.clearTimeout(hoverClearRef.current);
        hoverClearRef.current = null;
      }
      setHoveredSlot(slot);
      return;
    }
    hoverClearRef.current = window.setTimeout(() => {
      setHoveredSlot(null);
      hoverClearRef.current = null;
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverClearRef.current !== null) window.clearTimeout(hoverClearRef.current);
    };
  }, []);

  const refreshPublishedBriefings = useCallback(async () => {
    const result = await fetchPublishedArticlesClient();
    setPublishedBriefings((result.data ?? []).map(articleToBriefing));
  }, []);

  useEffect(() => {
    void refreshPublishedBriefings();
  }, [refreshPublishedBriefings]);

  useEffect(() => {
    setArticleId(storyId);
  }, [storyId]);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "write") setStudioView("write");
  }, [searchParams]);

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
        setSavedDraftBaseline({
          headline: article.title,
          dek: article.excerpt ?? "",
          body: article.body ?? "",
        });
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

  const draftStoryId = articleId ?? "studio-draft";

  const previewBriefings = useMemo(() => {
    if (!publishedBriefings) return null;
    if (!focusedSlot || !cardStoryId || cardStoryId === draftStoryId || cardStoryId === articleId) return publishedBriefings;
    return publishedBriefings.map((briefing) =>
      briefing.id === cardStoryId
        ? { ...briefing, headline: cardHeadline, dek: cardDek }
        : briefing,
    );
  }, [publishedBriefings, focusedSlot, cardStoryId, draftStoryId, articleId, cardHeadline, cardDek]);

  const studioSections = useMemo(
    () =>
      buildStudioHomepageSections(previewBriefings, {
        storyId: draftStoryId,
        headline,
        dek,
        category: section,
        imageSrc: heroImage?.url,
      }, placementSlot),
    [previewBriefings, draftStoryId, headline, dek, section, heroImage?.url, placementSlot],
  );

  const studioHero = useMemo(
    () =>
      buildStudioHeroProps(
        studioSections,
        { storyId: draftStoryId, headline, dek, category: section, imageSrc: heroImage?.url },
        placementSlot,
      ),
    [studioSections, draftStoryId, headline, dek, section, heroImage?.url, placementSlot],
  );

  const resolveSlotFields = useCallback(
    (slot: HomepageStudioSlot) => resolveSlotCardFields(studioSections, studioHero, slot),
    [studioSections, studioHero],
  );

  const previewSlot = hoveredSlot ?? focusedSlot;
  const previewFields = previewSlot ? resolveSlotFields(previewSlot) : null;

  const displayHeadline = focusedSlot ? cardHeadline : previewFields?.headline ?? "";
  const displayDek = focusedSlot ? cardDek : previewFields?.dek ?? "";
  const cardEditable = focusedSlot !== null;

  function updateHeroImage(next: EditorImageState | null) {
    setHeroImage((prev) => {
      if (prev?.url.startsWith("blob:") && prev.url !== next?.url) URL.revokeObjectURL(prev.url);
      return next;
    });
  }

  const clearCardEdit = useCallback(() => {
    setFocusedSlot(null);
  }, []);

  function focusSlot(slot: HomepageStudioSlot) {
    if (focusedSlot === slot) {
      clearCardEdit();
      return;
    }
    const fields = resolveSlotFields(slot);
    setFocusedSlot(slot);
    setSelectedSlot(slot);
    setPlacementSlot(slot);
    if (fields) {
      setCardHeadline(fields.headline);
      setCardDek(fields.dek);
      setCardStoryId(fields.storyId);
      setCardBaseline({ ...fields, slot });
      if (fields.storyId === draftStoryId || fields.storyId === articleId) {
        setHeadline(fields.headline);
        setDek(fields.dek);
      }
    }
  }

  function handleCardHeadlineChange(value: string) {
    setCardHeadline(value);
    if (cardStoryId === draftStoryId || cardStoryId === articleId) setHeadline(value);
  }

  function handleCardDekChange(value: string) {
    setCardDek(value);
    if (cardStoryId === draftStoryId || cardStoryId === articleId) setDek(value);
  }

  function handleWriteClick() {
    const targetStoryId = cardStoryId ?? articleId;
    if (targetStoryId && targetStoryId !== articleId) {
      router.push(`/desk/newsroom/editor?story=${targetStoryId}&mode=write`);
      return;
    }
    setStudioView("write");
  }

  const wordCount = useMemo(() => countWords([headline, dek, body].join(" ")), [headline, dek, body]);

  const statusDisplay = useMemo(() => {
    if (loading) return { label: defaultDraft.status, tone: defaultDraft.tone };
    const mapped = deskStatusFromArticle(articleStatus);
    if (mapped.label === "DRAFT") return { label: "Live Studio", tone: mapped.tone };
    return mapped;
  }, [loading, articleStatus]);

  const cardDirty = Boolean(
    focusedSlot &&
      cardBaseline &&
      (cardHeadline !== cardBaseline.headline || cardDek !== cardBaseline.dek),
  );

  const draftDirty = Boolean(
    headline !== savedDraftBaseline.headline ||
      dek !== savedDraftBaseline.dek ||
      body !== savedDraftBaseline.body,
  );

  const hasUnsavedChanges = cardDirty || draftDirty;

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

  async function saveCardFields(): Promise<boolean> {
    if (!focusedSlot || !cardStoryId || !cardDirty) return true;

    setSaving(true);
    setSaveError(null);

    const title = cardHeadline.trim() || "Untitled draft";
    const excerpt = cardDek.trim() || null;
    const isCurrentDraft = cardStoryId === draftStoryId || cardStoryId === articleId;

    let result;
    if (isCurrentDraft) {
      setHeadline(title);
      setDek(excerpt ?? "");
      result = await saveArticleDraftClient(articleId, {
        ...buildPayload(),
        title,
        excerpt,
        status: "draft",
        published_at: null,
      });
    } else {
      result = await updateArticleClient(cardStoryId, { title, excerpt });
    }

    setSaving(false);

    if (result.error) {
      setSaveError(result.error.message);
      return false;
    }

    if (result.data) {
      setCardBaseline({ slot: focusedSlot, storyId: cardStoryId, headline: title, dek: excerpt ?? "" });
      if (isCurrentDraft) {
        setArticleId(result.data.id);
        setArticleStatus(result.data.status);
        setSavedDraftBaseline({ headline: title, dek: excerpt ?? "", body });
        if (!articleId) {
          router.replace(`/desk/newsroom/editor?story=${result.data.id}`);
        }
      }
      setLastSavedAt(new Date());
      await refreshPublishedBriefings();
    }

    return true;
  }

  async function persist(action: "draft" | "review" | "publish"): Promise<boolean> {
    if (action === "draft" && cardDirty) {
      return saveCardFields();
    }

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
      setSavedDraftBaseline({
        headline: result.data.title,
        dek: result.data.excerpt ?? "",
        body: result.data.body ?? "",
      });

      if (!articleId) {
        router.replace(`/desk/newsroom/editor?story=${result.data.id}`);
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
          {hasUnsavedChanges ? (
            <span className="font-robinhood text-[10px] uppercase tracking-wider text-[#8d6f4d]">Unsaved changes</span>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {studioView === "write" ? (
            <button
              type="button"
              onClick={() => setStudioView("homepage")}
              className={clsx(
                "rounded border px-4 py-2 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                deskPaper.border,
                deskPaper.inkMeta,
                deskPaper.hover,
              )}
            >
              ← Homepage
            </button>
          ) : null}
          <button
            type="button"
            disabled={saving || !hasUnsavedChanges}
            onClick={() => void persist("draft")}
            className={clsx(
              "rounded border px-4 py-2 font-robinhood text-[10px] uppercase tracking-wider transition-colors disabled:opacity-50",
              hasUnsavedChanges
                ? "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]"
                : clsx(deskPaper.border, deskPaper.inkMeta, deskPaper.hover),
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
          {studioView === "homepage" ? (
            <LiveStudioHomepage
              storyId={articleId}
              headline={headline}
              dek={dek}
              section={section}
              heroImage={heroImage}
              cardHeadline={displayHeadline}
              cardDek={displayDek}
              cardEditable={cardEditable}
              onCardHeadlineChange={handleCardHeadlineChange}
              onCardDekChange={handleCardDekChange}
              selectedSlot={selectedSlot}
              placementSlot={placementSlot}
              hoveredSlot={hoveredSlot}
              onSelectSlot={focusSlot}
              onHoverSlot={handleHoverSlot}
              onWriteClick={handleWriteClick}
              onClearCardEdit={clearCardEdit}
              publishedBriefings={previewBriefings}
            />
          ) : (
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
          )}
        </div>

        <aside className="space-y-4">
          <EditorImagePanel image={heroImage} onImageChange={updateHeroImage} />

          {studioView === "homepage" ? (
            <StudioPlacementPanel
              placementSlot={placementSlot}
              selectedSlot={selectedSlot}
              hoveredSlot={hoveredSlot}
              onSelectSlot={focusSlot}
              onHoverSlot={handleHoverSlot}
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

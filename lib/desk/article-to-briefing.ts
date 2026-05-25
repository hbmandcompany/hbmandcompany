import type { Article } from "@/lib/supabase/types";
import type { NewsroomBriefing } from "@/lib/newsroomBriefings";
import { formatBriefingDateLongLocal } from "@/lib/newsroomBriefings";
import type { MagazineStory } from "@/components/MagazineStoryCards";
import type { WireBrief } from "@/components/MagazineHomeLayouts";

export type PublicArticleBriefing = NewsroomBriefing & {
  heroImageUrl?: string | null;
};

function formatArticleDate(iso: string | null): string {
  if (!iso) return "—";
  const datePart = iso.split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    return formatBriefingDateLongLocal(datePart);
  }
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function articleToBriefing(article: Article): PublicArticleBriefing {
  const bodyParagraphs = article.body
    ? article.body.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
    : [];

  return {
    id: article.id,
    desk: "Desk",
    section: "News",
    headline: article.title,
    dek: article.excerpt ?? "",
    byline: "HBM Editorial",
    publishedAt: formatArticleDate(article.published_at ?? article.updated_at),
    lede: article.excerpt ?? bodyParagraphs[0] ?? "",
    body: bodyParagraphs.length > 0 ? bodyParagraphs : article.body ? [article.body] : [],
    metrics: [],
    related: [],
    heroImageUrl: article.hero_image_url,
  };
}

export function getLatestBriefingUpdatedAt(briefings: NewsroomBriefing[]): string {
  if (briefings.length === 0) return new Date().toISOString().split("T")[0];
  const first = briefings[0];
  const parsed = Date.parse(first.publishedAt);
  if (!Number.isNaN(parsed)) {
    return new Date(parsed).toISOString().split("T")[0];
  }
  return new Date().toISOString().split("T")[0];
}

export function briefingToMagazineStory(
  briefing: PublicArticleBriefing,
  imageSrc?: string,
): MagazineStory {
  return {
    storyId: briefing.id,
    category: briefing.section,
    headline: briefing.headline,
    dek: briefing.dek,
    dateline: briefing.publishedAt,
    pixelVariant: "lightrain",
    imageSrc: imageSrc ?? briefing.heroImageUrl ?? undefined,
    imageAlt: briefing.headline,
  };
}

export function briefingToWireBrief(briefing: NewsroomBriefing): WireBrief {
  return {
    storyId: briefing.id,
    category: briefing.section,
    headline: briefing.headline,
    dek: briefing.dek,
    dateline: briefing.publishedAt,
  };
}

export function getBriefingByIdFromList(
  briefings: NewsroomBriefing[],
  id: string,
): NewsroomBriefing | undefined {
  return briefings.find((b) => b.id === id);
}

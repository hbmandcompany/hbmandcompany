import {
  articleToBriefing,
  getLatestBriefingUpdatedAt,
  type PublicArticleBriefing,
} from "@/lib/desk/article-to-briefing";
import { BRIEFING_UPDATED_AT, NEWSROOM_BRIEFINGS } from "@/lib/newsroomBriefings";
import { getPublishedArticles } from "./articles.server";

export type PublicBriefingsResult = {
  briefings: PublicArticleBriefing[];
  updatedAt: string;
  source: "supabase" | "fallback";
  error: string | null;
};

/** Published articles for the public newspaper and homepage hero, with mock fallback when empty. */
export async function getPublicBriefings(): Promise<PublicBriefingsResult> {
  const result = await getPublishedArticles();
  const fromDb = (result.data ?? []).map(articleToBriefing);

  if (fromDb.length > 0) {
    return {
      briefings: fromDb,
      updatedAt: getLatestBriefingUpdatedAt(fromDb),
      source: "supabase",
      error: result.error?.message ?? null,
    };
  }

  return {
    briefings: NEWSROOM_BRIEFINGS.map((b) => ({ ...b, heroImageUrl: null })),
    updatedAt: BRIEFING_UPDATED_AT,
    source: "fallback",
    error: result.error?.message ?? null,
  };
}

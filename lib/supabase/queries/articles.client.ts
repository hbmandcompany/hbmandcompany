import { createClient } from "../client";
import { queryPublishedArticles, wrapQueryError } from "./articles.shared";
import type { PublishedArticlesResult } from "../types";

/** Client-side: same query for browser connection tests and interactive UI. */
export async function fetchPublishedArticlesClient(): Promise<PublishedArticlesResult> {
  try {
    const supabase = createClient();
    return queryPublishedArticles(supabase);
  } catch (error) {
    return wrapQueryError("fetchPublishedArticlesClient", error);
  }
}

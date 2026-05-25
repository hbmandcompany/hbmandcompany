import { createClient } from "../server";
import { queryPublishedArticles, wrapQueryError } from "./articles.shared";
import type { PublishedArticlesResult } from "../types";

/** Server-side: fetch all published articles, newest first. */
export async function getPublishedArticles(): Promise<PublishedArticlesResult> {
  try {
    const supabase = createClient();
    return queryPublishedArticles(supabase);
  } catch (error) {
    return wrapQueryError("getPublishedArticles", error);
  }
}

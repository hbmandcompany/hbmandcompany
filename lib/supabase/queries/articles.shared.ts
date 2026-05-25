import type { SupabaseClient } from "@supabase/supabase-js";
import {
  SupabaseQueryError,
  formatSupabaseError,
  logSupabaseDiagnostic,
} from "../errors";
import type { Article, Database, PublishedArticlesResult } from "../types";

const PUBLISHED_ARTICLES_SELECT = "*";

export async function queryPublishedArticles(
  supabase: SupabaseClient<Database>,
): Promise<PublishedArticlesResult> {
  const { data, error, count } = await supabase
    .from("articles")
    .select(PUBLISHED_ARTICLES_SELECT, { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    logSupabaseDiagnostic("getPublishedArticles", error);
    return {
      data: null,
      error: new SupabaseQueryError("Failed to load published articles.", error),
      count: 0,
    };
  }

  return {
    data: (data ?? []) as Article[],
    error: null,
    count: count ?? data?.length ?? 0,
  };
}

export function wrapQueryError(scope: string, error: unknown): PublishedArticlesResult {
  logSupabaseDiagnostic(scope, error);
  return {
    data: null,
    error: new SupabaseQueryError(formatSupabaseError(error)),
    count: 0,
  };
}

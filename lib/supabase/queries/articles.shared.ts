import type { PostgrestError } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  SupabaseQueryError,
  formatSupabaseError,
  logSupabaseDiagnostic,
} from "../errors";
import type { Article, ArticleStatus, Database, PublishedArticlesResult } from "../types";

const ARTICLE_SELECT = "*";

export type ArticlesResult = {
  data: Article[] | null;
  error: SupabaseQueryError | null;
  count: number;
};

export type ArticleResult = {
  data: Article | null;
  error: SupabaseQueryError | null;
};

export type ArticleUpsertPayload = {
  title: string;
  slug: string;
  excerpt?: string | null;
  body?: string | null;
  status: ArticleStatus;
  published_at?: string | null;
  hero_image_url?: string | null;
  author_id?: string | null;
};

function articlesError(message: string, pgError?: PostgrestError | null): ArticlesResult {
  if (pgError) logSupabaseDiagnostic("articles", pgError);
  return {
    data: null,
    error: new SupabaseQueryError(message, pgError),
    count: 0,
  };
}

function articleError(message: string, pgError?: PostgrestError | null): ArticleResult {
  if (pgError) logSupabaseDiagnostic("article", pgError);
  return {
    data: null,
    error: new SupabaseQueryError(message, pgError),
  };
}

export async function queryPublishedArticles(
  supabase: SupabaseClient<Database>,
): Promise<PublishedArticlesResult> {
  const { data, error, count } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT, { count: "exact" })
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    return articlesError("Failed to load published articles.", error);
  }

  return {
    data: (data ?? []) as Article[],
    error: null,
    count: count ?? data?.length ?? 0,
  };
}

/** Desk queue: drafts and in-review articles, newest activity first. */
export async function queryDeskQueueArticles(
  supabase: SupabaseClient<Database>,
): Promise<ArticlesResult> {
  const { data, error, count } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT, { count: "exact" })
    .in("status", ["draft", "review"])
    .order("updated_at", { ascending: false });

  if (error) {
    return articlesError("Failed to load desk queue.", error);
  }

  return {
    data: (data ?? []) as Article[],
    error: null,
    count: count ?? data?.length ?? 0,
  };
}

/** Archive published history. */
export async function queryArchivePublishedArticles(
  supabase: SupabaseClient<Database>,
): Promise<ArticlesResult> {
  const { data, error, count } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT, { count: "exact" })
    .in("status", ["published", "archived"])
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) {
    return articlesError("Failed to load published archive.", error);
  }

  return {
    data: (data ?? []) as Article[],
    error: null,
    count: count ?? data?.length ?? 0,
  };
}

/** Archive submissions pipeline: drafts and in-review. */
export async function queryArchivePipelineArticles(
  supabase: SupabaseClient<Database>,
): Promise<ArticlesResult> {
  const { data, error, count } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT, { count: "exact" })
    .in("status", ["draft", "review"])
    .order("updated_at", { ascending: false });

  if (error) {
    return articlesError("Failed to load submission archive.", error);
  }

  return {
    data: (data ?? []) as Article[],
    error: null,
    count: count ?? data?.length ?? 0,
  };
}

export async function getArticleById(
  supabase: SupabaseClient<Database>,
  id: string,
): Promise<ArticleResult> {
  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return articleError("Failed to load article.", error);
  }

  return {
    data: (data as Article | null) ?? null,
    error: null,
  };
}

export async function createArticle(
  supabase: SupabaseClient<Database>,
  payload: ArticleUpsertPayload,
): Promise<ArticleResult> {
  const { data, error } = await supabase
    .from("articles")
    .insert({
      title: payload.title,
      slug: payload.slug,
      excerpt: payload.excerpt ?? null,
      body: payload.body ?? null,
      status: payload.status,
      published_at: payload.published_at ?? null,
      hero_image_url: payload.hero_image_url ?? null,
      author_id: payload.author_id ?? null,
      updated_at: new Date().toISOString(),
    })
    .select(ARTICLE_SELECT)
    .single();

  if (error) {
    return articleError("Failed to create article.", error);
  }

  return { data: data as Article, error: null };
}

export async function updateArticleById(
  supabase: SupabaseClient<Database>,
  id: string,
  payload: Partial<ArticleUpsertPayload>,
): Promise<ArticleResult> {
  const { data, error } = await supabase
    .from("articles")
    .update({
      ...payload,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(ARTICLE_SELECT)
    .single();

  if (error) {
    return articleError("Failed to update article.", error);
  }

  return { data: data as Article, error: null };
}

export function wrapQueryError(scope: string, error: unknown): PublishedArticlesResult {
  logSupabaseDiagnostic(scope, error);
  return {
    data: null,
    error: new SupabaseQueryError(formatSupabaseError(error)),
    count: 0,
  };
}

import { createClient } from "../client";
import { wrapQueryError } from "./articles.shared";
import type { ArticleUpsertPayload, ArticleResult, ArticlesResult } from "./articles.shared";
import {
  createArticle,
  getArticleById,
  queryArchivePipelineArticles,
  queryArchivePublishedArticles,
  queryDeskQueueArticles,
  queryPublishedArticles,
  updateArticleById,
} from "./articles.shared";

/** Client-side: fetch published articles for browser connection tests and interactive UI. */
export async function fetchPublishedArticlesClient() {
  try {
    const supabase = createClient();
    return queryPublishedArticles(supabase);
  } catch (error) {
    return wrapQueryError("fetchPublishedArticlesClient", error);
  }
}

export async function fetchDeskQueueArticlesClient(): Promise<ArticlesResult> {
  try {
    const supabase = createClient();
    return queryDeskQueueArticles(supabase);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("fetchDeskQueueArticlesClient", error).error,
      count: 0,
    };
  }
}

export async function fetchArchivePublishedClient(): Promise<ArticlesResult> {
  try {
    const supabase = createClient();
    return queryArchivePublishedArticles(supabase);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("fetchArchivePublishedClient", error).error,
      count: 0,
    };
  }
}

export async function fetchArchivePipelineClient(): Promise<ArticlesResult> {
  try {
    const supabase = createClient();
    return queryArchivePipelineArticles(supabase);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("fetchArchivePipelineClient", error).error,
      count: 0,
    };
  }
}

export async function fetchArticleByIdClient(id: string): Promise<ArticleResult> {
  try {
    const supabase = createClient();
    return getArticleById(supabase, id);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("fetchArticleByIdClient", error).error,
    };
  }
}

export async function saveArticleDraftClient(
  id: string | null,
  payload: ArticleUpsertPayload,
): Promise<ArticleResult> {
  try {
    const supabase = createClient();
    if (id) {
      return updateArticleById(supabase, id, payload);
    }
    return createArticle(supabase, payload);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("saveArticleDraftClient", error).error,
    };
  }
}

export async function publishArticleClient(
  id: string | null,
  payload: ArticleUpsertPayload,
): Promise<ArticleResult> {
  return saveArticleDraftClient(id, {
    ...payload,
    status: "published",
    published_at: new Date().toISOString(),
  });
}

export async function submitArticleForReviewClient(
  id: string | null,
  payload: ArticleUpsertPayload,
): Promise<ArticleResult> {
  return saveArticleDraftClient(id, {
    ...payload,
    status: "review",
    published_at: null,
  });
}

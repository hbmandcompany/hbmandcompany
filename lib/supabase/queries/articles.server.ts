import { createClient } from "../server";
import { wrapQueryError } from "./articles.shared";
import {
  getArticleById,
  queryArchivePipelineArticles,
  queryArchivePublishedArticles,
  queryDeskQueueArticles,
  queryPublishedArticles,
} from "./articles.shared";

/** Server-side: fetch all published articles, newest first. */
export async function getPublishedArticles() {
  try {
    const supabase = createClient();
    return queryPublishedArticles(supabase);
  } catch (error) {
    return wrapQueryError("getPublishedArticles", error);
  }
}

export async function getDeskQueueArticles() {
  try {
    const supabase = createClient();
    return queryDeskQueueArticles(supabase);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("getDeskQueueArticles", error).error,
      count: 0,
    };
  }
}

export async function getArchivePublishedArticles() {
  try {
    const supabase = createClient();
    return queryArchivePublishedArticles(supabase);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("getArchivePublishedArticles", error).error,
      count: 0,
    };
  }
}

export async function getArchivePipelineArticles() {
  try {
    const supabase = createClient();
    return queryArchivePipelineArticles(supabase);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("getArchivePipelineArticles", error).error,
      count: 0,
    };
  }
}

export async function getArticleByIdServer(id: string) {
  try {
    const supabase = createClient();
    return getArticleById(supabase, id);
  } catch (error) {
    return {
      data: null,
      error: wrapQueryError("getArticleByIdServer", error).error,
    };
  }
}

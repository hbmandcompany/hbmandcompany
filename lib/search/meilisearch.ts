import type { GroupedSearchResults } from "@/components/desk/global-search/types";
import { searchMockIndex } from "./mock-index";

type MeilisearchHit = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  meta?: string;
  type: "article" | "document" | "user" | "job";
};

type MeilisearchMultiSearchResponse = {
  results: Array<{
    indexUid: string;
    hits: MeilisearchHit[];
  }>;
};

const GROUP_BY_TYPE: Record<MeilisearchHit["type"], keyof GroupedSearchResults> = {
  article: "articles",
  document: "documents",
  user: "users",
  job: "jobs",
};

export async function queryMeilisearch(query: string): Promise<GroupedSearchResults> {
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_API_KEY;

  if (!host || !apiKey) {
    return searchMockIndex(query);
  }

  const res = await fetch(`${host.replace(/\/$/, "")}/multi-search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      queries: [
        { indexUid: "articles", q: query, limit: 5 },
        { indexUid: "documents", q: query, limit: 5 },
        { indexUid: "users", q: query, limit: 5 },
        { indexUid: "jobs", q: query, limit: 5 },
      ],
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Meilisearch query failed", res.status);
    return searchMockIndex(query);
  }

  const data = (await res.json()) as MeilisearchMultiSearchResponse;
  const grouped: GroupedSearchResults = { articles: [], documents: [], users: [], jobs: [] };

  for (const result of data.results) {
    for (const hit of result.hits) {
      const group = GROUP_BY_TYPE[hit.type];
      grouped[group].push({
        id: hit.id,
        title: hit.title,
        subtitle: hit.subtitle,
        href: hit.href,
        meta: hit.meta,
      });
    }
  }

  return grouped;
}

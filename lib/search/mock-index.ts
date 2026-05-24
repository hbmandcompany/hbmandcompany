import type { GroupedSearchResults } from "@/components/desk/global-search/types";

type IndexRecord = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  meta?: string;
  group: keyof GroupedSearchResults;
  tokens: string[];
};

const INDEX: IndexRecord[] = [
  {
    id: "a1",
    group: "articles",
    title: "The Federal Reserve's Digital Dollar and What It Means for Stablecoin Operators",
    subtitle: "Finance · Draft",
    href: "/desk/newsroom/editor",
    meta: "1,240 words",
    tokens: ["federal", "reserve", "digital", "dollar", "stablecoin", "finance"],
  },
  {
    id: "a2",
    group: "articles",
    title: "Inside the Collapse of a Dallas-Based Crypto Hedge Fund",
    subtitle: "Investigations · Draft",
    href: "/desk/newsroom/editor",
    meta: "3,100 words",
    tokens: ["dallas", "crypto", "hedge", "fund", "collapse", "investigation"],
  },
  {
    id: "a3",
    group: "articles",
    title: "Base Layer Infrastructure and the Race to DeFi Dominance",
    subtitle: "Technology · In review",
    href: "/desk/newsroom/editor",
    tokens: ["base", "layer", "defi", "infrastructure", "technology"],
  },
  {
    id: "d1",
    group: "documents",
    title: "Editorial Style Guide — 2026",
    subtitle: "Documents",
    href: "/desk/documents",
    tokens: ["style", "guide", "editorial", "documents"],
  },
  {
    id: "d2",
    group: "documents",
    title: "Treasury Risk Review — Q2 Brief",
    subtitle: "Documents",
    href: "/desk/documents",
    tokens: ["treasury", "risk", "review", "brief"],
  },
  {
    id: "u1",
    group: "users",
    title: "Elena Vasquez",
    subtitle: "Editor in Chief",
    href: "/desk/directory",
    tokens: ["elena", "vasquez", "editor", "chief"],
  },
  {
    id: "u2",
    group: "users",
    title: "Marcus Lin",
    subtitle: "Managing Editor",
    href: "/desk/directory",
    tokens: ["marcus", "lin", "managing", "editor"],
  },
  {
    id: "j1",
    group: "jobs",
    title: "Finish Federal Reserve digital dollar lede",
    subtitle: "Due today",
    href: "/desk/newsroom",
    tokens: ["federal", "reserve", "lede", "due", "today"],
  },
  {
    id: "j2",
    group: "jobs",
    title: "Review Dallas hedge fund conflict disclosure",
    subtitle: "Legal flagged",
    href: "/desk/newsroom",
    tokens: ["dallas", "hedge", "conflict", "disclosure", "legal"],
  },
];

function scoreRecord(record: IndexRecord, terms: string[]): number {
  let score = 0;
  for (const term of terms) {
    if (record.title.toLowerCase().includes(term)) score += 3;
    if (record.subtitle?.toLowerCase().includes(term)) score += 2;
    if (record.tokens.some((t) => t.includes(term) || term.includes(t))) score += 2;
  }
  return score;
}

export function searchMockIndex(query: string): GroupedSearchResults {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  const empty: GroupedSearchResults = { articles: [], documents: [], users: [], jobs: [] };
  if (!terms.length) return empty;

  const scored = INDEX.map((record) => ({ record, score: scoreRecord(record, terms) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);

  for (const { record } of scored) {
    empty[record.group].push({
      id: record.id,
      title: record.title,
      subtitle: record.subtitle,
      href: record.href,
      meta: record.meta,
    });
  }

  return empty;
}

export function getMockRecordsForAi(query: string) {
  const results = searchMockIndex(query);
  return [
    ...results.articles.map((r) => ({ ...r, type: "article" as const })),
    ...results.documents.map((r) => ({ ...r, type: "document" as const })),
  ].slice(0, 4);
}

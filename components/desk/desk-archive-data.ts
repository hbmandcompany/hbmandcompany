import type { DeskStatusTone } from "./StatusPill";

export type ArchiveHistoryItem = {
  id: string;
  headline: string;
  section: string;
  words: string;
  published: string;
  views: string;
  status: "Published" | "Retired";
  tone: DeskStatusTone;
};

export type ArchiveSubmissionItem = {
  id: string;
  headline: string;
  section: string;
  submitted: string;
  reviewer: string;
  status: "Pending" | "In review" | "Returned" | "Approved";
  tone: DeskStatusTone;
};

export const archiveHistory: ArchiveHistoryItem[] = [
  {
    id: "h1",
    headline: "Texas Capital Is Moving On-Chain and the State Knows It",
    section: "Texas Business",
    words: "900 words",
    published: "May 12, 2026",
    views: "28.4K",
    status: "Published",
    tone: "green",
  },
  {
    id: "h2",
    headline: "How Municipal Governments Are Experimenting With Blockchain-Based Toll Systems",
    section: "Infrastructure",
    words: "1,600 words",
    published: "May 3, 2026",
    views: "16.2K",
    status: "Published",
    tone: "green",
  },
  {
    id: "h3",
    headline: "The Quiet Return of Regional Banks to Tokenized Deposits",
    section: "Finance",
    words: "1,100 words",
    published: "Apr 18, 2026",
    views: "11.8K",
    status: "Published",
    tone: "green",
  },
  {
    id: "h4",
    headline: "Why Dallas Became the Default HQ for Crypto Market Makers",
    section: "Texas Business",
    words: "850 words",
    published: "Mar 29, 2026",
    views: "9.6K",
    status: "Retired",
    tone: "neutral",
  },
];

export const archiveSubmissions: ArchiveSubmissionItem[] = [
  {
    id: "sub1",
    headline: "The Federal Reserve's Digital Dollar and What It Means for Stablecoin Operators",
    section: "Finance",
    submitted: "May 20, 2026",
    reviewer: "Elena Vasquez",
    status: "Pending",
    tone: "amber",
  },
  {
    id: "sub2",
    headline: "Inside the Collapse of a Dallas-Based Crypto Hedge Fund",
    section: "Investigations",
    submitted: "May 18, 2026",
    reviewer: "Marcus Lin",
    status: "In review",
    tone: "blue",
  },
  {
    id: "sub3",
    headline: "Base Layer Infrastructure and the Race to DeFi Dominance",
    section: "Technology",
    submitted: "May 15, 2026",
    reviewer: "Sophie Maier",
    status: "Returned",
    tone: "red",
  },
  {
    id: "sub4",
    headline: "The New Oil: How Sovereign Wealth Funds Are Positioning in Tokenized Assets",
    section: "Markets",
    submitted: "May 2, 2026",
    reviewer: "Elena Vasquez",
    status: "Approved",
    tone: "green",
  },
];

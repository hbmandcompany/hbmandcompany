import type { DeskStatusTone } from "./StatusPill";

export type StoryTab = "Due Today" | "Due Tomorrow" | "This Week" | "Next Week";

export type StoryRow = {
  id: string;
  status: string;
  tone: DeskStatusTone;
  headline: string;
  section: string;
  words: string;
  meta: string;
  dueWhen?: "today" | "tomorrow";
};

export const storyTabs: StoryTab[] = ["Due Today", "Due Tomorrow", "This Week", "Next Week"];

export const stories: StoryRow[] = [
  {
    id: "s1",
    status: "DRAFT",
    tone: "neutral",
    headline: "The Federal Reserve's Digital Dollar and What It Means for Stablecoin Operators",
    section: "Finance",
    words: "1,240 words",
    meta: "Last edited 2 hours ago",
    dueWhen: "today",
  },
  {
    id: "s2",
    status: "DRAFT",
    tone: "neutral",
    headline: "Inside the Collapse of a Dallas-Based Crypto Hedge Fund",
    section: "Investigations",
    words: "3,100 words",
    meta: "Last edited yesterday",
    dueWhen: "tomorrow",
  },
  {
    id: "s3",
    status: "IN REVIEW",
    tone: "amber",
    headline: "Base Layer Infrastructure and the Race to DeFi Dominance",
    section: "Technology",
    words: "2,200 words",
    meta: "Submitted 3 days ago",
  },
  {
    id: "s4",
    status: "SCHEDULED",
    tone: "blue",
    headline: "The New Oil: How Sovereign Wealth Funds Are Positioning in Tokenized Assets",
    section: "Markets",
    words: "1,800 words",
    meta: "Publishing June 1",
  },
  {
    id: "s5",
    status: "PUBLISHED",
    tone: "green",
    headline: "Texas Capital Is Moving On-Chain and the State Knows It",
    section: "Texas Business",
    words: "900 words",
    meta: "Published May 12",
  },
  {
    id: "s6",
    status: "PUBLISHED",
    tone: "green",
    headline: "How Municipal Governments Are Experimenting With Blockchain-Based Toll Systems",
    section: "Infrastructure",
    words: "1,600 words",
    meta: "Published May 3",
  },
];

export type CalendarDeadline = {
  id: string;
  month: number;
  date: number;
  title: string;
  section: string;
};

export const storyDeadlines: CalendarDeadline[] = [
  { id: "d1", month: 5, date: 25, title: "The Federal Reserve's Digital Dollar", section: "Finance" },
  { id: "d2", month: 5, date: 28, title: "Dallas Crypto Hedge Fund Collapse", section: "Investigations" },
  { id: "d3", month: 6, date: 1, title: "Sovereign Wealth Funds in Tokenized Assets", section: "Markets" },
  { id: "d4", month: 6, date: 8, title: "Municipal Blockchain Toll Systems (Revision)", section: "Infrastructure" },
];

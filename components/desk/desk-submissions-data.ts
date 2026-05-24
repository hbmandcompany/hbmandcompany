import type { DeskStatusTone } from "./StatusPill";

export type DeskSubmissionItem = {
  id: string;
  storyId: string;
  headline: string;
  section: string;
  submitted: string;
  reviewer: string;
  status: "Pending" | "In review" | "Returned" | "Approved";
  tone: DeskStatusTone;
  note?: string;
};

/** Active filings on the writer desk — in editorial pipeline */
export const deskSubmissions: DeskSubmissionItem[] = [
  {
    id: "sub1",
    storyId: "s1",
    headline: "The Federal Reserve's Digital Dollar and What It Means for Stablecoin Operators",
    section: "Finance",
    submitted: "May 20, 2026",
    reviewer: "Elena Vasquez",
    status: "Pending",
    tone: "amber",
    note: "Awaiting initial editor read.",
  },
  {
    id: "sub2",
    storyId: "s2",
    headline: "Inside the Collapse of a Dallas-Based Crypto Hedge Fund",
    section: "Investigations",
    submitted: "May 18, 2026",
    reviewer: "Marcus Lin",
    status: "In review",
    tone: "blue",
    note: "Legal review in progress — conflict of interest disclosure required.",
  },
  {
    id: "sub3",
    storyId: "s3",
    headline: "Base Layer Infrastructure and the Race to DeFi Dominance",
    section: "Technology",
    submitted: "May 15, 2026",
    reviewer: "Sophie Maier",
    status: "Returned",
    tone: "red",
    note: "Two AP Style violations. Revise paragraphs 4 and 9, then resubmit.",
  },
  {
    id: "sub4",
    storyId: "s4",
    headline: "The New Oil: How Sovereign Wealth Funds Are Positioning in Tokenized Assets",
    section: "Markets",
    submitted: "May 2, 2026",
    reviewer: "Elena Vasquez",
    status: "Approved",
    tone: "green",
    note: "Clears for scheduling — publish June 1.",
  },
];

export function submissionsNeedingAction(items: DeskSubmissionItem[] = deskSubmissions) {
  return items.filter((s) => s.status === "Pending" || s.status === "In review" || s.status === "Returned").length;
}

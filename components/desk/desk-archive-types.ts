import type { DeskStatusTone } from "./StatusPill";

export type ArchiveHistoryItem = {
  id: string;
  headline: string;
  section: string;
  words: string;
  published: string;
  weight: string | null;
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

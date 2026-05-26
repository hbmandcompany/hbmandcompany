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

export function submissionsNeedingAction(items: DeskSubmissionItem[]) {
  return items.filter((s) => s.status === "Pending" || s.status === "In review" || s.status === "Returned").length;
}

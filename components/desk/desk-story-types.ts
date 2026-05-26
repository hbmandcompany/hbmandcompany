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

export type CalendarDeadline = {
  id: string;
  month: number;
  date: number;
  title: string;
  section: string;
};

export const storyDeadlines: CalendarDeadline[] = [];

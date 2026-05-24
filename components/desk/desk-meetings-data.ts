import type { DeskStatusTone } from "./StatusPill";

export type MeetingItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  host: string;
  type: "Standup" | "Review" | "Sync" | "Pitch";
  tone: DeskStatusTone;
  room: string;
  status: "live" | "upcoming" | "past";
};

export const meetings: MeetingItem[] = [
  {
    id: "m1",
    title: "Editorial standup — newsroom",
    date: "May 23, 2026",
    time: "11:00 AM",
    duration: "30 min",
    host: "Elena Vasquez",
    type: "Standup",
    tone: "gold",
    room: "Newsroom · Room A",
    status: "live",
  },
  {
    id: "m2",
    title: "Pitch review — Federal Reserve digital dollar",
    date: "May 24, 2026",
    time: "2:00 PM",
    duration: "45 min",
    host: "Elena Vasquez",
    type: "Pitch",
    tone: "blue",
    room: "Editorial · Room C",
    status: "upcoming",
  },
  {
    id: "m3",
    title: "Finance desk sync",
    date: "May 26, 2026",
    time: "10:00 AM",
    duration: "30 min",
    host: "Marcus Lin",
    type: "Sync",
    tone: "blue",
    room: "Finance · Room B",
    status: "upcoming",
  },
  {
    id: "m4",
    title: "Weekly filing review",
    date: "May 28, 2026",
    time: "3:30 PM",
    duration: "60 min",
    host: "Sophie Maier",
    type: "Review",
    tone: "amber",
    room: "Editorial · Room A",
    status: "upcoming",
  },
  {
    id: "m5",
    title: "Story kickoff — Dallas hedge fund investigation",
    date: "May 20, 2026",
    time: "9:30 AM",
    duration: "45 min",
    host: "Elena Vasquez",
    type: "Pitch",
    tone: "green",
    room: "Investigations · Room D",
    status: "past",
  },
  {
    id: "m6",
    title: "Contributor onboarding check-in",
    date: "May 15, 2026",
    time: "1:00 PM",
    duration: "30 min",
    host: "Sophie Maier",
    type: "Sync",
    tone: "neutral",
    room: "Editorial · Room C",
    status: "past",
  },
];

import type { Metadata } from "next";
import NewsroomContent from "./NewsroomContent";
import { getBriefingById } from "@/lib/newsroomBriefings";

export const metadata: Metadata = {
  title: "News room",
  description:
    "HBM & Company news room — desk briefings on-chain rails, archival programs, and governance cadence. Read the same signals surfaced on the home carousel.",
  alternates: {
    canonical: "https://hbmandcompany.com/newsroom",
  },
  openGraph: {
    title: "News room — HBM & Company",
    description: "Desk briefings and governance context from the house.",
    url: "https://hbmandcompany.com/newsroom",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — News room" }],
  },
  twitter: {
    title: "News room — HBM & Company",
    description: "Desk briefings and governance context from the house.",
    images: ["/og-image.png"],
  },
};

type Search = { story?: string | string[] };

export default function NewsroomPage({ searchParams }: { searchParams: Search }) {
  const raw = searchParams.story;
  const id = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  const selectedId = id && getBriefingById(id) ? id : null;

  return <NewsroomContent selectedId={selectedId} />;
}

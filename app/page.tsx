import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";
import { getPublicBriefings } from "@/lib/supabase/queries/briefings.server";
import { getPublicTickerHeadlines } from "@/lib/supabase/queries/ticker.server";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HBM & Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default async function Page() {
  const [{ briefings, source }, tickerHeadlines] = await Promise.all([
    getPublicBriefings(),
    getPublicTickerHeadlines(),
  ]);

  return (
    <HomePageClient
      heroBriefings={source === "supabase" ? briefings : null}
      tickerHeadlines={tickerHeadlines}
    />
  );
}

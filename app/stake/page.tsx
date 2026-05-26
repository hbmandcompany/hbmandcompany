import type { Metadata } from "next";
import SubscriptionContent from "../subscription/SubscriptionContent";
import { OG_IMAGE, SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Stake: Premium Membership",
  description:
    "Stake is the premium membership for HBM & Company — ad-free finance and crypto news, early desk access, and exclusive investigations from $9.99/month.",
  alternates: { canonical: `${SITE_URL}/stake` },
  openGraph: {
    title: "Stake — HBM & Company",
    description:
      "Premium membership for ad-free editorial, early briefings, and exclusive finance, crypto, and infrastructure reporting.",
    url: `${SITE_URL}/stake`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HBM & Company — Stake" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stake — HBM & Company",
    description: "Premium membership for ad-free news and exclusive desk reporting.",
    images: [OG_IMAGE],
  },
};

export default function StakePage() {
  return <SubscriptionContent heading="Stake: Premium Membership" />;
}

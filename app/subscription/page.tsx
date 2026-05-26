import type { Metadata } from "next";
import SubscriptionContent from "./SubscriptionContent";
import { DEFAULT_DESCRIPTION, OG_IMAGE, SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Subscription",
  description:
    "HBM & Company Subscription — ad-free editorial, early desk briefings, and exclusive finance, crypto, and infrastructure reporting from $9.99/month.",
  alternates: { canonical: `${SITE_URL}/subscription` },
  openGraph: {
    title: "Subscription — HBM & Company",
    description: DEFAULT_DESCRIPTION,
    url: `${SITE_URL}/subscription`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HBM & Company — Subscription" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subscription — HBM & Company",
    description: "Premium membership for ad-free news, early access, and exclusive investigations.",
    images: [OG_IMAGE],
  },
};

export default function SubscriptionPage() {
  return <SubscriptionContent heading="Subscription" />;
}

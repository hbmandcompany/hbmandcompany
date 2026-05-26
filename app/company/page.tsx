import type { Metadata } from "next";
import AboutContent from "../about/AboutContent";
import { OG_IMAGE, SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "The Company",
  description:
    "About HBM & Company — enterprise news and intelligence for finance, crypto, and infrastructure. Mission, team, lineage, and editorial standards.",
  alternates: { canonical: `${SITE_URL}/company` },
  openGraph: {
    title: "The Company — HBM & Company",
    description:
      "About HBM & Company — enterprise news and intelligence for finance, crypto, and infrastructure.",
    url: `${SITE_URL}/company`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "HBM & Company — The Company" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Company — HBM & Company",
    description: "About HBM & Company — finance, crypto, and infrastructure news and intelligence.",
    images: [OG_IMAGE],
  },
};

export default function CompanyPage() {
  return <AboutContent />;
}

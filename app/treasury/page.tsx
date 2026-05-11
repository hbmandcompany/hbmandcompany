import type { Metadata } from "next";
import TreasuryContent from "./TreasuryContent";

export const metadata: Metadata = {
  title: "Treasury",
  description:
    "Immersive walkthrough of HBM treasury: coverage and mandate, underwriting, book-building, execution, and surveillance — investment-banking discipline applied to digital asset balance sheets.",
  alternates: {
    canonical: "https://hbmandcompany.com/treasury",
  },
  openGraph: {
    title: "Treasury — HBM & Company",
    description:
      "Consolidated on-chain treasury, yield discipline, and operational alignment with the protocols we hold.",
    url: "https://hbmandcompany.com/treasury",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Treasury" }],
  },
  twitter: {
    title: "Treasury — HBM & Company",
    description:
      "Digital asset treasury and balance-sheet discipline at HBM & Company.",
    images: ["/og-image.png"],
  },
};

export default function TreasuryPage() {
  return <TreasuryContent />;
}

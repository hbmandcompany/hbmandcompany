import type { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Portfolio",
    description:
      "HBM & Company portfolio: DeFi protocols, Ethereum treasury operations, and software holdings — nine live positions across major networks.",
  alternates: {
    canonical: "https://hbmandcompany.com/work",
  },
  openGraph: {
    title: "Portfolio — HBM & Company",
    description:
      "Nine active holdings. Ethereum-centric treasury and protocol software revenue exposure — DeFi infrastructure built to compound.",
    url: "https://hbmandcompany.com/work",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Portfolio" }],
  },
  twitter: {
    title: "Portfolio — HBM & Company",
    description:
      "Nine active holdings. Ethereum treasury & software segment exposure — DeFi infrastructure built to compound.",
    images: ["/og-image.png"],
  },
};

export default function WorkPage() {
  return <WorkContent />;
}

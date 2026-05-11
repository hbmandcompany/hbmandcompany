import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "The Company",
  description:
    "The Company — an immersive telling of HBM & Company: French-inspired house lore, lineage, values, and the people who hold the line between patrimony and protocol.",
  alternates: {
    canonical: "https://hbmandcompany.com/about",
  },
  openGraph: {
    title: "The Company — HBM & Company",
    description:
      "A private holding company at the frontier of decentralized finance, blockchain protocol infrastructure, and institutional digital asset formation.",
    url: "https://hbmandcompany.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — The Company" }],
  },
  twitter: {
    title: "The Company — HBM & Company",
    description:
      "A private holding company at the frontier of decentralized finance and digital asset infrastructure.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

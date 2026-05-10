import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About the Firm",
  description:
    "HBM & Company is a private holding company founded on the conviction that the financial infrastructure of the next century will be built on open, programmable, decentralized protocols.",
  alternates: {
    canonical: "https://hbmandcompany.com/about",
  },
  openGraph: {
    title: "About HBM & Company — Digital Asset Infrastructure & Private Holdings",
    description:
      "A private holding company at the frontier of decentralized finance, blockchain protocol infrastructure, and institutional digital asset formation.",
    url: "https://hbmandcompany.com/about",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — About the Firm" }],
  },
  twitter: {
    title: "About HBM & Company",
    description:
      "A private holding company at the frontier of decentralized finance and digital asset infrastructure.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

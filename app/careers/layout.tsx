import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at HBM & Company",
  description:
    "Careers at HBM & Company — open roles in editorial, engineering, research, and operations for finance, crypto, and infrastructure news.",
  alternates: { canonical: "https://hbmandcompany.com/careers" },
  openGraph: {
    title: "Careers — HBM & Company",
    description:
      "Open roles across protocol engineering, product design, on-chain research, and operations.",
    url: "https://hbmandcompany.com/careers",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Careers" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers — HBM & Company",
    description: "Open roles across protocol engineering, product design, on-chain research, and operations.",
    images: ["/og-image.png"],
  },
};

export default function CareersLayout({ children }: { children: ReactNode }) {
  return children;
}

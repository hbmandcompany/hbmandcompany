import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Luxury streetwear and HBM & Company apparel — curated drops, apparel, tech, and accessories with same institutional rigor as our digital infrastructure.",
  alternates: { canonical: "https://hbmandcompany.com/shop" },
  openGraph: {
    title: "Shop — HBM & Company",
    description:
      "Curated apparel, accessories, and tech from HBM & Company — luxury streetwear with protocol-grade attention to detail.",
    url: "https://hbmandcompany.com/shop",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Shop" }],
  },
  twitter: {
    title: "Shop — HBM & Company",
    description:
      "Curated apparel, accessories, and tech from HBM & Company — luxury streetwear with protocol-grade attention to detail.",
    images: ["/og-image.png"],
  },
};

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}

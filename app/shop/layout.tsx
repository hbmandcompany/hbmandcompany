import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getShopOrigin } from "@/lib/site-urls";
import { SITE_ICONS } from "@/lib/seo/site";

const shopOrigin = getShopOrigin();

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Luxury streetwear and HBM & Company apparel — curated drops, apparel, tech, and accessories with same institutional rigor as our digital infrastructure.",
  icons: SITE_ICONS,
  alternates: { canonical: shopOrigin },
  openGraph: {
    title: "Shop — HBM & Company",
    description:
      "Curated apparel, accessories, and tech from HBM & Company — luxury streetwear with protocol-grade attention to detail.",
    url: shopOrigin,
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

import type { Metadata } from "next";
import AcquireHbmContent from "./AcquireHbmContent";

export const metadata: Metadata = {
  title: "Acquire HBM",
  description:
    "Acquire HBM — the platform currency for participation on HBM & Company rails. Buy via our linked venue or engage treasury for directed allocation.",
  alternates: {
    canonical: "https://hbmandcompany.com/acquire-hbm",
  },
  openGraph: {
    title: "Acquire HBM — HBM & Company",
    description: "Platform currency and participation on HBM treasury rails.",
    url: "https://hbmandcompany.com/acquire-hbm",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Acquire HBM" }],
  },
};

export default function AcquireHbmPage() {
  return <AcquireHbmContent />;
}

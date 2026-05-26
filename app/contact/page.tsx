import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact HBM & Company for finance, crypto, and infrastructure news inquiries, partnerships, and editorial correspondence at contact@hbmandcompany.com.",
  alternates: {
    canonical: "https://hbmandcompany.com/contact",
  },
  openGraph: {
    title: "Contact Us — HBM & Company",
    description:
      "Contact HBM & Company for editorial, partnership, and newsroom inquiries across finance, crypto, and infrastructure.",
    url: "https://hbmandcompany.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Contact" }],
  },
  twitter: {
    title: "Contact Us — HBM & Company",
    description:
      "Contact HBM & Company for finance, crypto, and infrastructure news and partnership inquiries.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

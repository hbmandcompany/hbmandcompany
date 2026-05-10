import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Engage HBM & Company. We work with founders, institutions, and protocols operating at the frontier of decentralized finance and digital asset infrastructure.",
  alternates: {
    canonical: "https://hbmandcompany.com/contact",
  },
  openGraph: {
    title: "Contact — HBM & Company",
    description:
      "Engage HBM & Company. We work selectively with founders and institutions building critical DeFi infrastructure.",
    url: "https://hbmandcompany.com/contact",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Contact" }],
  },
  twitter: {
    title: "Contact — HBM & Company",
    description:
      "Engage HBM & Company. Selective partnerships with DeFi founders and institutions.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}

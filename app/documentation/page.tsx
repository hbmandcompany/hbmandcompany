import type { Metadata } from "next";
import DocumentationContent from "./DocumentationContent";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "HBM Documentation — a searchable, filterable library of governance, treasury, infrastructure, and support volumes.",
  alternates: {
    canonical: "https://hbmandcompany.com/documentation",
  },
  openGraph: {
    title: "Documentation — HBM & Company",
    description: "A searchable, filterable library of governance, treasury, infrastructure, and support volumes.",
    url: "https://hbmandcompany.com/documentation",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM Documentation" }],
  },
  twitter: {
    title: "Documentation — HBM & Company",
    description: "A searchable, filterable library of governance, treasury, infrastructure, and support volumes.",
    images: ["/og-image.png"],
  },
};

export default function DocumentationPage() {
  return <DocumentationContent />;
}

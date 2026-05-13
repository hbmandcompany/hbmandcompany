import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import { baseCopy } from "@/lib/base-copy";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-base-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-base-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-base-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: baseCopy.metadata.title,
  description: baseCopy.metadata.description,
  alternates: {
    canonical: "https://hbmandcompany.com/base",
  },
  openGraph: {
    title: "Base — HBM & Company",
    description: baseCopy.metadata.description,
    url: "https://hbmandcompany.com/base",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Base — HBM & Company" }],
  },
  twitter: {
    title: "Base — HBM & Company",
    description: baseCopy.metadata.description,
    images: ["/og-image.png"],
  },
};

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      {children}
    </div>
  );
}

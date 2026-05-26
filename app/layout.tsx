import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Plus_Jakarta_Sans, Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/JsonLd";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_IMAGE, SITE_URL } from "@/lib/seo/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-raleway",
  display: "swap",
});

/** Robinhood-style UI sans (their app uses proprietary type; DM Sans matches the fintech look) */
const robinhoodSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-robinhood",
  display: "swap",
});

/** Minimal luxury SaaS body — clean geometric sans for editorial blocks */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-luxury-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: DEFAULT_TITLE,
    template: "%s | HBM & Company",
  },

  description: DEFAULT_DESCRIPTION,

  keywords: [
    "crypto news",
    "finance news",
    "infrastructure news",
    "blockchain reporting",
    "DeFi analysis",
    "Texas finance",
    "on-chain intelligence",
    "digital asset reporting",
    "enterprise news",
    "HBM & Company",
    "HBM and Company",
    "financial journalism",
    "cryptocurrency news",
    "markets desk",
  ],

  authors: [{ name: "HBM & Company", url: SITE_URL }],
  creator: "HBM & Company",
  publisher: "HBM & Company",
  category: "News",
  classification: "Finance / Cryptocurrency / Infrastructure News",
  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: { canonical: SITE_URL },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "HBM & Company",
    title: "HBM & Company | Finance & Crypto News",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "HBM & Company",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HBM & Company | Finance & Crypto News",
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE],
  },

  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },

  manifest: "/site.webmanifest",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "HBM & Company",
  },
  other: {
    "msapplication-TileColor": "#020203",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#020203",
  colorScheme: "dark",
  /** iOS 15+: avoid layout jump when dynamic toolbar shows/hides */
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-US"
      className={`${cormorant.variable} ${raleway.variable} ${robinhoodSans.variable} ${plusJakarta.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-void text-cream antialiased overflow-x-hidden min-h-screen min-h-[100dvh]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

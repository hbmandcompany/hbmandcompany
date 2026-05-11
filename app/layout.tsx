import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Raleway } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "@/components/JsonLd";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://hbmandcompany.com"),

  title: {
    default: "HBM & Company",
    template: "%s | HBM & Company",
  },

  description:
    "A private holding company operating at the intersection of decentralized finance, digital asset infrastructure, and alternative capital formation.",

  keywords: [
    "web3 investment firm",
    "crypto holding company",
    "digital asset portfolio",
    "DeFi infrastructure company",
    "blockchain venture studio",
    "tokenized asset management",
    "on-chain capital",
    "alternative asset formation",
    "decentralized finance firm",
    "crypto fund",
    "web3 portfolio company",
    "digital asset holding",
    "USDC yield infrastructure",
    "Ethereum venture",
    "Solana ecosystem",
    "Base network investments",
    "DePIN portfolio",
    "crypto venture capital",
    "digital asset operator",
    "on-chain treasury",
    "private crypto firm",
    "web3 operator",
    "crypto studio",
    "token infrastructure",
    "decentralized portfolio",
    "HBM Company",
    "HBM and Company",
    "blockchain protocol",
    "institutional DeFi",
    "digital asset infrastructure",
  ],

  authors: [{ name: "HBM & Company", url: "https://hbmandcompany.com" }],
  creator: "HBM & Company",
  publisher: "HBM & Company",
  category: "Finance",
  classification: "Digital Asset Holdings / Decentralized Finance Infrastructure",
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

  alternates: { canonical: "https://hbmandcompany.com" },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hbmandcompany.com",
    siteName: "HBM & Company",
    title: "HBM & Company — Digital Asset Infrastructure & Private Holdings",
    description:
      "Private holding company building decentralized finance infrastructure, digital asset platforms, and on-chain capital systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HBM & Company — Private Holdings",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HBM & Company — Digital Asset Infrastructure & Private Holdings",
    description:
      "Private holding company building decentralized finance infrastructure, digital asset platforms, and on-chain capital systems.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-US"
      className={`${cormorant.variable} ${raleway.variable} ${robinhoodSans.variable}`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="bg-void text-cream antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

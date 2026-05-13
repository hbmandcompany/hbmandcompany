import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HBM & Company handles privacy for visitors and partners across hbmandcompany.com and related digital properties.",
  alternates: { canonical: "https://hbmandcompany.com/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy — HBM & Company",
    description: "Privacy practices and data handling for HBM & Company digital properties.",
    url: "https://hbmandcompany.com/privacy",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Privacy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — HBM & Company",
    description: "Privacy practices and data handling for HBM & Company digital properties.",
    images: ["/og-image.png"],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen min-h-[100dvh] bg-void pb-[max(6rem,env(safe-area-inset-bottom,1.25rem))] pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="font-cormorant text-display-md text-cream font-light mb-8">
            Privacy Policy
          </h1>
          <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed">
            HBM & Company respects the privacy of all individuals who
            interact with our digital properties. This policy is a placeholder
            and will be updated with full terms prior to public launch.
          </p>
        </div>
      </main>
      <FooterDark />
    </>
  );
}

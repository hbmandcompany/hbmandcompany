import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing access to hbmandcompany.com and HBM & Company digital services. Review before using our sites or contacting the firm.",
  alternates: { canonical: "https://hbmandcompany.com/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Terms of Use — HBM & Company",
    description: "Terms of use for HBM & Company websites and digital properties.",
    url: "https://hbmandcompany.com/terms",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Terms" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Use — HBM & Company",
    description: "Terms of use for HBM & Company websites and digital properties.",
    images: ["/og-image.png"],
  },
};

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen min-h-[100dvh] bg-void pb-[max(6rem,env(safe-area-inset-bottom,1.25rem))] pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <h1 className="font-cormorant text-display-md text-cream font-light mb-8">
            Terms of Use
          </h1>
          <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed">
            These Terms of Use govern your access to and use of hbmandcompany.com.
            This page is a placeholder and will be updated with full terms prior
            to public launch.
          </p>
        </div>
      </main>
      <FooterDark />
    </>
  );
}

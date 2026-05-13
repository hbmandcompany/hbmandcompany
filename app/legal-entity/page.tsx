import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

export const metadata: Metadata = {
  title: "Legal Entity",
  description:
    "Corporate structure and registration summary for HBM & Company — Wyoming domicile, operational offices, and where to direct legal correspondence.",
  alternates: { canonical: "https://hbmandcompany.com/legal-entity" },
  openGraph: {
    title: "Legal Entity — HBM & Company",
    description: "Registration, jurisdiction, and legal correspondence — distinct from consumer privacy terms.",
    url: "https://hbmandcompany.com/legal-entity",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Legal Entity" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Entity — HBM & Company",
    description: "Corporate structure and registration summary for HBM & Company.",
    images: ["/og-image.png"],
  },
};

export default function LegalEntityPage() {
  return (
    <>
      <NavBar />
      <main className="relative min-h-screen min-h-[100dvh] bg-void pb-[max(6rem,env(safe-area-inset-bottom,1.25rem))] pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
          <h1 className="font-cormorant text-display-md font-light text-cream mb-8">Legal entity</h1>
          <div className="space-y-6 font-mono-hbm text-body-md text-silver-dim leading-relaxed">
            <p>
              The HBM &amp; Company brand and operating group are organized through private entities
              domiciled for governance and treasury efficiency. Primary registration is referenced
              across our materials as <span className="text-cream/75">Wyoming, United States</span>{" "}
              — aligned with common structures for digital asset holding companies.
            </p>
            <p>
              Operational and regional coverage includes offices listed in our site footer (e.g.
              Dallas as primary HQ label, Bordeaux, Tokyo). Specific legal names of subsidiaries,
              registration numbers, and service-of-process addresses are provided under NDA or
              formal engagement — not on this marketing site.
            </p>
            <p>
              <span className="text-cream/70">Privacy &amp; site terms.</span> For how we handle
              data on this website, see our{" "}
              <Link href="/privacy" className="text-gold/75 hover:text-gold underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-gold/75 hover:text-gold underline-offset-4 hover:underline">
                Terms of Use
              </Link>
              . Those documents govern visitors; they are not a substitute for entity-level
              contracts or disclosures in a financing.
            </p>
            <p>
              <span className="text-cream/70">Correspondence.</span> Introductory legal or
              compliance questions may be routed through{" "}
              <Link href="/contact" className="text-gold/75 hover:text-gold underline-offset-4 hover:underline">
                Contact
              </Link>{" "}
              so the right person can respond.
            </p>
          </div>
        </div>
      </main>
      <FooterDark typography="luxury" />
    </>
  );
}

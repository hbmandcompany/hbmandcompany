import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Media resources and press contacts for HBM & Company — logos, boilerplate, and inquiry channels for accredited journalists.",
  alternates: { canonical: "https://hbmandcompany.com/press-kit" },
  openGraph: {
    title: "Press Kit — HBM & Company",
    description: "Boilerplate, brand guidelines on request, and a single path for serious press outreach.",
    url: "https://hbmandcompany.com/press-kit",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Press" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit — HBM & Company",
    description: "Boilerplate and press inquiry channels for accredited journalists.",
    images: ["/og-image.png"],
  },
};

const PRESS_EMAIL = "hbmandcompany@gmail.com";

export default function PressKitPage() {
  return (
    <>
      <NavBar />
      <main className="relative min-h-screen bg-void pb-24 pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
          <h1 className="font-cormorant text-display-md font-light text-cream mb-8">Press kit</h1>
          <div className="space-y-6 font-mono-hbm text-body-md text-silver-dim leading-relaxed">
            <p>
              HBM &amp; Company is a private holding company operating at the intersection of
              decentralized finance, digital asset infrastructure, and alternative capital
              formation. We speak to press selectively and prefer fact over spectacle.
            </p>
            <p>
              <span className="text-cream/70">Boilerplate.</span> For short-form citations, you may
              describe the firm as: &ldquo;A private house holding digital asset treasury and
              wholly-owned protocol software, engaging institutions and founders who think in
              generations as readily as in quarters.&rdquo;
            </p>
            <p>
              <span className="text-cream/70">Logos &amp; assets.</span> High-resolution wordmarks
              and brand assets are released on request after we verify outlet and assignment. Start
              with the email below; include your beat, deadline, and publication.
            </p>
            <p>
              <span className="text-cream/70">Inquiries.</span>{" "}
              <a
                href={`mailto:${PRESS_EMAIL}?subject=Press%20inquiry%20%E2%80%94%20HBM%20%26%20Company`}
                className="text-gold/75 hover:text-gold underline-offset-4 hover:underline"
              >
                {PRESS_EMAIL}
              </a>
            </p>
            <p className="text-sm text-silver-dim/55">
              Not a journalist? Use{" "}
              <Link href="/contact" className="text-gold/70 hover:text-gold underline-offset-4 hover:underline">
                Contact
              </Link>{" "}
              for general inquiries.
            </p>
          </div>
        </div>
      </main>
      <FooterDark typography="luxury" />
    </>
  );
}

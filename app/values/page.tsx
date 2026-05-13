import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";
import { aboutValues } from "@/lib/hbm-company-data";

export const metadata: Metadata = {
  title: "Values & Thesis",
  description:
    "Permanence, precision, discretion, and protocol — how HBM & Company judges work across digital asset infrastructure and private holdings.",
  alternates: { canonical: "https://hbmandcompany.com/values" },
  openGraph: {
    title: "Values & Thesis — HBM & Company",
    description: "The four stones of the house — principles that govern how we build and allocate.",
    url: "https://hbmandcompany.com/values",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Values" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Values & Thesis — HBM & Company",
    description: "The four stones of the house — principles that govern how we build and allocate.",
    images: ["/og-image.png"],
  },
};

export default function ValuesPage() {
  return (
    <>
      <NavBar />
      <main className="relative min-h-screen min-h-[100dvh] bg-void pb-[max(6rem,env(safe-area-inset-bottom,1.25rem))] pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="pointer-events-none absolute inset-0 amber-bloom opacity-25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">
            Les quatre pierres
          </p>
          <h1 className="mt-4 font-cormorant text-[clamp(2rem,4vw,3.25rem)] font-light text-cream">
            Values &amp; thesis
          </h1>
          <p className="mt-6 max-w-2xl font-mono-hbm text-body-md leading-[1.85] text-silver-dim/75">
            Our thesis is simple: treat programmable money and protocol infrastructure with the same
            long horizon as patrimony. We compound where others churn, prefer introductions to open
            pitches, and hold assets and software to a single standard of care — no shortcuts, no
            performed urgency.
          </p>
          <p className="mt-4 font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.16em] text-silver-dim/45">
            Read the full narrative on{" "}
            <Link href="/about" className="text-gold/70 hover:text-gold">
              The Company
            </Link>
            .
          </p>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {aboutValues.map((v, idx) => (
              <SectionReveal key={v.code} delay={idx * 0.07}>
                <div className="group h-full rounded-xl border border-white/[0.06] bg-void/25 p-7 transition-all duration-500 hover:border-gold/22 hover:bg-void/45">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-gold/40">
                      {v.code}
                    </span>
                    <div className="h-px w-6 bg-gold/25 transition-all duration-500 group-hover:w-10" />
                    <span className="font-cormorant text-lg text-cream/85">{v.label}</span>
                  </div>
                  <p className="font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.12em] text-silver-dim/50">
                    {v.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </main>
      <FooterDark typography="luxury" />
    </>
  );
}

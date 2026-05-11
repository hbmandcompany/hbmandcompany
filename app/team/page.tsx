import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";
import { aboutTeam } from "@/lib/hbm-company-data";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Leadership and principals at HBM & Company — protocol architecture, DeFi, institutional strategy, and smart contract engineering.",
  alternates: { canonical: "https://hbmandcompany.com/team" },
  openGraph: {
    title: "Our Team — HBM & Company",
    description: "The people who keep the flame — judgment in every line of code and every position we hold.",
    url: "https://hbmandcompany.com/team",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM & Company — Team" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team — HBM & Company",
    description: "The people who keep the flame — judgment in every line of code and every position we hold.",
    images: ["/og-image.png"],
  },
};

export default function TeamPage() {
  return (
    <>
      <NavBar />
      <main className="relative min-h-screen bg-void pb-24 pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:pt-32">
        <div className="pointer-events-none absolute inset-0 purple-bloom opacity-30 max-md:hidden" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <p className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">
            Le cercle
          </p>
          <h1 className="mt-4 font-cormorant text-[clamp(2.2rem,4vw,3.5rem)] font-light text-cream">
            Our team
          </h1>
          <p className="mt-4 max-w-xl font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/55">
            Names you will not find on conference badges. Judgment you will find in every line of
            code we ship and every position we hold.
          </p>
          <p className="mt-6 font-mono-hbm text-body-md text-silver-dim/70">
            For the full house narrative — lineage, patrimony, and how we work — see{" "}
            <Link href="/about" className="text-gold/70 underline-offset-4 hover:text-gold hover:underline">
              The Company
            </Link>
            .
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutTeam.map((member, i) => (
              <SectionReveal key={member.name} delay={i * 0.08}>
                <div className="group cursor-default">
                  <div className="relative mb-5 aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 22vw"
                      className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
                  </div>
                  <h2 className="font-cormorant text-xl font-light text-cream/90 md:text-2xl">
                    {member.name}
                  </h2>
                  <p className="mt-1 font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">
                    {member.role}
                  </p>
                  <p className="mt-2 font-mono-hbm text-[12px] leading-relaxed text-silver-dim/65">
                    {member.focus}
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

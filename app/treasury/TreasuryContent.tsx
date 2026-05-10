"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";

const pillars = [
  {
    title: "Consolidated books",
    body:
      "Treasury is marked across ETH, liquid staking tokens, and stable balances with institutional-grade pricing and custody discipline — one consolidated view, not a patchwork of wallets.",
  },
  {
    title: "Yield & carry",
    body:
      "We optimize for sustainable carry: staking, liquidity provision, and structured DeFi where the risk budget matches the mandate. No momentum chasing — systematic allocation and rebalance rules.",
  },
  {
    title: "Governance & ops",
    body:
      "Validator stakes, protocol votes, and software-segment revenue sit beside the balance sheet. Treasury decisions are operational, not cosmetic — aligned with long-term protocol exposure.",
  },
];

export default function TreasuryContent() {
  return (
    <>
      <NavBar />

      <section className="relative flex min-h-[72vh] items-end pb-20 pt-28 overflow-hidden md:min-h-[75vh] md:pb-24">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=90"
            alt=""
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/88 via-void/65 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-void/35 to-void/55" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-mono-hbm text-label-sm mb-6 block uppercase tracking-[0.3em] text-gold"
          >
            — Treasury
          </motion.span>
          <h1 className="font-cormorant text-display-xl mb-6 max-w-4xl font-light leading-none text-cream">
            <AnimatedHeadline text="Digital asset" delay={0.15} />
            <br />
            <AnimatedHeadline
              text="treasury, held to a standard."
              delay={0.35}
              className="text-gradient-gold font-bold italic"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono-hbm max-w-xl text-body-lg text-silver leading-relaxed"
          >
            HBM & Company runs a consolidated on-chain treasury: diversified digital asset
            exposure, staking and liquidity programs, and wholly-owned software revenue —
            reported with the same rigor we expect from the protocols we back.
          </motion.p>
        </div>
      </section>

      <section className="section-mid relative overflow-hidden py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 city-glow opacity-40" />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 md:px-12">
          <SectionReveal>
            <h2 className="font-cormorant text-display-md mb-10 font-light text-cream leading-tight">
              How we think about{" "}
              <span className="text-gradient-gold italic font-bold">the balance sheet.</span>
            </h2>
          </SectionReveal>
          <div className="flex flex-col gap-10">
            {pillars.map((p, i) => (
              <SectionReveal key={p.title} delay={0.08 + i * 0.06}>
                <div className="border-t border-white/[0.06] pt-8 first:border-t-0 first:pt-0">
                  <h3 className="font-cormorant mb-3 text-xl font-light text-cream/90 md:text-2xl">
                    {p.title}
                  </h3>
                  <p className="font-mono-hbm text-[15px] leading-relaxed text-silver-dim/85">
                    {p.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.35}>
            <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link
                href="/work"
                className="garnet-btn inline-block px-8 py-3.5 text-center text-label-xs uppercase tracking-[0.2em] text-void"
              >
                Portfolio &amp; holdings
              </Link>
              <Link
                href="/contact"
                className="gold-outline-btn inline-block px-8 py-3.5 text-center text-label-xs uppercase tracking-[0.2em]"
              >
                Institutional inquiries
              </Link>
            </div>
            <p className="font-mono-hbm mt-6 text-[10px] uppercase tracking-[0.22em] text-silver-dim/45">
              Figures on this site are illustrative unless separately attested. Nothing here
              is an offer of securities or investment advice.
            </p>
          </SectionReveal>
        </div>
      </section>

      <FooterDark typography="luxury" />
    </>
  );
}

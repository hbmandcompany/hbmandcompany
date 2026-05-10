"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import GoldDivider from "@/components/GoldDivider";
import SectionReveal from "@/components/SectionReveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";

const values = [
  { code: "01", label: "Permanence", description: "We build for decades, not quarters." },
  { code: "02", label: "Precision", description: "Every deployment is a deliberate act." },
  { code: "03", label: "Privacy", description: "We don't perform. We produce." },
  { code: "04", label: "Protocol", description: "Code is law. Infrastructure is legacy." },
];

const team = [
  {
    name: "A. Harrington",
    role: "Managing Partner",
    focus: "Protocol Architecture & Capital Allocation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "M. Blackwood",
    role: "Head of DeFi",
    focus: "Liquidity Engineering & Treasury Design",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&q=80",
  },
  {
    name: "S. Okafor",
    role: "Chief Protocol Officer",
    focus: "Consensus Mechanisms & Smart Contract Architecture",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
  {
    name: "L. Veronique",
    role: "Head of Institutional",
    focus: "Regulatory Strategy & Custody Infrastructure",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <>
      <NavBar />

      {/* ——— HERO ——— */}
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=90"
            alt="Architecture"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/60 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/70 to-void/20" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-mono-hbm text-label-sm text-gold uppercase tracking-[0.3em] block mb-6">
              — The Firm
            </span>
          </motion.div>
          <h1 className="font-cormorant text-display-xl text-cream font-light leading-none mb-6 max-w-4xl">
            <AnimatedHeadline text="About" delay={0.2} />
            {" "}
            <AnimatedHeadline
              text="HBM & Company"
              delay={0.5}
              className="text-gradient-gold font-bold italic"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono-hbm text-body-lg text-silver max-w-xl"
          >
            A private crypto holdings company. We invest, build, and operate
            at the frontier of decentralized finance.
          </motion.p>
        </div>
      </section>

      {/* ——— SPLIT ABOUT ——— */}
      <section className="relative bg-midnight py-24 md:py-36">
        <div className="absolute inset-0 city-glow pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: Editorial image */}
            <SectionReveal direction="left" className="sticky top-24">
              <div className="relative h-[500px] lg:h-[700px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80"
                  alt="Glass towers"
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-abyss/30 to-transparent" />

                {/* Overlay stat */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="glass-panel-dark p-6">
                    <div className="font-cormorant text-display-md text-gold font-bold mb-1 tabular-nums">$4.08B</div>
                    <div className="font-mono-hbm text-label-xs text-silver-dim/60 uppercase tracking-[0.15em] leading-relaxed">
                      Consolidated treasury NAV
                      <span className="block mt-1 normal-case tracking-[0.05em] text-silver-dim/40 text-[9px]">
                        ETH, LST &amp; stables — mark-to-market
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Right: Long-form copy */}
            <div className="flex flex-col gap-10">
              <SectionReveal direction="right">
                <div>
                  <span className="font-mono-hbm text-label-sm text-gold uppercase tracking-[0.3em] block mb-6">
                    — Our Story
                  </span>
                  <h2 className="font-cormorant text-display-md text-cream font-light leading-tight mb-6">
                    Built for the architecture of what&apos;s{" "}
                    <span className="text-gradient-gold italic font-bold">next.</span>
                  </h2>
                  <p className="font-mono-hbm text-body-md text-silver leading-relaxed mb-5">
                    HBM & Company was founded on a single conviction: the financial
                    infrastructure of the next century will be built on open, programmable,
                    decentralized protocols — and the firms that own the critical layers of
                    that stack will define institutional wealth for generations.
                  </p>
                  <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed mb-5">
                    We began as a small group of protocol engineers and institutional
                    finance veterans who saw the convergence happening before markets did.
                    We deployed capital into the base layers — the consensus mechanisms,
                    the bridge infrastructure, the custody primitives — when the rest of
                    the industry was speculating on tokens.
                  </p>
                  <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed">
                    Today, HBM & Company holds consolidated digital asset treasury and
                    software positions with over $4.1 billion in notional exposure across
                    fourteen blockchain networks, twelve regulatory jurisdictions, and three continents.
                    We are not a fund. We are not an exchange. We are the infrastructure.
                  </p>
                </div>
              </SectionReveal>

              <GoldDivider />

              <SectionReveal delay={0.1}>
                <div>
                  <h3 className="font-cormorant text-display-sm text-cream font-light mb-6">
                    How We Operate
                  </h3>
                  <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed mb-5">
                    We operate in three modes: as principal investors deploying proprietary
                    capital, as protocol operators running validator nodes and governance
                    infrastructure, and as strategic partners to founders building at the
                    intersection of DeFi and institutional finance.
                  </p>
                  <p className="font-mono-hbm text-body-md text-silver-dim leading-relaxed">
                    We do not take advisory fees or management carry on external assets.
                    We participate in the protocols we believe in — as node operators,
                    governance delegates, and long-term holders. Our incentives are
                    perfectly aligned with the protocols we build.
                  </p>
                </div>
              </SectionReveal>

              <GoldDivider label="Core Values" />

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v, i) => (
                  <SectionReveal key={v.code} delay={i * 0.08}>
                    <div className="glass-panel-dark p-5 group hover:border-gold/20 transition-all duration-400">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="font-mono-hbm text-label-xs text-gold/50 uppercase tracking-[0.2em]">
                          {v.code}
                        </span>
                        <div className="w-4 h-px bg-gold/30" />
                        <span className="font-mono-hbm text-label-sm text-gold uppercase tracking-[0.2em]">
                          {v.label}
                        </span>
                      </div>
                      <p className="font-mono-hbm text-[13px] text-silver-dim leading-relaxed">
                        {v.description}
                      </p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— TEAM ——— */}
      <section className="relative py-24 md:py-36 bg-obsidian">
        <div className="absolute inset-0 amber-bloom pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-16">
            <SectionReveal>
              <span className="font-mono-hbm text-label-sm text-gold uppercase tracking-[0.3em] block mb-4">
                — The Team
              </span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-cormorant text-display-lg text-cream font-light">
                The <span className="text-gradient-gold italic font-bold">People</span>
              </h2>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <SectionReveal key={member.name} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="relative h-[320px] overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-all duration-700 group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-obsidian/20 group-hover:bg-obsidian/0 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/20 group-hover:bg-gold/60 transition-colors duration-500" />
                  </div>
                  <div>
                    <h3 className="font-cormorant text-display-sm text-cream font-light group-hover:text-gold transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="font-mono-hbm text-label-xs text-gold uppercase tracking-[0.2em] mt-1 mb-2">
                      {member.role}
                    </p>
                    <p className="font-mono-hbm text-[12px] text-silver-dim leading-relaxed">
                      {member.focus}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="relative py-24 md:py-32 bg-midnight">
        <div className="absolute inset-0 city-glow pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <SectionReveal>
            <h2 className="font-cormorant text-display-lg text-cream font-light mb-6">
              Ready to build at{" "}
              <span className="text-gradient-gold italic font-bold">scale?</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <p className="font-mono-hbm text-body-md text-silver-dim mb-10 max-w-md mx-auto">
              We engage selectively with founders and institutions operating at the frontier.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <Link
              href="/contact"
              className="garnet-btn font-mono-hbm text-label-sm uppercase tracking-[0.25em] text-void px-12 py-5 inline-block"
            >
              Begin Engagement
            </Link>
          </SectionReveal>
        </div>
      </section>

      <FooterDark />
    </>
  );
}


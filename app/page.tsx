"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionReveal from "@/components/SectionReveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";

const marqueeItems = [
  "DeFi Infrastructure",
  "Protocol Architecture",
  "Institutional Custody",
  "Layer-2 Solutions",
  "On-Chain Governance",
  "Cross-Chain Liquidity",
  "Tokenomics Design",
  "Regulatory Compliance",
  "Smart Contract Audits",
  "Treasury Management",
];

const services = [
  {
    id: "01",
    title: "Protocol Development",
    description:
      "We architect and deploy institutional-grade blockchain protocols — from consensus mechanisms to cross-chain bridge infrastructure — built for permanence.",
    tag: "Core Infrastructure",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80",
    wide: true,
  },
  {
    id: "02",
    title: "DeFi Treasury",
    description:
      "Systematic on-chain portfolio management. Our treasury protocols optimize yield across liquidity pools, lending markets, and structured crypto products.",
    tag: "Capital Markets",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    wide: false,
  },
  {
    id: "03",
    title: "Network Governance",
    description:
      "Validator operations, DAO governance frameworks, and on-chain voting infrastructure for protocols that demand accountability at scale.",
    tag: "Governance",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    wide: false,
  },
  {
    id: "04",
    title: "Institutional Custody",
    description:
      "Military-grade multi-sig custody architecture. Cold storage solutions for institutions holding eight-figure digital asset portfolios.",
    tag: "Security",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    wide: false,
  },
  {
    id: "05",
    title: "Tokenomics & Launch",
    description:
      "Full-spectrum token engineering — from economic modeling and vesting schedules to IDO architecture and market-making strategy.",
    tag: "Token Engineering",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
    wide: false,
  },
];

const featuredWork = [
  {
    title: "Nexus Protocol",
    category: "Layer-2 Infrastructure",
    description:
      "A zero-knowledge rollup protocol processing 50,000+ TPS with sub-cent finality costs for institutional DeFi applications.",
    stat: "$2.4B TVL",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  },
  {
    title: "Aurum Vault",
    category: "Institutional Custody",
    description:
      "Enterprise-grade multi-party computation custody protocol deployed across 14 regulated jurisdictions.",
    stat: "$890M Secured",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200&q=80",
  },
  {
    title: "Meridian DAO",
    category: "On-Chain Governance",
    description:
      "Decentralized autonomous organization framework managing protocol upgrades and treasury allocation for a top-20 DeFi protocol.",
    stat: "340K Holders",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?w=1200&q=80",
  },
];

const stats: { value: string; label: string; detail: string }[] = [
  {
    value: "$4.08B",
    label: "Consolidated treasury NAV",
    detail: "ETH, liquid staking & stable balances — mark-to-market",
  },
  {
    value: "6.1%",
    label: "Blended treasury yield (TTM)",
    detail: "Annualized; staking, carry & program fees",
  },
  {
    value: "$162.4M",
    label: "Software & protocol revenue",
    detail: "Last twelve months — wholly-owned holdings",
  },
  {
    value: "+8.7%",
    label: "Net return vs. ETH (YoY)",
    detail: "Treasury performance after fees & rebalancing",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY       = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <>
      <div className="grain-overlay" aria-hidden="true" />
      <NavBar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-8 pt-28 md:pb-10 md:pt-32 lg:pt-36"
      >
        {/* Parallax city photo */}
        <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=90"
            alt="City skyline at night"
            fill
            className="object-cover object-center grayscale"
            priority
            unoptimized
          />
          {/* Heavy dark overlay — keep the photo but make it moodier */}
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/55 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/20 to-void/50" />
          <div className="absolute inset-0 hero-glow" />
          {/* Vignette corners */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(2,2,5,0.7) 100%)" }} />
        </motion.div>

        {/* Left accent line */}
        <div className="absolute left-12 top-28 bottom-28 w-px hidden lg:block"
          style={{ background: "linear-gradient(to bottom, transparent, rgba(139,26,47,0.4), rgba(232,184,75,0.2), transparent)" }} />

        <motion.div
          className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12 -translate-y-2 md:-translate-y-8 lg:-translate-y-14"
          style={{ opacity: heroOpacity }}
        >
          <h1 className="font-cormorant mb-5 max-w-5xl scroll-mt-32">
            {/* Normal tracking — tight tracking collapsed "We" + "Build" into one word visually */}
            <div className="block text-display-xl text-cream/90 font-thin leading-none tracking-normal">
              <AnimatedHeadline text="We Build" delay={0.3} />
            </div>
            <div className="block text-display-2xl leading-none">
              <AnimatedHeadline
                text="The Protocol."
                delay={0.55}
                className="text-gradient-gold font-bold italic"
              />
            </div>
          </h1>

          <div className="-translate-y-1 md:-translate-y-2">
            <SectionReveal delay={0.75}>
              <p className="font-mono-hbm text-body-md text-silver/60 max-w-md mb-7 leading-relaxed">
                HBM & Company is a crypto holdings firm operating at the frontier
                of blockchain protocol infrastructure and institutional DeFi finance.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.9}>
              <div className="flex flex-wrap gap-3">
                <Link href="/work"
                  className="garnet-btn font-mono-hbm text-label-xs uppercase tracking-[0.2em] text-cream px-8 py-4 inline-block">
                  View Protocol
                </Link>
                <Link href="/about"
                  className="gold-outline-btn font-mono-hbm text-label-xs uppercase tracking-[0.2em] px-8 py-4 inline-block">
                  About the Firm
                </Link>
              </div>
            </SectionReveal>
          </div>

          {/* Treasury summary — earnings-style KPIs (Robinhood-style DM Sans) */}
          <div className="mt-14 border-t border-white/[0.05] pt-8 font-robinhood md:-translate-y-1">
            <SectionReveal delay={0.95}>
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
                <p className="text-[10px] text-silver-dim/55 uppercase tracking-[0.18em] font-semibold">
                  Treasury &amp; holdings summary
                </p>
                <p className="text-[9px] text-silver-dim/35 uppercase tracking-[0.14em] font-medium">
                  FY2026 YTD — unaudited, illustrative reporting only
                </p>
              </div>
            </SectionReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <SectionReveal key={s.label} delay={1.0 + i * 0.08}>
                  <div className="glass-panel-dark p-4 md:p-5 h-full flex flex-col">
                    <div className="text-3xl sm:text-4xl md:text-[2.75rem] text-gold font-semibold mb-1 leading-none tabular-nums tracking-[-0.02em]">
                      {s.value}
                    </div>
                    <div className="text-[12px] text-cream/75 font-medium normal-case tracking-[0.01em] leading-snug mb-2">
                      {s.label}
                    </div>
                    <div className="text-[10px] text-silver-dim/45 normal-case tracking-[0.02em] leading-relaxed mt-auto border-t border-white/[0.04] pt-3 font-normal">
                      {s.detail}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          <div className="w-px h-14 bg-gradient-to-b from-garnet/50 to-transparent animate-glow-pulse" />
        </motion.div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <MarqueeStrip items={marqueeItems} />

      {/* ═══════════════ SERVICES BENTO ═══════════════ */}
      <section className="relative py-28 md:py-40 section-mid overflow-hidden">
        <div className="absolute inset-0 purple-bloom pointer-events-none" />
        <div className="absolute inset-0 city-glow pointer-events-none opacity-60" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionReveal>
                <span className="font-mono-hbm text-label-xs text-garnet/70 uppercase tracking-[0.35em]">
                  — What We Build
                </span>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="font-cormorant text-display-lg text-cream/80 font-light mt-3">
                  Protocol{" "}
                  <span className="text-gradient-gold font-bold italic">Infrastructure</span>
                </h2>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.2}>
              <p className="font-mono-hbm text-body-md text-silver-dim/60 max-w-xs leading-relaxed">
                We deploy capital and engineering talent into the foundations of
                the next financial system.
              </p>
            </SectionReveal>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Wide card */}
            <SectionReveal className="md:col-span-2" delay={0.1}>
              <div className="card-3d group relative h-[420px] md:h-[500px] overflow-hidden cursor-pointer bg-obsidian">
                <Image
                  src={services[0].image} alt={services[0].title} fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04] opacity-50 group-hover:opacity-60"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-void/60 to-transparent" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono-hbm text-label-xs text-garnet/60 tracking-[0.25em] uppercase">{services[0].id}</span>
                    <div className="w-6 h-px bg-garnet/30" />
                    <span className="font-mono-hbm text-label-xs text-gold/60 uppercase tracking-[0.2em]">{services[0].tag}</span>
                  </div>
                  <h3 className="font-cormorant text-display-md text-cream/80 font-light mb-3 group-hover:text-gold transition-colors duration-500">
                    {services[0].title}
                  </h3>
                  <p className="font-mono-hbm text-body-md text-silver-dim/60 max-w-2xl leading-relaxed">
                    {services[0].description}
                  </p>
                </div>
                {/* Top accent line */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-garnet/40 to-transparent group-hover:via-gold/50 transition-all duration-500" />
              </div>
            </SectionReveal>

            {/* Half-width cards */}
            {services.slice(1).map((svc, i) => (
              <SectionReveal key={svc.id} delay={0.12 + i * 0.08}>
                <div className="card-3d group relative h-[300px] md:h-[360px] overflow-hidden cursor-pointer bg-obsidian">
                  <Image
                    src={svc.image} alt={svc.title} fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06] opacity-40 group-hover:opacity-55"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-void/30" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-mono-hbm text-label-xs text-garnet/50 uppercase tracking-[0.2em]">{svc.id}</span>
                      <span className="font-mono-hbm text-label-xs text-gold/40 uppercase tracking-[0.15em]">{svc.tag}</span>
                    </div>
                    <h3 className="font-cormorant text-display-sm text-cream/80 font-light mb-2 group-hover:text-gold transition-colors duration-500">
                      {svc.title}
                    </h3>
                    <p className="font-mono-hbm text-[13px] text-silver-dim/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 translate-y-2 group-hover:translate-y-0 transform">
                      {svc.description}
                    </p>
                  </div>
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-garnet/25 to-transparent group-hover:via-gold/40 transition-all duration-500" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CHAINS MARQUEE ═══════════════ */}
      <MarqueeStrip
        items={["Solana", "Ethereum", "Avalanche", "Polygon", "Arbitrum", "Optimism", "Base", "Cosmos", "Polkadot", "Near", "Sui", "Aptos"]}
        reverse speed="slow"
      />

      {/* ═══════════════ FEATURED WORK ═══════════════ */}
      <section className="relative py-28 md:py-40 section-raised overflow-hidden">
        <div className="absolute inset-0 amber-bloom pointer-events-none opacity-60" />
        <div className="absolute inset-0 garnet-bloom-top pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionReveal>
                <span className="font-mono-hbm text-label-xs text-garnet/70 uppercase tracking-[0.35em]">
                  — Selected Work
                </span>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="font-cormorant text-display-lg text-cream/80 font-light mt-3">
                  Built to{" "}
                  <span className="text-gradient-gold font-bold italic">Last</span>
                </h2>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.2}>
              <Link href="/work"
                className="gold-outline-btn font-mono-hbm text-label-xs uppercase tracking-[0.2em] px-6 py-3 inline-block">
                View All Work
              </Link>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredWork.map((work, i) => (
              <SectionReveal key={work.title} delay={i * 0.1}>
                <div className="card-3d group relative h-[500px] md:h-[580px] overflow-hidden cursor-pointer bg-obsidian">
                  <Image
                    src={work.image} alt={work.title} fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05] opacity-45 group-hover:opacity-60"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/65 to-transparent" />
                  {/* Gold bloom on hover */}
                  <div className="absolute inset-0 bg-gold/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <span className="glass-panel-dark font-mono-hbm text-label-xs text-gold/70 uppercase tracking-[0.18em] px-3 py-1.5">
                        {work.category}
                      </span>
                      <span className="font-cormorant text-display-sm text-gold/80 font-bold">
                        {work.stat}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-cormorant text-display-sm text-cream/80 font-light mb-3 group-hover:text-gold transition-colors duration-400">
                        {work.title}
                      </h3>
                      <p className="font-mono-hbm text-[12px] text-silver/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 transform">
                        {work.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
                        <span className="font-mono-hbm text-label-xs text-gold/80 uppercase tracking-[0.2em]">View Case</span>
                        <div className="w-5 h-px bg-gold/60" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 inset-x-0 h-px bg-garnet/15 group-hover:bg-gold/35 transition-all duration-500" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT TEASER ═══════════════ */}
      <section className="relative py-28 md:py-40 section-mid overflow-hidden">
        <div className="absolute inset-0 purple-bloom pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
            alt="Architecture" fill
            className="object-cover object-left"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <SectionReveal>
              <span className="font-mono-hbm text-label-xs text-garnet/70 uppercase tracking-[0.35em]">
                — The Firm
              </span>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <h2 className="font-cormorant text-display-lg text-cream/80 font-light mt-4 mb-8 leading-none">
                We don&apos;t explain ourselves.{" "}
                <span className="text-gradient-gold italic font-bold">We perform.</span>
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <p className="font-mono-hbm text-body-md text-silver/50 leading-relaxed mb-6">
                HBM & Company operates as a private crypto holdings and protocol
                infrastructure firm. We invest in, incubate, and operate the
                foundational layers of decentralized finance — from base-layer
                protocols to institutional-grade treasury systems.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <p className="font-mono-hbm text-body-md text-silver-dim/40 leading-relaxed mb-14">
                Our portfolio spans L1 and L2 protocols, DeFi primitives, custody
                infrastructure, and regulatory-compliant institutional products
                across twelve jurisdictions. Every position is deliberate. Every
                protocol is built to outlast market cycles.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.4}>
              <Link href="/about"
                className="garnet-btn font-mono-hbm text-label-xs uppercase tracking-[0.2em] text-cream px-8 py-4 inline-block">
                About the Firm
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="relative py-36 md:py-52 section-dark overflow-hidden">
        {/* Deep center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[500px] rounded-full"
            style={{ background: "radial-gradient(ellipse, rgba(139,26,47,0.08) 0%, rgba(201,146,42,0.04) 40%, transparent 70%)" }} />
        </div>
        <div className="absolute inset-0 city-glow pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12 text-center">
          <SectionReveal>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-10 h-px bg-garnet/40" />
              <span className="font-mono-hbm text-label-xs text-garnet/60 uppercase tracking-[0.35em]">
                Selective Engagement
              </span>
              <div className="w-10 h-px bg-garnet/40" />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-cormorant text-display-xl text-cream/80 font-light mb-6 max-w-4xl mx-auto leading-none">
              If you already know what you&apos;re building,{" "}
              <span className="text-gradient-gold italic font-bold">let&apos;s talk.</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="font-mono-hbm text-body-md text-silver-dim/50 mb-14 max-w-md mx-auto">
              We work with founders, institutions, and protocols operating at
              the frontier. Introductions preferred.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <Link href="/contact"
              className="garnet-btn font-mono-hbm text-label-xs uppercase tracking-[0.25em] text-cream px-14 py-5 inline-block">
              Begin Engagement
            </Link>
          </SectionReveal>
    </div>
      </section>

      <FooterDark />
    </>
  );
}

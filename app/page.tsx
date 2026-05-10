"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionReveal from "@/components/SectionReveal";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import {
  IconTriptychWave,
  IconSamplerPads,
  IconDiffusionArcs,
  IconSessionRing,
  IconFaderBank,
  IconCompStacks,
  IconPrintMeter,
} from "@/components/IllustrativeIcons";

const suiteIconMap = {
  spatial: IconTriptychWave,
  sampler: IconSamplerPads,
  diffusion: IconDiffusionArcs,
} as const;

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
    title: "PostCarrier",
    description:
      "PostCarrier is Vanity’s specimen and timing rail for reproductive medicine — cold-chain custody, identity-grade chain of custody, and protocolized handoffs from collection through cryo, thaw, and procedure-ready release. Built for CLIA-grade reproducibility, not shipping labels.",
    tag: "Clinical Infrastructure",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1200&q=80",
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
    title: "LightRain",
    category: "Diffusion & Air",
    description:
      "Algorithmic plate and grain generators that scatter early reflections like weather — from drizzle ambience to cloud-burst swells, without smearing transients.",
    stat: "32 algorithms",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80",
    icon: "diffusion" as const,
  },
  {
    title: "52PickUp",
    category: "Sampler / Deck",
    description:
      "Pull artifacts or stems, slice polyphony across 52 launch targets, and print MIDI that remembers velocity curves and round-robins — a crate-digger's instrument with studio recall.",
    stat: "VST3 · AU",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80",
    icon: "sampler" as const,
  },
  {
    title: "ThreeWiseMen",
    category: "Spatial Harmonics",
    description:
      "A three-voice imaging matrix for mid/side sculpting, room glue, and side-chain-aware width — designed for mixes that breathe in headphones and translate on mains.",
    stat: "MPE-ready",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80",
    icon: "spatial" as const,
  },
];

const heroEase = [0.16, 1, 0.3, 1] as const;

export default function HomePage() {
  const reduceMotion = useReducedMotion();

  const heroT = reduceMotion ? { duration: 0.2 } : { duration: 0.88, ease: heroEase };

  const heroContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const heroItem = {
    hidden: reduceMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 36, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: heroT,
    },
  };

  return (
    <>
      <div className="font-robinhood font-normal tracking-normal antialiased home-robinhood">
      <NavBar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative flex min-h-screen flex-col justify-center pt-8 pb-16 md:pt-12 md:pb-20 lg:pt-14 lg:pb-24"
      >
        {/* City photo — overflow-hidden here only so headline/descenders aren’t clipped */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=90"
            alt="City skyline at night"
            fill
            className="object-cover object-center grayscale"
            priority
            unoptimized
          />
          <div className="grain-overlay-hero" aria-hidden="true" />
          {/* Heavy dark overlay — keep the photo but make it moodier */}
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/55 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/20 to-void/50" />
          <div className="absolute inset-0 hero-glow" />
          {/* Vignette corners */}
          <div className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(2,2,5,0.7) 100%)" }} />
        </div>

          <div
            className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[min(58vh,520px)] w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(180,175,170,0.11) 0%, rgba(2,2,5,0) 68%)",
            }}
            aria-hidden
          />

        <h1 className="sr-only">
          The Pursuit Of Excellence. HBM &amp; Company — a digital asset house;
          treasury, protocol layer, and institutional discretion.
        </h1>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-0 px-6 text-center md:px-12"
        >
          <motion.div variants={heroItem} className="mb-8 flex flex-col items-center md:mb-9">
            <span className="font-mono-hbm text-[9px] font-medium uppercase tracking-[0.42em] text-gold/55 md:text-[10px]">
              House · Treasury · Protocol layer
            </span>
            <motion.div
              aria-hidden
              initial={reduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { delay: 0.55, duration: 0.95, ease: heroEase }
              }
              style={{ originX: 0.5 }}
              className="mt-5 h-px w-[4.5rem] bg-gradient-to-r from-transparent via-gold/45 to-transparent md:mt-6 md:w-[5.5rem]"
            />
          </motion.div>

          <motion.div
            variants={heroItem}
            className="font-cormorant flex flex-wrap justify-center text-center text-[1.9rem] font-light leading-[1.06] text-cream/[0.97] sm:text-[2.25rem] md:text-[3.35rem] md:leading-[1.02] lg:text-[3.75rem] lg:leading-[1] [text-shadow:0_4px_48px_rgba(0,0,0,0.75)]"
          >
            <span className="inline-flex max-w-full flex-nowrap items-baseline justify-center gap-x-[0.35em]">
              <AnimatedHeadline text="The Pursuit" delay={0} nowrap />
              <AnimatedHeadline
                text="Of Excellence"
                delay={0}
                nowrap
                className="text-gradient-gold font-semibold italic [filter:drop-shadow(0_6px_32px_rgba(0,0,0,0.55))]"
              />
            </span>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="relative mt-10 w-full max-w-lg border-y border-white/[0.07] py-8 md:mt-11 md:max-w-2xl md:py-10 lg:max-w-3xl"
          >
            <p className="text-pretty font-cormorant text-[1.02rem] font-light italic leading-[1.62] text-cream/[0.86] md:text-[1.12rem] md:leading-[1.68]">
              We hold our assets as a house holds its workshop — with discretion,
              lineage, and a refusal of the easy gesture.
            </p>
            <p className="text-pretty mt-6 font-cormorant text-[1.05rem] font-normal leading-[1.65] text-cream/82 md:mt-7 md:text-[1.2rem] md:leading-[1.7]">
              We steward capital and protocol stakes with the same restraint one finds
              in the great&nbsp;houses: lineage over novelty, hand-finished judgment
              over algorithmic noise, and an intolerance for the merely fashionable.
              Compounding for counterparties who think in generations as readily as in
              quarters.
            </p>
          </motion.div>

          <motion.div variants={heroItem} className="mt-9 md:mt-10">
            <p className="font-mono-hbm text-[9px] uppercase tracking-[0.38em] text-silver-dim/55 md:text-[10px]">
              Duration · Precision · Patrimony
            </p>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-10 flex w-full flex-col items-center gap-4 md:mt-12"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                <Link
                  href="/treasury"
                  className="garnet-btn text-label-xs uppercase tracking-[0.22em] text-void inline-block px-9 py-2.5 transition-[box-shadow] duration-500 [box-shadow:0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] hover:[box-shadow:0_18px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.14),0_0_48px_rgba(180,175,170,0.07)]"
                >
                  Treasury
                </Link>
              </motion.div>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
              >
                <Link
                  href="/about"
                  className="gold-outline-btn text-label-xs uppercase tracking-[0.22em] inline-block px-9 py-2.5 shadow-[0_0_36px_rgba(0,0,0,0.4)]"
                >
                  The Company
                </Link>
              </motion.div>
            </div>
            <p className="font-mono-hbm text-[8px] uppercase tracking-[0.26em] text-silver-dim/42">
              By appointment · Never mass-market
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2 opacity-80"
        >
          <div className="w-px h-14 bg-gradient-to-b from-garnet/50 to-transparent animate-glow-pulse" />
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <MarqueeStrip items={marqueeItems} />

      {/* ═══════════════ SERVICES BENTO ═══════════════ */}
      <section className="relative py-28 md:py-40 section-mid overflow-hidden">
        <div className="absolute inset-0 purple-bloom pointer-events-none" />
        <div className="absolute inset-0 city-glow pointer-events-none opacity-35" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionReveal>
                <span className="text-label-xs text-garnet/70 uppercase tracking-[0.35em]">
                  — What We Build
                </span>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl text-cream/80 font-light mt-3 leading-tight">
                  Protocol{" "}
                  <span className="text-gradient-gold font-bold italic">Infrastructure</span>
                </h2>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.2}>
              <p className="text-body-md text-silver-dim/78 max-w-xs leading-relaxed">
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
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-void/60 to-transparent" />
                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-label-xs text-garnet/60 tracking-[0.25em] uppercase">{services[0].id}</span>
                    <div className="w-6 h-px bg-garnet/30" />
                    <span className="text-label-xs text-gold/60 uppercase tracking-[0.2em]">{services[0].tag}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl text-cream/80 font-normal mb-3 group-hover:text-gold transition-colors duration-500 leading-tight">
                    {services[0].title}
                  </h3>
                  <p className="text-body-md text-silver-dim/78 max-w-2xl leading-relaxed">
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
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/85 to-void/30" />
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-label-xs text-garnet/50 uppercase tracking-[0.2em]">{svc.id}</span>
                      <span className="text-label-xs text-gold/40 uppercase tracking-[0.15em]">{svc.tag}</span>
                    </div>
                    <h3 className="text-lg md:text-xl text-cream/80 font-normal mb-2 group-hover:text-gold transition-colors duration-500 leading-tight">
                      {svc.title}
                    </h3>
                    <p className="text-[13px] text-silver-dim/72 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 translate-y-2 group-hover:translate-y-0 transform">
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
        <div className="absolute inset-0 amber-bloom pointer-events-none opacity-35" />
        <div className="absolute inset-0 garnet-bloom-top pointer-events-none" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionReveal>
                <span className="text-label-xs text-garnet/70 uppercase tracking-[0.35em]">
                  — The Suite
                </span>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl text-cream/80 font-light mt-3 leading-tight">
                  Tuned for{" "}
                  <span className="text-gradient-gold font-bold italic">the session</span>
                </h2>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.2}>
              <Link href="/work"
                className="gold-outline-btn text-label-xs uppercase tracking-[0.2em] px-6 py-3 inline-block">
                View all instruments
              </Link>
            </SectionReveal>
          </div>

          <div
            className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-3 [grid-auto-flow:dense]"
            style={{ gridAutoRows: "minmax(0, auto)" }}
          >
            {featuredWork.map((work, i) => {
              const WorkIcon = suiteIconMap[work.icon];
              return (
                <SectionReveal
                  key={work.title}
                  className={clsx(
                    i === 0 &&
                      "md:col-span-7 md:row-span-2 md:row-start-1 md:col-start-1 md:min-h-[520px]",
                    i === 1 &&
                      "md:col-span-5 md:row-start-1 md:col-start-8 md:min-h-[254px]",
                    i === 2 &&
                      "md:col-span-5 md:row-start-2 md:col-start-8 md:min-h-[254px]"
                  )}
                >
                  <div
                    className={clsx(
                      "card-3d group relative h-full min-h-[380px] overflow-hidden cursor-pointer bg-obsidian",
                      i === 0 ? "md:min-h-[520px]" : "md:min-h-[254px]"
                    )}
                  >
                    <div className="pointer-events-none absolute right-5 top-5 z-10 rounded-xl border border-white/[0.08] bg-void/55 p-3 backdrop-blur-sm transition-colors duration-500 group-hover:border-gold/25">
                      <WorkIcon className="h-11 w-11 text-gold/40 transition-colors duration-500 group-hover:text-gold" />
                    </div>
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover object-center transition-all duration-700 group-hover:scale-[1.05]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/65 to-transparent" />
                    <div className="absolute inset-0 bg-gold/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
                      <div className="flex justify-between items-start gap-12 pr-14">
                        <span className="glass-panel-dark text-label-xs text-gold/70 uppercase tracking-[0.18em] px-3 py-1.5">
                          {work.category}
                        </span>
                        <span
                          className={clsx(
                            "shrink-0 text-lg font-semibold tabular-nums md:text-xl",
                            work.stat.includes("$")
                              ? "text-digital-80s [text-shadow:0_0_14px_rgba(34,232,200,0.42),0_0_32px_rgba(34,232,200,0.18)]"
                              : "text-gold/80"
                          )}
                        >
                          {work.stat}
                        </span>
                      </div>
                      <div>
                        <h3 className="mb-3 text-lg font-normal leading-tight text-cream/80 transition-colors duration-400 group-hover:text-gold md:text-xl">
                          {work.title}
                        </h3>
                        <p className="translate-y-2 text-[12px] leading-relaxed text-silver/72 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 transform">
                          {work.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 opacity-0 transition-all delay-75 duration-500 group-hover:opacity-100">
                          <span className="text-label-xs uppercase tracking-[0.2em] text-gold/80">
                            Open details
                          </span>
                          <div className="h-px w-5 bg-gold/60" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 top-0 h-px bg-garnet/15 transition-all duration-500 group-hover:bg-gold/35" />
                  </div>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ Consequence (music) — mid band ═══════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40 section-mid">
        <div className="pointer-events-none absolute inset-0 purple-bloom" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80"
            alt=""
            fill
            className="object-cover object-left"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-12">
          <div className="flex flex-col gap-10">
            <header className="flex flex-col items-center gap-3">
              <div className="flex w-full max-w-md items-center justify-center gap-4">
                <div className="h-px max-w-[4rem] flex-1 bg-garnet/40" />
                <span className="shrink-0 text-label-xs uppercase tracking-[0.35em] text-garnet/60">
                  Consequence
                </span>
                <div className="h-px max-w-[4rem] flex-1 bg-garnet/40" />
              </div>
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.32em] text-silver-dim/35">
                Session · Edit · Mix · Print
              </p>
            </header>

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
              <div className="flex flex-col space-y-6 text-center lg:col-span-7 lg:text-left">
                <h2 className="text-2xl font-light leading-snug text-cream/80 md:text-3xl lg:text-[2.25rem]">
                  When the loop grid goes quiet, what&apos;s left is the{" "}
                  <span className="text-gradient-gold font-bold italic">take.</span>
                </h2>
                <p className="text-lg font-light leading-relaxed text-cream/70 md:text-xl">
                  <span className="font-semibold text-cream/85">Consequence</span> is the room
                  you build at two in the morning — metering you read by reflex, buses that breathe
                  with the song, and a timeline that bends around feel instead of snapping it cold.
                </p>
                <p className="mx-auto max-w-xl text-body-md leading-[1.85] text-silver-dim/75 lg:mx-0">
                  One clock for tracking, comping, and stem architecture: latch a reel-style comp
                  stack, print parallel grit without losing recall, and keep overdubs low-latency
                  enough to chase a vocal before the bleed decays.
                </p>
                <p className="mx-auto max-w-xl text-[13px] italic leading-[1.8] text-silver-dim/68 lg:mx-0">
                  For producers and engineers who care about what survives the car test, the club
                  PA, and the morning-after listen — not just the screenshot.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
                {[
                  { Icon: IconSessionRing, t: "Session", s: "Tracking ring · clock discipline" },
                  { Icon: IconCompStacks, t: "Comp", s: "Reel-style lanes · recall-safe" },
                  { Icon: IconFaderBank, t: "Mix bus", s: "Faders · parallel grit" },
                  { Icon: IconPrintMeter, t: "Print", s: "Stem-safe · final meter" },
                ].map(({ Icon, t, s }) => (
                  <div
                    key={t}
                    className="group/icon flex min-h-[132px] flex-col justify-between rounded-2xl border border-white/[0.07] bg-gradient-to-b from-obsidian/90 to-void/95 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-colors duration-500 hover:border-gold/20"
                  >
                    <Icon className="h-12 w-12 text-gold/35 transition-colors duration-500 group-hover/icon:text-gold/75" />
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/75">
                        {t}
                      </p>
                      <p className="mt-1 text-[10px] leading-snug tracking-wide text-silver-dim/62">
                        {s}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <Link
                href="/contact"
                className="garnet-btn inline-block px-14 py-5 text-label-xs uppercase tracking-[0.25em] text-void"
              >
                Get Consequence
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ The Firm / PostCarrier — dark band ═══════════════ */}
      <section className="relative overflow-hidden py-36 md:py-52 section-dark">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-[500px] w-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(135,133,130,0.09) 0%, rgba(190,188,185,0.05) 40%, transparent 70%)",
            }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 city-glow" />

        <div className="relative z-10 mx-auto max-w-2xl px-6 md:px-12">
          <SectionReveal>
            <span className="text-label-xs uppercase tracking-[0.35em] text-garnet/70">
              — The Firm
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="mt-4 mb-8 text-2xl font-light leading-tight text-cream/80 md:text-3xl">
              We don&apos;t explain ourselves.{" "}
              <span className="text-gradient-gold font-bold italic">We deliver.</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mb-6 text-body-md leading-relaxed text-silver/72">
              PostCarrier operates as a decentralized file storage and video communication
              infrastructure company. We build the foundational layer for persistent,
              encrypted content delivery — from individual postcards to institutional
              archive systems, all anchored to Filecoin.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <p className="mb-6 text-body-md leading-relaxed text-silver-dim/68">
              Our platform spans content-addressed storage, real-time video editing,
              collaborative transmission, and regulatory-compliant custody across three
              continents. Every file is immutable. Every transmission is verifiable. Every
              architecture decision prioritizes permanence over trend.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.35}>
            <p className="mb-10 text-body-md font-medium leading-relaxed text-silver/75">
              We are not a consumer app. We are settlement infrastructure.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.4}>
            <Link
              href="/about"
              className="garnet-btn inline-block px-8 py-4 text-label-xs uppercase tracking-[0.2em] text-void"
            >
              The Company
            </Link>
          </SectionReveal>
        </div>
      </section>

      <FooterDark typography="robinhood" />
      </div>
    </>
  );
}

"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionReveal from "@/components/SectionReveal";
import ServiceCardPixelArt from "@/components/ServiceCardPixelArt";
import type { ServiceCardPixelVariant } from "@/components/ServiceCardPixelArt";
import FeaturedWorkPixelArt from "@/components/FeaturedWorkPixelArt";
import type { FeaturedWorkPixelVariant } from "@/components/FeaturedWorkPixelArt";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import PostCarrierEditorMockup from "@/components/PostCarrierEditorMockup";
import {
  IconSessionRing,
  IconFaderBank,
  IconCompStacks,
  IconPrintMeter,
} from "@/components/IllustrativeIcons";

const whatWeBuildItems: {
  id: string;
  title: string;
  description: string;
  tag: string;
  pixelVariant: ServiceCardPixelVariant;
  externalHref?: string;
}[] = [
  {
    id: "01",
    title: "LightRain",
    description:
      "Algorithmic plate and grain generators that scatter early reflections like weather — from drizzle ambience to cloud-burst swells, without smearing transients.",
    tag: "Diffusion & Air",
    pixelVariant: "lightrain",
  },
  {
    id: "02",
    title: "Moneyba.gg",
    description:
      "Non-custodial wallet: keys remain yours — device-bound signing, multi-chain support, and no third-party custody between you and settlement.",
    tag: "Non-custodial wallet",
    pixelVariant: "moneyba",
    externalHref: "https://moneyba.gg",
  },
];

const featuredWork: {
  title: string;
  category: string;
  description: string;
  stat: string;
  pixelVariant: FeaturedWorkPixelVariant;
}[] = [
  {
    title: "Black Letter",
    category: "Type & Notation",
    description:
      "Fractured blackletter envelopes and stem-weight motion — press-heavy transients, controlled ink-bleed tails, and phrase-wide arcs that yield to bar-line discipline when you commit the take.",
    stat: "Glyph-grade",
    pixelVariant: "black-letter",
  },
  {
    title: "52PickUp",
    category: "Sampler / Deck",
    description:
      "Pull artifacts or stems, slice polyphony across 52 launch targets, and print MIDI that remembers velocity curves and round-robins — a crate-digger's instrument with studio recall.",
    stat: "VST3 · AU",
    pixelVariant: "pickup",
  },
  {
    title: "ThreeWiseMen",
    category: "Spatial Harmonics",
    description:
      "A three-voice imaging matrix for mid/side sculpting, room glue, and side-chain-aware width — designed for mixes that breathe in headphones and translate on mains.",
    stat: "MPE-ready",
    pixelVariant: "spatial",
  },
];

const heroEase = [0.16, 1, 0.3, 1] as const;

export default function HomePageClient({ cryptoMarqueeSlot }: { cryptoMarqueeSlot: ReactNode }) {
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
        className="relative flex min-h-screen flex-col justify-start pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-[6.25rem] lg:pb-24"
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
          className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-0 px-6 text-center md:px-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-7 lg:px-12 lg:text-left xl:gap-x-14 xl:gap-y-9"
        >
          <motion.div variants={heroItem} className="mb-4 flex w-full flex-col items-center md:mb-5 lg:col-span-12 lg:mb-0">
            <span className="font-mono-hbm text-[9px] font-medium uppercase tracking-[0.42em] text-gold/55 md:text-[10px]">
              House · Treasury · Protocol layer
            </span>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-headline font-cormorant font-light text-cream/[0.97] [text-shadow:0_4px_48px_rgba(0,0,0,0.75)] lg:col-span-12 lg:mt-0"
          >
            <span className="inline-flex max-w-full flex-nowrap items-baseline justify-center gap-x-[0.35em] lg:justify-center">
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
            className="hero-editorial-visual mt-4 w-full max-w-[234px] sm:mt-5 sm:max-w-[268px] lg:col-span-5 lg:row-start-3 lg:mt-0 lg:max-w-[min(100%,300px)] xl:max-w-[min(100%,324px)] lg:justify-self-start"
          >
            <div
              className="hero-editorial-visual-frame relative aspect-[4/5] w-full overflow-hidden"
              role="img"
              aria-label="Editorial image placeholder"
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-white/[0.04]"
                aria-hidden
              />
              <div
                className="absolute inset-[1px] border border-dashed border-white/15 bg-void/30"
                aria-hidden
              />
            </div>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-prose relative mt-10 w-full max-w-lg border-y border-white/[0.07] py-8 text-left md:mt-11 md:max-w-2xl md:py-10 lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:mt-0 lg:max-w-none lg:border-y-0 lg:py-6 lg:pb-1 lg:pl-10 lg:pr-0 xl:pb-1.5 xl:pl-12 -translate-y-6 md:-translate-y-7 lg:-translate-y-10 xl:-translate-y-12"
          >
            <p className="text-pretty font-cormorant text-[1.15rem] font-light italic leading-[1.62] text-cream/[0.5] md:text-[1.28rem] md:leading-[1.66] md:text-cream/[0.56]">
              We hold our assets as a house holds its workshop — with discretion,
              lineage, and a refusal of the easy gesture.
            </p>
            <p className="text-pretty mt-6 font-cormorant text-[1.18rem] font-normal leading-[1.65] text-silver/38 md:mt-7 md:text-[1.32rem] md:leading-[1.68] md:text-silver/44">
              We steward capital with the same restraint one finds
              in the great&nbsp;houses: lineage over novelty, hand-finished judgment
              over algorithmic noise, and an intolerance for the merely fashionable.
              Compounding for counterparties who think in generations as readily as in
              quarters.
            </p>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-pillars mt-6 w-full text-right md:mt-7 lg:col-span-5 lg:row-start-4 lg:mt-0 lg:self-end lg:text-left -translate-y-3 md:-translate-y-4 lg:-translate-y-8 xl:-translate-y-9"
          >
            <p className="font-mono-hbm text-[9px] uppercase tracking-[0.38em] text-silver-dim/55 md:text-[10px]">
              Duration · Precision · Patrimony
            </p>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-cta-cluster mt-6 flex w-full flex-col items-start gap-4 md:mt-8 lg:col-span-7 lg:col-start-6 lg:row-start-4 lg:mt-0 lg:pl-10 lg:-mt-16 xl:pl-12 xl:-mt-24 -translate-y-3 md:-translate-y-4 lg:-translate-y-8 xl:-translate-y-9"
          >
            <div className="flex flex-wrap items-center justify-start gap-3 md:gap-4">
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
      {cryptoMarqueeSlot}

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
                  <span className="text-gradient-gold font-bold italic">LightRain</span>
                  <span className="text-cream/65"> · Diffusion &amp; air</span>
                </h2>
                <p className="mt-3 font-mono-hbm text-[10px] uppercase tracking-[0.2em] text-silver-dim/50 max-w-lg leading-relaxed">
                  Moneyba.gg — non-custodial wallet · self-custody rails
                </p>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.2}>
              <Link
                href="https://moneyba.gg"
                target="_blank"
                rel="noopener noreferrer"
                className="gold-outline-btn text-label-xs uppercase tracking-[0.2em] px-6 py-3 inline-block"
              >
                Moneyba.gg
              </Link>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {whatWeBuildItems.map((item, i) => {
              const shell =
                "card-3d group relative min-h-[420px] md:min-h-[480px] overflow-hidden cursor-pointer bg-obsidian";
              const inner = (
                <>
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
                    aria-hidden
                  >
                    <ServiceCardPixelArt variant={item.pixelVariant} />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-void/60 to-transparent" />
                  <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-label-xs text-garnet/60 tracking-[0.25em] uppercase">{item.id}</span>
                      <div className="w-6 h-px bg-garnet/30" />
                      <span className="text-label-xs text-gold/60 uppercase tracking-[0.2em]">{item.tag}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl text-cream/80 font-normal mb-3 group-hover:text-gold transition-colors duration-500 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-silver-dim/78 leading-relaxed">
                      {item.description}
                    </p>
                    {item.externalHref && (
                      <p className="mt-4 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-digital-80s/75">
                        Open moneyba.gg ↗
                      </p>
                    )}
                  </div>
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-garnet/40 to-transparent group-hover:via-gold/50 transition-all duration-500" />
                </>
              );
              return (
                <SectionReveal key={item.id} delay={0.08 + i * 0.06}>
                  {item.externalHref ? (
                    <a
                      href={item.externalHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${shell} block`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={shell}>{inner}</div>
                  )}
                </SectionReveal>
              );
            })}
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
                    <div
                      className="absolute inset-0 transition-all duration-700 group-hover:scale-[1.05]"
                      aria-hidden
                    >
                      <FeaturedWorkPixelArt variant={work.pixelVariant} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/65 to-transparent" />
                    <div className="absolute inset-0 bg-gold/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7">
                      <div className="flex justify-between items-start gap-6">
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

      {/* ═══════════════ Post Carrier — dark band (immersive two-column) ═══════════════ */}
      <section className="relative overflow-hidden py-36 md:py-52 section-dark">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180,175,170,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,175,170,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black 12%, transparent 68%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 60% at 50% 30%, black 12%, transparent 68%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_15%_25%,rgba(34,232,200,0.08)_0%,transparent_58%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_92%_70%,rgba(180,175,170,0.075)_0%,transparent_52%)]"
          aria-hidden
        />
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
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.11] mix-blend-soft-light"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.018) 3px, rgba(255,255,255,0.018) 4px)",
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-[1180px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
            <div className="space-y-8 md:space-y-10">
              <div>
                <SectionReveal>
                  <span className="text-label-xs uppercase tracking-[0.35em] text-garnet/70">
                    — Post Carrier
                  </span>
                </SectionReveal>
                <SectionReveal delay={0.1}>
                  <h2 className="mt-4 text-2xl font-light leading-tight text-cream/80 md:text-3xl">
                    We don&apos;t explain ourselves.{" "}
                    <span className="text-gradient-gold font-bold italic">We deliver.</span>
                  </h2>
                </SectionReveal>
              </div>

              <SectionReveal delay={0.15}>
                <PostCarrierEditorMockup />
              </SectionReveal>
            </div>

            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <SectionReveal delay={0.12}>
                <blockquote className="relative overflow-hidden rounded-2xl border border-gold/[0.12] bg-gradient-to-b from-obsidian/85 to-void/92 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-7">
                  <div
                    className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-digital-80s/15 blur-2xl"
                    aria-hidden
                  />
                  <p className="relative font-cormorant text-xl font-light italic leading-snug text-cream/72 md:text-2xl">
                    Permanence over trend — settlement-grade infrastructure, not a trend cycle.
                  </p>
                </blockquote>
              </SectionReveal>

              <SectionReveal delay={0.18}>
                <div className="overflow-hidden rounded-2xl border border-white/[0.06] divide-y divide-white/[0.05]">
                  {[
                    { t: "Immutable", d: "Every file is immutable." },
                    { t: "Verifiable", d: "Every transmission is verifiable." },
                    { t: "Anchored", d: "Filecoin — durable commitment, not disposable cloud." },
                  ].map((row, idx) => (
                    <div
                      key={row.t}
                      className="flex gap-4 bg-void/25 px-4 py-4 transition-colors duration-300 hover:bg-void/45 md:px-5 md:py-4"
                    >
                      <span className="w-7 shrink-0 pt-0.5 font-mono-hbm text-[10px] tabular-nums text-digital-80s/90">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-mono-hbm text-label-xs uppercase tracking-[0.2em] text-gold/50">
                          {row.t}
                        </p>
                        <p className="mt-1 text-[13px] leading-relaxed text-silver-dim/64">{row.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal delay={0.22}>
                <div className="rounded-xl border border-digital-80s/20 bg-digital-80s/[0.04] px-5 py-4">
                  <p className="text-body-md font-medium leading-relaxed text-silver/78">
                    We are not a consumer app.{" "}
                    <span className="text-cream/88">We are settlement infrastructure.</span>
                  </p>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.28}>
                <Link
                  href="/about"
                  className="garnet-btn inline-block px-8 py-4 text-label-xs uppercase tracking-[0.2em] text-void"
                >
                  Special Delivery
                </Link>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <FooterDark typography="robinhood" />
    </div>
    </>
  );
}

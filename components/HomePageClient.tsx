"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import FooterBrandVotingGrid from "@/components/FooterBrandVotingGrid";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionReveal from "@/components/SectionReveal";
import CardLinocutArt from "@/components/CardLinocutArt";
import type { CardLinocutVariant } from "@/components/CardLinocutArt";
import AnimatedHeadline from "@/components/AnimatedHeadline";
import BrandBandCardChrome from "@/components/BrandBandCardChrome";
import HeroNewsCarousel from "@/components/HeroNewsCarousel";
import {
  IconSessionRing,
  IconCompStacks,
  IconCollab,
  IconTrade,
  IconStaking,
  IconRadio,
} from "@/components/IllustrativeIcons";

const whatWeBuildItems: {
  id: string;
  title: string;
  description: string;
  tag: string;
  pixelVariant: CardLinocutVariant;
  externalHref?: string;
}[] = [
  {
    id: "01",
    title: "LightRain",
    description:
      "Bloomberg Terminal-style iOS observability for Base (Coinbase L2). Real-time on-chain analytics, portfolio risk metrics, and a PIOL oracle bridging off-chain data — read-only by design. Pure information density, no decoration.",
    tag: "On-chain intelligence",
    pixelVariant: "lightrain",
  },
  {
    id: "02",
    title: "MoneyBagg",
    description:
      "Cross-chain portfolio tracker and wallet aggregator. One dashboard — all balances, all chains. Non-custodial, bold, and built for people who want one answer: how much do I have and where is it?",
    tag: "Multi-Chain Balance",
    pixelVariant: "moneyba",
    externalHref: "https://moneyba.gg",
  },
];

type WhatWeBuildItem = (typeof whatWeBuildItems)[number];

const whatWeBuildOutlineCta =
  "gold-outline-btn inline-block px-4 py-1.5 text-label-xs uppercase tracking-[0.2em] sm:px-5 sm:py-2";

function WhatWeBuildInstrumentCard({ item }: { item: WhatWeBuildItem }) {
  const shell = clsx(
    "card-3d group relative flex h-full min-h-[min(52vh,420px)] w-full flex-1 flex-col overflow-hidden cursor-pointer bg-obsidian",
    "lg:min-h-[min(64vh,560px)]",
  );
  const inner = (
    <>
      <div
        className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]"
        aria-hidden
      >
        <CardLinocutArt variant={item.pixelVariant} hidePlaceholderUntilHover />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/80 to-void/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/60 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 transition-opacity duration-300 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:group-active:opacity-100">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-label-xs uppercase tracking-[0.25em] text-garnet/60">{item.id}</span>
          <div className="h-px w-6 bg-garnet/30" />
          <span className="text-label-xs uppercase tracking-[0.2em] text-gold/60">{item.tag}</span>
        </div>
        <h3 className="mb-3 text-xl font-normal leading-tight text-cream/80 transition-colors duration-500 group-hover:text-gold md:text-2xl">
          {item.title}
        </h3>
        <p className="text-body-md leading-relaxed text-silver-dim/78">{item.description}</p>
        {item.externalHref ? (
          <span className={clsx(whatWeBuildOutlineCta, "mt-4 w-fit")}>
            Open {item.title} ↗
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-garnet/40 to-transparent transition-all duration-500 group-hover:via-gold/50" />
    </>
  );

  if (item.externalHref) {
    return (
      <a
        href={item.externalHref}
        target="_blank"
        rel="noopener noreferrer"
        className={clsx(
          shell,
          "block h-full min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        )}
      >
        {inner}
      </a>
    );
  }
  return (
    <div
      className={clsx(
        shell,
        "min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
      )}
      tabIndex={0}
    >
      {inner}
    </div>
  );
}

const featuredWork: {
  title: string;
  category: string;
  description: string;
  stat: string;
  pixelVariant: CardLinocutVariant;
}[] = [
  {
    title: "BlackLetter",
    category: "Document Execution",
    description:
      "Premium document signing and notarization with chain-of-custody integrity. Treats execution as a permanent act — not a casual click. Dark, typographic, and authoritative. DocuSign if it were designed by a constitutional archivist.",
    stat: "On-chain notarized",
    pixelVariant: "black-letter",
  },
  {
    title: "52PickUp",
    category: "DeFi Yield Discovery",
    description:
      "Gamified yield farming and staking discovery across protocols and chains. Opportunities surface as a sortable deck — by APY, risk, TVL, and chain. Playful interaction model, serious data. Casino meets trading floor.",
    stat: "Multi-chain",
    pixelVariant: "pickup",
  },
  {
    title: "ThreeWiseMen",
    category: "On-Chain Gifting",
    description:
      "Stellar Lumens (XLM) gifting with a persistent on-chain ledger. Send XLM for birthdays, holidays, milestones through a warm, intentional interface. Every gift is permanently recorded. Venmo meets a greeting card, settled on Stellar.",
    stat: "Stellar / XLM",
    pixelVariant: "spatial",
  },
];

type FeaturedWorkItem = (typeof featuredWork)[number];

/** Suite instruments shown together: 52PickUp, ThreeWiseMen — one row, two cards. */
const SUITE_SECTION_ORDER = ["pickup", "spatial"] as const satisfies readonly CardLinocutVariant[];

const suiteSections: FeaturedWorkItem[] = SUITE_SECTION_ORDER.map((pv) => {
  const item = featuredWork.find((w) => w.pixelVariant === pv);
  if (!item) throw new Error(`Missing featured work for variant: ${pv}`);
  return item;
});

function FeaturedSuiteInstrumentCard({ work }: { work: FeaturedWorkItem }) {
  return (
    <div
      className={clsx(
        "card-3d group relative h-full w-full min-h-[min(48vh,380px)] overflow-hidden cursor-pointer bg-obsidian outline-none focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        "lg:min-h-[min(58vh,520px)]",
      )}
      tabIndex={0}
    >
      <div className="absolute inset-0 transition-all duration-700 group-hover:scale-[1.05]" aria-hidden>
        <CardLinocutArt variant={work.pixelVariant} hidePlaceholderUntilHover />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/65 to-transparent" />
      <div className="absolute inset-0 bg-gold/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-7 transition-opacity duration-300 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:group-active:opacity-100">
        <div className="flex justify-between items-start gap-6">
          <span className="glass-panel-dark text-label-xs text-gold/70 uppercase tracking-[0.18em] px-3 py-1.5">
            {work.category}
          </span>
          <span
            className={clsx(
              "shrink-0 text-lg font-semibold tabular-nums md:text-xl",
              work.stat.includes("$")
                ? "text-digital-80s [text-shadow:0_0_14px_rgba(34,232,200,0.42),0_0_32px_rgba(34,232,200,0.18)]"
                : "text-gold/80",
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
            <span className="text-label-xs uppercase tracking-[0.2em] text-gold/80">Open details</span>
            <div className="h-px w-5 bg-gold/60" />
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-garnet/15 transition-all duration-500 group-hover:bg-gold/35" />
    </div>
  );
}

const heroEase = [0.16, 1, 0.3, 1] as const;

export default function HomePageClient({ cryptoMarqueeSlot }: { cryptoMarqueeSlot: ReactNode }) {
  const reduceMotion = useReducedMotion() === true;

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

  /* Keep opacity at 1 in "hidden" so a stuck variant never leaves the hero blank (hydration / FM edge cases). */
  const heroItem = {
    hidden: reduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 1, y: 32, filter: "blur(10px)" },
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
        className="relative flex min-h-screen min-h-[100dvh] flex-col justify-start pt-[calc(env(safe-area-inset-top,0px)+6rem)] pb-[max(4rem,env(safe-area-inset-bottom,1rem))] md:pt-[calc(env(safe-area-inset-top,0px)+7rem)] md:pb-[max(5rem,env(safe-area-inset-bottom,1rem))] lg:pt-[calc(env(safe-area-inset-top,0px)+6.25rem)] lg:pb-[max(6rem,env(safe-area-inset-bottom,1rem))]"
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
          The Pursuit Of Exception. HBM &amp; Company — a digital asset house;
          treasury, protocol layer, and institutional discretion.
        </h1>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-0 pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] text-center md:px-12 md:translate-x-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-7 lg:px-12 lg:text-left lg:translate-x-12 xl:translate-x-16 xl:gap-x-14 xl:gap-y-9"
        >
          <motion.div variants={heroItem} className="mb-4 flex w-full flex-col items-center md:mb-5 lg:col-span-12 lg:mb-0">
            <span className="font-mono-hbm text-[9px] font-medium uppercase tracking-[0.42em] text-gold/55 md:text-[10px]">
              House · Treasury · Protocol layer
            </span>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-quote-serif hero-editorial-headline font-cormorant font-light text-cream/[0.44] [text-shadow:0_3px_32px_rgba(0,0,0,0.42)] lg:col-span-12 lg:mt-0"
          >
            <span className="inline-flex max-w-full flex-nowrap items-baseline justify-center gap-x-[0.35em] lg:justify-center">
              <AnimatedHeadline text="The Pursuit" delay={0} nowrap />
              <AnimatedHeadline
                text="Of Exception"
                delay={0}
                nowrap
                className="font-semibold italic text-cream/[0.48] [filter:drop-shadow(0_4px_24px_rgba(0,0,0,0.35))]"
              />
            </span>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-visual mt-4 w-full max-w-[min(100%,320px)] sm:mt-5 sm:max-w-[min(100%,380px)] lg:col-span-5 lg:row-start-3 lg:mt-0 lg:max-w-[min(100%,440px)] xl:max-w-[min(100%,460px)] lg:justify-self-start"
          >
            <BrandBandCardChrome className="flex h-auto min-h-[420px] flex-col px-4 pt-5 pb-3 sm:min-h-0 md:px-5 md:pt-6 md:pb-3.5 lg:px-6 lg:pt-7 lg:pb-4">
              <HeroNewsCarousel />
            </BrandBandCardChrome>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-prose hero-editorial-quote-serif relative mt-10 w-full max-w-lg border-y border-white/[0.07] py-8 text-left md:mt-11 md:max-w-2xl md:py-10 lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:mt-0 lg:max-w-none lg:border-y-0 lg:py-6 lg:pb-1 lg:pl-10 lg:pr-0 xl:pb-1.5 xl:pl-12 -translate-y-6 md:-translate-y-7 lg:-translate-y-10 xl:-translate-y-12"
          >
            <p className="hero-editorial-luxury-prose max-w-[35ch] text-pretty text-[1.18rem] font-light leading-[1.38] tracking-[-0.017em] text-cream/52 antialiased md:text-[1.34rem] md:leading-[1.42] md:text-cream/56">
              <span className="float-left mr-3 mt-1 text-[3.45rem] font-semibold leading-[0.78] tracking-[-0.05em] text-gold/66 md:text-[4.125rem]">
                H
              </span>
              olding our firm to rigorous standards of performance and precision - with respect to
              great expectations and stewardship on behalf of our clients.
            </p>
            <p className="hero-editorial-luxury-prose mt-6 max-w-[42ch] text-pretty border-t border-white/[0.07] pt-5 text-[1.02rem] font-light leading-[1.58] tracking-[-0.01em] text-cream/62 antialiased md:mt-7 md:max-w-[48ch] md:pt-6 md:text-[1.1rem] md:leading-[1.62] md:text-cream/66">
              Our Legacy is built into the results and precedents of our craft—the outcomes we defend and the record that
              preserves them across mandates. Integrated governance holds that posture in place with
              an unyielding architecture of protocol, principle, and procedure.
            </p>
            <div className="mt-6 inline-block rounded-md bg-white/[0.06] px-2 pb-px pt-0 md:mt-7">
              <span className="font-mono-hbm text-[8px] uppercase leading-none tracking-[0.34em] text-gold/58 md:text-[9px]">
                memorandum
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-pillars mt-6 w-full text-right md:mt-7 lg:col-span-5 lg:row-start-4 lg:mt-0 lg:self-end lg:text-left -translate-y-3 md:-translate-y-4 lg:-translate-y-8 xl:-translate-y-9"
          >
            <p className="font-mono-hbm text-[9px] uppercase tracking-[0.38em] text-silver-dim/55 md:text-[10px]">
              Duration · Precision · Patrimony
            </p>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-[max(2.5rem,env(safe-area-inset-bottom,0px)+0.5rem)] right-[max(2.5rem,env(safe-area-inset-right,0px))] z-10 flex flex-col items-center gap-2 opacity-80 max-md:scale-90"
        >
          <div className="w-px h-14 bg-gradient-to-b from-garnet/50 to-transparent animate-glow-pulse" />
        </div>

        {/* Blend hero image into the next void band (no hard rule line) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-28 bg-gradient-to-b from-transparent via-void/75 to-void sm:h-32 md:h-40"
          aria-hidden
        />
      </section>

      {/* ═══════════════ Request access — below hero ═══════════════ */}
      <section className="relative overflow-x-hidden bg-void" aria-label="Request access to the voting protocol">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 md:py-14">
          <FooterBrandVotingGrid
            typography="robinhood"
            instanceId="home-below-hero"
            brandSide="left"
            band="default"
            defaultEditorialAlignEnd={false}
            showLogo={false}
          />
        </div>
      </section>

      {/* ═══════════════ MARQUEE ═══════════════ */}
      {cryptoMarqueeSlot}

      {/* ═══════════════ WHAT WE BUILD — LightRain & MoneyBagg, side by side ═══════════════ */}
      <section className="relative flex min-h-0 flex-col justify-center overflow-hidden section-mid py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 purple-bloom" />
        <div className="pointer-events-none absolute inset-0 city-glow opacity-35" />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="mb-10 md:mb-14">
            <SectionReveal>
              <span className="text-label-xs uppercase tracking-[0.35em] text-garnet/70">— What We Build</span>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch md:gap-x-8 md:gap-y-10 xl:gap-x-10">
            {whatWeBuildItems.map((item, itemIndex) => (
              <div
                key={item.id}
                className={clsx(
                  "flex h-full min-h-0 flex-col",
                  itemIndex > 0 && "border-t border-white/[0.06] pt-12 md:border-t-0 md:pt-0",
                )}
              >
                <div
                  className={clsx(
                    "mb-8 flex shrink-0 flex-col justify-between gap-6 sm:mb-10 md:min-h-[10.25rem] md:flex-row md:items-end",
                  )}
                >
                  <div>
                    <SectionReveal delay={itemIndex * 0.06}>
                      {item.pixelVariant === "lightrain" ? (
                        <>
                          <h2 className="text-xl font-light leading-tight text-cream/80 md:text-2xl">
                            <span className="font-bold italic">LightRain</span>
                            <span className="text-cream/65"> · Credit / Debit</span>
                          </h2>
                          <p className="mt-2.5 max-w-lg font-mono-hbm text-[9px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/50 md:mt-3 md:text-[9.5px] md:tracking-[0.2em]">
                            Inflows, outflows &amp; ledger lines — read-only observability on Base · PIOL oracle rails
                          </p>
                        </>
                      ) : (
                        <>
                          <h2 className="text-xl font-light leading-tight text-cream/80 md:text-2xl">
                            <span className="font-bold italic">MoneyBagg</span>
                            <span className="text-cream/65"> · Multi-Chain Balance</span>
                          </h2>
                          <p className="mt-2.5 max-w-lg font-mono-hbm text-[9px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/50 md:mt-3 md:text-[9.5px] md:tracking-[0.2em]">
                            Non-custodial wallet · self-custody rails
                          </p>
                        </>
                      )}
                    </SectionReveal>
                  </div>
                  <SectionReveal delay={0.12 + itemIndex * 0.06}>
                    {item.pixelVariant === "lightrain" ? (
                      <Link href="/work" className={clsx(whatWeBuildOutlineCta, "shrink-0")}>
                        LightRain
                      </Link>
                    ) : (
                      <Link
                        href="https://moneyba.gg"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={clsx(whatWeBuildOutlineCta, "shrink-0")}
                      >
                        MoneyBagg
                      </Link>
                    )}
                  </SectionReveal>
                </div>

                <SectionReveal delay={0.08 + itemIndex * 0.05} className="flex min-h-0 flex-1 flex-col">
                  <WhatWeBuildInstrumentCard item={item} />
                </SectionReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CHAINS MARQUEE ═══════════════ */}
      <MarqueeStrip
        items={["Solana", "Ethereum", "Avalanche", "Polygon", "Arbitrum", "Optimism", "Base", "Cosmos", "Polkadot", "Near", "Sui", "Aptos"]}
        reverse speed="slow"
      />

      {/* ═══════════════ FEATURED WORK (Suite — 52PickUp & ThreeWiseMen, side by side) ═══════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40 section-raised">
        <div className="pointer-events-none absolute inset-0 amber-bloom opacity-35" />
        <div className="pointer-events-none absolute inset-0 garnet-bloom-top" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <SectionReveal>
                <span className="text-label-xs text-garnet/70 uppercase tracking-[0.35em]">— The Suite</span>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <h2 className="mt-3 text-2xl font-light leading-tight text-cream/80 md:text-3xl">
                  Tuned for <span className="text-gradient-gold font-bold italic">the session</span>
                </h2>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.2}>
              <Link href="/work" className={whatWeBuildOutlineCta}>
                Documentation
              </Link>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 xl:gap-x-10">
            {suiteSections.map((work, workIndex) => (
              <SectionReveal key={work.pixelVariant} delay={0.06 + workIndex * 0.08}>
                <FeaturedSuiteInstrumentCard work={work} />
              </SectionReveal>
            ))}
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
          <div className="flex flex-col">
            <header className="mb-10 flex flex-col items-center gap-3">
              <div className="flex w-full max-w-md items-center justify-center gap-4">
                <div className="h-px max-w-[4rem] flex-1 bg-garnet/40" />
                <span className="shrink-0 text-label-xs uppercase tracking-[0.35em] text-garnet/60">
                  Consequence
                </span>
                <div className="h-px max-w-[4rem] flex-1 bg-garnet/40" />
              </div>
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.32em] text-silver-dim/35">
                Session · Comp · Collab · Trade · Staking · Radio
              </p>
            </header>

            <div className="mb-4 grid grid-cols-1 items-start gap-10 lg:mb-3 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
              <div className="flex flex-col space-y-6 text-center lg:col-span-7 lg:text-left">
                <h2 className="text-2xl font-light leading-snug text-cream/80 md:text-3xl lg:text-[2.25rem]">
                  When the studio goes quiet, what&apos;s left is the{" "}
                  <span className="text-gradient-gold font-bold italic">take.</span>
                </h2>
                <p className="text-lg font-light leading-relaxed text-cream/70 md:text-xl">
                  <span className="font-semibold text-cream/85">Consequence</span> is the state you
                  build at two in the morning — metering your reflex that moves with an arrangement,
                  creating a timeline that bends around your unique session. Explore a
                  Trade Lane where beats and samples move across a ledger.
                </p>
                <p className="mx-auto max-w-xl text-body-md leading-[1.85] text-silver-dim/75 lg:mx-0">
                  One clock for acceleration, composition, and stem architecture: print original
                  scores with acclaim. State-of-the-art protocols to drive your workflow and bleed the
                  mundane. Buy or flip samples on a counter built for producers — clear listings, clean
                  handoffs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
                {[
                  { Icon: IconSessionRing, t: "Session", s: "Tracking ring · clock discipline" },
                  { Icon: IconCompStacks, t: "Comp", s: "Reel-style lanes · recall-safe" },
                  { Icon: IconCollab, t: "Collab", s: "Shared timeline · presence & merge-safe locks" },
                  { Icon: IconTrade, t: "Trade", s: "Beat samples · buy, list & trade packs" },
                  { Icon: IconStaking, t: "Staking", s: "Lock weight · yield & surface priority" },
                  { Icon: IconRadio, t: "Radio", s: "Broadcast lane · airplay & rotation" },
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

            <div className="flex w-full justify-start">
              <div className="flex flex-wrap items-center justify-start gap-2.5 sm:gap-3">
                <Link
                  href="/contact"
                  className="inline-block rounded-full border border-white bg-[#0a0a0a] px-4 py-1.5 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-cream shadow-[0_6px_20px_rgba(0,0,0,0.4)] transition-all duration-300 hover:border-cream/80 hover:bg-[#141414] sm:px-5 sm:py-2"
                >
                  For You
                </Link>
                <Link
                  href="/contact"
                  className="garnet-btn inline-block px-4 py-1.5 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void sm:px-5 sm:py-2"
                >
                  Get Consequence
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ thesis ═══════════════ */}
      <section className="relative overflow-x-hidden bg-void pb-20 md:pb-24 lg:pb-28" aria-label="Thesis">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180,175,170,0.065) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,175,170,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse 78% 58% at 50% 42%, black 14%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 78% 58% at 50% 42%, black 14%, transparent 70%)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 purple-bloom opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 garnet-bloom-top opacity-35" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_20%_35%,rgba(180,175,170,0.07)_0%,transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <FooterBrandVotingGrid
            typography="robinhood"
            instanceId="home-thesis"
            brandSide="left"
            band="thesis"
          />
        </div>
      </section>

      <FooterDark typography="robinhood" showUpperBrandVoting={false} />
    </div>
    </>
  );
}

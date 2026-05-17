"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FooterDark from "@/components/FooterDark";
import FooterBrandVotingGrid from "@/components/FooterBrandVotingGrid";
import MarqueeStrip from "@/components/MarqueeStrip";
import SectionReveal from "@/components/SectionReveal";
import { MagazineSectionMasthead, type MagazineStory, type SuiteStory } from "@/components/MagazineStoryCards";
import { HeroNewspaperEdition } from "@/components/HeroNewspaperEdition";
import {
  BroadsheetFourColumnGrid,
  ConsequenceRadioDeck,
  DeskWireNewsGrid,
  FrontPageNewsGrid,
  DmnEditorialGrid,
  type BroadsheetColumn,
  type WireBrief,
} from "@/components/MagazineHomeLayouts";

const featuredStories: MagazineStory[] = [
  {
    storyId: "algorithm-drops",
    category: "Music Intelligence",
    headline: "The Algorithm Knows What Drops Next",
    dek: "How on-chain data is predicting breakout artists before the playlists catch up. A new class of tools is giving labels and independents the same edge.",
    dateline: "May 16, 2026 · New York",
    pixelVariant: "lightrain",
    imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=85",
    imageAlt: "Recording studio console",
  },
  {
    storyId: "film-on-chain",
    category: "Film & Capital",
    headline: "Film Financing Goes On-Chain",
    dek: "Independent studios are bypassing traditional funding by tokenising production rights on Base and Stellar.",
    dateline: "May 14, 2026 · Los Angeles",
    pixelVariant: "moneyba",
    imageSrc: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=85",
    imageAlt: "Film production lighting",
  },
  {
    storyId: "culture-tax",
    category: "Culture & Rights",
    headline: "The Culture Tax: Who Owns the Sound of a Generation",
    dek: "As streaming margins compress, a quiet war over IP ownership is reshaping who gets paid — and who disappears.",
    dateline: "May 12, 2026 · London",
    pixelVariant: "black-letter",
    imageSrc: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85",
    imageAlt: "Live performance crowd",
  },
];

const recordHeadlines: WireBrief[] = [
  {
    storyId: "masters-reprice",
    category: "Rights",
    headline: "Masters Reprice Overnight as Catalogs Trade in Private Rooms",
    dateline: "May 16",
    imageSrc: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80",
  },
  {
    storyId: "playlist-edge",
    category: "Music Intel",
    headline: "Labels Buy the Same Algorithm the Indies Built",
    dateline: "May 15",
    imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&q=80",
  },
  {
    storyId: "slate-token",
    category: "Film",
    headline: "Slate Financing Closes on Base in 48 Hours",
    dateline: "May 14",
    imageSrc: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&q=80",
  },
  {
    storyId: "royalty-rail",
    category: "Markets",
    headline: "Royalty Tokens Clear First Institutional Window",
    dateline: "May 13",
    imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=80",
  },
];

const recordBriefs: WireBrief[] = [
  {
    storyId: "culture-tax-brief",
    category: "Culture",
    headline: "Who Owns the Sound of a Generation",
    dek: "IP wars reshape who gets paid.",
    dateline: "May 12",
    imageSrc: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&q=85",
  },
  {
    storyId: "film-base-brief",
    category: "Film",
    headline: "Tokenised Production Rights Hit Main Slate",
    dateline: "May 11",
    imageSrc: "https://images.unsplash.com/photo-1535016120720-40c6464b0a86?w=400&q=85",
  },
  {
    storyId: "desk-dispatch",
    category: "Dispatch",
    headline: "The Ledger After the Room Goes Quiet",
    dateline: "May 10",
    imageSrc: "https://images.unsplash.com/photo-1507838153414-b4b656423e2e?w=400&q=85",
  },
];

const suiteSections: SuiteStory[] = [
  {
    storyId: "artists-on-chain",
    title: "The 52 Ways Artists Are Earning On-Chain",
    category: "DeFi Yield Discovery",
    description:
      "From streaming residuals to protocol yield, a new ledger of artist income is emerging — mapped chain by chain, venue by venue, and royalty line by royalty line.",
    stat: "Multi-chain",
    pixelVariant: "pickup",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=85",
    imageAlt: "Abstract digital art",
  },
  {
    storyId: "threewisemen-xlm",
    title: "ThreeWiseMen: When XLM Becomes a Love Language",
    category: "On-Chain Gifting",
    description:
      "On Stellar, a gift is never just a transfer — it is a timestamped gesture in a culture that increasingly records affection on-chain.",
    stat: "Stellar / XLM",
    pixelVariant: "spatial",
    imageSrc: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=900&q=85",
    imageAlt: "Wrapped gift with warm light",
  },
];

const broadsheetColumns: BroadsheetColumn[] = [
  {
    title: "Music",
    lead: {
      storyId: featuredStories[0].storyId,
      headline: featuredStories[0].headline,
      imageSrc: featuredStories[0].imageSrc!,
      imageAlt: featuredStories[0].imageAlt,
    },
    more: [
      { storyId: recordHeadlines[1].storyId, headline: recordHeadlines[1].headline },
      { storyId: recordHeadlines[0].storyId, headline: recordHeadlines[0].headline },
      { storyId: suiteSections[0].storyId, headline: suiteSections[0].title },
    ],
  },
  {
    title: "Culture",
    lead: {
      storyId: featuredStories[2].storyId,
      headline: featuredStories[2].headline,
      imageSrc: featuredStories[2].imageSrc!,
      imageAlt: featuredStories[2].imageAlt,
    },
    more: [
      { storyId: recordBriefs[0].storyId, headline: recordBriefs[0].headline },
      { storyId: recordBriefs[2].storyId, headline: recordBriefs[2].headline },
      { storyId: "culture-tax-brief", headline: "Who Owns the Sound of a Generation" },
    ],
  },
  {
    title: "Markets",
    lead: {
      storyId: recordHeadlines[3].storyId,
      headline: recordHeadlines[3].headline,
      imageSrc: recordHeadlines[3].imageSrc!,
    },
    more: [
      { storyId: "reserve-holdings", headline: "Reserve Holdings Update: Verified Rails and Governance Cadence" },
      { storyId: "treasury-cadence", headline: "Balance-Sheet Discipline Briefings Open for Q2" },
      { storyId: "whitepaper-access", headline: "Whitepaper: Institutional Reserve Framework" },
    ],
  },
  {
    title: "Film",
    lead: {
      storyId: featuredStories[1].storyId,
      headline: featuredStories[1].headline,
      imageSrc: featuredStories[1].imageSrc!,
      imageAlt: featuredStories[1].imageAlt,
    },
    more: [
      { storyId: recordHeadlines[2].storyId, headline: recordHeadlines[2].headline },
      { storyId: recordBriefs[1].storyId, headline: recordBriefs[1].headline },
      { storyId: suiteSections[1].storyId, headline: suiteSections[1].title },
    ],
  },
];

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
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        className="relative flex min-h-screen min-h-[100dvh] flex-col justify-start pt-[calc(env(safe-area-inset-top,0px)+1.25rem)] pb-[max(4rem,env(safe-area-inset-bottom,1rem))] md:pt-[calc(env(safe-area-inset-top,0px)+1.5rem)] md:pb-[max(5rem,env(safe-area-inset-bottom,1rem))] lg:pb-[max(6rem,env(safe-area-inset-bottom,1rem))]"
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
          The New Sound of Capital. HBM &amp; Company — culture, music, film, and the markets behind them.
        </h1>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto w-full max-w-[1440px] px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-12"
        >
          <motion.div variants={heroItem}>
            <HeroNewspaperEdition
              lead={featuredStories[0]}
              heroImageSrc="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=85"
              heroImageAlt="Electric guitar"
              leftBriefs={recordHeadlines}
              rightFeatured={featuredStories[1]}
              rightSecondary={featuredStories[2]}
              rightTopBriefs={recordBriefs.slice(0, 2)}
              tickerHeadlines={recordHeadlines.map((h) => h.headline)}
            />
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

      {/* ═══════════════ CULTURE DESK — DMN-style band (below hero) ═══════════════ */}
      <section className="relative bg-void py-10 md:py-12" aria-label="Culture desk">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <DmnEditorialGrid
              columnistHeading="From HBM & Company · Culture Desk"
              topRow={recordHeadlines}
              businessHeading="Markets"
              businessList={recordBriefs}
              businessLead={{
                storyId: suiteSections[0].storyId,
                category: suiteSections[0].category,
                headline: suiteSections[0].title,
                dek: suiteSections[0].description,
                imageSrc: suiteSections[0].imageSrc,
                imageAlt: suiteSections[0].imageAlt,
              }}
              businessPromo={{
                storyId: "culture-capital-future",
                headline: "The Future of Culture & Capital",
                imageSrc: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=85",
                imageAlt: "City skyline at dusk",
                href: "/treasury",
              }}
            />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ CONSEQUENCE RADIO ═══════════════ */}
      <section className="relative overflow-hidden py-10 md:py-12 section-mid" aria-label="Consequence Radio">
        <div className="pointer-events-none absolute inset-0 purple-bloom" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <ConsequenceRadioDeck />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ Markets desk wire ═══════════════ */}
      <section className="relative overflow-x-hidden bg-void py-10 md:py-12" aria-label="Markets desk and treasury wire">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <DeskWireNewsGrid />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ FOUR-COLUMN BROADSHEET ═══════════════ */}
      <section className="relative bg-void py-10 md:py-12" aria-label="Section fronts">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <BroadsheetFourColumnGrid columns={broadsheetColumns} />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ FEATURED STORIES — front page grid ═══════════════ */}
      <section className="relative flex min-h-0 flex-col justify-center overflow-hidden section-mid py-12 md:py-16">
        <div className="pointer-events-none absolute inset-0 purple-bloom" aria-hidden />
        <div className="pointer-events-none absolute inset-0 city-glow opacity-35" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <MagazineSectionMasthead
              eyebrow="— Featured Stories"
              title="The Front Page"
              aside="Culture · Music · Film · Markets · Vol. I · 2026"
              compact
            />
          </SectionReveal>

          <SectionReveal>
            <FrontPageNewsGrid stories={featuredStories} />
          </SectionReveal>
        </div>
      </section>


      {/* ═══════════════ MARQUEE ═══════════════ */}
      {cryptoMarqueeSlot}

      {/* ═══════════════ CHAINS MARQUEE ═══════════════ */}
      <MarqueeStrip
        items={["Solana", "Ethereum", "Avalanche", "Polygon", "Arbitrum", "Optimism", "Base", "Cosmos", "Polkadot", "Near", "Sui", "Aptos"]}
        reverse speed="slow"
      />


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

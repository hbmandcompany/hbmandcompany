"use client";

import Image from "next/image";
import { clsx } from "clsx";
import { motion, useReducedMotion } from "framer-motion";
import FooterDark from "@/components/FooterDark";
import FooterBrandVotingGrid from "@/components/FooterBrandVotingGrid";
import { HeroNewspaperEdition } from "@/components/HeroNewspaperEdition";
import {
  BroadsheetFourColumnGrid,
  DeskWireNewsGrid,
  DmnEditorialGrid,
  MagazineLifestyleGrid,
} from "@/components/MagazineHomeLayouts";
import SectionReveal from "@/components/SectionReveal";
import { AdPlacementPlaceholder } from "@/components/AdPlacementPlaceholder";
import {
  buildHeroProps,
  buildHomepageSections,
} from "@/lib/desk/homepage-sections";
import {
  buildStudioHeroProps,
  buildStudioHomepageSections,
  type HomepageStudioSlot,
} from "@/lib/desk/homepage-studio";
import type { PublicArticleBriefing } from "@/lib/desk/article-to-briefing";
import type { DraftStudioStory } from "@/lib/desk/homepage-studio";

const heroEase = [0.16, 1, 0.3, 1] as const;

type HomePageStudioProps = {
  draft: DraftStudioStory;
  placementSlot: HomepageStudioSlot;
  selectedSlot: HomepageStudioSlot | null;
  hoveredSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
  onHoverSlot: (slot: HomepageStudioSlot | null) => void;
  /** When hovering editorial/business slots, reveal the hero footer band. */
  revealHeroFooter?: boolean;
};

export type StudioSectionView = "hero" | "lifestyle" | "markets" | "columns" | "all";

type HomePageClientProps = {
  heroBriefings?: PublicArticleBriefing[] | null;
  tickerHeadlines?: string[] | null;
  studio?: HomePageStudioProps;
  /** Desk Live Studio: hero + culture band only (fits write-card viewport). */
  studioCompact?: boolean;
  studioSection?: StudioSectionView;
};

export default function HomePageClient({
  heroBriefings = null,
  tickerHeadlines = null,
  studio,
  studioCompact = false,
  studioSection = "all",
}: HomePageClientProps) {
  const sections = studio
    ? buildStudioHomepageSections(heroBriefings, studio.draft, studio.placementSlot)
    : buildHomepageSections(heroBriefings);
  const hero = studio
    ? buildStudioHeroProps(sections, studio.draft, studio.placementSlot, tickerHeadlines)
    : buildHeroProps(sections, tickerHeadlines);

  const studioGrid = studio
    ? {
        draftStoryId: studio.draft.storyId,
        selectedSlot: studio.selectedSlot,
        hoveredSlot: studio.hoveredSlot,
        onSelectSlot: studio.onSelectSlot,
        onHoverSlot: studio.onHoverSlot,
      }
    : undefined;

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

  const heroItem = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: heroT,
    },
  };

  const showHero = studioSection === "all" || studioSection === "hero";
  const showLifestyle = studioSection === "all" || studioSection === "lifestyle";
  const showMarkets = studioSection === "all" || studioSection === "markets";
  const showColumns = studioSection === "all" || studioSection === "columns";
  const showHeroFooter = !(studio && studioSection === "hero" && !studio.revealHeroFooter);
  const studioFocused = Boolean(studio && studioSection !== "all");
  const showMarketsAd = showMarkets && !studioFocused;
  const sectionBandClass = studioFocused ? "py-4 md:py-5" : "py-10 md:py-12";

  return (
    <>
      <div className="font-robinhood font-normal tracking-normal antialiased home-robinhood">
      {showHero ? (
      <section
        className="home-front-unified relative flex flex-col justify-start pt-[calc(env(safe-area-inset-top,0px)+0.35rem)] pb-10 md:pt-[calc(env(safe-area-inset-top,0px)+0.5rem)] md:pb-12"
        aria-label="Front page"
      >
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
          <div className="absolute inset-0 bg-gradient-to-b from-void/80 via-void/55 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/20 to-void/50" />
          <div className="absolute inset-0 hero-glow" />
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
          Music, Film &amp; Culture News — HBM &amp; Company
        </h1>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto w-full max-w-[1440px] px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-12"
          style={{ transform: "translateZ(0)" }}
        >
          <motion.div variants={heroItem} style={{ willChange: "transform" }}>
            <HeroNewspaperEdition
              lead={hero.heroLead}
              leadFollowUp={hero.heroFollowUp}
              heroImageSrc={hero.heroImage}
              heroImageAlt={hero.heroLead.headline}
              leftBriefs={hero.heroLeft}
              rightFeatured={hero.heroRightFeatured}
              rightSecondary={hero.heroRightSecondary}
              rightTopBriefs={hero.heroRightTopBriefs}
              rightSecondaryBriefs={hero.heroCulture}
              tickerHeadlines={hero.heroTicker}
              studio={studioGrid}
              footer={
                showHeroFooter ? (
                <DmnEditorialGrid
                  embedded
                  studio={studioGrid}
                  columnistHeading="From HBM & Company · Culture Desk"
                  topRow={sections.editorialTopRow}
                  businessHeading="Markets"
                  businessList={sections.editorialBusinessList}
                  businessLead={sections.editorialBusinessLead}
                  businessPromoAd
                />
                ) : undefined
              }
            />
          </motion.div>
        </motion.div>
      </section>
      ) : null}

      {studioCompact ? null : (
        <>
      {showHero && !studio ? (
      <section className="relative overflow-x-hidden bg-void py-4 md:py-5" aria-label="Thesis">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `linear-gradient(rgba(180,175,170,0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(180,175,170,0.05) 1px, transparent 1px)`,
            backgroundSize: "44px 44px",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <FooterBrandVotingGrid typography="robinhood" instanceId="home-thesis" brandSide="left" band="thesis" />
          </SectionReveal>
        </div>
      </section>
      ) : null}

      {showLifestyle ? (
      <section className={clsx("relative bg-void", sectionBandClass)} aria-label="Music and culture wire">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <MagazineLifestyleGrid data={sections.lifestyle} studio={studioGrid} />
          </SectionReveal>
        </div>
      </section>
      ) : null}

      {showMarkets ? (
      <section className={clsx("relative overflow-x-hidden bg-void", sectionBandClass)} aria-label="Markets desk and treasury wire">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <DeskWireNewsGrid
              wireStories={sections.marketsWire}
              lead={studio ? sections.marketsLead : hero.liveHero ? sections.marketsLead : undefined}
              studio={studioGrid}
            />
          </SectionReveal>
        </div>
      </section>
      ) : null}

      {showMarketsAd ? (
      <section className="relative bg-void pb-10 md:pb-12" aria-label="Advertisement">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="home-leaderboard-ad">
              <AdPlacementPlaceholder theme="dark" layout="leaderboard" />
            </div>
          </SectionReveal>
        </div>
      </section>
      ) : null}

      {showColumns ? (
      <section className={clsx("relative bg-void", sectionBandClass)} aria-label="Section fronts">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <BroadsheetFourColumnGrid columns={sections.broadsheetColumns} studio={studioGrid} />
          </SectionReveal>
        </div>
      </section>
      ) : null}

      {studio ? null : <FooterDark typography="robinhood" showUpperBrandVoting={false} />}
        </>
      )}
    </div>
    </>
  );
}

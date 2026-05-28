"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { StudioSlot } from "@/components/desk/studio/StudioSlot";
import type { HomepageStudioSlot } from "@/lib/desk/homepage-studio";
import { getShopUrl } from "@/lib/site-urls";
import type { MagazineStory } from "@/components/MagazineStoryCards";
import { AdPlacementPlaceholder } from "@/components/AdPlacementPlaceholder";

const EDITION_DATE = "Saturday · May 16, 2026";

type WireBrief = {
  storyId: string;
  category: string;
  headline: string;
  dek?: string;
  dateline: string;
  imageSrc?: string;
};

const heroNavLinks = [
  { label: "Music", href: "/music" },
  { label: "Film", href: "/film" },
  { label: "Culture", href: "/culture" },
] as const;

function HeroBriefLink({ item }: { item: WireBrief }) {
  return (
    <Link
      href={`/newspaper?story=${item.storyId}`}
      className="hero-front-page__brief-link group block py-2 outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
    >
      <span className="font-robinhood text-[13px] leading-snug text-silver-dim/72 transition-colors group-hover:text-gold md:text-sm">
        <span className="mr-2 text-gold/45" aria-hidden>
          –
        </span>
        {item.headline}
      </span>
    </Link>
  );
}

function HeroEditionBanner() {
  return (
    <div className="hero-dmn-banner" aria-label="Publication nameplate">
      <Link href="/" className="hero-dmn-banner__link group">
        <span className="hero-dmn-banner__wordmark font-cormorant font-light uppercase text-cream/75 transition-colors group-hover:text-cream/90">
          <span className="tracking-[0.26em]">HBM</span>
          <span className="mx-1.5 text-gold/60 group-hover:text-gold">&amp;</span>
          <span className="tracking-[0.26em]">Company</span>
        </span>
      </Link>
    </div>
  );
}

function HeroEditionTicker({ headlines }: { headlines: string[] }) {
  const crawl = headlines.length > 0 ? headlines.join("    ◆    ") : "Culture · Markets · Capital";
  const loop = `${crawl}    ◆    ${crawl}`;

  return (
    <div className="hero-dmn-ticker" role="marquee" aria-label="Breaking headlines">
      <span className="hero-dmn-ticker__label font-mono-hbm">Live</span>
      <div className="hero-dmn-ticker__track-wrap">
        <div className="hero-dmn-ticker__fade hero-dmn-ticker__fade--left" aria-hidden />
        <div className="hero-dmn-ticker__fade hero-dmn-ticker__fade--right" aria-hidden />
        <div className="hero-dmn-ticker__track">
          <span className="hero-dmn-ticker__text font-mono-hbm">{loop}</span>
          <span className="hero-dmn-ticker__text font-mono-hbm" aria-hidden>
            {loop}
          </span>
        </div>
      </div>
    </div>
  );
}

function HeroMasthead() {
  return (
    <header className="hero-dmn-masthead" aria-label="Site masthead">
      <div className="hero-dmn-nameplate__rule" aria-hidden />
      <div className="hero-dmn-masthead__row">
        <p className="hero-dmn-masthead__edition-date font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-silver-dim/50 md:text-[9px]">
          {EDITION_DATE}
        </p>
        <nav className="hero-dmn-masthead__nav" aria-label="Sections">
          {heroNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hero-dmn-masthead__nav-link group relative font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-silver-dim/65 transition-colors duration-300 hover:text-cream/85 md:text-[11px] md:tracking-[0.25em]"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>
        <div className="hero-dmn-masthead__shop">
          <a
            href={getShopUrl()}
            className="garnet-btn garnet-btn-soft font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void/88 px-5 py-1.5"
          >
            Shop
          </a>
        </div>
      </div>
      <div className="hero-dmn-nameplate__rule" aria-hidden />
    </header>
  );
}

function HeroSplitCenterImage({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="hero-front-page__center hero-front-page__center--split">
      <div className="hero-front-page__center-half hero-front-page__center-half--top">
        <Image src={src} alt={alt} fill className="hero-front-page__center-img hero-front-page__center-img--top" sizes="42vw" priority />
      </div>
      <div className="hero-front-page__center-rule" aria-hidden />
      <div className="hero-front-page__center-half hero-front-page__center-half--bottom">
        <AdPlacementPlaceholder theme="dark" className="hero-front-page__ad-slot" />
      </div>
    </figure>
  );
}

export type HeroStudioConfig = {
  draftStoryId: string;
  selectedSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
};

/** DMN-style 3-column broadsheet hero with banner, masthead, and live ticker. */
export function HeroNewspaperEdition({
  lead,
  leadFollowUp,
  heroImageSrc,
  heroImageAlt,
  leftBriefs,
  rightFeatured,
  rightSecondary,
  rightTopBriefs,
  rightSecondaryBriefs,
  tickerHeadlines,
  footer,
  studio,
}: {
  lead: MagazineStory;
  /** Second story stacked under the left-column lead. */
  leadFollowUp?: MagazineStory;
  heroImageSrc: string;
  heroImageAlt?: string;
  leftBriefs: WireBrief[];
  rightFeatured: MagazineStory;
  rightSecondary: MagazineStory;
  rightTopBriefs: WireBrief[];
  /** Headlines listed under the right-column secondary feature. */
  rightSecondaryBriefs?: WireBrief[];
  tickerHeadlines: string[];
  /** Culture desk and below — rendered inside the same edition shell. */
  footer?: ReactNode;
  studio?: HeroStudioConfig;
}) {
  const leadCopy = (
    <article className="hero-front-page__lead-copy">
      <span className="hero-front-page__category font-mono-hbm">{lead.category}</span>
      {studio ? (
        <h2 className="hero-front-page__headline font-cormorant font-semibold text-cream/92">{lead.headline}</h2>
      ) : (
        <Link
          href={`/newspaper?story=${lead.storyId}`}
          className="group outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
        >
          <h2 className="hero-front-page__headline font-cormorant font-semibold text-cream/92 transition-colors group-hover:text-gold">
            {lead.headline}
          </h2>
        </Link>
      )}
      <p className="hero-front-page__dek font-robinhood text-silver-dim/76">{lead.dek}</p>
    </article>
  );

  return (
    <div className="hero-dmn-shell mx-auto w-full max-w-[1440px]">
      <HeroEditionBanner />
      <div className={footer ? "hero-dmn-edition hero-dmn-edition--with-footer" : "hero-dmn-edition"}>
        <HeroMasthead />
        <HeroEditionTicker headlines={tickerHeadlines} />

        <div className="hero-front-page" role="region" aria-label="Front page">
          <div className="hero-front-page__left">
            {studio ? (
              <StudioSlot
                slotId="hero-lead"
                selected={studio.selectedSlot === "hero-lead"}
                isDraft={lead.storyId === studio.draftStoryId}
                onSelect={studio.onSelectSlot}
              >
                {leadCopy}
              </StudioSlot>
            ) : (
              leadCopy
            )}
            {leadFollowUp ? (
              <article className="hero-front-page__lead-follow">
                <span className="hero-front-page__category font-mono-hbm">{leadFollowUp.category}</span>
                <Link
                  href={`/newspaper?story=${leadFollowUp.storyId}`}
                  className="group outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
                >
                  <h3 className="hero-front-page__lead-follow-headline font-cormorant font-semibold text-cream/88 transition-colors group-hover:text-gold">
                    {leadFollowUp.headline}
                  </h3>
                </Link>
                <p className="hero-front-page__lead-follow-dek font-robinhood text-silver-dim/68">{leadFollowUp.dek}</p>
              </article>
            ) : null}
            <div className="hero-front-page__rule" aria-hidden />
            <nav className="hero-front-page__briefs" aria-label="More headlines">
              {leftBriefs.slice(0, 6).map((item) => (
                <HeroBriefLink key={item.storyId} item={item} />
              ))}
            </nav>
          </div>

          {heroImageSrc ? (
            <HeroSplitCenterImage src={heroImageSrc} alt={heroImageAlt ?? lead.headline} />
          ) : (
            <figure className="hero-front-page__center hero-front-page__center--split">
              <div className="hero-front-page__center-half bg-midnight" />
              <div className="hero-front-page__center-rule" aria-hidden />
              <div className="hero-front-page__center-half hero-front-page__center-half--bottom">
                <AdPlacementPlaceholder theme="dark" className="hero-front-page__ad-slot" />
              </div>
            </figure>
          )}

          <aside className="hero-front-page__right">
            <div className="hero-front-page__right-block">
              <Link
                href={`/newspaper?story=${rightFeatured.storyId}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
              >
                {rightFeatured.imageSrc ? (
                  <figure className="hero-front-page__right-media relative m-0 aspect-video w-full overflow-hidden bg-midnight">
                    <Image
                      src={rightFeatured.imageSrc}
                      alt={rightFeatured.imageAlt ?? rightFeatured.headline}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 767px) 100vw, 28vw"
                    />
                  </figure>
                ) : null}
                <span className="hero-front-page__category mt-3 font-mono-hbm">{rightFeatured.category}</span>
                <h3 className="hero-front-page__right-headline font-cormorant font-semibold text-cream/90 transition-colors group-hover:text-gold">
                  {rightFeatured.headline}
                </h3>
              </Link>
              <div className="mt-2">
                {rightTopBriefs.map((item) => (
                  <HeroBriefLink key={item.storyId} item={item} />
                ))}
              </div>
            </div>
            <div className="hero-front-page__rule hero-front-page__rule--horizontal" aria-hidden />
            <div className="hero-front-page__right-block hero-front-page__right-block--text">
              <Link
                href={`/newspaper?story=${rightSecondary.storyId}`}
                className="group block outline-none focus-visible:ring-2 focus-visible:ring-gold/30"
              >
                <span className="hero-front-page__category font-mono-hbm">{rightSecondary.category}</span>
                <h3 className="hero-front-page__right-headline font-cormorant font-semibold text-cream/90 transition-colors group-hover:text-gold">
                  {rightSecondary.headline}
                </h3>
                <p className="mt-2 font-robinhood text-[13px] leading-snug text-silver-dim/68 line-clamp-3">
                  {rightSecondary.dek}
                </p>
              </Link>
              {rightSecondaryBriefs && rightSecondaryBriefs.length > 0 ? (
                <nav className="hero-front-page__briefs mt-3" aria-label="Related culture headlines">
                  {rightSecondaryBriefs.map((item) => (
                    <HeroBriefLink key={item.storyId} item={item} />
                  ))}
                </nav>
              ) : null}
            </div>
          </aside>
        </div>
        {footer}
      </div>
    </div>
  );
}

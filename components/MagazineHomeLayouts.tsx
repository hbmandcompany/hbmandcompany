"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
export { HeroNewspaperEdition } from "@/components/HeroNewspaperEdition";
import {
  MagazineSectionMasthead,
  type MagazineStory,
  type SuiteStory,
} from "@/components/MagazineStoryCards";
export { ConsequenceRadioDeck } from "@/components/ConsequenceRadioDeck";
export { MagazineLifestyleGrid } from "@/components/MagazineLifestyleGrid";
export { FeaturedStoriesFourUp } from "@/components/FeaturedStoriesFourUp";
import { AdPlacementPlaceholder } from "@/components/AdPlacementPlaceholder";
import { StudioSlot } from "@/components/desk/studio/StudioSlot";
import type { HomepageStudioCanvasConfig, HomepageStudioSlot } from "@/lib/desk/homepage-studio";

const goldOutlineCta =
  "gold-outline-btn inline-block px-3 py-1 text-[10px] uppercase tracking-[0.18em] sm:px-4 sm:py-1.5 sm:text-label-xs sm:tracking-[0.2em]";

export type WireBrief = {
  storyId: string;
  category: string;
  headline: string;
  dek?: string;
  dateline: string;
  imageSrc?: string;
};

function RecordThumbCard({ item, className }: { item: WireBrief; className?: string }) {
  return (
    <Link
      href={`/newspaper?story=${item.storyId}`}
      className={clsx(
        "group relative flex min-h-0 flex-col overflow-hidden border border-white/[0.08] bg-obsidian transition-colors hover:border-gold/22 hover:bg-obsidian/95",
        className,
      )}
    >
      <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden bg-midnight">
        {item.imageSrc ? (
          <Image src={item.imageSrc} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" unoptimized />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-midnight to-void" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-3.5">
        <span className="font-mono-hbm text-[7px] uppercase tracking-[0.26em] text-gold/58">{item.category}</span>
        <h3 className="font-cormorant text-base font-light leading-tight text-cream/88 line-clamp-3 group-hover:text-gold md:text-[1.05rem]">
          {item.headline}
        </h3>
        {item.dek ? (
          <p className="font-robinhood line-clamp-2 text-[11px] leading-snug text-silver-dim/65">{item.dek}</p>
        ) : null}
        <span className="mt-auto font-mono-hbm text-[7px] uppercase tracking-[0.2em] text-silver-dim/40">{item.dateline}</span>
      </div>
    </Link>
  );
}

function RecordHeadlineRow({
  item,
  studio,
  slotId,
}: {
  item: WireBrief;
  studio?: HomepageGridStudioConfig;
  slotId?: HomepageStudioSlot;
}) {
  const row = (
    <>
      <div className="relative aspect-square overflow-hidden bg-midnight">
        {item.imageSrc ? <Image src={item.imageSrc} alt="" fill className="object-cover" unoptimized /> : null}
      </div>
      <div className="min-w-0">
        <span className="font-mono-hbm text-[7px] uppercase tracking-[0.22em] text-garnet/55">{item.category}</span>
        <p className="font-cormorant mt-0.5 text-sm font-light leading-snug text-cream/85 group-hover:text-gold line-clamp-2">
          {item.headline}
        </p>
        <span className="font-mono-hbm mt-1 block text-[7px] text-silver-dim/42">{item.dateline}</span>
      </div>
    </>
  );

  if (studio && slotId) {
    return (
      <StudioSlot slotId={slotId} studio={studio} isDraft={item.storyId === studio.draftStoryId}>
        <div className="group grid grid-cols-[72px_1fr] gap-3 border-b border-white/[0.06] py-3 last:border-b-0">{row}</div>
      </StudioSlot>
    );
  }

  return (
    <Link
      href={`/newspaper?story=${item.storyId}`}
      className="group grid grid-cols-[72px_1fr] gap-3 border-b border-white/[0.06] py-3 last:border-b-0 hover:bg-white/[0.02]"
    >
      {row}
    </Link>
  );
}

function DmnCategoryLabel({ children }: { children: string }) {
  return (
    <span className="font-mono-hbm text-[8px] uppercase tracking-[0.26em] text-gold/62">
      {children}
    </span>
  );
}

export type HomepageGridStudioConfig = HomepageStudioCanvasConfig;

function DmnTopCard({
  item,
  studio,
  slotId,
}: {
  item: WireBrief;
  studio?: HomepageGridStudioConfig;
  slotId?: HomepageStudioSlot;
}) {
  const card = (
    <div className="dmn-editorial__top-card group flex min-h-0 flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-obsidian transition-colors hover:border-gold/22">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-midnight">
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-midnight to-void" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-3.5">
        <DmnCategoryLabel>{item.category}</DmnCategoryLabel>
        <h3 className="font-cormorant text-base font-light leading-tight text-cream/88 line-clamp-3 group-hover:text-gold md:text-[1.05rem]">
          {item.headline}
        </h3>
        {item.dek ? (
          <p className="font-robinhood line-clamp-2 text-[11px] leading-snug text-silver-dim/65">{item.dek}</p>
        ) : null}
      </div>
    </div>
  );

  if (studio && slotId) {
    return (
      <StudioSlot slotId={slotId} studio={studio} isDraft={item.storyId === studio.draftStoryId}>
        {card}
      </StudioSlot>
    );
  }

  return (
    <Link href={`/newspaper?story=${item.storyId}`} className="block">
      {card}
    </Link>
  );
}

function DmnTextStory({
  item,
  studio,
  slotId,
}: {
  item: WireBrief;
  studio?: HomepageGridStudioConfig;
  slotId?: HomepageStudioSlot;
}) {
  const story = (
    <>
      <DmnCategoryLabel>{item.category}</DmnCategoryLabel>
      <p className="mt-1 font-cormorant text-sm font-light leading-snug text-cream/85 group-hover:text-gold line-clamp-3 md:text-[15px]">
        {item.headline}
      </p>
    </>
  );

  if (studio && slotId) {
    return (
      <StudioSlot slotId={slotId} studio={studio} isDraft={item.storyId === studio.draftStoryId}>
        <div className="dmn-editorial__text-story group block border-b border-white/[0.06] py-3.5 last:border-b-0">{story}</div>
      </StudioSlot>
    );
  }

  return (
    <Link
      href={`/newspaper?story=${item.storyId}`}
      className="dmn-editorial__text-story group block border-b border-white/[0.06] py-3.5 last:border-b-0 hover:bg-white/[0.02]"
    >
      {story}
    </Link>
  );
}

type DmnLeadStory = {
  storyId: string;
  category: string;
  headline: string;
  dek: string;
  imageSrc?: string;
  imageAlt?: string;
};

type DmnPromoCard = {
  storyId: string;
  headline: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
};

/** DMN-style broadsheet band: four-up row + business three-column block. */
export function DmnEditorialGrid({
  columnistHeading,
  topRow,
  businessHeading,
  businessList,
  businessLead,
  businessPromo,
  businessPromoAd = false,
  embedded = false,
  studio,
}: {
  columnistHeading: string;
  topRow: WireBrief[];
  businessHeading: string;
  businessList: WireBrief[];
  businessLead: DmnLeadStory;
  businessPromo?: DmnPromoCard;
  businessPromoAd?: boolean;
  /** Inside hero edition shell — no separate card border. */
  embedded?: boolean;
  studio?: HomepageGridStudioConfig;
}) {
  const promoHref = businessPromo?.href ?? `/newspaper?story=${businessPromo?.storyId ?? ""}`;

  return (
    <div className={clsx("dmn-editorial", embedded && "dmn-editorial--embedded")}>
      <section className="dmn-editorial__band" aria-label={columnistHeading}>
        <h2 className="dmn-editorial__section-title font-cormorant text-xl font-light text-cream/88 md:text-2xl">
          {columnistHeading}
        </h2>
        <div
          className={clsx(
            "dmn-editorial__four-up mt-4 md:mt-5",
            embedded ? "pt-0" : "border-t border-white/[0.08] pt-5 md:pt-6",
          )}
        >
          {topRow.slice(0, 4).map((item, index) => (
            <DmnTopCard
              key={`${item.storyId}-${index}`}
              item={item}
              studio={studio}
              slotId={`editorial-top-${index}` as HomepageStudioSlot}
            />
          ))}
        </div>
      </section>

      <div className="dmn-editorial__divider my-8 border-t border-white/[0.08] md:my-10" aria-hidden />

      <section className="dmn-editorial__band" aria-label={businessHeading}>
        <h2 className="dmn-editorial__section-title font-cormorant text-xl font-light text-cream/88 md:text-2xl">
          {businessHeading}
        </h2>
        <div className="dmn-editorial__business mt-5 border-t border-white/[0.08] pt-5 md:mt-6 md:pt-6">
          <nav
            className="dmn-editorial__business-list rounded-lg border border-white/[0.08] bg-obsidian/80 px-4 md:px-5"
            aria-label={`${businessHeading} headlines`}
          >
            {businessList.map((item, index) => (
              <DmnTextStory key={item.storyId} item={item} studio={studio} slotId={`business-list-${index}` as HomepageStudioSlot} />
            ))}
          </nav>

          <article className="dmn-editorial__business-lead">
            {studio ? (
              <StudioSlot slotId="business-lead" studio={studio} isDraft={businessLead.storyId === studio.draftStoryId}>
                <div className="card-3d group grid h-full grid-cols-1 overflow-hidden rounded-lg border border-white/[0.09] bg-obsidian md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
                  <div className="relative min-h-[200px] md:min-h-[260px]">
                    {businessLead.imageSrc ? (
                      <Image
                        src={businessLead.imageSrc}
                        alt={businessLead.imageAlt ?? businessLead.headline}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-midnight to-void" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                  </div>
                  <div className="flex flex-col justify-center gap-3 p-5 md:p-6">
                    <DmnCategoryLabel>{businessLead.category}</DmnCategoryLabel>
                    <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 md:text-2xl">
                      {businessLead.headline}
                    </h3>
                    <p className="font-robinhood text-sm leading-relaxed text-silver-dim/75 line-clamp-5">{businessLead.dek}</p>
                  </div>
                </div>
              </StudioSlot>
            ) : (
            <Link
              href={`/newspaper?story=${businessLead.storyId}`}
              className="card-3d group grid h-full grid-cols-1 overflow-hidden rounded-lg border border-white/[0.09] bg-obsidian md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
            >
              <div className="relative min-h-[200px] md:min-h-[260px]">
                {businessLead.imageSrc ? (
                  <Image
                    src={businessLead.imageSrc}
                    alt={businessLead.imageAlt ?? businessLead.headline}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    unoptimized
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
              </div>
              <div className="flex flex-col justify-center gap-3 p-5 md:p-6">
                <DmnCategoryLabel>{businessLead.category}</DmnCategoryLabel>
                <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 transition-colors group-hover:text-gold md:text-2xl">
                  {businessLead.headline}
                </h3>
                <p className="font-robinhood text-sm leading-relaxed text-silver-dim/75 line-clamp-5">{businessLead.dek}</p>
              </div>
            </Link>
            )}
          </article>

          {businessPromoAd ? (
            <div className="dmn-editorial__business-promo dmn-editorial__business-ad overflow-hidden rounded-lg border border-white/[0.09] bg-obsidian">
              <AdPlacementPlaceholder theme="dark" className="hero-front-page__ad-slot" />
            </div>
          ) : businessPromo ? (
          <Link
            href={promoHref}
            className="dmn-editorial__business-promo card-3d group grid h-full grid-rows-[1fr_auto] overflow-hidden rounded-lg border border-white/[0.09] bg-obsidian"
          >
            <div className="relative min-h-[180px]">
              <Image
                src={businessPromo.imageSrc}
                alt={businessPromo.imageAlt ?? ""}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 22vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 to-transparent" />
            </div>
            <div className="flex min-h-[120px] items-center border-t border-white/[0.08] bg-obsidian/95 p-5 md:p-6">
              <h3 className="font-cormorant text-2xl font-light leading-tight text-cream/90 transition-colors group-hover:text-gold md:text-[1.65rem]">
                {businessPromo.headline}
              </h3>
            </div>
          </Link>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export function MagazineRecordGrid({
  features,
  briefs,
  headlines,
}: {
  features: SuiteStory[];
  briefs: WireBrief[];
  headlines: WireBrief[];
}) {
  const [lead, ...restFeatures] = features;

  return (
    <div className="magazine-record-grid">
      <div className="magazine-record-grid__lead">
        <Link
          href={`/newspaper?story=${lead.storyId}`}
          className="card-3d group grid h-full overflow-hidden border border-white/[0.09] bg-obsidian md:grid-cols-2"
        >
          <div className="relative min-h-[220px] md:min-h-0">
            {lead.imageSrc ? (
              <Image src={lead.imageSrc} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" unoptimized />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
          </div>
          <article className="flex flex-col justify-center gap-3 p-5 md:p-6 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-hbm text-[8px] uppercase tracking-[0.24em] text-gold/65">{lead.category}</span>
              <span className="font-mono-hbm text-[10px] uppercase tracking-[0.12em] text-gold/75">{lead.stat}</span>
            </div>
            <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 group-hover:text-gold md:text-2xl lg:text-[1.65rem]">
              {lead.title}
            </h3>
            <p className="font-robinhood line-clamp-4 text-sm leading-relaxed text-silver-dim/75">{lead.description}</p>
            <span className={clsx(goldOutlineCta, "mt-1 w-fit")}>Read Story →</span>
          </article>
        </Link>
      </div>

      <div className="magazine-record-grid__rail border border-white/[0.08] bg-obsidian/80 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
          <span className="font-mono-hbm text-[8px] uppercase tracking-[0.3em] text-garnet/60">Latest</span>
          <Link href="/treasury" className={goldOutlineCta}>
            Docs
          </Link>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {headlines.map((h) => (
            <RecordHeadlineRow key={h.storyId} item={h} />
          ))}
        </div>
      </div>

      {restFeatures.map((f) => (
        <RecordThumbCard
          key={f.storyId}
          item={{
            storyId: f.storyId,
            category: f.category,
            headline: f.title,
            dek: f.description,
            dateline: f.stat,
            imageSrc: f.imageSrc,
          }}
          className="magazine-record-grid__cell"
        />
      ))}

      {briefs.map((b) => (
        <RecordThumbCard key={b.storyId} item={b} className="magazine-record-grid__cell" />
      ))}
    </div>
  );
}

function storyToBrief(story: MagazineStory): WireBrief {
  return {
    storyId: story.storyId,
    category: story.category,
    headline: story.headline,
    dek: story.dek,
    dateline: story.dateline,
    imageSrc: story.imageSrc,
  };
}

export function FrontPageNewsGrid({ stories }: { stories: MagazineStory[] }) {
  const [lead, ...rest] = stories;
  const railStories = rest.slice(0, 2);
  const thumbStories = rest.slice(2);

  return (
    <div className="front-page-grid">
      <div className="front-page-grid__lead">
        <Link
          href={`/newspaper?story=${lead.storyId}`}
          className="card-3d group grid h-full overflow-hidden border border-white/[0.09] bg-obsidian md:grid-cols-2"
        >
          <div className="relative min-h-[240px] md:min-h-[280px]">
            {lead.imageSrc ? (
              <Image
                src={lead.imageSrc}
                alt={lead.imageAlt ?? lead.headline}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <p className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-cream/45">{lead.dateline}</p>
            </div>
          </div>
          <article className="flex flex-col justify-center gap-3 p-5 md:p-6 lg:p-7">
            <span className="font-mono-hbm text-[8px] uppercase tracking-[0.24em] text-gold/65">{lead.category}</span>
            <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 transition-colors group-hover:text-gold md:text-2xl lg:text-[1.75rem]">
              {lead.headline}
            </h3>
            <p className="font-robinhood line-clamp-5 text-sm leading-relaxed text-silver-dim/75">{lead.dek}</p>
            <span className={clsx(goldOutlineCta, "mt-1 w-fit")}>Read Story →</span>
          </article>
        </Link>
      </div>

      <div className="front-page-grid__rail border border-white/[0.08] bg-obsidian/80 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
          <span className="font-mono-hbm text-[8px] uppercase tracking-[0.3em] text-garnet/60">Also on the front</span>
          <Link href="/newspaper" className={goldOutlineCta}>
            All Stories
          </Link>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {railStories.map((story) => (
            <RecordHeadlineRow key={story.storyId} item={storyToBrief(story)} />
          ))}
        </div>
      </div>

      {thumbStories.map((story) => (
        <RecordThumbCard key={story.storyId} item={storyToBrief(story)} className="front-page-grid__cell" />
      ))}
    </div>
  );
}

export type BroadsheetColumn = {
  title: string;
  lead: {
    storyId: string;
    headline: string;
    imageSrc: string;
    imageAlt?: string;
  };
  more: { storyId: string; headline: string }[];
};

function BroadsheetColumnBlock({
  column,
  studio,
  columnIndex,
}: {
  column: BroadsheetColumn;
  studio?: HomepageGridStudioConfig;
  columnIndex: number;
}) {
  return (
    <div className="broadsheet-four-col__column">
      <div className="broadsheet-four-col__column-header">
        <h3 className="broadsheet-four-col__column-title font-robinhood">{column.title}</h3>
      </div>
      {studio ? (
        <StudioSlot
          slotId={`column-${columnIndex}-lead` as HomepageStudioSlot}
          studio={studio}
          isDraft={column.lead.storyId === studio.draftStoryId}
        >
          <div className="broadsheet-four-col__lead group block">
            <figure className="broadsheet-four-col__lead-media relative aspect-[16/10] w-full overflow-hidden bg-midnight">
              <Image
                src={column.lead.imageSrc}
                alt={column.lead.imageAlt ?? column.lead.headline}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 25vw"
                unoptimized
              />
            </figure>
            <h4 className="broadsheet-four-col__lead-headline font-robinhood group-hover:text-gold">
              {column.lead.headline}
            </h4>
          </div>
        </StudioSlot>
      ) : (
      <Link
        href={`/newspaper?story=${column.lead.storyId}`}
        className="broadsheet-four-col__lead group block"
      >
        <figure className="broadsheet-four-col__lead-media relative aspect-[16/10] w-full overflow-hidden bg-midnight">
          <Image
            src={column.lead.imageSrc}
            alt={column.lead.imageAlt ?? column.lead.headline}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 25vw"
            unoptimized
          />
        </figure>
        <h4 className="broadsheet-four-col__lead-headline font-robinhood group-hover:text-gold">
          {column.lead.headline}
        </h4>
      </Link>
      )}
      <ul className="broadsheet-four-col__list">
        {column.more.map((item, moreIndex) => (
          <li key={item.storyId} className="broadsheet-four-col__list-item">
            {studio ? (
              <StudioSlot
                slotId={`column-${columnIndex}-more-${moreIndex}` as HomepageStudioSlot}
                studio={studio}
                isDraft={item.storyId === studio.draftStoryId}
              >
                <div className="broadsheet-four-col__list-link font-robinhood group">{item.headline}</div>
              </StudioSlot>
            ) : (
              <Link
                href={`/newspaper?story=${item.storyId}`}
                className="broadsheet-four-col__list-link font-robinhood group"
              >
                {item.headline}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Four-column broadsheet wire with lead image + headline stack per column. */
export function BroadsheetFourColumnGrid({
  columns,
  studio,
}: {
  columns: BroadsheetColumn[];
  studio?: HomepageGridStudioConfig;
}) {
  return (
    <div className="broadsheet-four-col">
      <div className="broadsheet-four-col__grid">
        {columns.slice(0, 4).map((column, index) => (
          <BroadsheetColumnBlock key={column.title} column={column} studio={studio} columnIndex={index} />
        ))}
      </div>
    </div>
  );
}

export function DeskWireNewsGrid({
  wireStories,
  lead,
  studio,
}: {
  wireStories?: WireBrief[];
  lead?: {
    storyId: string;
    category: string;
    headline: string;
    dek: string;
    imageSrc?: string;
    imageAlt?: string;
  };
  studio?: HomepageGridStudioConfig;
}) {
  const defaultWireStories: WireBrief[] = [
    {
      storyId: "reserve-holdings",
      category: "Markets Desk",
      headline: "Reserve Holdings Update: Verified Rails and Governance Cadence",
      dek: "Enterprise posture on DeFi infrastructure and digital-asset custody.",
      dateline: "May 16, 2026",
      imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=85",
    },
    {
      storyId: "treasury-cadence",
      category: "Treasury Wire",
      headline: "Balance-Sheet Discipline Briefings Open for Q2",
      dateline: "May 15, 2026",
      imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=85",
    },
    {
      storyId: "whitepaper-access",
      category: "Documentation",
      headline: "Whitepaper: Institutional Reserve Framework",
      dateline: "Updated weekly",
    },
  ];

  const useLiveLead = Boolean(lead);
  const rawStories = wireStories ?? defaultWireStories;
  const stories =
    useLiveLead && lead ? rawStories.filter((w) => w.storyId !== lead.storyId) : rawStories;
  const leadImage =
    lead?.imageSrc ?? "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85";

  return (
    <div className="desk-wire-grid">
      <div className="desk-wire-grid__mast">
        <MagazineSectionMasthead
          eyebrow="— Markets Desk"
          title="Institutional Reserve Wire"
          aside="Treasury · Governance · Access"
          compact
        />
      </div>

      {(() => {
        const leadArticle = (
          <article
            className={clsx(
              "card-3d h-full overflow-hidden border border-white/[0.09] bg-obsidian",
              !studio && "desk-wire-grid__lead",
            )}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative min-h-[200px] md:min-h-full">
                <Image src={leadImage} alt="" fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/40 md:bg-gradient-to-l md:from-obsidian/30" />
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-7">
                {useLiveLead && lead ? (
                  <>
                    <span className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-gold/62">{lead.category}</span>
                    <h3 className="font-cormorant text-2xl font-light leading-tight text-cream/88 md:text-[1.75rem]">{lead.headline}</h3>
                    <p className="font-robinhood text-sm leading-relaxed text-silver-dim/75">{lead.dek}</p>
                    <Link href={`/newspaper?story=${lead.storyId}`} className={clsx(goldOutlineCta, "w-fit")}>
                      Read full brief →
                    </Link>
                  </>
                ) : (
                  <>
                    <span className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-gold/62">Lead Brief</span>
                    <h3 className="font-cormorant text-2xl font-light leading-tight text-cream/88 md:text-[1.75rem]">
                      Institutional <span className="text-gradient-gold font-medium italic">Reserve</span>
                    </h3>
                    <p className="font-robinhood text-sm leading-relaxed text-silver-dim/75">
                      An enterprise holdings company committed to the infrastructure of decentralized finance and digital
                      assets—organizing capital around rails you can verify and durable governance.
                    </p>
                    <Link href="/treasury" className={clsx(goldOutlineCta, "w-fit")}>
                      Read Treasury Desk →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </article>
        );

        if (studio) {
          return (
            <StudioSlot
              slotId="markets-lead"
              studio={studio}
              isDraft={Boolean(lead && lead.storyId === studio.draftStoryId)}
              className="desk-wire-grid__lead min-h-0"
            >
              {leadArticle}
            </StudioSlot>
          );
        }

        return leadArticle;
      })()}

      <div className="desk-wire-grid__list border border-white/[0.08] bg-obsidian/90">
        {stories.map((w, index) => (
          <RecordHeadlineRow key={w.storyId} item={w} studio={studio} slotId={`markets-wire-${index}` as HomepageStudioSlot} />
        ))}
      </div>

    </div>
  );
}

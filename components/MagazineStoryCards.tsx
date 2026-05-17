"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import CardLinocutArt from "@/components/CardLinocutArt";
import type { CardLinocutVariant } from "@/components/CardLinocutArt";

export type MagazineStory = {
  storyId: string;
  category: string;
  headline: string;
  dek: string;
  dateline: string;
  pixelVariant: CardLinocutVariant;
  /** Editorial photo — always visible in the card well (thesource-style). */
  imageSrc?: string;
  imageAlt?: string;
};

export type SuiteStory = {
  storyId: string;
  title: string;
  category: string;
  description: string;
  stat: string;
  pixelVariant: CardLinocutVariant;
  imageSrc?: string;
  imageAlt?: string;
};

const goldOutlineCta =
  "gold-outline-btn inline-block px-4 py-1.5 text-label-xs uppercase tracking-[0.2em] sm:px-5 sm:py-2";

export function MagazineSectionMasthead({
  eyebrow,
  title,
  titleAccent,
  aside,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  /** Optional trailing phrase rendered in gold gradient (e.g. “the read”). */
  titleAccent?: string;
  aside?: string;
  compact?: boolean;
}) {
  const baseTitle = titleAccent ? title.replace(new RegExp(`${titleAccent}$`), "").trim() : title;

  return (
    <header
      className={clsx(
        "border-y border-white/[0.09]",
        compact ? "mb-6 py-5 md:mb-8 md:py-6" : "mb-14 py-8 md:mb-20 md:py-11",
      )}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="min-w-0">
          <span className="text-label-xs uppercase tracking-[0.38em] text-garnet/72">{eyebrow}</span>
          <h2 className="font-cormorant mt-4 text-[2.15rem] font-light leading-[1.02] text-cream/84 md:text-[2.65rem] lg:text-[3.15rem]">
            {baseTitle}
            {titleAccent ? (
              <>
                {" "}
                <span className="text-gradient-gold font-medium italic">{titleAccent}</span>
              </>
            ) : null}
          </h2>
        </div>
        {aside ? (
          <p className="font-mono-hbm max-w-[14rem] shrink-0 text-[9px] uppercase leading-[1.85] tracking-[0.3em] text-silver-dim/48 md:text-right">
            {aside}
          </p>
        ) : null}
      </div>
    </header>
  );
}

function StoryImageWell({
  variant,
  imageSrc,
  imageAlt = "",
  aspectClassName = "aspect-[16/10]",
  caption,
}: {
  variant: CardLinocutVariant;
  imageSrc?: string;
  imageAlt?: string;
  aspectClassName?: string;
  caption?: string;
}) {
  return (
    <figure className={clsx("relative m-0 w-full shrink-0 overflow-hidden bg-midnight", aspectClassName)}>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
            unoptimized
          />
        ) : (
          <CardLinocutArt variant={variant} />
        )}
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/10 to-transparent"
        aria-hidden
      />
      {caption ? (
        <figcaption className="absolute bottom-0 left-0 right-0 px-5 py-4 md:px-6 md:py-5">
          <p className="font-mono-hbm text-[8px] uppercase tracking-[0.32em] text-cream/45">{caption}</p>
        </figcaption>
      ) : null}
    </figure>
  );
}

export function MagazineArticleCard({
  story,
  layout = "sidebar",
}: {
  story: MagazineStory;
  layout?: "lead" | "sidebar";
}) {
  const isLead = layout === "lead";

  return (
    <Link
      href={`/newspaper?story=${story.storyId}`}
      className={clsx(
        "card-3d group flex h-full w-full flex-col overflow-hidden border border-white/[0.09] bg-obsidian outline-none transition-[border-color,box-shadow] duration-500 hover:border-gold/25 hover:shadow-[0_32px_80px_rgba(0,0,0,0.58)] focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        isLead && "lg:min-h-[min(82vh,880px)]",
      )}
    >
      <StoryImageWell
        variant={story.pixelVariant}
        imageSrc={story.imageSrc}
        imageAlt={story.imageAlt ?? story.headline}
        aspectClassName={
          isLead ? "aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[5/3]" : "aspect-[16/10] md:aspect-[3/2]"
        }
        caption={isLead ? story.dateline : undefined}
      />

      <article
        className={clsx(
          "flex flex-1 flex-col border-t border-white/[0.07]",
          isLead ? "gap-6 p-9 md:gap-7 md:p-11 lg:p-14" : "gap-5 p-7 md:gap-6 md:p-9",
        )}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono-hbm text-[9px] uppercase tracking-[0.32em] text-gold/65 md:text-[10px]">
            {story.category}
          </span>
          {!isLead ? (
            <>
              <span className="hidden h-3 w-px bg-garnet/40 sm:block" aria-hidden />
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-silver-dim/50">
                {story.dateline}
              </span>
            </>
          ) : null}
        </div>

        <h3
          className={clsx(
            "font-cormorant font-light leading-[1.06] text-cream/90 transition-colors duration-500 group-hover:text-gold",
            isLead
              ? "text-[1.9rem] md:text-[2.35rem] lg:text-[2.85rem] lg:leading-[1.04]"
              : "text-[1.65rem] md:text-[1.85rem] md:leading-[1.08]",
          )}
        >
          {story.headline}
        </h3>

        <p
          className={clsx(
            "font-robinhood text-silver-dim/80",
            isLead
              ? "max-w-2xl text-[1.02rem] leading-[1.78] md:text-[1.08rem] md:leading-[1.82]"
              : "text-[15px] leading-[1.72] md:text-base md:leading-[1.76]",
          )}
        >
          {story.dek}
        </p>

        <span className={clsx(goldOutlineCta, "mt-auto w-fit")}>Read Story →</span>
      </article>
    </Link>
  );
}

export function MagazineRiverCard({ work }: { work: SuiteStory }) {
  return (
    <Link
      href={`/newspaper?story=${work.storyId}`}
      className="card-3d group flex w-full flex-col overflow-hidden border border-white/[0.09] bg-obsidian outline-none transition-[border-color,box-shadow] duration-500 hover:border-gold/25 hover:shadow-[0_28px_72px_rgba(0,0,0,0.55)] focus-visible:ring-2 focus-visible:ring-gold/30 focus-visible:ring-offset-2 focus-visible:ring-offset-void md:min-h-[300px] md:flex-row lg:min-h-[320px]"
    >
      <StoryImageWell
        variant={work.pixelVariant}
        imageSrc={work.imageSrc}
        imageAlt={work.imageAlt ?? work.title}
        aspectClassName="aspect-[16/10] md:aspect-auto md:h-auto md:min-h-[300px] md:w-[min(44%,400px)] md:shrink-0 lg:min-h-[320px]"
      />

      <article className="flex flex-1 flex-col justify-center gap-5 border-t border-white/[0.07] p-8 md:border-l md:border-t-0 md:p-10 lg:gap-6 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="glass-panel-dark font-mono-hbm text-label-xs uppercase tracking-[0.2em] text-gold/72 px-3.5 py-1.5">
            {work.category}
          </span>
          <span
            className={clsx(
              "font-mono-hbm text-sm font-semibold uppercase tracking-[0.14em] tabular-nums",
              work.stat.includes("$") ? "text-digital-80s" : "text-gold/82",
            )}
          >
            {work.stat}
          </span>
        </div>

        <h3 className="font-cormorant text-[1.75rem] font-light leading-[1.08] text-cream/90 transition-colors duration-500 group-hover:text-gold md:text-[2rem] lg:text-[2.15rem]">
          {work.title}
        </h3>

        <p className="font-robinhood max-w-2xl text-[15px] leading-[1.76] text-silver-dim/80 md:text-base md:leading-[1.8]">
          {work.description}
        </p>

        <span className={clsx(goldOutlineCta, "mt-1 w-fit")}>Read Story →</span>
      </article>
    </Link>
  );
}

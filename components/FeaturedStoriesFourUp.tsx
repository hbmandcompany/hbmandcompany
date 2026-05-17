"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import type { MagazineStory } from "@/components/MagazineStoryCards";

/** Four-up partner-style featured stories row. */
export function FeaturedStoriesFourUp({
  stories,
  sectionTitle = "The Front Page",
  eyebrow = "— Featured Stories",
  aside = "Culture · Music · Film · Markets · Vol. I · 2026",
}: {
  stories: MagazineStory[];
  sectionTitle?: string;
  eyebrow?: string;
  aside?: string;
}) {
  const cards = stories.slice(0, 4);

  return (
    <div className="featured-four-up home-editorial-shell">
      <header className="featured-four-up__header">
        <div>
          <span className="featured-four-up__eyebrow font-mono-hbm">{eyebrow}</span>
          <h2 className="featured-four-up__title font-robinhood">{sectionTitle}</h2>
        </div>
        {aside ? <p className="featured-four-up__aside font-mono-hbm">{aside}</p> : null}
      </header>
      <div className="featured-four-up__grid">
        {cards.map((story, index) => (
          <article
            key={story.storyId}
            className={clsx(
              "featured-four-up__card",
              index < cards.length - 1 && "featured-four-up__card--divided",
            )}
          >
            <Link href={`/newspaper?story=${story.storyId}`} className="featured-four-up__link group block h-full">
              {story.imageSrc ? (
                <figure className="featured-four-up__media relative aspect-[4/3] overflow-hidden bg-midnight">
                  <Image
                    src={story.imageSrc}
                    alt={story.imageAlt ?? story.headline}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                    unoptimized
                  />
                </figure>
              ) : null}
              <span className="featured-four-up__category font-mono-hbm">{story.category}</span>
              <h3 className="featured-four-up__headline font-robinhood group-hover:text-gold">{story.headline}</h3>
              <p className="featured-four-up__dek font-robinhood">{story.dek}</p>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}

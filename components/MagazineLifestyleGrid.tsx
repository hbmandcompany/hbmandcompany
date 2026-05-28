"use client";

import Image from "next/image";
import Link from "next/link";
import { StudioSlot } from "@/components/desk/studio/StudioSlot";
import type { HomepageStudioCanvasConfig, HomepageStudioSlot } from "@/lib/desk/homepage-studio";
import type { LifestyleGridData } from "@/lib/desk/homepage-sections";
import { buildHomepageSections } from "@/lib/desk/homepage-sections";

type LifestyleStory = LifestyleGridData["foodLead"];
type LifestyleStudioConfig = HomepageStudioCanvasConfig;

const fallbackData = buildHomepageSections(null).lifestyle;

function CategoryLabel({ children }: { children: string }) {
  return <span className="lifestyle-wire__category font-mono-hbm">{children}</span>;
}

function LifestyleHeadline({
  story,
  large = false,
  studio,
  slotId,
}: {
  story: LifestyleStory;
  large?: boolean;
  studio?: LifestyleStudioConfig;
  slotId?: HomepageStudioSlot;
}) {
  const content = (
    <>
      <CategoryLabel>{story.category}</CategoryLabel>
      <h4 className={large ? "lifestyle-wire__headline lifestyle-wire__headline--lg font-robinhood" : "lifestyle-wire__headline font-robinhood"}>
        {story.headline}
      </h4>
      {story.dek ? <p className="lifestyle-wire__dek font-robinhood">{story.dek}</p> : null}
    </>
  );

  if (studio && slotId) {
    return (
      <StudioSlot slotId={slotId} studio={studio} isDraft={story.storyId === studio.draftStoryId}>
        <div className="lifestyle-wire__story-link group block">{content}</div>
      </StudioSlot>
    );
  }

  return (
    <Link href={`/newspaper?story=${story.storyId}`} className="lifestyle-wire__story-link group block">
      {content}
    </Link>
  );
}

function ThumbStory({
  story,
  studio,
  slotId,
}: {
  story: LifestyleStory;
  studio?: LifestyleStudioConfig;
  slotId?: HomepageStudioSlot;
}) {
  const content = (
    <>
      <div className="lifestyle-wire__thumb-copy">
        <CategoryLabel>{story.category}</CategoryLabel>
        <p className="lifestyle-wire__thumb-headline font-robinhood">{story.headline}</p>
      </div>
      {story.imageSrc ? (
        <figure className="lifestyle-wire__thumb-media relative h-16 w-16 shrink-0 overflow-hidden bg-midnight">
          <Image src={story.imageSrc} alt="" fill className="object-cover" sizes="64px" unoptimized />
        </figure>
      ) : null}
    </>
  );

  if (studio && slotId) {
    return (
      <StudioSlot slotId={slotId} studio={studio} isDraft={story.storyId === studio.draftStoryId}>
        <div className="lifestyle-wire__thumb-story group">{content}</div>
      </StudioSlot>
    );
  }

  return (
    <Link href={`/newspaper?story=${story.storyId}`} className="lifestyle-wire__thumb-story group">
      {content}
    </Link>
  );
}

/** Food / Arts & Entertainment wire — DMN-style multi-column band. */
export function MagazineLifestyleGrid({
  data,
  studio,
}: {
  data?: LifestyleGridData;
  studio?: LifestyleStudioConfig;
}) {
  const { foodLead, foodSecondary, foodColTwo, foodThumbs, artsStories } = data ?? fallbackData;

  return (
    <div className="lifestyle-wire">
      <div className="lifestyle-wire__header-row">
        <h2 className="lifestyle-wire__section-name font-robinhood">Music &amp; Culture</h2>
        <h2 className="lifestyle-wire__section-name font-robinhood lifestyle-wire__section-name--right">Arts &amp; Entertainment</h2>
      </div>

      <div className="lifestyle-wire__grid">
        <div className="lifestyle-wire__food-main">
          {studio ? (
            <StudioSlot slotId="lifestyle-food-lead" studio={studio} isDraft={foodLead.storyId === studio.draftStoryId}>
              <div className="lifestyle-wire__lead group block">
                {foodLead.imageSrc ? (
                  <figure className="lifestyle-wire__lead-media relative aspect-[16/10] overflow-hidden bg-midnight">
                    <Image
                      src={foodLead.imageSrc}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                      unoptimized
                    />
                  </figure>
                ) : null}
                <CategoryLabel>{foodLead.category}</CategoryLabel>
                <h3 className="lifestyle-wire__headline lifestyle-wire__headline--lg font-robinhood">{foodLead.headline}</h3>
                {foodLead.dek ? <p className="lifestyle-wire__dek font-robinhood">{foodLead.dek}</p> : null}
              </div>
            </StudioSlot>
          ) : (
          <Link href={`/newspaper?story=${foodLead.storyId}`} className="lifestyle-wire__lead group block">
            {foodLead.imageSrc ? (
              <figure className="lifestyle-wire__lead-media relative aspect-[16/10] overflow-hidden bg-midnight">
                <Image
                  src={foodLead.imageSrc}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  unoptimized
                />
              </figure>
            ) : null}
            <CategoryLabel>{foodLead.category}</CategoryLabel>
            <h3 className="lifestyle-wire__headline lifestyle-wire__headline--lg font-robinhood group-hover:text-gold">
              {foodLead.headline}
            </h3>
            {foodLead.dek ? <p className="lifestyle-wire__dek font-robinhood">{foodLead.dek}</p> : null}
          </Link>
          )}
          <div className="lifestyle-wire__stack">
            {foodSecondary.map((story, index) => (
              <article key={story.storyId} className="lifestyle-wire__text-block">
                <LifestyleHeadline story={story} studio={studio} slotId={`lifestyle-food-secondary-${index}` as HomepageStudioSlot} />
              </article>
            ))}
          </div>
        </div>

        <div className="lifestyle-wire__food-secondary">
          {foodColTwo.map((story, index) => (
            <article key={story.storyId} className="lifestyle-wire__block">
              {story.imageSrc ? (
                <Link href={`/newspaper?story=${story.storyId}`} className="group mb-3 block">
                  <figure className="lifestyle-wire__inline-media relative aspect-[16/10] overflow-hidden bg-midnight">
                    <Image
                      src={story.imageSrc}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      unoptimized
                    />
                  </figure>
                </Link>
              ) : null}
              <LifestyleHeadline story={story} studio={studio} slotId={`lifestyle-food-col2-${index}` as HomepageStudioSlot} />
            </article>
          ))}
          {foodThumbs.map((story, index) => (
            <ThumbStory key={story.storyId} story={story} studio={studio} slotId={`lifestyle-food-thumb-${index}` as HomepageStudioSlot} />
          ))}
        </div>

        <aside className="lifestyle-wire__arts">
          {artsStories.map((story, index) => (
            <ThumbStory key={story.storyId} story={story} studio={studio} slotId={`lifestyle-arts-${index}` as HomepageStudioSlot} />
          ))}
          <Link href="/newspaper" className="lifestyle-wire__promo group block">
            <figure className="lifestyle-wire__promo-media relative aspect-[4/3] overflow-hidden bg-midnight">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=85"
                alt=""
                fill
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                unoptimized
              />
            </figure>
            <div className="lifestyle-wire__promo-body">
              <p className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-gold/65">Listen</p>
              <h4 className="lifestyle-wire__promo-title font-robinhood group-hover:text-gold">Podcasts from HBM &amp; Company</h4>
              <p className="lifestyle-wire__dek font-robinhood">Desk briefings, culture wires, and treasury dispatches.</p>
            </div>
          </Link>
        </aside>
      </div>
    </div>
  );
}

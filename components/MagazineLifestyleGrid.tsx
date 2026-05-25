"use client";

import Image from "next/image";
import Link from "next/link";
import { AdPlacementPlaceholder } from "@/components/AdPlacementPlaceholder";

type LifestyleStory = {
  storyId: string;
  category: string;
  headline: string;
  dek?: string;
  imageSrc?: string;
};

const foodLead: LifestyleStory = {
  storyId: "algorithm-drops",
  category: "Music Desk",
  headline: "The Algorithm Knows What Drops Next",
  dek: "How on-chain data is predicting breakout artists before the playlists catch up — and what labels are doing about it.",
  imageSrc: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=85",
};

const foodSecondary: LifestyleStory[] = [
  {
    storyId: "playlist-edge",
    category: "Music Intel",
    headline: "Labels Buy the Same Algorithm the Indies Built",
    dek: "Major rooms are licensing the same breakout signals independents pioneered on-chain.",
  },
  {
    storyId: "masters-reprice",
    category: "Rights",
    headline: "Masters Reprice Overnight as Catalogs Trade in Private Rooms",
  },
  {
    storyId: "royalty-rail",
    category: "Markets",
    headline: "Royalty Tokens Clear First Institutional Window",
  },
];

const foodColTwo: LifestyleStory[] = [
  {
    storyId: "artists-on-chain",
    category: "DeFi Yield",
    headline: "The 52 Ways Artists Are Earning On-Chain",
    dek: "From streaming residuals to protocol yield, a new ledger of artist income is emerging.",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=85",
  },
  {
    storyId: "film-on-chain",
    category: "Film & Capital",
    headline: "Film Financing Goes On-Chain",
    dek: "Independent studios tokenise production rights on Base and Stellar.",
  },
];

const foodThumbs: LifestyleStory[] = [
  {
    storyId: "slate-token",
    category: "Film",
    headline: "Slate Financing Closes on Base in 48 Hours",
    imageSrc: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=85",
  },
];

const artsStories: LifestyleStory[] = [
  {
    storyId: "culture-tax-brief",
    category: "Culture",
    headline: "Who Owns the Sound of a Generation",
    imageSrc: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&q=85",
  },
  {
    storyId: "desk-dispatch",
    category: "Dispatch",
    headline: "The Ledger After the Room Goes Quiet",
    imageSrc: "https://images.unsplash.com/photo-1507838153414-b4b656423e2e?w=300&q=85",
  },
  {
    storyId: "threewisemen-xlm",
    category: "On-Chain Gifting",
    headline: "ThreeWiseMen: When XLM Becomes a Love Language",
    imageSrc: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&q=85",
  },
];

function CategoryLabel({ children }: { children: string }) {
  return <span className="lifestyle-wire__category font-mono-hbm">{children}</span>;
}

function LifestyleHeadline({ story, large = false }: { story: LifestyleStory; large?: boolean }) {
  return (
    <Link href={`/newspaper?story=${story.storyId}`} className="lifestyle-wire__story-link group block">
      <CategoryLabel>{story.category}</CategoryLabel>
      <h4 className={large ? "lifestyle-wire__headline lifestyle-wire__headline--lg font-robinhood" : "lifestyle-wire__headline font-robinhood"}>
        {story.headline}
      </h4>
      {story.dek ? <p className="lifestyle-wire__dek font-robinhood">{story.dek}</p> : null}
    </Link>
  );
}

function ThumbStory({ story }: { story: LifestyleStory }) {
  return (
    <Link href={`/newspaper?story=${story.storyId}`} className="lifestyle-wire__thumb-story group">
      <div className="lifestyle-wire__thumb-copy">
        <CategoryLabel>{story.category}</CategoryLabel>
        <p className="lifestyle-wire__thumb-headline font-robinhood">{story.headline}</p>
      </div>
      {story.imageSrc ? (
        <figure className="lifestyle-wire__thumb-media relative h-16 w-16 shrink-0 overflow-hidden bg-midnight">
          <Image src={story.imageSrc} alt="" fill className="object-cover" sizes="64px" unoptimized />
        </figure>
      ) : null}
    </Link>
  );
}

/** Food / Arts & Entertainment wire — DMN-style multi-column band. */
export function MagazineLifestyleGrid() {
  return (
    <div className="lifestyle-wire">
      <div className="lifestyle-wire__header-row">
        <h2 className="lifestyle-wire__section-name font-robinhood">Music &amp; Culture</h2>
        <h2 className="lifestyle-wire__section-name font-robinhood lifestyle-wire__section-name--right">Arts &amp; Entertainment</h2>
      </div>

      <div className="lifestyle-wire__grid">
        <div className="lifestyle-wire__food-main">
          <Link href={`/newspaper?story=${foodLead.storyId}`} className="lifestyle-wire__lead group block">
            <figure className="lifestyle-wire__lead-media relative aspect-[16/10] overflow-hidden bg-midnight">
              <Image
                src={foodLead.imageSrc!}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 40vw"
                unoptimized
              />
            </figure>
            <CategoryLabel>{foodLead.category}</CategoryLabel>
            <h3 className="lifestyle-wire__headline lifestyle-wire__headline--lg font-robinhood group-hover:text-gold">
              {foodLead.headline}
            </h3>
            <p className="lifestyle-wire__dek font-robinhood">{foodLead.dek}</p>
          </Link>
          <div className="lifestyle-wire__stack">
            {foodSecondary.map((story) => (
              <article key={story.storyId} className="lifestyle-wire__text-block">
                <LifestyleHeadline story={story} />
              </article>
            ))}
          </div>
        </div>

        <div className="lifestyle-wire__food-secondary">
          {foodColTwo.map((story) => (
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
              <LifestyleHeadline story={story} />
            </article>
          ))}
          {foodThumbs.map((story) => (
            <ThumbStory key={story.storyId} story={story} />
          ))}
        </div>

        <aside className="lifestyle-wire__arts">
          {artsStories.map((story) => (
            <ThumbStory key={story.storyId} story={story} />
          ))}
          <div className="lifestyle-wire__ad-slot">
            <AdPlacementPlaceholder theme="dark" className="hero-front-page__ad-slot" />
          </div>
        </aside>
      </div>

      <article className="lifestyle-wire__footer-span">
        <Link href="/treasury" className="lifestyle-wire__footer-link group flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CategoryLabel>Markets Desk</CategoryLabel>
            <h3 className="lifestyle-wire__headline lifestyle-wire__headline--lg font-robinhood group-hover:text-gold">
              Reserve Holdings Update: Verified Rails and Governance Cadence
            </h3>
            <p className="lifestyle-wire__dek font-robinhood">
              Enterprise posture on DeFi infrastructure and digital-asset custody.
            </p>
            <span className="lifestyle-wire__byline font-mono-hbm">By HBM Markets Desk</span>
          </div>
          <figure className="lifestyle-wire__footer-icon relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/[0.1] bg-midnight">
            <Image
              src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=200&q=85"
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          </figure>
        </Link>
      </article>
    </div>
  );
}

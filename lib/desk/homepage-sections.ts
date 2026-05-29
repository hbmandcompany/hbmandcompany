import type { BroadsheetColumn, WireBrief } from "@/components/MagazineHomeLayouts";
import type { MagazineStory, SuiteStory } from "@/components/MagazineStoryCards";
import {
  briefingToMagazineStory,
  briefingToWireBrief,
  type PublicArticleBriefing,
} from "@/lib/desk/article-to-briefing";

export type LifestyleStory = {
  storyId: string;
  category: string;
  headline: string;
  dek?: string;
  imageSrc?: string;
};

export type DmnLeadStory = {
  storyId: string;
  category: string;
  headline: string;
  dek: string;
  imageSrc?: string;
  imageAlt?: string;
};

export type LifestyleGridData = {
  foodLead: LifestyleStory;
  foodSecondary: LifestyleStory[];
  foodColTwo: LifestyleStory[];
  foodThumbs: LifestyleStory[];
  artsStories: LifestyleStory[];
  listenPromo: LifestyleStory;
};

export type HomepageSections = {
  heroBriefings: PublicArticleBriefing[] | null;
  editorialTopRow: WireBrief[];
  editorialBusinessList: WireBrief[];
  editorialBusinessLead: DmnLeadStory;
  lifestyle: LifestyleGridData;
  marketsWire: WireBrief[];
  marketsLead: DmnLeadStory;
  broadsheetColumns: BroadsheetColumn[];
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=900&q=85";

const FALLBACK_FEATURED: MagazineStory[] = [
  {
    storyId: "algorithm-drops",
    category: "Music Intelligence",
    headline: "The Algorithm Knows What Drops Next",
    dek: "How on-chain data is predicting breakout artists before the playlists catch up.",
    dateline: "May 16, 2026 · New York",
    pixelVariant: "lightrain",
    imageSrc: DEFAULT_IMAGE,
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
    dek: "As streaming margins compress, a quiet war over IP ownership is reshaping who gets paid.",
    dateline: "May 12, 2026 · London",
    pixelVariant: "black-letter",
    imageSrc: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=900&q=85",
    imageAlt: "Live performance crowd",
  },
];

const FALLBACK_WIRE: WireBrief[] = [
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
    imageSrc: DEFAULT_IMAGE,
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
    storyId: "governance-reserve",
    category: "Governance Wire",
    headline: "Reserve Committee Signer Rotation Enters Q2 Window",
    dateline: "May 14, 2026",
    imageSrc: "https://images.unsplash.com/photo-1639765481667-de9d24e3f329?w=400&q=85",
  },
  {
    storyId: "whitepaper-access",
    category: "Documentation",
    headline: "Whitepaper: Institutional Reserve Framework",
    dateline: "Updated weekly",
  },
];

const FALLBACK_SUITE: SuiteStory = {
  storyId: "artists-on-chain",
  title: "The 52 Ways Artists Are Earning On-Chain",
  category: "DeFi Yield Discovery",
  description:
    "From streaming residuals to protocol yield, a new ledger of artist income is emerging — mapped chain by chain, venue by venue, and royalty line by royalty line.",
  stat: "Multi-chain",
  pixelVariant: "pickup",
  imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=85",
  imageAlt: "Abstract digital art",
};

const COLUMN_TITLES = ["Music", "Culture", "Markets", "Film"] as const;

function briefingToWireWithImage(briefing: PublicArticleBriefing): WireBrief {
  return {
    ...briefingToWireBrief(briefing),
    imageSrc: briefing.heroImageUrl ?? undefined,
  };
}

function briefingToLifestyle(briefing: PublicArticleBriefing): LifestyleStory {
  return {
    storyId: briefing.id,
    category: briefing.section,
    headline: briefing.headline,
    dek: briefing.dek || undefined,
    imageSrc: briefing.heroImageUrl ?? undefined,
  };
}

function pickLive<T>(
  live: PublicArticleBriefing[],
  index: number,
  fallback: T,
  map: (briefing: PublicArticleBriefing) => T,
): T {
  if (index < live.length) return map(live[index]);
  if (live.length > 0) return map(live[index % live.length]);
  return fallback;
}

function pickWire(live: PublicArticleBriefing[], index: number, fallback: WireBrief): WireBrief {
  return pickLive(live, index, fallback, briefingToWireWithImage);
}

function pickLifestyle(live: PublicArticleBriefing[], index: number, fallback: LifestyleStory): LifestyleStory {
  return pickLive(live, index, fallback, briefingToLifestyle);
}

function buildFallbackBroadsheet(): BroadsheetColumn[] {
  return [
    {
      title: "Music",
      lead: {
        storyId: FALLBACK_FEATURED[0].storyId,
        headline: FALLBACK_FEATURED[0].headline,
        imageSrc: FALLBACK_FEATURED[0].imageSrc!,
        imageAlt: FALLBACK_FEATURED[0].imageAlt,
      },
      more: [
        { storyId: FALLBACK_WIRE[1].storyId, headline: FALLBACK_WIRE[1].headline },
        { storyId: FALLBACK_WIRE[0].storyId, headline: FALLBACK_WIRE[0].headline },
        { storyId: FALLBACK_SUITE.storyId, headline: FALLBACK_SUITE.title },
        { storyId: "streaming-royalties-chain", headline: "Streaming Royalties Sync to Chain Nightly" },
        { storyId: "indie-breakout-signals", headline: "Indie Labels Share Breakout Signal Feeds" },
      ],
    },
    {
      title: "Culture",
      lead: {
        storyId: FALLBACK_FEATURED[2].storyId,
        headline: FALLBACK_FEATURED[2].headline,
        imageSrc: FALLBACK_FEATURED[2].imageSrc!,
        imageAlt: FALLBACK_FEATURED[2].imageAlt,
      },
      more: [
        { storyId: FALLBACK_WIRE[4].storyId, headline: FALLBACK_WIRE[4].headline },
        { storyId: FALLBACK_WIRE[6].storyId, headline: FALLBACK_WIRE[6].headline },
        { storyId: "residency-payout-rails", headline: "Residency Payout Rails Open to Independent Promoters" },
        { storyId: "venue-residencies-stellar", headline: "Venue Residencies Tokenized on Stellar" },
        { storyId: FALLBACK_FEATURED[2].storyId, headline: FALLBACK_FEATURED[2].headline },
      ],
    },
    {
      title: "Markets",
      lead: {
        storyId: FALLBACK_WIRE[3].storyId,
        headline: FALLBACK_WIRE[3].headline,
        imageSrc: FALLBACK_WIRE[3].imageSrc!,
      },
      more: [
        { storyId: FALLBACK_WIRE[7].storyId, headline: FALLBACK_WIRE[7].headline },
        { storyId: FALLBACK_WIRE[8].storyId, headline: FALLBACK_WIRE[8].headline },
        { storyId: FALLBACK_WIRE[9].storyId, headline: FALLBACK_WIRE[9].headline },
        { storyId: "nft-royalty-pools", headline: "NFT Royalty Pools Open Secondary Desk" },
        { storyId: "governance-q2-floor", headline: "Governance Vote Sets Q2 Reserve Floor" },
      ],
    },
    {
      title: "Film",
      lead: {
        storyId: FALLBACK_FEATURED[1].storyId,
        headline: FALLBACK_FEATURED[1].headline,
        imageSrc: FALLBACK_FEATURED[1].imageSrc!,
        imageAlt: FALLBACK_FEATURED[1].imageAlt,
      },
      more: [
        { storyId: FALLBACK_WIRE[2].storyId, headline: FALLBACK_WIRE[2].headline },
        { storyId: FALLBACK_WIRE[5].storyId, headline: FALLBACK_WIRE[5].headline },
        { storyId: "doc-slate-base", headline: "Documentary Slate Lists on Base" },
        { storyId: "director-cuts-fractional", headline: "Director Cuts Trade as Fractional Rights" },
        { storyId: FALLBACK_FEATURED[1].storyId, headline: FALLBACK_FEATURED[1].headline },
      ],
    },
  ];
}

function buildFallbackLifestyle(): LifestyleGridData {
  return {
    foodLead: {
      storyId: FALLBACK_FEATURED[0].storyId,
      category: "Music Desk",
      headline: FALLBACK_FEATURED[0].headline,
      dek: FALLBACK_FEATURED[0].dek,
      imageSrc: FALLBACK_FEATURED[0].imageSrc,
    },
    foodSecondary: [
      {
        storyId: FALLBACK_WIRE[1].storyId,
        category: FALLBACK_WIRE[1].category,
        headline: FALLBACK_WIRE[1].headline,
        dek: "Major rooms are licensing the same breakout signals independents pioneered on-chain.",
      },
      {
        storyId: FALLBACK_WIRE[0].storyId,
        category: FALLBACK_WIRE[0].category,
        headline: FALLBACK_WIRE[0].headline,
      },
    ],
    foodColTwo: [
      {
        storyId: FALLBACK_SUITE.storyId,
        category: FALLBACK_SUITE.category,
        headline: FALLBACK_SUITE.title,
        dek: FALLBACK_SUITE.description,
        imageSrc: FALLBACK_SUITE.imageSrc,
      },
      {
        storyId: FALLBACK_FEATURED[1].storyId,
        category: FALLBACK_FEATURED[1].category,
        headline: FALLBACK_FEATURED[1].headline,
        dek: FALLBACK_FEATURED[1].dek,
      },
    ],
    foodThumbs: [
      {
        storyId: FALLBACK_WIRE[2].storyId,
        category: FALLBACK_WIRE[2].category,
        headline: FALLBACK_WIRE[2].headline,
        imageSrc: FALLBACK_WIRE[2].imageSrc,
      },
    ],
    artsStories: [
      {
        storyId: FALLBACK_WIRE[4].storyId,
        category: FALLBACK_WIRE[4].category,
        headline: FALLBACK_WIRE[4].headline,
        imageSrc: FALLBACK_WIRE[4].imageSrc,
      },
      {
        storyId: FALLBACK_WIRE[6].storyId,
        category: FALLBACK_WIRE[6].category,
        headline: FALLBACK_WIRE[6].headline,
        imageSrc: FALLBACK_WIRE[6].imageSrc,
      },
      {
        storyId: "threewisemen-xlm",
        category: "On-Chain Gifting",
        headline: "ThreeWiseMen: When XLM Becomes a Love Language",
        imageSrc: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=300&q=85",
      },
    ],
    listenPromo: {
      storyId: "hbm-podcasts-listen",
      category: "Listen",
      headline: "Podcasts from HBM & Company",
      dek: "Desk briefings, culture wires, and treasury dispatches.",
      imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=85",
    },
  };
}

function buildFallbackSections(): HomepageSections {
  const lifestyle = buildFallbackLifestyle();
  return {
    heroBriefings: null,
    editorialTopRow: FALLBACK_WIRE.slice(0, 4),
    editorialBusinessList: FALLBACK_WIRE.slice(4, 7),
    editorialBusinessLead: {
      storyId: FALLBACK_SUITE.storyId,
      category: FALLBACK_SUITE.category,
      headline: FALLBACK_SUITE.title,
      dek: FALLBACK_SUITE.description,
      imageSrc: FALLBACK_SUITE.imageSrc,
      imageAlt: FALLBACK_SUITE.imageAlt,
    },
    lifestyle,
    marketsWire: FALLBACK_WIRE.slice(8, 11),
    marketsLead: {
      storyId: FALLBACK_WIRE[7].storyId,
      category: FALLBACK_WIRE[7].category,
      headline: FALLBACK_WIRE[7].headline,
      dek: FALLBACK_WIRE[7].dek ?? "",
      imageSrc: FALLBACK_WIRE[7].imageSrc,
    },
    broadsheetColumns: buildFallbackBroadsheet(),
  };
}

function buildBroadsheetColumns(live: PublicArticleBriefing[]): BroadsheetColumn[] {
  const fallback = buildFallbackBroadsheet();

  return COLUMN_TITLES.map((title, columnIndex) => {
    const leadIndex = columnIndex * 6;
    const leadBriefing = live[leadIndex];
    const leadFallback = fallback[columnIndex].lead;

    return {
      title,
      lead: leadBriefing
        ? {
            storyId: leadBriefing.id,
            headline: leadBriefing.headline,
            imageSrc: leadBriefing.heroImageUrl ?? leadFallback.imageSrc,
            imageAlt: leadBriefing.headline,
          }
        : leadFallback,
      more: fallback[columnIndex].more.map((item, i) => {
        const briefing = live[leadIndex + 1 + i];
        return briefing
          ? { storyId: briefing.id, headline: briefing.headline }
          : item;
      }),
    };
  });
}

/** Build all homepage section data from published Supabase briefings, with mock fallbacks for gaps. */
export function buildHomepageSections(live: PublicArticleBriefing[] | null): HomepageSections {
  if (!live || live.length === 0) {
    return buildFallbackSections();
  }

  const fallback = buildFallbackSections();
  const lifestyleFallback = fallback.lifestyle;

  return {
    heroBriefings: live,
    editorialTopRow: [0, 1, 2, 3].map((i) => pickWire(live, i + 4, fallback.editorialTopRow[i])),
    editorialBusinessList: [0, 1, 2].map((i) =>
      pickWire(live, i + 8, fallback.editorialBusinessList[i]),
    ),
    editorialBusinessLead: (() => {
      const b = live[11];
      if (!b) return fallback.editorialBusinessLead;
      const story = briefingToMagazineStory(b, b.heroImageUrl ?? undefined);
      return {
        storyId: story.storyId,
        category: story.category,
        headline: story.headline,
        dek: story.dek,
        imageSrc: story.imageSrc,
        imageAlt: story.imageAlt,
      };
    })(),
    lifestyle: {
      foodLead: pickLifestyle(live, 12, lifestyleFallback.foodLead),
      foodSecondary: [0, 1].map((i) => pickLifestyle(live, i + 13, lifestyleFallback.foodSecondary[i])),
      foodColTwo: [0, 1].map((i) => pickLifestyle(live, i + 15, lifestyleFallback.foodColTwo[i])),
      foodThumbs: [pickLifestyle(live, 17, lifestyleFallback.foodThumbs[0])],
      artsStories: [0, 1, 2].map((i) => pickLifestyle(live, i + 18, lifestyleFallback.artsStories[i])),
      listenPromo: lifestyleFallback.listenPromo,
    },
    marketsWire: [0, 1, 2].map((i) => pickWire(live, i + 21, fallback.marketsWire[i])),
    marketsLead: (() => {
      const b = live[24];
      if (!b) return fallback.marketsLead;
      return {
        storyId: b.id,
        category: b.section,
        headline: b.headline,
        dek: b.dek,
        imageSrc: b.heroImageUrl ?? fallback.marketsLead.imageSrc,
        imageAlt: b.headline,
      };
    })(),
    broadsheetColumns: buildBroadsheetColumns(live),
  };
}

/** Hero-specific derivations (kept here so HomePageClient stays thin). */
export function buildHeroProps(sections: HomepageSections, tickerOverride?: string[] | null) {
  const live = sections.heroBriefings;
  const fallback = buildFallbackSections();

  const heroLead = live?.[0]
    ? briefingToMagazineStory(live[0], live[0].heroImageUrl ?? DEFAULT_IMAGE)
    : briefingToMagazineStory({
        id: FALLBACK_FEATURED[0].storyId,
        desk: "Desk",
        section: FALLBACK_FEATURED[0].category,
        headline: FALLBACK_FEATURED[0].headline,
        dek: FALLBACK_FEATURED[0].dek,
        byline: "HBM Editorial",
        publishedAt: FALLBACK_FEATURED[0].dateline,
        lede: FALLBACK_FEATURED[0].dek,
        body: [],
        metrics: [],
        related: [],
        heroImageUrl: FALLBACK_FEATURED[0].imageSrc,
      });

  const heroFollowUp = live?.[1]
    ? briefingToMagazineStory(live[1])
    : {
        storyId: FALLBACK_SUITE.storyId,
        category: FALLBACK_SUITE.category,
        headline: FALLBACK_SUITE.title,
        dek: FALLBACK_SUITE.description,
        dateline: "May 15, 2026 · Dispatch",
        pixelVariant: "pickup" as const,
      };

  return {
    heroLead,
    heroFollowUp,
    heroRightFeatured: live?.[1]
      ? briefingToMagazineStory(live[1], live[1].heroImageUrl ?? FALLBACK_FEATURED[1].imageSrc)
      : FALLBACK_FEATURED[1],
    heroRightSecondary: live?.[2]
      ? briefingToMagazineStory(live[2], live[2].heroImageUrl ?? FALLBACK_FEATURED[2].imageSrc)
      : FALLBACK_FEATURED[2],
    heroLeft: live ? live.slice(2, 8).map(briefingToWireBrief) : fallback.editorialTopRow.slice(0, 6),
    heroCulture: live
      ? live.slice(3, 5).map(briefingToWireBrief)
      : [
          { storyId: FALLBACK_WIRE[0].storyId, category: FALLBACK_WIRE[0].category, headline: FALLBACK_WIRE[0].headline, dateline: FALLBACK_WIRE[0].dateline },
          { storyId: FALLBACK_WIRE[1].storyId, category: FALLBACK_WIRE[1].category, headline: FALLBACK_WIRE[1].headline, dateline: FALLBACK_WIRE[1].dateline },
        ],
    heroTicker:
      tickerOverride && tickerOverride.length > 0
        ? tickerOverride
        : live
          ? live.map((b) => b.headline)
          : FALLBACK_WIRE.slice(0, 4).map((w) => w.headline),
    heroImage: live?.[0]?.heroImageUrl ?? "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=1200&q=85",
    heroRightTopBriefs: live
      ? live.slice(1, 3).map(briefingToWireBrief)
      : fallback.editorialBusinessList.slice(0, 2),
    liveHero: live,
  };
}

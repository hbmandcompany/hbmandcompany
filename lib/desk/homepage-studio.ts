import type { WireBrief } from "@/components/MagazineHomeLayouts";
import type { PublicArticleBriefing } from "@/lib/desk/article-to-briefing";
import {
  buildHeroProps,
  buildHomepageSections,
  type DmnLeadStory,
  type HomepageSections,
} from "@/lib/desk/homepage-sections";
import { briefingToMagazineStory } from "@/lib/desk/article-to-briefing";

export type HomepageStudioSlot =
  | "hero-lead"
  | "hero-follow-up"
  | "hero-right-featured"
  | "hero-right-secondary"
  | "hero-left-0"
  | "hero-left-1"
  | "hero-left-2"
  | "hero-left-3"
  | "hero-left-4"
  | "hero-left-5"
  | "hero-right-top-0"
  | "hero-right-top-1"
  | "hero-culture-0"
  | "hero-culture-1"
  | "editorial-top-0"
  | "editorial-top-1"
  | "editorial-top-2"
  | "editorial-top-3"
  | "business-list-0"
  | "business-list-1"
  | "business-list-2"
  | "business-lead"
  | "markets-lead"
  | "markets-wire-0"
  | "markets-wire-1"
  | "markets-wire-2"
  | "lifestyle-food-lead"
  | "lifestyle-food-secondary-0"
  | "lifestyle-food-secondary-1"
  | "lifestyle-food-col2-0"
  | "lifestyle-food-col2-1"
  | "lifestyle-food-thumb-0"
  | "lifestyle-arts-0"
  | "lifestyle-arts-1"
  | "lifestyle-arts-2"
  | "lifestyle-listen-promo"
  | "column-0-lead"
  | "column-1-lead"
  | "column-2-lead"
  | "column-3-lead"
  | "column-0-more-0"
  | "column-0-more-1"
  | "column-0-more-2"
  | "column-0-more-3"
  | "column-0-more-4"
  | "column-1-more-0"
  | "column-1-more-1"
  | "column-1-more-2"
  | "column-1-more-3"
  | "column-1-more-4"
  | "column-2-more-0"
  | "column-2-more-1"
  | "column-2-more-2"
  | "column-2-more-3"
  | "column-2-more-4"
  | "column-3-more-0"
  | "column-3-more-1"
  | "column-3-more-2"
  | "column-3-more-3"
  | "column-3-more-4";

export const HOMEPAGE_STUDIO_SLOT_LABELS: Record<HomepageStudioSlot, string> = {
  "hero-lead": "Hero lead",
  "hero-follow-up": "Hero follow up",
  "hero-right-featured": "Hero featured right",
  "hero-right-secondary": "Hero secondary right",
  "hero-left-0": "Left brief 1",
  "hero-left-1": "Left brief 2",
  "hero-left-2": "Left brief 3",
  "hero-left-3": "Left brief 4",
  "hero-left-4": "Left brief 5",
  "hero-left-5": "Left brief 6",
  "hero-right-top-0": "Right brief 1",
  "hero-right-top-1": "Right brief 2",
  "hero-culture-0": "Culture brief 1",
  "hero-culture-1": "Culture brief 2",
  "editorial-top-0": "Grid · 1",
  "editorial-top-1": "Grid · 2",
  "editorial-top-2": "Grid · 3",
  "editorial-top-3": "Grid · 4",
  "business-list-0": "Markets list 1",
  "business-list-1": "Markets list 2",
  "business-list-2": "Markets list 3",
  "business-lead": "Markets lead",
  "markets-lead": "Wire lead",
  "markets-wire-0": "Treasury wire",
  "markets-wire-1": "Governance wire",
  "markets-wire-2": "Documentation wire",
  "lifestyle-food-lead": "Culture lead",
  "lifestyle-food-secondary-0": "Culture text 1",
  "lifestyle-food-secondary-1": "Culture text 2",
  "lifestyle-food-col2-0": "Culture feature 1",
  "lifestyle-food-col2-1": "Culture feature 2",
  "lifestyle-food-thumb-0": "Culture thumb",
  "lifestyle-arts-0": "Arts item 1",
  "lifestyle-arts-1": "Arts item 2",
  "lifestyle-arts-2": "Arts item 3",
  "lifestyle-listen-promo": "Listen promo",
  "column-0-lead": "Music lead",
  "column-1-lead": "Culture lead",
  "column-2-lead": "Markets lead",
  "column-3-lead": "Film lead",
  "column-0-more-0": "Music more 1",
  "column-0-more-1": "Music more 2",
  "column-0-more-2": "Music more 3",
  "column-0-more-3": "Music more 4",
  "column-0-more-4": "Music more 5",
  "column-1-more-0": "Culture more 1",
  "column-1-more-1": "Culture more 2",
  "column-1-more-2": "Culture more 3",
  "column-1-more-3": "Culture more 4",
  "column-1-more-4": "Culture more 5",
  "column-2-more-0": "Markets more 1",
  "column-2-more-1": "Markets more 2",
  "column-2-more-2": "Markets more 3",
  "column-2-more-3": "Markets more 4",
  "column-2-more-4": "Markets more 5",
  "column-3-more-0": "Film more 1",
  "column-3-more-1": "Film more 2",
  "column-3-more-2": "Film more 3",
  "column-3-more-3": "Film more 4",
  "column-3-more-4": "Film more 5",
};

export const HOMEPAGE_STUDIO_SLOT_GROUPS: {
  label: string;
  slots: HomepageStudioSlot[];
}[] = [
  { label: "Hero", slots: ["hero-lead"] },
  {
    label: "Hero stories",
    slots: ["hero-follow-up", "hero-right-featured", "hero-right-secondary"],
  },
  {
    label: "Hero briefs",
    slots: [
      "hero-left-0",
      "hero-left-1",
      "hero-left-2",
      "hero-left-3",
      "hero-left-4",
      "hero-left-5",
      "hero-right-top-0",
      "hero-right-top-1",
      "hero-culture-0",
      "hero-culture-1",
    ],
  },
  { label: "Editorial grid", slots: ["editorial-top-0", "editorial-top-1", "editorial-top-2", "editorial-top-3"] },
  { label: "Culture/Markets block", slots: ["business-list-0", "business-list-1", "business-list-2", "business-lead"] },
  {
    label: "Lifestyle band",
    slots: [
      "lifestyle-food-lead",
      "lifestyle-food-secondary-0",
      "lifestyle-food-secondary-1",
      "lifestyle-food-col2-0",
      "lifestyle-food-col2-1",
      "lifestyle-food-thumb-0",
      "lifestyle-arts-0",
      "lifestyle-arts-1",
      "lifestyle-arts-2",
      "lifestyle-listen-promo",
    ],
  },
  { label: "Markets wire", slots: ["markets-lead", "markets-wire-0", "markets-wire-1", "markets-wire-2"] },
  {
    label: "Columns",
    slots: [
      "column-0-lead",
      "column-0-more-0",
      "column-0-more-1",
      "column-0-more-2",
      "column-0-more-3",
      "column-0-more-4",
      "column-1-lead",
      "column-1-more-0",
      "column-1-more-1",
      "column-1-more-2",
      "column-1-more-3",
      "column-1-more-4",
      "column-2-lead",
      "column-2-more-0",
      "column-2-more-1",
      "column-2-more-2",
      "column-2-more-3",
      "column-2-more-4",
      "column-3-lead",
      "column-3-more-0",
      "column-3-more-1",
      "column-3-more-2",
      "column-3-more-3",
      "column-3-more-4",
    ],
  },
];

/** Approximate height of compact studio homepage (hero + culture band only). */
export const STUDIO_COMPACT_PAGE_HEIGHT = 1680;
export const STUDIO_PAGE_WIDTH = 1440;

export type DraftStudioStory = {
  storyId: string;
  headline: string;
  dek: string;
  category: string;
  imageSrc?: string;
};

export type HomepageStudioCanvasConfig = {
  draftStoryId: string;
  selectedSlot: HomepageStudioSlot | null;
  hoveredSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
  onHoverSlot: (slot: HomepageStudioSlot | null) => void;
};

export type StudioSectionView = "hero" | "lifestyle" | "markets" | "columns";

/** Maps a placement slot to the homepage section tab that contains it. */
export function studioSectionForSlot(slot: HomepageStudioSlot): StudioSectionView {
  if (slot.startsWith("lifestyle-")) return "lifestyle";
  if (slot.startsWith("markets-")) return "markets";
  if (slot.startsWith("column-")) return "columns";
  return "hero";
}

/** Editorial grid + culture/markets block live in the hero footer band. */
export function slotRequiresHeroFooter(slot: HomepageStudioSlot): boolean {
  return slot.startsWith("editorial-top-") || slot.startsWith("business-list-") || slot === "business-lead";
}

export type HomepageStudioConfig = {
  draft: DraftStudioStory;
  selectedSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
};

function draftWire(draft: DraftStudioStory): WireBrief {
  return {
    storyId: draft.storyId,
    category: draft.category,
    headline: draft.headline.trim() || "Untitled story",
    dek: draft.dek.trim() || undefined,
    dateline: "Preview",
    imageSrc: draft.imageSrc,
  };
}

function draftLead(draft: DraftStudioStory): DmnLeadStory {
  return {
    storyId: draft.storyId,
    category: draft.category,
    headline: draft.headline.trim() || "Untitled story",
    dek: draft.dek.trim() || "Add a dek for homepage cards.",
    imageSrc: draft.imageSrc,
    imageAlt: draft.headline.trim() || "Untitled story",
  };
}

/** Merge the in-progress story into homepage section data for live studio preview. */
export function buildStudioHomepageSections(
  live: PublicArticleBriefing[] | null,
  draft: DraftStudioStory,
  placementSlot: HomepageStudioSlot = "editorial-top-0",
): HomepageSections {
  const sections = buildHomepageSections(live);
  const wire = draftWire(draft);
  const lead = draftLead(draft);
  const studioLead = { storyId: lead.storyId, headline: lead.headline, imageSrc: lead.imageSrc ?? "", imageAlt: lead.imageAlt };

  let heroBriefings = sections.heroBriefings;
  if (placementSlot === "hero-lead") {
    heroBriefings = [
      {
        id: draft.storyId,
        desk: "Desk",
        section: draft.category,
        headline: draft.headline.trim() || "Untitled story",
        dek: draft.dek.trim(),
        byline: "HBM Editorial",
        publishedAt: "Preview",
        lede: draft.dek.trim(),
        body: [],
        metrics: [],
        related: [],
        heroImageUrl: draft.imageSrc ?? null,
      },
      ...(sections.heroBriefings ?? []),
    ];
  }

  const editorialTopRow = [...sections.editorialTopRow];
  if (placementSlot.startsWith("editorial-top-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < 4) editorialTopRow[index] = wire;
  }

  const editorialBusinessList = [...sections.editorialBusinessList];
  if (placementSlot.startsWith("business-list-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < editorialBusinessList.length) editorialBusinessList[index] = wire;
  }

  let editorialBusinessLead = sections.editorialBusinessLead;
  if (placementSlot === "business-lead") {
    editorialBusinessLead = lead;
  }

  let marketsLead = sections.marketsLead;
  if (placementSlot === "markets-lead") {
    marketsLead = lead;
  }

  const marketsWire = [...sections.marketsWire];
  if (placementSlot.startsWith("markets-wire-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < marketsWire.length) marketsWire[index] = wire;
  }

  const lifestyle = {
    ...sections.lifestyle,
    listenPromo: { ...sections.lifestyle.listenPromo },
    foodSecondary: [...sections.lifestyle.foodSecondary],
    foodColTwo: [...sections.lifestyle.foodColTwo],
    foodThumbs: [...sections.lifestyle.foodThumbs],
    artsStories: [...sections.lifestyle.artsStories],
  };
  if (placementSlot === "lifestyle-food-lead") lifestyle.foodLead = draftWire(draft);
  if (placementSlot.startsWith("lifestyle-food-secondary-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < lifestyle.foodSecondary.length) lifestyle.foodSecondary[index] = draftWire(draft);
  }
  if (placementSlot.startsWith("lifestyle-food-col2-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < lifestyle.foodColTwo.length) lifestyle.foodColTwo[index] = draftWire(draft);
  }
  if (placementSlot === "lifestyle-food-thumb-0" && lifestyle.foodThumbs.length > 0) lifestyle.foodThumbs[0] = draftWire(draft);
  if (placementSlot.startsWith("lifestyle-arts-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < lifestyle.artsStories.length) lifestyle.artsStories[index] = draftWire(draft);
  }
  if (placementSlot === "lifestyle-listen-promo") {
    const wire = draftWire(draft);
    lifestyle.listenPromo = {
      storyId: wire.storyId,
      category: draft.category.trim() || "Listen",
      headline: wire.headline,
      dek: wire.dek ?? sections.lifestyle.listenPromo.dek,
      imageSrc: wire.imageSrc ?? sections.lifestyle.listenPromo.imageSrc,
    };
  }

  const broadsheetColumns = sections.broadsheetColumns.map((column) => ({ ...column, more: [...column.more] }));
  if (placementSlot.startsWith("column-") && placementSlot.endsWith("-lead")) {
    const columnIndex = Number(placementSlot.split("-")[1]);
    if (columnIndex >= 0 && columnIndex < broadsheetColumns.length) {
      broadsheetColumns[columnIndex].lead = studioLead;
    }
  }
  if (placementSlot.startsWith("column-") && placementSlot.includes("-more-")) {
    const [, columnToken, , moreToken] = placementSlot.split("-");
    const columnIndex = Number(columnToken);
    const moreIndex = Number(moreToken);
    if (
      columnIndex >= 0 &&
      columnIndex < broadsheetColumns.length &&
      moreIndex >= 0 &&
      moreIndex < broadsheetColumns[columnIndex].more.length
    ) {
      broadsheetColumns[columnIndex].more[moreIndex] = { storyId: draft.storyId, headline: draft.headline.trim() || "Untitled story" };
    }
  }

  return {
    ...sections,
    heroBriefings,
    editorialTopRow,
    editorialBusinessList,
    editorialBusinessLead,
    lifestyle,
    marketsWire,
    marketsLead,
    broadsheetColumns,
  };
}

export function buildStudioHeroProps(
  sections: HomepageSections,
  draft: DraftStudioStory,
  placementSlot: HomepageStudioSlot,
  tickerOverride?: string[] | null,
) {
  const hero = buildHeroProps(sections, tickerOverride);
  const briefing: PublicArticleBriefing = {
    id: draft.storyId,
    desk: "Desk",
    section: draft.category,
    headline: draft.headline.trim() || "Untitled story",
    dek: draft.dek.trim(),
    byline: "HBM Editorial",
    publishedAt: "Preview",
    lede: draft.dek.trim(),
    body: [],
    metrics: [],
    related: [],
    heroImageUrl: draft.imageSrc ?? null,
  };

  const story = briefingToMagazineStory(briefing, draft.imageSrc);
  const wire = draftWire(draft);

  if (placementSlot === "hero-follow-up") {
    return { ...hero, heroFollowUp: story };
  }
  if (placementSlot === "hero-right-featured") {
    return { ...hero, heroRightFeatured: story };
  }
  if (placementSlot === "hero-right-secondary") {
    return { ...hero, heroRightSecondary: story };
  }
  if (placementSlot.startsWith("hero-left-")) {
    const idx = Number(placementSlot.split("-").pop());
    if (idx >= 0 && idx < hero.heroLeft.length) {
      const heroLeft = [...hero.heroLeft];
      heroLeft[idx] = wire;
      return { ...hero, heroLeft };
    }
  }
  if (placementSlot.startsWith("hero-right-top-")) {
    const idx = Number(placementSlot.split("-").pop());
    if (idx >= 0 && idx < hero.heroRightTopBriefs.length) {
      const heroRightTopBriefs = [...hero.heroRightTopBriefs];
      heroRightTopBriefs[idx] = wire;
      return { ...hero, heroRightTopBriefs };
    }
  }
  if (placementSlot.startsWith("hero-culture-")) {
    const idx = Number(placementSlot.split("-").pop());
    if (idx >= 0 && idx < hero.heroCulture.length) {
      const heroCulture = [...hero.heroCulture];
      heroCulture[idx] = wire;
      return { ...hero, heroCulture };
    }
  }
  if (placementSlot !== "hero-lead") {
    return hero;
  }

  return {
    ...hero,
    heroLead: story,
    heroImage: draft.imageSrc ?? hero.heroImage,
  };
}

export function isDraftStudioSlot(slot: HomepageStudioSlot, draftStoryId: string, sections: HomepageSections): boolean {
  if (slot === "hero-lead") return true;
  if (slot === "business-lead") return sections.editorialBusinessLead.storyId === draftStoryId;
  if (slot === "markets-lead") return sections.marketsLead.storyId === draftStoryId;
  if (slot.startsWith("editorial-top-")) {
    const index = Number(slot.split("-").pop());
    return sections.editorialTopRow[index]?.storyId === draftStoryId;
  }
  return false;
}

export type SlotCardFields = {
  storyId: string;
  headline: string;
  dek: string;
  category?: string;
  imageSrc?: string;
  supportsImage: boolean;
};

type HeroProps = ReturnType<typeof buildHeroProps>;

function fromWire(item: {
  storyId: string;
  headline: string;
  dek?: string;
  imageSrc?: string;
  category?: string;
}): SlotCardFields {
  return {
    storyId: item.storyId,
    headline: item.headline,
    dek: item.dek ?? "",
    imageSrc: item.imageSrc,
    category: item.category,
    supportsImage: true,
  };
}

function fromLead(item: { storyId: string; headline: string; dek: string; imageSrc?: string }): SlotCardFields {
  return { storyId: item.storyId, headline: item.headline, dek: item.dek, imageSrc: item.imageSrc, supportsImage: true };
}

function fromMagazine(item: { storyId: string; headline: string; dek: string; imageSrc?: string }): SlotCardFields {
  return { storyId: item.storyId, headline: item.headline, dek: item.dek, imageSrc: item.imageSrc, supportsImage: true };
}

/** Placements that render text-only on the homepage — never show an image in the editor panel. */
export function slotSupportsImage(slot: HomepageStudioSlot): boolean {
  if (slot.startsWith("hero-left-")) return false;
  if (slot.startsWith("hero-right-top-")) return false;
  if (slot.startsWith("hero-culture-")) return false;
  if (slot === "hero-follow-up") return false;
  if (slot === "hero-right-secondary") return false;
  if (slot.startsWith("business-list-")) return false;
  if (slot.includes("-more-")) return false;
  if (slot.startsWith("lifestyle-food-secondary-")) return false;
  return true;
}

/** Editor image panel — use the article's real hero image, not homepage display fallbacks. */
function placementImage(
  sections: HomepageSections,
  storyId: string,
  slotImageSrc?: string,
): string | undefined {
  const briefings = sections.heroBriefings;
  if (briefings?.some((briefing) => briefing.id === storyId)) {
    return briefings.find((briefing) => briefing.id === storyId)?.heroImageUrl ?? undefined;
  }
  return slotImageSrc;
}

function withPlacementImage(sections: HomepageSections, slot: HomepageStudioSlot, fields: SlotCardFields): SlotCardFields {
  const supportsImage = slotSupportsImage(slot);
  if (!supportsImage) {
    return { ...fields, supportsImage: false, imageSrc: undefined };
  }
  return {
    ...fields,
    supportsImage: true,
    imageSrc: placementImage(sections, fields.storyId, fields.imageSrc),
  };
}

/** Read headline + dek for any homepage placement slot from built section data. */
export function resolveSlotCardFields(
  sections: HomepageSections,
  hero: HeroProps,
  slot: HomepageStudioSlot,
): SlotCardFields | null {
  if (slot === "hero-lead") {
    return withPlacementImage(sections, slot, fromMagazine(hero.heroLead));
  }
  if (slot === "hero-follow-up") return withPlacementImage(sections, slot, fromMagazine(hero.heroFollowUp));
  if (slot === "hero-right-featured") return withPlacementImage(sections, slot, fromMagazine(hero.heroRightFeatured));
  if (slot === "hero-right-secondary") return withPlacementImage(sections, slot, fromMagazine(hero.heroRightSecondary));

  if (slot.startsWith("hero-left-")) {
    const index = Number(slot.split("-").pop());
    const item = hero.heroLeft[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot.startsWith("hero-right-top-")) {
    const index = Number(slot.split("-").pop());
    const item = hero.heroRightTopBriefs[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot.startsWith("hero-culture-")) {
    const index = Number(slot.split("-").pop());
    const item = hero.heroCulture[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }

  if (slot.startsWith("editorial-top-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.editorialTopRow[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot.startsWith("business-list-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.editorialBusinessList[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot === "business-lead") return withPlacementImage(sections, slot, fromLead(sections.editorialBusinessLead));

  if (slot === "lifestyle-food-lead") return withPlacementImage(sections, slot, fromWire(sections.lifestyle.foodLead));
  if (slot.startsWith("lifestyle-food-secondary-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.lifestyle.foodSecondary[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot.startsWith("lifestyle-food-col2-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.lifestyle.foodColTwo[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot.startsWith("lifestyle-food-thumb-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.lifestyle.foodThumbs[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot.startsWith("lifestyle-arts-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.lifestyle.artsStories[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }
  if (slot === "lifestyle-listen-promo") return withPlacementImage(sections, slot, fromWire(sections.lifestyle.listenPromo));

  if (slot === "markets-lead") return withPlacementImage(sections, slot, fromLead(sections.marketsLead));
  if (slot.startsWith("markets-wire-")) {
    const index = Number(slot.split("-").pop());
    const item = sections.marketsWire[index];
    return item ? withPlacementImage(sections, slot, fromWire(item)) : null;
  }

  if (slot.startsWith("column-") && slot.endsWith("-lead")) {
    const columnIndex = Number(slot.split("-")[1]);
    const lead = sections.broadsheetColumns[columnIndex]?.lead;
    return lead
      ? withPlacementImage(sections, slot, { storyId: lead.storyId, headline: lead.headline, dek: "", imageSrc: lead.imageSrc, supportsImage: true })
      : null;
  }
  if (slot.startsWith("column-") && slot.includes("-more-")) {
    const [, columnToken, , moreToken] = slot.split("-");
    const columnIndex = Number(columnToken);
    const moreIndex = Number(moreToken);
    const item = sections.broadsheetColumns[columnIndex]?.more[moreIndex];
    return item ? withPlacementImage(sections, slot, { storyId: item.storyId, headline: item.headline, dek: "", supportsImage: false }) : null;
  }

  return null;
}

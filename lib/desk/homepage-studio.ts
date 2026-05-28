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
  | "editorial-top-0"
  | "editorial-top-1"
  | "editorial-top-2"
  | "editorial-top-3"
  | "business-lead"
  | "markets-lead";

export const HOMEPAGE_STUDIO_SLOT_LABELS: Record<HomepageStudioSlot, string> = {
  "hero-lead": "Hero lead",
  "editorial-top-0": "Grid · 1",
  "editorial-top-1": "Grid · 2",
  "editorial-top-2": "Grid · 3",
  "editorial-top-3": "Grid · 4",
  "business-lead": "Markets lead",
  "markets-lead": "Wire lead",
};

export const HOMEPAGE_STUDIO_SLOT_GROUPS: {
  label: string;
  slots: HomepageStudioSlot[];
}[] = [
  { label: "Hero", slots: ["hero-lead"] },
  { label: "Editorial grid", slots: ["editorial-top-0", "editorial-top-1", "editorial-top-2", "editorial-top-3"] },
  { label: "Markets", slots: ["business-lead", "markets-lead"] },
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

  const editorialTopRow = [...sections.editorialTopRow];
  if (placementSlot.startsWith("editorial-top-")) {
    const index = Number(placementSlot.split("-").pop());
    if (index >= 0 && index < 4) editorialTopRow[index] = wire;
  } else {
    editorialTopRow[0] = wire;
  }

  let editorialBusinessLead = sections.editorialBusinessLead;
  if (placementSlot === "business-lead") {
    editorialBusinessLead = lead;
  }

  let marketsLead = sections.marketsLead;
  if (placementSlot === "markets-lead") {
    marketsLead = lead;
  }

  return {
    ...sections,
    editorialTopRow,
    editorialBusinessLead,
    marketsLead,
  };
}

export function buildStudioHeroProps(
  sections: HomepageSections,
  draft: DraftStudioStory,
  placementSlot: HomepageStudioSlot,
  tickerOverride?: string[] | null,
) {
  const hero = buildHeroProps(sections, tickerOverride);

  if (placementSlot !== "hero-lead") {
    return hero;
  }

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

  return {
    ...hero,
    heroLead: briefingToMagazineStory(briefing, draft.imageSrc),
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

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import HomePageClient from "@/components/HomePageClient";
import type { StudioSectionView } from "@/components/HomePageClient";
import { deskPaper } from "@/components/desk/desk-paper";
import { articleToBriefing } from "@/lib/desk/article-to-briefing";
import type { HomepageStudioSlot } from "@/lib/desk/homepage-studio";
import {
  STUDIO_COMPACT_PAGE_HEIGHT,
  STUDIO_PAGE_WIDTH,
} from "@/lib/desk/homepage-studio";
import { fetchPublishedArticlesClient } from "@/lib/supabase/queries/articles.client";
import type { EditorImageState } from "./EditorImagePanel";

/** Matches the write editor card content height (headline + dek + ~18-row body). */
export const STUDIO_CARD_VIEWPORT_HEIGHT = 520;

const STUDIO_SECTION_OPTIONS: { id: StudioSectionView; label: string }[] = [
  { id: "hero", label: "Hero" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "markets", label: "Markets" },
  { id: "columns", label: "Columns" },
];

export function LiveStudioHomepage({
  storyId,
  headline,
  dek,
  section,
  heroImage,
  onHeadlineChange,
  onDekChange,
  selectedSlot,
  placementSlot,
  onSelectSlot,
}: {
  storyId: string | null;
  headline: string;
  dek: string;
  section: string;
  heroImage: EditorImageState | null;
  onHeadlineChange: (value: string) => void;
  onDekChange: (value: string) => void;
  selectedSlot: HomepageStudioSlot | null;
  placementSlot: HomepageStudioSlot;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
}) {
  const measureRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.32);
  const [pageHeight, setPageHeight] = useState(STUDIO_COMPACT_PAGE_HEIGHT);
  const [sectionView, setSectionView] = useState<StudioSectionView>("hero");
  const [publishedBriefings, setPublishedBriefings] = useState<ReturnType<typeof articleToBriefing>[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void fetchPublishedArticlesClient().then((result) => {
      if (cancelled) return;
      setPublishedBriefings((result.data ?? []).map(articleToBriefing));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = measureRef.current;
    if (!viewport || !canvas) return;

    function measure() {
      const viewportWidth = viewport!.clientWidth;
      const viewportHeight = STUDIO_CARD_VIEWPORT_HEIGHT;
      const contentHeight = canvas!.scrollHeight || STUDIO_COMPACT_PAGE_HEIGHT;
      setPageHeight(contentHeight);

      const pad = 16;
      const scaleW = (viewportWidth - pad) / STUDIO_PAGE_WIDTH;
      const scaleH = (viewportHeight - pad) / contentHeight;
      setScale(Math.min(scaleW, scaleH, 1));
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [publishedBriefings, headline, dek, section, heroImage?.url, placementSlot, sectionView]);

  const draftStoryId = storyId ?? "studio-draft";

  const studio = useMemo(
    () => ({
      draft: {
        storyId: draftStoryId,
        headline,
        dek,
        category: section,
        imageSrc: heroImage?.url,
      },
      placementSlot,
      selectedSlot,
      onSelectSlot,
    }),
    [draftStoryId, headline, dek, section, heroImage?.url, placementSlot, selectedSlot, onSelectSlot],
  );

  const scaledHeight = pageHeight * scale;

  return (
    <div className={clsx("rounded-md border", deskPaper.card, deskPaper.border)}>
      <div className={clsx("border-b px-5 py-4", deskPaper.border)}>
        <p className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>Homepage placement</p>
        <p className={clsx("mt-1 font-robinhood text-[12px]", deskPaper.inkMeta)}>
          Card fields update the live front page. Click a highlighted block to jump to Write.
        </p>
        <input
          value={headline}
          onChange={(e) => onHeadlineChange(e.target.value)}
          placeholder="Headline"
          className={clsx(
            "mt-3 w-full border-0 bg-transparent font-cormorant text-2xl outline-none placeholder:text-[#9a8262]/60",
            deskPaper.inkHeading,
          )}
        />
        <input
          value={dek}
          onChange={(e) => onDekChange(e.target.value)}
          placeholder="Dek — summary on homepage cards"
          className={clsx(
            "mt-2 w-full border-0 border-b bg-transparent pb-2 font-robinhood text-[14px] outline-none placeholder:text-[#9a8262]/60",
            deskPaper.border,
            deskPaper.inkBody,
          )}
        />
        <div className={clsx("mt-3 flex flex-wrap items-center gap-1 rounded-md border p-0.5", deskPaper.border)}>
          {STUDIO_SECTION_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSectionView(option.id)}
              className={clsx(
                "rounded px-2.5 py-1 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                sectionView === option.id
                  ? clsx(deskPaper.activeNav, deskPaper.inkHeading)
                  : clsx(deskPaper.inkMeta, deskPaper.hover),
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative flex items-start justify-center overflow-hidden bg-[#020203]"
        style={{ height: STUDIO_CARD_VIEWPORT_HEIGHT }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: STUDIO_PAGE_WIDTH * scale,
            height: scaledHeight,
          }}
        >
          <div
            ref={measureRef}
            className="home-studio-canvas origin-top-left"
            style={{
              width: STUDIO_PAGE_WIDTH,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <HomePageClient
              heroBriefings={publishedBriefings}
              studio={studio}
              studioCompact={false}
              studioSection={sectionView}
            />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-2 right-2 rounded bg-obsidian/80 px-2 py-0.5 font-robinhood text-[9px] tabular-nums text-silver-dim/50 ring-1 ring-white/10">
          {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
}

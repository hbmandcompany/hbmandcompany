"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import HomePageClient from "@/components/HomePageClient";
import type { StudioSectionView } from "@/components/HomePageClient";
import { deskPaper } from "@/components/desk/desk-paper";
import type { PublicArticleBriefing } from "@/lib/desk/article-to-briefing";
import type { HomepageStudioSlot } from "@/lib/desk/homepage-studio";
import {
  slotRequiresHeroFooter,
  STUDIO_COMPACT_PAGE_HEIGHT,
  STUDIO_PAGE_WIDTH,
  studioSectionForSlot,
} from "@/lib/desk/homepage-studio";
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
  cardHeadline,
  cardDek,
  cardEditable,
  onCardHeadlineChange,
  onCardDekChange,
  selectedSlot,
  placementSlot,
  hoveredSlot,
  onSelectSlot,
  onHoverSlot,
  onWriteClick,
  onClearCardEdit,
  publishedBriefings,
}: {
  storyId: string | null;
  headline: string;
  dek: string;
  section: string;
  heroImage: EditorImageState | null;
  cardHeadline: string;
  cardDek: string;
  cardEditable: boolean;
  onCardHeadlineChange: (value: string) => void;
  onCardDekChange: (value: string) => void;
  selectedSlot: HomepageStudioSlot | null;
  placementSlot: HomepageStudioSlot;
  hoveredSlot: HomepageStudioSlot | null;
  onSelectSlot: (slot: HomepageStudioSlot) => void;
  onHoverSlot: (slot: HomepageStudioSlot | null) => void;
  onWriteClick: () => void;
  onClearCardEdit: () => void;
  publishedBriefings: PublicArticleBriefing[] | null;
}) {
  const measureRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardEditRef = useRef<HTMLDivElement>(null);
  const measureFrameRef = useRef<number | null>(null);
  const [scale, setScale] = useState(0.32);
  const [pageHeight, setPageHeight] = useState(STUDIO_COMPACT_PAGE_HEIGHT);
  const [sectionView, setSectionView] = useState<StudioSectionView>("hero");

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = measureRef.current;
    if (!viewport || !canvas) return;

    function measure() {
      if (measureFrameRef.current !== null) return;
      measureFrameRef.current = window.requestAnimationFrame(() => {
        measureFrameRef.current = null;
        const viewportWidth = viewport!.clientWidth;
        const viewportHeight = STUDIO_CARD_VIEWPORT_HEIGHT;
        const contentHeight = canvas!.scrollHeight || STUDIO_COMPACT_PAGE_HEIGHT;
        setPageHeight(contentHeight);

        const pad = 16;
        const scaleW = (viewportWidth - pad) / STUDIO_PAGE_WIDTH;
        const scaleH = (viewportHeight - pad) / contentHeight;
        const fitted = Math.min(scaleW, scaleH, 1);
        setScale(Math.min(fitted, scaleW, scaleH, 1.25));
      });
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      if (measureFrameRef.current !== null) {
        window.cancelAnimationFrame(measureFrameRef.current);
        measureFrameRef.current = null;
      }
    };
  }, [publishedBriefings, headline, dek, section, heroImage?.url, placementSlot, sectionView]);

  useEffect(() => {
    if (!hoveredSlot) return;
    const next = studioSectionForSlot(hoveredSlot);
    setSectionView((current) => (current === next ? current : next));
  }, [hoveredSlot]);

  const shouldKeepEditing = useCallback((target: EventTarget | null) => {
    if (!(target instanceof Node)) return false;
    if (cardEditRef.current?.contains(target)) return true;
    if (target instanceof Element && target.closest("[data-studio-card-edit], [data-studio-write], .studio-slot, [data-studio-placement-panel]")) {
      return true;
    }
    return false;
  }, []);

  useEffect(() => {
    if (!cardEditable) return;

    function handlePointerDown(event: MouseEvent) {
      if (shouldKeepEditing(event.target)) return;
      onClearCardEdit();
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClearCardEdit();
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [cardEditable, onClearCardEdit, shouldKeepEditing]);

  const draftStoryId = storyId ?? "studio-draft";
  const revealHeroFooter = hoveredSlot ? slotRequiresHeroFooter(hoveredSlot) : false;

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
      hoveredSlot,
      onSelectSlot,
      onHoverSlot,
      revealHeroFooter,
    }),
    [draftStoryId, headline, dek, section, heroImage?.url, placementSlot, selectedSlot, hoveredSlot, onSelectSlot, onHoverSlot, revealHeroFooter],
  );

  const scaledHeight = pageHeight * scale;

  return (
    <div className={clsx("rounded-md border", deskPaper.card, deskPaper.border)}>
      <div className={clsx("border-b px-5 py-4", deskPaper.border)}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>Homepage placement</p>
            <p className={clsx("mt-1 font-robinhood text-[12px]", deskPaper.inkMeta)}>
              {cardEditable
                ? "Editing card copy — click outside, press Esc, or Done to exit."
                : "Hover a card to preview. Click a card to edit headline and summary."}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            {cardEditable ? (
              <button
                type="button"
                onClick={onClearCardEdit}
                className={clsx(
                  "rounded-md border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                  deskPaper.border,
                  deskPaper.inkMeta,
                  deskPaper.hover,
                )}
              >
                Done
              </button>
            ) : null}
            <button
              type="button"
              onClick={onWriteClick}
              data-studio-write
              className={clsx(
                "rounded-md border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                deskPaper.border,
                deskPaper.accent,
                deskPaper.hover,
              )}
            >
              Write
            </button>
          </div>
        </div>

        {cardEditable ? (
          <div ref={cardEditRef} data-studio-card-edit className="mt-3 min-h-[8.5rem] rounded-md ring-1 ring-[#c9a962]/40">
            <input
              value={cardHeadline}
              onChange={(e) => onCardHeadlineChange(e.target.value)}
              placeholder="Headline"
              className={clsx(
                "w-full border-0 bg-transparent px-1 pt-1 font-cormorant text-2xl outline-none placeholder:text-[#9a8262]/60",
                deskPaper.inkHeading,
              )}
            />
            <input
              value={cardDek}
              onChange={(e) => onCardDekChange(e.target.value)}
              placeholder="Summary — dek on homepage cards"
              className={clsx(
                "mt-2 w-full border-0 border-b bg-transparent px-1 pb-2 font-robinhood text-[14px] outline-none placeholder:text-[#9a8262]/60",
                deskPaper.border,
                deskPaper.inkBody,
              )}
            />
          </div>
        ) : (
          <div className="mt-3 min-h-[8.5rem]">
            <p
              className={clsx(
                "line-clamp-2 font-cormorant text-2xl leading-tight",
                cardHeadline ? deskPaper.inkHeading : "text-[#9a8262]/55",
              )}
            >
              {cardHeadline || "Hover or click a homepage card…"}
            </p>
            <p
              className={clsx(
                "mt-2 line-clamp-3 border-b pb-2 font-robinhood text-[14px] leading-relaxed",
                deskPaper.border,
                cardDek ? deskPaper.inkBody : "text-[#9a8262]/55",
              )}
            >
              {cardDek || "Summary line appears here for the selected placement."}
            </p>
          </div>
        )}

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
        className="relative overflow-hidden bg-[#020203]"
        style={{ height: STUDIO_CARD_VIEWPORT_HEIGHT }}
      >
        <div
          className="mx-auto min-w-max"
          style={{
            width: STUDIO_PAGE_WIDTH * scale,
            height: scaledHeight,
          }}
        >
          <div
            ref={measureRef}
            className="home-studio-canvas origin-top-left"
            data-studio-section={sectionView}
            data-slot-focus={hoveredSlot ? "true" : undefined}
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

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";
import { PaperStatusPill } from "./PaperStatusPill";
import { storyTabs, type StoryRow, type StoryTab } from "./desk-story-types";
import { articleToStoryRow } from "./desk-article-mappers";
import { DeskEmptyState } from "./DeskEmptyState";
import { fetchDeskQueueArticlesClient } from "@/lib/supabase/queries/articles.client";

function DocIcon({ tone }: { tone: StoryRow["tone"] }) {
  const fill =
    tone === "green"
      ? "#4A7C59"
      : tone === "amber"
        ? "#b8860b"
        : tone === "blue"
          ? "#4a6a8c"
          : tone === "gold"
            ? "#8d6f4d"
            : "#9a8262";

  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        fill={fill}
        fillOpacity="0.18"
        stroke={fill}
        strokeWidth="1.4"
      />
      <path d="M14 2v6h6" stroke={fill} strokeWidth="1.4" />
      <path d="M8 13h8M8 17h5" stroke={fill} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M22 2L11 13" />
      <path d="M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="19" cy="12" r="1.5" />
    </svg>
  );
}

function sortStories(items: StoryRow[]): StoryRow[] {
  return [...items].sort((a, b) => a.meta.localeCompare(b.meta));
}

const STORY_TYPES = ["Article", "Feature", "Investigation"] as const;
const PAGE_SIZE = 5;
const ROW_HEIGHT = "h-[42px]";
const LIST_HEIGHT = "h-[210px]";

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function DeskStoryQueue() {
  const [tab, setTab] = useState<StoryTab>("Due Today");
  const [page, setPage] = useState(0);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const [stories, setStories] = useState<StoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const newMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadQueue() {
      setLoading(true);
      setLoadError(null);
      const result = await fetchDeskQueueArticlesClient();

      if (cancelled) return;

      if (result.error) {
        setLoadError(result.error.message);
        setStories([]);
      } else {
        setStories((result.data ?? []).map(articleToStoryRow));
      }

      setLoading(false);
    }

    void loadQueue();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredStories = useMemo(() => {
    let out = stories.filter((s) => s.status !== "PUBLISHED");
    if (tab === "Due Today") out = out.filter((s) => s.dueWhen === "today" || s.status === "IN REVIEW" || s.status === "SCHEDULED");
    else if (tab === "Due Tomorrow") out = out.filter((s) => s.dueWhen === "tomorrow" || s.status === "DRAFT");
    else if (tab === "This Week") out = out.filter((s) => s.status === "IN REVIEW");
    else if (tab === "Next Week") out = out.filter((s) => s.status === "DRAFT");
    return sortStories(out);
  }, [tab, stories]);

  const pageCount = Math.max(1, Math.ceil(filteredStories.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageStories = useMemo(
    () => filteredStories.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE),
    [filteredStories, safePage]
  );
  const slots = useMemo(
    () => Array.from({ length: PAGE_SIZE }, (_, i) => pageStories[i] ?? null),
    [pageStories]
  );

  function selectTab(t: StoryTab) {
    setTab(t);
    setPage(0);
    setHoverId(null);
  }

  useEffect(() => {
    if (!newMenuOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (newMenuRef.current && !newMenuRef.current.contains(e.target as Node)) {
        setNewMenuOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNewMenuOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [newMenuOpen]);

  return (
    <section>
      <div className={clsx("overflow-hidden rounded-md border", deskPaper.border, deskPaper.card)}>
        {/* Toolbar — Drive-style path + filters + view toggle */}
        <div className={clsx("flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5", deskPaper.border, deskPaper.pageAlt)}>
          <span className={clsx("font-robinhood text-[11px]", deskPaper.inkHeading)}>Desk</span>
          <div className="flex items-center gap-1">
            <div ref={newMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setNewMenuOpen((v) => !v)}
                aria-label="New story"
                aria-expanded={newMenuOpen}
                className={clsx(
                  "rounded p-1.5 transition-colors",
                  newMenuOpen ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover)
                )}
              >
                <PlusIcon />
              </button>
              {newMenuOpen ? (
                <div
                  className={clsx(
                    "absolute right-0 top-[calc(100%+6px)] z-50 min-w-[160px] overflow-hidden rounded-md",
                    deskPaper.dropdown
                  )}
                >
                  <div className={clsx("border-b px-3 py-2", deskPaper.border)}>
                    <span className={clsx("font-robinhood text-[10px] uppercase tracking-[0.18em]", deskPaper.inkLabel)}>
                      New story
                    </span>
                  </div>
                  {STORY_TYPES.map((type) => (
                    <Link
                      key={type}
                      href="/desk/newsroom/editor?mode=write"
                      onClick={() => setNewMenuOpen(false)}
                      className={clsx(
                        "block w-full px-3 py-2 text-left font-robinhood text-[12px] transition-colors",
                        deskPaper.inkBody,
                        deskPaper.hover,
                        "hover:text-[#20160d]"
                      )}
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className={clsx("flex gap-1 overflow-x-auto border-b px-2 py-1.5", deskPaper.border)}>
          {storyTabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => selectTab(t)}
              className={clsx(
                "shrink-0 rounded px-2.5 py-1 font-robinhood text-[10px] uppercase tracking-[0.14em] transition-colors",
                tab === t
                  ? clsx(deskPaper.activeNav, deskPaper.inkHeading)
                  : clsx(deskPaper.inkMeta, deskPaper.hover, "hover:text-[#20160d]")
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {loadError ? (
          <div className={clsx("border-b px-3 py-2 font-robinhood text-[11px] text-desk-red", deskPaper.border)}>
            {loadError}
          </div>
        ) : null}

        <div className={clsx(LIST_HEIGHT, "overflow-hidden")}>
          {loading ? (
            <div className="flex flex-col">
              {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className={clsx("animate-pulse border-b px-3 py-2 last:border-b-0", ROW_HEIGHT, deskPaper.border, deskPaper.pageAlt)}
                >
                  <div className="h-3 w-2/3 rounded bg-[#dcd0b8]" />
                </div>
              ))}
            </div>
          ) : !loadError && filteredStories.length === 0 ? (
            <DeskEmptyState title="No stories in the queue — start writing." subtitle="Create a new story from the + menu above." />
          ) : (
          <div className="flex flex-col">
            {slots.map((story, index) => {
              if (!story) {
                return (
                  <div
                    key={`empty-${index}`}
                    className={clsx(
                      "border-b px-2 last:border-b-0",
                      ROW_HEIGHT,
                      deskPaper.border,
                      "bg-[#f2e6d1]/40"
                    )}
                    aria-hidden
                  />
                );
              }

              const hovered = hoverId === story.id;
              return (
                <div
                  key={story.id}
                  role="row"
                  tabIndex={0}
                  onMouseEnter={() => setHoverId(story.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={clsx(
                    "group relative grid cursor-default grid-cols-[1fr_auto] items-center gap-x-2 border-b px-2 transition-colors last:border-b-0",
                    ROW_HEIGHT,
                    deskPaper.border,
                    hovered ? "bg-[#e4d6bc]" : "bg-[#f2e6d1]",
                    deskPaper.cardHover
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <DocIcon tone={story.tone} />
                    <div className={clsx("truncate font-robinhood text-[12px] font-medium", deskPaper.inkHeading)}>
                      {story.headline}
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <Link
                      href={`/desk/newsroom/editor?mode=write&story=${story.id}`}
                      aria-label="Edit story"
                      className={clsx("rounded p-1", deskPaper.inkMeta, deskPaper.hover)}
                    >
                      <PencilIcon />
                    </Link>
                    <button
                      type="button"
                      aria-label="Submit story"
                      className={clsx("rounded p-1", deskPaper.inkMeta, deskPaper.hover)}
                    >
                      <SendIcon />
                    </button>
                    <button
                      type="button"
                      aria-label="More actions"
                      className={clsx("rounded p-1", deskPaper.inkMeta, deskPaper.hover)}
                    >
                      <MoreIcon />
                    </button>
                  </div>

                  {hovered ? (
                    <div
                      className={clsx(
                        "pointer-events-none absolute left-2 right-2 top-full z-20 mt-1 rounded-md border px-3 py-2 shadow-[0_8px_24px_rgba(32,22,13,0.12)]",
                        deskPaper.dropdown
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <PaperStatusPill label={story.status} tone={story.tone} className="scale-90" />
                        <span className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>{story.meta}</span>
                        <span className={clsx("font-robinhood text-[10px]", deskPaper.inkBody)}>{story.words}</span>
                        <span className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>
                          {story.section}
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          )}
        </div>

        <div className={clsx("flex items-center justify-between border-t px-3 py-2", deskPaper.border, deskPaper.pageAlt)}>
          <button
            type="button"
            disabled={safePage === 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            className={clsx(
              "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Prev
          </button>
          <span className={clsx("font-robinhood text-[10px]", deskPaper.inkLabel)}>
            {loading ? "Loading…" : `${safePage + 1} / ${pageCount}`}
          </span>
          <button
            type="button"
            disabled={safePage >= pageCount - 1}
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            className={clsx(
              "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

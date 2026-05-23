"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";
import { PaperStatusPill } from "./PaperStatusPill";
import { stories, storyTabs, type StoryRow, type StoryTab } from "./desk-stories-data";

type ViewMode = "list" | "grid";
type SortKey = "name" | "status" | "modified";

function SectionHeading({ title, count }: { title: string; count: number }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      <span className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>{count} files</span>
      <div className={clsx("h-px flex-1", deskPaper.divider)} />
    </div>
  );
}

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

function ListViewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" strokeLinecap="round" />
    </svg>
  );
}

function GridViewIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
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

function sortStories(items: StoryRow[], key: SortKey): StoryRow[] {
  const copy = [...items];
  if (key === "name") copy.sort((a, b) => a.headline.localeCompare(b.headline));
  if (key === "status") copy.sort((a, b) => a.status.localeCompare(b.status));
  if (key === "modified") copy.sort((a, b) => a.meta.localeCompare(b.meta));
  return copy;
}

const STORY_TYPES = ["Article", "Feature", "Investigation"] as const;
const PAGE_SIZE = 5;
const ROW_HEIGHT = "h-[42px]";
const LIST_HEIGHT = "h-[210px]";
const GRID_HEIGHT = "h-[280px]";

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

export function DeskStoryQueue() {
  const [tab, setTab] = useState<StoryTab>("Due Today");
  const [view, setView] = useState<ViewMode>("list");
  const [sortKey, setSortKey] = useState<SortKey>("modified");
  const [page, setPage] = useState(0);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [newMenuOpen, setNewMenuOpen] = useState(false);
  const newMenuRef = useRef<HTMLDivElement>(null);

  const filteredStories = useMemo(() => {
    let out = stories.filter((s) => s.status !== "PUBLISHED");
    if (tab === "Due Today") out = out.filter((s) => s.dueWhen === "today" || s.status === "IN REVIEW" || s.status === "SCHEDULED");
    else if (tab === "Due Tomorrow") out = out.filter((s) => s.dueWhen === "tomorrow" || s.status === "DRAFT");
    else if (tab === "In Review") out = stories.filter((s) => s.status === "IN REVIEW");
    else if (tab === "Scheduled") out = stories.filter((s) => s.status === "SCHEDULED");
    return sortStories(out, sortKey);
  }, [tab, sortKey]);

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

  function cycleSort(key: SortKey) {
    setSortKey(key);
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
      <SectionHeading title="STORY QUEUE" count={filteredStories.length} />

      <div className={clsx("overflow-hidden rounded-md border", deskPaper.border, deskPaper.card)}>
        {/* Toolbar — Drive-style path + filters + view toggle */}
        <div className={clsx("flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5", deskPaper.border, deskPaper.pageAlt)}>
          <div className="flex min-w-0 items-center gap-1.5">
            <span className={clsx("font-robinhood text-[11px]", deskPaper.inkHeading)}>My Stories</span>
            <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>/</span>
            <span className={clsx("truncate font-robinhood text-[11px]", deskPaper.accent)}>{tab}</span>
          </div>
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
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewMenuOpen(false)}
                      className={clsx(
                        "block w-full px-3 py-2 text-left font-robinhood text-[12px] transition-colors",
                        deskPaper.inkBody,
                        deskPaper.hover,
                        "hover:text-[#20160d]"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              className={clsx(
                "rounded p-1.5 transition-colors",
                view === "list" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover)
              )}
            >
              <ListViewIcon />
            </button>
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={clsx(
                "rounded p-1.5 transition-colors",
                view === "grid" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover)
              )}
            >
              <GridViewIcon />
            </button>
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

        {view === "list" ? (
          <>
            <div
              className={clsx(
                "grid grid-cols-[1fr_auto] items-center gap-x-2 border-b px-2 py-2",
                deskPaper.border,
                deskPaper.pageAlt
              )}
            >
              <button
                type="button"
                onClick={() => cycleSort("name")}
                className={clsx(
                  "text-left font-robinhood text-[9px] uppercase tracking-[0.16em]",
                  sortKey === "name" ? deskPaper.accent : deskPaper.inkLabel
                )}
              >
                Name {sortKey === "name" ? "↓" : ""}
              </button>
              <div className="w-16" />
            </div>

            <div className={clsx(LIST_HEIGHT, "overflow-hidden")}>
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
                        <button
                          type="button"
                          aria-label="Edit story"
                          className={clsx("rounded p-1", deskPaper.inkMeta, deskPaper.hover)}
                        >
                          <PencilIcon />
                        </button>
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
            </div>
          </>
        ) : (
          <div className={clsx("grid grid-cols-2 gap-2 p-3", GRID_HEIGHT)}>
            {slots.map((story, index) => {
              if (!story) {
                return (
                  <div
                    key={`empty-grid-${index}`}
                    className={clsx("h-full min-h-0 rounded-lg border border-dashed", deskPaper.border, "bg-[#f2e6d1]/40")}
                    aria-hidden
                  />
                );
              }

              const hovered = hoverId === story.id;
              return (
                <div
                  key={story.id}
                  onMouseEnter={() => setHoverId(story.id)}
                  onMouseLeave={() => setHoverId(null)}
                  className={clsx(
                    "group relative flex h-full min-h-0 flex-col rounded-lg border p-3 text-left transition-all",
                    deskPaper.border,
                    "bg-[#f2e6d1] hover:border-[#8d6f4d]/50 hover:bg-[#e4d6bc]"
                  )}
                >
                  <div className="mb-2">
                    <DocIcon tone={story.tone} />
                  </div>
                  <div className={clsx("line-clamp-2 font-robinhood text-[11px] font-medium leading-snug", deskPaper.inkHeading)}>
                    {story.headline}
                  </div>
                  {hovered ? (
                    <div
                      className={clsx(
                        "pointer-events-none absolute inset-x-2 bottom-2 rounded-md border px-2.5 py-2",
                        deskPaper.dropdown
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <PaperStatusPill label={story.status} tone={story.tone} className="scale-[0.85]" />
                        <span className={clsx("font-robinhood text-[9px]", deskPaper.inkMeta)}>{story.meta}</span>
                        <span className={clsx("font-robinhood text-[9px]", deskPaper.inkBody)}>{story.words}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}

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
            {safePage + 1} / {pageCount}
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

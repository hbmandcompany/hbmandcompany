"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { deskPaper } from "../desk-paper";
import { IconSearch } from "../desk-icons";
import { useGlobalSearch } from "./useGlobalSearch";
import type { GroupedSearchResults, SearchMode } from "./types";

const MODE_TABS: { id: SearchMode | "auto"; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "search", label: "Search" },
  { id: "ai", label: "Ask AI" },
  { id: "command", label: "Commands" },
];

const GROUP_LABELS: Record<keyof GroupedSearchResults, string> = {
  articles: "Articles",
  documents: "Documents",
  users: "Users",
  jobs: "Jobs",
};

function modeLabel(mode: SearchMode) {
  if (mode === "search") return "Search";
  if (mode === "ai") return "Ask AI";
  return "Commands";
}

export function GlobalSearchModal() {
  const router = useRouter();
  const {
    isOpen,
    close,
    query,
    setQuery,
    mode,
    modeOverride,
    setModeOverride,
    searchResults,
    aiResponse,
    commandResponse,
    loading,
    error,
    selectedIndex,
    flatResults,
    selectNext,
    selectPrev,
    setSelectedIndex,
    executeSelected,
  } = useGlobalSearch();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        selectNext();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        selectPrev();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        executeSelected();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, selectNext, selectPrev, executeSelected]);

  if (!isOpen) return null;

  let rowIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-[#20160d]/45 p-4 pt-[10vh] backdrop-blur-sm sm:p-6 sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={close}
    >
      <div
        className={clsx(
          "flex max-h-[min(80vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(32,22,13,0.28)]",
          deskPaper.dropdown
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={clsx("border-b px-4 py-4 sm:px-5", deskPaper.border)}>
          <div className="relative">
            <IconSearch className={clsx("pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2", deskPaper.inkLabel)} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search, ask a question, or run a command…"
              className={clsx(
                "h-12 w-full rounded-lg border pl-11 pr-24 font-robinhood text-[15px] outline-none transition-colors",
                deskPaper.input
              )}
            />
            <kbd
              className={clsx(
                "pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border px-2 py-0.5 font-robinhood text-[10px] sm:inline",
                deskPaper.border,
                deskPaper.inkMeta
              )}
            >
              esc
            </kbd>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {MODE_TABS.map((tab) => {
              const active = modeOverride === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModeOverride(tab.id)}
                  className={clsx(
                    "rounded-full px-3 py-1 font-robinhood text-[10px] uppercase tracking-[0.16em] transition-colors",
                    active
                      ? clsx(deskPaper.activeNav, deskPaper.inkHeading)
                      : clsx(deskPaper.inkMeta, deskPaper.hover, "hover:text-[#20160d]")
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
            <span className={clsx("ml-auto self-center font-robinhood text-[10px] uppercase tracking-wider", deskPaper.accent)}>
              {modeLabel(mode)}
            </span>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-2 py-3 sm:px-3">
          {!query.trim() ? (
            <div className={clsx("rounded-lg px-4 py-8 text-center font-robinhood text-[13px]", deskPaper.inkMeta)}>
              Search articles, ask “summarize the Dallas hedge fund story”, or type “create article”.
            </div>
          ) : null}

          {loading ? (
            <div className={clsx("px-4 py-6 font-robinhood text-[13px]", deskPaper.accent)}>
              {mode === "ai" ? "Thinking…" : mode === "command" ? "Running command…" : "Searching…"}
            </div>
          ) : null}

          {error ? (
            <div className="px-4 py-3 font-robinhood text-[13px] text-[#b85c38]">{error}</div>
          ) : null}

          {mode === "search" && searchResults ? (
            <div className="space-y-4">
              {(Object.keys(GROUP_LABELS) as Array<keyof GroupedSearchResults>).map((group) => {
                const items = searchResults[group];
                if (!items.length) return null;
                return (
                  <section key={group}>
                    <div className={clsx("px-3 pb-1.5 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
                      {GROUP_LABELS[group]}
                    </div>
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        rowIndex += 1;
                        const index = rowIndex;
                        const active = index === selectedIndex;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => {
                              if (item.href) {
                                close();
                                router.push(item.href);
                              }
                            }}
                            className={clsx(
                              "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                              active ? clsx(deskPaper.activeNav, "border-l-2 pl-[10px]", deskPaper.accentBorder) : deskPaper.hover
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <div className={clsx("font-robinhood text-[13px] font-medium", deskPaper.inkHeading)}>{item.title}</div>
                              {item.subtitle ? (
                                <div className={clsx("mt-0.5 font-robinhood text-[11px]", deskPaper.inkMeta)}>{item.subtitle}</div>
                              ) : null}
                            </div>
                            {item.meta ? (
                              <span className={clsx("shrink-0 font-robinhood text-[10px]", deskPaper.inkLabel)}>{item.meta}</span>
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
              {!flatResults.length && query.trim() && !loading ? (
                <div className={clsx("px-4 py-6 text-center font-robinhood text-[13px]", deskPaper.inkMeta)}>No results found.</div>
              ) : null}
            </div>
          ) : null}

          {mode === "ai" && aiResponse ? (
            <div className="space-y-4 px-2">
              <section className={clsx("rounded-lg border p-4", deskPaper.border, deskPaper.panelRaised)}>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.accent)}>Answer</div>
                <p className={clsx("mt-2 font-robinhood text-[13px] leading-relaxed", deskPaper.inkBody)}>{aiResponse.answer}</p>
              </section>

              {aiResponse.sources.length ? (
                <section>
                  <div className={clsx("px-1 pb-1.5 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
                    Sources
                  </div>
                  <div className="space-y-1">
                    {aiResponse.sources.map((source) => (
                      <div
                        key={source.id}
                        className={clsx("rounded-md px-3 py-2 font-robinhood text-[12px]", deskPaper.panel, deskPaper.inkBody)}
                      >
                        {source.title}
                        <span className={clsx("ml-2 text-[10px] uppercase", deskPaper.inkMeta)}>{source.type}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {aiResponse.suggested_actions.length ? (
                <section>
                  <div className={clsx("px-1 pb-1.5 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
                    Suggested actions
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiResponse.suggested_actions.map((action) => (
                      <button
                        key={action.action}
                        type="button"
                        onClick={() => {
                          if (action.href) {
                            close();
                            router.push(action.href);
                          }
                        }}
                        className={clsx(
                          "rounded-full border px-3 py-1.5 font-robinhood text-[11px] transition-colors",
                          deskPaper.border,
                          deskPaper.hover,
                          deskPaper.inkBody
                        )}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          ) : null}

          {mode === "command" && commandResponse ? (
            <div className="px-3 py-2">
              <div
                className={clsx(
                  "rounded-lg border px-4 py-4",
                  commandResponse.success ? "border-[#4A7C59]/35 bg-[#4A7C59]/10" : "border-[#b85c38]/35 bg-[#b85c38]/10"
                )}
              >
                <div className={clsx("font-robinhood text-[13px]", deskPaper.inkHeading)}>{commandResponse.message}</div>
                {commandResponse.redirectPath ? (
                  <button
                    type="button"
                    onClick={executeSelected}
                    className={clsx(
                      "mt-3 rounded-md px-3 py-1.5 font-robinhood text-[11px] uppercase tracking-wider transition-colors",
                      deskPaper.activeNav,
                      deskPaper.inkHeading
                    )}
                  >
                    Continue
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className={clsx("flex items-center justify-between border-t px-4 py-2.5 font-robinhood text-[10px]", deskPaper.border, deskPaper.inkMeta)}>
          <span>↑↓ navigate · ↵ select</span>
          <span className="hidden sm:inline">⌘K open</span>
        </div>
      </div>
    </div>
  );
}

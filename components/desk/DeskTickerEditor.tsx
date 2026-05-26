"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";
import { DeskEmptyState } from "./DeskEmptyState";
import { fetchTickerItemsClient, saveTickerItemsClient } from "@/lib/supabase/queries/ticker.client";

function TickerPreview({ headlines }: { headlines: string[] }) {
  const crawl = headlines.length > 0 ? headlines.join("    ◆    ") : "Add headlines to preview the live ticker";
  const loop = `${crawl}    ◆    ${crawl}`;

  return (
    <div className="hero-dmn-ticker overflow-hidden rounded-md" role="marquee" aria-label="Ticker preview">
      <span className="hero-dmn-ticker__label font-mono-hbm">Live</span>
      <div className="hero-dmn-ticker__track-wrap">
        <div className="hero-dmn-ticker__fade hero-dmn-ticker__fade--left" aria-hidden />
        <div className="hero-dmn-ticker__fade hero-dmn-ticker__fade--right" aria-hidden />
        <div className="hero-dmn-ticker__track">
          <span className="hero-dmn-ticker__text font-mono-hbm">{loop}</span>
          <span className="hero-dmn-ticker__text font-mono-hbm" aria-hidden>
            {loop}
          </span>
        </div>
      </div>
    </div>
  );
}

export function DeskTickerEditor() {
  const [headlines, setHeadlines] = useState<string[]>([""]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);
      const result = await fetchTickerItemsClient();

      if (cancelled) return;

      if (result.error) {
        setLoadError(result.error.message);
        setHeadlines([""]);
      } else {
        const items = result.data ?? [];
        setHeadlines(items.length > 0 ? items.map((item) => item.headline) : [""]);
      }

      setLoading(false);
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const previewHeadlines = useMemo(
    () => headlines.map((h) => h.trim()).filter(Boolean),
    [headlines],
  );

  function updateHeadline(index: number, value: string) {
    setHeadlines((rows) => rows.map((row, i) => (i === index ? value : row)));
  }

  function addRow() {
    setHeadlines((rows) => [...rows, ""]);
  }

  function removeRow(index: number) {
    setHeadlines((rows) => (rows.length <= 1 ? [""] : rows.filter((_, i) => i !== index)));
  }

  function moveRow(index: number, direction: -1 | 1) {
    setHeadlines((rows) => {
      const next = [...rows];
      const target = index + direction;
      if (target < 0 || target >= next.length) return rows;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaveError(null);

    const result = await saveTickerItemsClient(previewHeadlines);

    setSaving(false);

    if (result.error) {
      setSaveError(result.error.message);
      return;
    }

    setSavedAt(new Date());
    if (result.data?.length) {
      setHeadlines(result.data.map((item) => item.headline));
    } else {
      setHeadlines([""]);
    }
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-6">
        <Link href="/desk/newsroom/editor" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
          ← Review desk
        </Link>
        <div className={clsx("mt-3 font-robinhood text-[10px] uppercase tracking-[0.28em]", deskPaper.inkLabel)}>
          Editor in Chief · Homepage
        </div>
        <h1 className={clsx("mt-1 font-cormorant text-4xl", deskPaper.inkHeading)}>Live Ticker</h1>
        <p className={clsx("mt-2 max-w-2xl font-robinhood text-sm", deskPaper.inkBody)}>
          Edit the scrolling headlines on the public homepage hero. When saved, these override the automatic article feed.
        </p>
      </div>

      {loadError ? (
        <div className={clsx("mb-4 font-robinhood text-[12px] text-desk-red", deskPaper.inkBody)}>{loadError}</div>
      ) : null}

      {saveError ? (
        <div className={clsx("mb-4 font-robinhood text-[12px] text-desk-red", deskPaper.inkBody)}>{saveError}</div>
      ) : null}

      <section className={clsx("mb-6 rounded-md border p-5", deskPaper.card, deskPaper.border)}>
        <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Preview</div>
        <div className="mt-4 overflow-hidden rounded-md border border-[#bca882]/40">
          <TickerPreview headlines={previewHeadlines} />
        </div>
      </section>

      <section className={clsx("rounded-md border p-5", deskPaper.card, deskPaper.border)}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Headlines</div>
          <button
            type="button"
            onClick={addRow}
            className={clsx(
              "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider",
              deskPaper.border,
              deskPaper.inkMeta,
              deskPaper.hover,
            )}
          >
            Add headline
          </button>
        </div>

        {loading ? (
          <div className={clsx("py-8 font-robinhood text-[12px]", deskPaper.inkMeta)}>Loading ticker…</div>
        ) : headlines.length === 1 && !headlines[0].trim() ? (
          <DeskEmptyState
            title="No ticker headlines yet."
            subtitle="Add headlines below — they will scroll across the homepage hero."
          />
        ) : (
          <div className="space-y-3">
            {headlines.map((headline, index) => (
              <div key={`ticker-row-${index}`} className="flex flex-wrap items-center gap-2">
                <span className={clsx("w-6 font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{index + 1}</span>
                <input
                  value={headline}
                  onChange={(e) => updateHeadline(index, e.target.value)}
                  placeholder="Breaking headline…"
                  className={clsx("min-w-0 flex-1 rounded-md border px-3 py-2 font-robinhood text-[13px] outline-none", deskPaper.input)}
                />
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveRow(index, -1)}
                    disabled={index === 0}
                    className={clsx(
                      "rounded border px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
                      deskPaper.border,
                      deskPaper.inkMeta,
                      deskPaper.hover,
                    )}
                  >
                    Up
                  </button>
                  <button
                    type="button"
                    onClick={() => moveRow(index, 1)}
                    disabled={index === headlines.length - 1}
                    className={clsx(
                      "rounded border px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
                      deskPaper.border,
                      deskPaper.inkMeta,
                      deskPaper.hover,
                    )}
                  >
                    Down
                  </button>
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className={clsx(
                      "rounded border px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider text-desk-red",
                      deskPaper.border,
                      deskPaper.hover,
                    )}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={saving || loading}
            onClick={() => void handleSave()}
            className={clsx(
              "rounded-md border px-5 py-2.5 font-robinhood text-[10px] uppercase tracking-[0.18em] transition-colors disabled:opacity-50",
              "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]",
            )}
          >
            {saving ? "Saving…" : "Save ticker"}
          </button>
          {savedAt ? (
            <span className={clsx("font-robinhood text-[11px] text-desk-green")}>
              Saved {savedAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </span>
          ) : null}
        </div>
      </section>
    </div>
  );
}

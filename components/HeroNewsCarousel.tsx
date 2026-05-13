"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SLIDES = [
  {
    id: "1",
    desk: "On-chain",
    headline: "Base L2 reserve flows hold above stress thresholds as institutional participation widens.",
    dek: "Read-only desk telemetry shows sustained custody-aligned activity without velocity spikes in retail channels.",
  },
  {
    id: "2",
    desk: "Archival",
    headline: "Filecoin deal renewals lengthen median proof duration as mandates prioritize durable commitment.",
    dek: "Programs that bind economics to the dataset—not a monthly cloud line—continue to draw treasury attention.",
  },
  {
    id: "3",
    desk: "Rails",
    headline: "Stellar gifting volume steadies after on-chain ledger rails expand for milestone programs.",
    dek: "Counterparties cite verifiable delivery and disclosure-friendly receipts as the hinge for adoption.",
  },
  {
    id: "4",
    desk: "Governance",
    headline: "Major L1 quorums maintain participation through cadence shift as delegation rules tighten.",
    dek: "The house tracks voting surfaces where outcomes remain legible to boards after the headline cycle fades.",
  },
] as const;

const WIRE_HOLD_MS = 4000;

/** ISO calendar date (YYYY-MM-DD). Bump when this briefing or desk stories change. */
const HOUSE_DESK_BRIEFING_UPDATED_AT = "2026-05-12";

function formatBriefingDateLongLocal(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Today / Yesterday / long date — uses the viewer's local calendar. */
function getBriefingUpdatedLabel(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return formatBriefingDateLongLocal(iso);
  const updatedStart = new Date(y, m - 1, d);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const u = new Date(updatedStart.getFullYear(), updatedStart.getMonth(), updatedStart.getDate()).getTime();
  if (u === todayStart.getTime()) return "Today";
  if (u === yesterdayStart.getTime()) return "Yesterday";
  return formatBriefingDateLongLocal(iso);
}

/** One full marquee loop duration (seconds); must match WireCrawl. */
function marqueeDurationSec(text: string): number {
  return Math.min(48, Math.max(16, text.length * 0.1));
}

function WireCrawl({
  text,
  paused,
  reduceMotion,
}: {
  text: string;
  paused: boolean;
  reduceMotion: boolean;
}) {
  const dur = marqueeDurationSec(text);

  if (reduceMotion) {
    return (
      <p className="line-clamp-2 font-mono-hbm text-[10px] font-light leading-relaxed tracking-[0.04em] text-silver-dim/65">
        {text}
      </p>
    );
  }

  return (
    <div className="relative flex h-7 w-full items-center overflow-hidden rounded-sm border border-white/[0.06] bg-black/30">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-obsidian to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-obsidian to-transparent"
        aria-hidden
      />
      <div
        key={text}
        className="flex w-max"
        style={{
          animation: `marquee ${dur}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        <span className="whitespace-nowrap px-3 font-mono-hbm text-[10px] font-light tracking-[0.05em] text-silver-dim/72 md:text-[11px]">
          {text}
        </span>
        <span
          className="whitespace-nowrap px-3 font-mono-hbm text-[10px] font-light tracking-[0.05em] text-silver-dim/72 md:text-[11px]"
          aria-hidden
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export default function HeroNewsCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [wireHold, setWireHold] = useState(false);
  const reduceMotion = useReducedMotion();
  const n = SLIDES.length;

  const manualPausedRef = useRef(false);
  const slideStartRef = useRef(0);
  const progressRef = useRef(0);
  const prevIdxForHoldRef = useRef<number | null>(null);
  const visitKeyRef = useRef(0);
  if (prevIdxForHoldRef.current !== index) {
    if (prevIdxForHoldRef.current !== null) {
      visitKeyRef.current += 1;
    }
    prevIdxForHoldRef.current = index;
  }

  const indexRef = useRef(index);
  indexRef.current = index;

  const item = SLIDES[index];
  const wireMarqueePaused = manualPaused || wireHold;

  const computeTotalMs = useCallback(() => {
    const hold = visitKeyRef.current === 0 ? 0 : WIRE_HOLD_MS;
    return hold + marqueeDurationSec(SLIDES[indexRef.current].dek) * 1000;
  }, []);

  useEffect(() => {
    manualPausedRef.current = manualPaused;
  }, [manualPaused]);

  useEffect(() => {
    slideStartRef.current = performance.now();
    progressRef.current = 0;
    setProgress(0);
  }, [index]);

  useEffect(() => {
    if (visitKeyRef.current === 0) return;
    setWireHold(true);
    const t = window.setTimeout(() => setWireHold(false), WIRE_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [index]);

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (manualPausedRef.current) return;
      const totalMs = computeTotalMs();
      const elapsed = now - slideStartRef.current;
      const p = Math.min(1, elapsed / totalMs);
      progressRef.current = p;
      setProgress(p);
      if (p >= 1) {
        slideStartRef.current = now;
        progressRef.current = 0;
        setProgress(0);
        setIndex((i) => (i + 1) % n);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [computeTotalMs, n, reduceMotion]);

  const toggleManualPause = useCallback(() => {
    setManualPaused((p) => {
      const next = !p;
      manualPausedRef.current = next;
      if (!next) {
        slideStartRef.current = performance.now() - progressRef.current * computeTotalMs();
      }
      return next;
    });
  }, [computeTotalMs]);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  const holdMsForUi = visitKeyRef.current === 0 ? 0 : WIRE_HOLD_MS;
  const totalMsNow = holdMsForUi + marqueeDurationSec(item.dek) * 1000;
  const secondsLeft = Math.max(0, Math.ceil((totalMsNow * (1 - progress)) / 1000));

  /** sm+: collapse height until hover/focus so no empty band; mobile stays open. */
  const chromeRevealGrid = clsx(
    "grid transition-[grid-template-rows] duration-300 ease-out",
    "grid-rows-[1fr]",
    "sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] sm:group-focus-within:grid-rows-[1fr]",
  );

  const chromeRevealInner = clsx(
    "min-h-0 overflow-hidden",
  );

  const chromeRevealContent = clsx(
    "transition-[opacity] duration-300 ease-out",
    "opacity-100",
    "sm:pointer-events-none sm:opacity-0",
    "sm:group-hover:pointer-events-auto sm:group-hover:opacity-100",
    "sm:group-focus-within:pointer-events-auto sm:group-focus-within:opacity-100",
  );

  /** Live + crawl always visible; timer / nav stay hover-revealed on sm+ */
  const wireFeedSurface = "mt-1.5 shrink-0 border-t border-white/[0.06] pt-2";

  return (
    <div
      className={clsx(
        "group relative z-10 flex min-h-0 w-full flex-col rounded-lg outline-none transition-[box-shadow] duration-300",
        "max-sm:flex-1 max-sm:min-h-0",
        "sm:h-auto sm:flex-none",
        "sm:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="House desk briefings"
      tabIndex={-1}
    >
      <div className="shrink-0 border-b-2 border-gold/25 pb-2">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0 font-mono-hbm text-[9px] font-medium uppercase tracking-[0.34em] text-gold/55">
            House desk
          </p>
          <p className="shrink-0 text-right font-mono-hbm text-[8px] font-normal uppercase tracking-[0.22em] text-silver-dim/38">
            <time dateTime={HOUSE_DESK_BRIEFING_UPDATED_AT}>
              Updated {getBriefingUpdatedLabel(HOUSE_DESK_BRIEFING_UPDATED_AT)}
            </time>
          </p>
        </div>
      </div>

      <div className="relative mt-1.5 shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            aria-live={reduceMotion ? "off" : "polite"}
            className="flex min-h-[11.25rem] flex-col gap-0.5 border-l-[3px] border-gold/30 pl-3 sm:min-h-[11.75rem] md:min-h-[13rem] md:gap-1 md:pl-4 lg:min-h-[14.75rem]"
          >
            <p className="shrink-0 font-mono-hbm text-[9px] font-medium uppercase tracking-[0.24em] text-gold/50">
              {item.desk}
            </p>
            <h2 className="line-clamp-5 min-h-[5lh] flex-1 font-cormorant text-[1.42rem] font-semibold leading-[1.1] tracking-[-0.03em] text-cream/[0.93] antialiased [text-shadow:0_2px_32px_rgba(0,0,0,0.35)] md:text-[1.62rem] md:leading-[1.08] lg:text-[1.88rem] lg:leading-[1.06]">
              {item.headline}
            </h2>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className={wireFeedSurface}>
        <div className="mb-0 flex items-center gap-2 px-2 sm:px-2.5 sm:group-hover:mb-2 sm:group-focus-within:mb-2">
          <span className="shrink-0 font-mono-hbm text-[7px] font-semibold uppercase tracking-[0.16em] text-digital-80s">
            Live
          </span>
          <div className="min-w-0 flex-1">
            <WireCrawl text={item.dek} paused={wireMarqueePaused} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>

      <div className={chromeRevealGrid}>
        <div className={chromeRevealInner}>
          <div className={chromeRevealContent}>
            <div className="mb-2 flex items-center gap-2 px-2 sm:px-2.5" aria-hidden={reduceMotion}>
              <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
                <div
                  className="h-full rounded-full bg-gold/50"
                  style={{
                    width: reduceMotion ? "0%" : `${progress * 100}%`,
                  }}
                />
              </div>
              <span className="font-mono-hbm shrink-0 text-[7px] tabular-nums uppercase tracking-[0.16em] text-silver-dim/45">
                {reduceMotion ? "—" : manualPaused ? "‖" : `${secondsLeft}`}
              </span>
              <button
                type="button"
                tabIndex={0}
                aria-label={manualPaused ? "Resume carousel" : "Pause carousel"}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleManualPause();
                }}
                className="font-mono-hbm shrink-0 rounded px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.22em] text-white/88 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40 max-sm:min-h-[44px] max-sm:min-w-[44px] max-sm:px-3 max-sm:py-2 max-sm:text-[9px]"
              >
                {manualPaused ? "Play" : "Pause"}
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 px-2 sm:px-2.5">
              <div className="flex flex-wrap gap-1.5" aria-label="Story position">
                {SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={`Story ${idx + 1} of ${n}`}
                    aria-current={idx === index ? true : undefined}
                    onClick={() => setIndex(idx)}
                    className={clsx(
                      "box-border min-h-[7px] rounded-full ring-1 ring-inset transition-[width,background-color,ring-color] duration-300",
                      "hover:bg-white/16 hover:ring-white/28 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/45",
                      "max-sm:inline-flex max-sm:min-h-[44px] max-sm:min-w-[36px] max-sm:items-center max-sm:justify-center max-sm:px-1",
                      idx === index
                        ? "w-5 bg-white/[0.28] ring-white/[0.38] max-sm:min-w-[44px]"
                        : "w-1.5 bg-white/[0.08] ring-white/[0.16]",
                    )}
                  />
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-0 text-silver-dim/28">
                <button
                  type="button"
                  className="font-mono-hbm min-h-[44px] min-w-[44px] px-0.5 py-2 text-[11px] font-light leading-none transition-colors hover:text-cream/50 focus-visible:text-cream/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/35 max-sm:flex max-sm:items-center max-sm:justify-center"
                  aria-label="Previous story"
                  onClick={() => go(-1)}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="font-mono-hbm min-h-[44px] min-w-[44px] px-0.5 py-2 text-[11px] font-light leading-none transition-colors hover:text-cream/50 focus-visible:text-cream/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/35 max-sm:flex max-sm:items-center max-sm:justify-center"
                  aria-label="Next story"
                  onClick={() => go(1)}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

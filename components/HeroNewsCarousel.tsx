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
    time: "Wire · 2h",
  },
  {
    id: "2",
    desk: "Archival",
    headline: "Filecoin deal renewals lengthen median proof duration as mandates prioritize durable commitment.",
    dek: "Programs that bind economics to the dataset—not a monthly cloud line—continue to draw treasury attention.",
    time: "Wire · 6h",
  },
  {
    id: "3",
    desk: "Rails",
    headline: "Stellar gifting volume steadies after on-chain ledger rails expand for milestone programs.",
    dek: "Counterparties cite verifiable delivery and disclosure-friendly receipts as the hinge for adoption.",
    time: "Wire · 12h",
  },
  {
    id: "4",
    desk: "Governance",
    headline: "Major L1 quorums maintain participation through cadence shift as delegation rules tighten.",
    dek: "The house tracks voting surfaces where outcomes remain legible to boards after the headline cycle fades.",
    time: "Wire · 18h",
  },
] as const;

const WIRE_HOLD_MS = 4000;

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
    <div className="relative flex h-8 w-full items-center overflow-hidden rounded-sm border border-white/[0.06] bg-black/30">
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
          <span className="text-digital-80s/80">●</span> {text}
        </span>
        <span className="whitespace-nowrap px-3 font-mono-hbm text-[10px] font-light tracking-[0.05em] text-silver-dim/72 md:text-[11px]" aria-hidden>
          <span className="text-digital-80s/80">●</span> {text}
        </span>
      </div>
    </div>
  );
}

export default function HeroNewsCarousel() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [wireHold, setWireHold] = useState(false);
  const reduceMotion = useReducedMotion();
  const n = SLIDES.length;

  const hoveredRef = useRef(false);
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
      if (hoveredRef.current || manualPausedRef.current) return;
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

  const onPointerEnter = useCallback(() => {
    if (hoveredRef.current) return;
    hoveredRef.current = true;
    setHovered(true);
  }, []);

  const onPointerLeave = useCallback(() => {
    if (!hoveredRef.current) return;
    hoveredRef.current = false;
    setHovered(false);
    slideStartRef.current = performance.now() - progressRef.current * computeTotalMs();
  }, [computeTotalMs]);

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

  const controlsSurface = clsx(
    "mt-3 border-t border-white/[0.06] pt-2 transition-[opacity,visibility] duration-300 ease-out",
    "max-sm:pointer-events-auto max-sm:visible max-sm:opacity-100",
    "sm:pointer-events-none sm:invisible sm:opacity-0",
    "sm:group-hover:pointer-events-auto sm:group-hover:visible sm:group-hover:opacity-100",
    "sm:group-focus-within:pointer-events-auto sm:group-focus-within:visible sm:group-focus-within:opacity-100",
  );

  /** Fixed story column height — hero grid doesn’t jump when slides change length */
  const storyMinH = "min-h-[244px] md:min-h-[264px]";

  return (
    <div
      className={clsx(
        "group relative z-10 flex h-full min-h-0 flex-1 flex-col rounded-lg outline-none transition-[box-shadow] duration-300",
        "sm:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="House desk briefings"
      tabIndex={-1}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="shrink-0 border-b-2 border-gold/25 pb-2">
        <p className="font-mono-hbm text-[9px] font-medium uppercase tracking-[0.34em] text-gold/55">House desk</p>
        <p className="mt-0.5 font-cormorant text-[11px] font-light italic leading-snug tracking-[0.06em] text-silver-dim/50 md:text-xs">
          A briefing for the institutionally curious
        </p>
      </div>

      <div className={clsx("relative mt-3 flex flex-1 flex-col", storyMinH)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.article
            key={item.id}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            aria-live={reduceMotion ? "off" : "polite"}
            className="absolute inset-0 flex flex-col gap-2 border-l-[3px] border-gold/30 pl-3 md:gap-2.5 md:pl-4"
          >
            <p className="shrink-0 font-mono-hbm text-[9px] font-medium uppercase tracking-[0.24em] text-gold/50">
              {item.desk}
            </p>
            <h2 className="line-clamp-4 shrink-0 font-cormorant text-[1.28rem] font-semibold leading-[1.12] tracking-[-0.03em] text-cream/[0.93] antialiased [text-shadow:0_2px_32px_rgba(0,0,0,0.35)] md:text-[1.45rem] md:leading-[1.1] lg:text-[1.62rem]">
              {item.headline}
            </h2>

            <div className="min-h-0 shrink-0 pt-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="font-mono-hbm bg-digital-80s/20 px-1 py-px text-[7px] font-semibold uppercase tracking-[0.16em] text-digital-80s">
                  Wire
                </span>
                <span className="font-mono-hbm text-[7px] uppercase tracking-[0.26em] text-silver-dim/42">Scroll</span>
              </div>
              <WireCrawl text={item.dek} paused={wireMarqueePaused} reduceMotion={reduceMotion} />
            </div>

            <p className="mt-auto shrink-0 pt-2 font-mono-hbm text-[8px] uppercase tracking-[0.2em] text-silver-dim/40">
              {item.time}
            </p>
          </motion.article>
        </AnimatePresence>
      </div>

      <div className={controlsSurface}>
        <div className="mb-2 flex items-center gap-2" aria-hidden={reduceMotion}>
          <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/[0.08]" aria-hidden>
            <div
              className="h-full rounded-full bg-gold/50"
              style={{
                width: reduceMotion ? "0%" : `${progress * 100}%`,
              }}
            />
          </div>
          <span className="font-mono-hbm shrink-0 text-[7px] tabular-nums uppercase tracking-[0.16em] text-silver-dim/45">
            {reduceMotion ? "—" : hovered || manualPaused ? "‖" : `${secondsLeft}`}
          </span>
          <button
            type="button"
            tabIndex={0}
            aria-label={manualPaused ? "Resume carousel" : "Pause carousel"}
            onClick={(e) => {
              e.stopPropagation();
              toggleManualPause();
            }}
            className="font-mono-hbm shrink-0 rounded px-1.5 py-0.5 text-[8px] font-medium uppercase tracking-[0.22em] text-white/88 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/40"
          >
            {manualPaused ? "Play" : "Pause"}
          </button>
        </div>

        <div className="flex items-center justify-between gap-2">
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
                  "hover:ring-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45",
                  idx === index
                    ? "w-5 bg-gold/40 ring-gold/45"
                    : "w-1.5 bg-white/[0.12] ring-white/28 hover:bg-white/18",
                )}
              />
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-0 text-silver-dim/28">
            <button
              type="button"
              className="font-mono-hbm px-0.5 py-0.5 text-[11px] font-light leading-none transition-colors hover:text-cream/50 focus-visible:text-cream/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/35"
              aria-label="Previous story"
              onClick={() => go(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className="font-mono-hbm px-0.5 py-0.5 text-[11px] font-light leading-none transition-colors hover:text-cream/50 focus-visible:text-cream/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/35"
              aria-label="Next story"
              onClick={() => go(1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

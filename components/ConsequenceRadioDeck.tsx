"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  IconSessionRing,
  IconCompStacks,
  IconCollab,
  IconTrade,
  IconStaking,
  IconRadio,
} from "@/components/IllustrativeIcons";

const RADIO_STATIONS = [
  { id: "session", Icon: IconSessionRing, label: "Session", sub: "Tracking · clock discipline" },
  { id: "comp", Icon: IconCompStacks, label: "Comp", sub: "Lanes · recall-safe" },
  { id: "collab", Icon: IconCollab, label: "Collab", sub: "Shared timeline" },
  { id: "trade", Icon: IconTrade, label: "Trade", sub: "Beats · listings" },
  { id: "staking", Icon: IconStaking, label: "Staking", sub: "Lock · yield" },
  { id: "radio", Icon: IconRadio, label: "Radio", sub: "Broadcast · rotation" },
] as const;

const RADIO_QUEUE = [
  { title: "Midnight Ledger", artist: "HBM Session Band", dur: "3:42" },
  { title: "Stem Architecture", artist: "Comp Desk", dur: "4:08" },
  { title: "Trade Lane", artist: "Producer Counter", dur: "2:55" },
  { title: "Rotation Rights", artist: "Radio Syndicate", dur: "5:12" },
] as const;

function ConsequenceQueueCard({
  track,
  index,
  isNowPlaying,
}: {
  track: (typeof RADIO_QUEUE)[number];
  index: number;
  isNowPlaying: boolean;
}) {
  return (
    <article
      className={clsx(
        "consequence-radio-queue-card",
        isNowPlaying && "consequence-radio-queue-card--active",
      )}
    >
      <div className="consequence-radio-queue-card__top">
        <span className="consequence-radio-queue-card__index font-mono-hbm">{String(index + 1).padStart(2, "0")}</span>
        <span
          className={clsx(
            "consequence-radio-queue-card__badge font-mono-hbm",
            isNowPlaying ? "consequence-radio-queue-card__badge--live" : "consequence-radio-queue-card__badge--queued",
          )}
        >
          {isNowPlaying ? "On Air" : "Queued"}
        </span>
      </div>
      <h4 className="consequence-radio-queue-card__title font-robinhood">{track.title}</h4>
      <p className="consequence-radio-queue-card__artist font-robinhood">{track.artist}</p>
      <div className="consequence-radio-queue-card__footer">
        <span className="consequence-radio-queue-card__dur font-mono-hbm">{track.dur}</span>
      </div>
    </article>
  );
}

/** Dashboard-style Consequence Radio desk. */
export function ConsequenceRadioDeck() {
  const [activeStation, setActiveStation] = useState("radio");
  const [playing, setPlaying] = useState(true);
  const station = RADIO_STATIONS.find((s) => s.id === activeStation) ?? RADIO_STATIONS[5];
  const nowPlaying = RADIO_QUEUE[0];

  return (
    <div className="consequence-radio-dashboard">
      <div className="consequence-radio-dashboard__layout">
        <section className="consequence-radio-dashboard__player" aria-label="Now playing">
          <header className="consequence-radio-dashboard__header">
            <div>
              <p className="font-mono-hbm text-[8px] uppercase tracking-[0.34em] text-white/55">— Consequence</p>
              <h2 className="font-robinhood mt-1 text-2xl font-semibold text-white md:text-[1.65rem]">Radio</h2>
            </div>
            <span className="consequence-radio-dashboard__live-badge font-mono-hbm">Live</span>
          </header>

          <div className="consequence-radio-dashboard__hero relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=85"
              alt=""
              fill
              className="object-cover opacity-35 mix-blend-overlay"
              unoptimized
            />
            <div className="consequence-radio-dashboard__hero-content">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-white/70">Now Playing</p>
              <h3 className="font-robinhood mt-2 text-xl font-semibold leading-tight text-white md:text-2xl">
                {nowPlaying.title}
              </h3>
              <p className="font-robinhood mt-1 text-sm text-white/75">{nowPlaying.artist}</p>

              <div className="consequence-radio-dashboard__progress mt-6">
                <div className="consequence-radio-dashboard__progress-track">
                  <div className="consequence-radio-dashboard__progress-fill" style={{ width: "38%" }} />
                </div>
                <div className="consequence-radio-dashboard__progress-times font-mono-hbm">
                  <span>1:24</span>
                  <span>{nowPlaying.dur}</span>
                </div>
              </div>

              <div className="consequence-radio-dashboard__actions mt-5">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  className="consequence-radio-dashboard__btn-primary font-mono-hbm"
                >
                  {playing ? "Pause" : "Play"}
                </button>
                <Link href="/contact" className="consequence-radio-dashboard__btn-secondary font-mono-hbm">
                  Get Consequence
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="consequence-radio-dashboard__stations" aria-label="Stations">
          <h3 className="consequence-radio-dashboard__section-label font-mono-hbm">Stations</h3>
          <div className="consequence-radio-dashboard__station-grid">
            {RADIO_STATIONS.map(({ id, Icon, label, sub }) => {
              const isActive = activeStation === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveStation(id)}
                  className={clsx("consequence-radio-station-card", isActive && "consequence-radio-station-card--active")}
                >
                  <Icon className={clsx("consequence-radio-station-card__icon h-9 w-9", isActive ? "text-white" : "text-white/45")} />
                  <div className="consequence-radio-station-card__copy">
                    <p className="font-robinhood text-sm font-semibold text-white/92">{label}</p>
                    <p className="font-robinhood mt-0.5 text-[11px] leading-snug text-white/50">{sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="consequence-radio-dashboard__queue" aria-label={`Up next on ${station.label}`}>
          <h3 className="consequence-radio-dashboard__section-label font-mono-hbm">Up Next · {station.label}</h3>
          <div className="consequence-radio-dashboard__queue-list">
            {RADIO_QUEUE.map((track, index) => (
              <ConsequenceQueueCard key={track.title} track={track} index={index} isNowPlaying={index === 0} />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

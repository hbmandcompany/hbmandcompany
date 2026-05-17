"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

export type TrendingTrack = {
  rank: number;
  title: string;
  artist: string;
  genre: string;
  movement: "up" | "down" | "same" | "new";
  delta?: number;
  weeksOnChart?: number;
  peak?: number;
};

const PERIODS = ["Today", "This Week", "Hot 100"] as const;
type Period = (typeof PERIODS)[number];

const GENRE_FILTERS = ["All", "Session", "Comp", "Collab", "Trade", "Radio"] as const;
type GenreFilter = (typeof GENRE_FILTERS)[number];

const TRENDING_TRACKS: TrendingTrack[] = [
  { rank: 1, title: "Midnight Ledger", artist: "HBM Session Band", genre: "Session", movement: "same", weeksOnChart: 4, peak: 1 },
  { rank: 2, title: "Stem Architecture", artist: "Comp Desk", genre: "Comp", movement: "up", delta: 2, weeksOnChart: 6, peak: 2 },
  { rank: 3, title: "Trade Lane", artist: "Producer Counter", genre: "Trade", movement: "down", delta: 1, weeksOnChart: 3, peak: 2 },
  { rank: 4, title: "Rotation Rights", artist: "Radio Syndicate", genre: "Radio", movement: "up", delta: 3, weeksOnChart: 2, peak: 4 },
  { rank: 5, title: "Catalog Yield", artist: "Treasury Desk", genre: "Trade", movement: "new", weeksOnChart: 1, peak: 5 },
  { rank: 6, title: "Recall Safe", artist: "Comp Collective", genre: "Comp", movement: "up", delta: 1, weeksOnChart: 8, peak: 4 },
  { rank: 7, title: "Shared Timeline", artist: "Collab Unit", genre: "Collab", movement: "down", delta: 2, weeksOnChart: 5, peak: 5 },
  { rank: 8, title: "Broadcast Window", artist: "Radio Syndicate", genre: "Radio", movement: "same", weeksOnChart: 7, peak: 6 },
  { rank: 9, title: "Clock Discipline", artist: "Session Guild", genre: "Session", movement: "up", delta: 4, weeksOnChart: 2, peak: 9 },
  { rank: 10, title: "Lock & Yield", artist: "Staking Room", genre: "Trade", movement: "down", delta: 1, weeksOnChart: 9, peak: 7 },
];

function MovementBadge({ movement, delta }: { movement: TrendingTrack["movement"]; delta?: number }) {
  if (movement === "new") {
    return <span className="billboard-chart__movement billboard-chart__movement--new font-mono-hbm">NEW</span>;
  }
  if (movement === "same") {
    return <span className="billboard-chart__movement billboard-chart__movement--same font-mono-hbm" aria-label="No change">—</span>;
  }
  const isUp = movement === "up";
  return (
    <span
      className={clsx(
        "billboard-chart__movement font-mono-hbm",
        isUp ? "billboard-chart__movement--up" : "billboard-chart__movement--down",
      )}
    >
      {isUp ? "▲" : "▼"}
      {delta != null ? delta : ""}
    </span>
  );
}

/** Billboard Hot 100–style trending chart with Apple Music–style filters. */
export function BillboardTrendingChart() {
  const [period, setPeriod] = useState<Period>("Today");
  const [genre, setGenre] = useState<GenreFilter>("All");

  const filtered = useMemo(() => {
    let list = [...TRENDING_TRACKS];
    if (genre !== "All") {
      list = list.filter((t) => t.genre === genre);
    }
    if (period === "This Week") {
      list = list.slice(0, 8);
    } else if (period === "Today") {
      list = list.slice(0, 5);
    }
    return list.map((track, i) => ({ ...track, rank: i + 1 }));
  }, [period, genre]);

  return (
    <aside className="billboard-chart" aria-label="Trending on Consequence">
      <header className="billboard-chart__header">
        <div>
          <p className="font-mono-hbm text-[8px] uppercase tracking-[0.32em] text-white/45">Consequence Charts</p>
          <h3 className="billboard-chart__title font-robinhood">Trending</h3>
        </div>
        <div className="billboard-chart__period-toggle" role="tablist" aria-label="Chart period">
          {PERIODS.map((p) => (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={period === p}
              onClick={() => setPeriod(p)}
              className={clsx("billboard-chart__period-btn font-mono-hbm", period === p && "billboard-chart__period-btn--active")}
            >
              {p}
            </button>
          ))}
        </div>
      </header>

      <div className="billboard-chart__filters" role="group" aria-label="Filter by lane">
        {GENRE_FILTERS.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            className={clsx("billboard-chart__filter-pill font-mono-hbm", genre === g && "billboard-chart__filter-pill--active")}
          >
            {g}
          </button>
        ))}
      </div>

      <ol className="billboard-chart__list">
        {filtered.map((track) => (
          <li key={`${track.rank}-${track.title}`} className={clsx("billboard-chart__row", track.rank <= 3 && "billboard-chart__row--top")}>
            <span className="billboard-chart__rank font-mono-hbm">{track.rank}</span>
            <MovementBadge movement={track.movement} delta={track.delta} />
            <div className="billboard-chart__meta min-w-0 flex-1">
              <p className="billboard-chart__track font-robinhood">{track.title}</p>
              <p className="billboard-chart__artist font-robinhood">{track.artist}</p>
            </div>
            <span className="billboard-chart__genre font-mono-hbm hidden sm:inline">{track.genre}</span>
          </li>
        ))}
      </ol>

      <p className="billboard-chart__footnote font-mono-hbm">
        {period} · {genre === "All" ? "All lanes" : genre} · Updated live
      </p>
    </aside>
  );
}

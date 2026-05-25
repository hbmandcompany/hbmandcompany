"use client";

import { useId } from "react";
import clsx from "clsx";

/** Wireframe illustration marking reserved ad inventory. */
export function AdPlacementPlaceholder({
  className,
  compact = false,
  theme = "light",
  layout = "default",
}: {
  className?: string;
  compact?: boolean;
  theme?: "light" | "dark";
  layout?: "default" | "leaderboard";
}) {
  const patternId = `ad-hatch-${useId().replace(/:/g, "")}`;
  const isDark = theme === "dark";
  const isLeaderboard = layout === "leaderboard";

  return (
    <div
      className={clsx(
        "ad-placement-slot",
        compact && "ad-placement-slot--compact",
        isDark && "ad-placement-slot--dark",
        isLeaderboard && "ad-placement-slot--leaderboard",
        className,
      )}
      role="img"
      aria-label="Advertisement placement"
    >
      <svg
        className="ad-placement-slot__svg"
        viewBox={isLeaderboard ? "0 0 970 250" : "0 0 400 200"}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <pattern
            id={patternId}
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="12"
              stroke={isDark ? "rgba(180,175,170,0.14)" : "rgba(120,115,110,0.2)"}
              strokeWidth="1"
            />
          </pattern>
        </defs>
        {isLeaderboard ? (
          <>
            <rect width="970" height="250" fill={isDark ? "rgba(9,9,11,0.95)" : "rgba(245,242,236,1)"} />
            <rect width="970" height="250" fill={`url(#${patternId})`} />
            <rect
              x="32"
              y="32"
              width="906"
              height="186"
              fill="none"
              stroke={isDark ? "rgba(180,175,170,0.22)" : "rgba(80,75,70,0.28)"}
              strokeWidth="1"
              strokeDasharray="6 5"
            />
            <rect
              x="56"
              y="56"
              width="280"
              height="138"
              rx="2"
              fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
              stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}
            />
            <rect
              x="368"
              y="72"
              width="420"
              height="12"
              rx="1"
              fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
            />
            <rect
              x="368"
              y="98"
              width="360"
              height="10"
              rx="1"
              fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            />
            <rect
              x="368"
              y="120"
              width="390"
              height="10"
              rx="1"
              fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            />
            <rect
              x="368"
              y="148"
              width="160"
              height="28"
              rx="2"
              fill={isDark ? "rgba(120,32,40,0.25)" : "rgba(120,32,40,0.12)"}
              stroke={isDark ? "rgba(180,80,90,0.35)" : "rgba(120,32,40,0.28)"}
            />
          </>
        ) : (
          <>
            <rect width="400" height="200" fill={isDark ? "rgba(9,9,11,0.95)" : "rgba(245,242,236,1)"} />
            <rect width="400" height="200" fill={`url(#${patternId})`} />
            <rect
              x="24"
              y="24"
              width="352"
              height="152"
              fill="none"
              stroke={isDark ? "rgba(180,175,170,0.22)" : "rgba(80,75,70,0.28)"}
              strokeWidth="1"
              strokeDasharray="6 5"
            />
            <rect
              x="40"
              y="48"
              width="120"
              height="72"
              rx="2"
              fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
              stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}
            />
            <rect
              x="176"
              y="56"
              width="168"
              height="10"
              rx="1"
              fill={isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}
            />
            <rect
              x="176"
              y="76"
              width="140"
              height="8"
              rx="1"
              fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            />
            <rect
              x="176"
              y="92"
              width="152"
              height="8"
              rx="1"
              fill={isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}
            />
            <rect
              x="176"
              y="108"
              width="100"
              height="20"
              rx="2"
              fill={isDark ? "rgba(120,32,40,0.25)" : "rgba(120,32,40,0.12)"}
              stroke={isDark ? "rgba(180,80,90,0.35)" : "rgba(120,32,40,0.28)"}
            />
          </>
        )}
      </svg>
      <div className="ad-placement-slot__label">
        <span className="ad-placement-slot__eyebrow font-mono-hbm">Ad Placement</span>
        <span className={clsx("ad-placement-slot__mark font-cormorant", compact ? "text-xl" : "text-2xl")}>
          AD
        </span>
      </div>
    </div>
  );
}

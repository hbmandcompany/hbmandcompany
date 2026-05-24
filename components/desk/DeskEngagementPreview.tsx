"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";

const weekData = [
  { day: "M", label: "Mon", views: 1820 },
  { day: "T", label: "Tue", views: 1340 },
  { day: "W", label: "Wed", views: 2480 },
  { day: "T", label: "Thu", views: 1650 },
  { day: "F", label: "Fri", views: 2890 },
  { day: "S", label: "Sat", views: 1180 },
  { day: "S", label: "Sun", views: 840 },
];

const TOTAL_VIEWS = weekData.reduce((sum, d) => sum + d.views, 0);
const WEEK_CHANGE_PCT = 12.4;

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function smoothLinePath(points: { x: number; y: number }[]) {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    d += ` C ${cx},${p0.y} ${cx},${p1.y} ${p1.x},${p1.y}`;
  }
  return d;
}

function WeeklyRobinhoodChart({
  data,
  activeIndex,
  onActiveIndex,
}: {
  data: typeof weekData;
  activeIndex: number | null;
  onActiveIndex: (index: number | null) => void;
}) {
  const width = 320;
  const height = 96;
  const padX = 4;
  const padY = 8;

  const { linePath, areaPath, points } = useMemo(() => {
    const values = data.map((d) => d.views);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const innerW = width - padX * 2;
    const innerH = height - padY * 2;

    const pts = data.map((d, i) => ({
      x: padX + (i / (data.length - 1)) * innerW,
      y: padY + innerH - ((d.views - min) / range) * innerH,
      views: d.views,
    }));

    const line = smoothLinePath(pts);
    const area = `${line} L ${pts[pts.length - 1].x},${height} L ${pts[0].x},${height} Z`;
    return { linePath: line, areaPath: area, points: pts };
  }, [data]);

  const active = activeIndex !== null ? points[activeIndex] : points[points.length - 1];
  const displayIndex = activeIndex ?? points.length - 1;

  function handleMove(clientX: number, rect: DOMRect) {
    const x = ((clientX - rect.left) / rect.width) * width;
    let nearest = 0;
    let minDist = Infinity;
    points.forEach((p, i) => {
      const dist = Math.abs(p.x - x);
      if (dist < minDist) {
        minDist = dist;
        nearest = i;
      }
    });
    onActiveIndex(nearest);
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[96px] w-full touch-none"
        onMouseLeave={() => onActiveIndex(null)}
        onMouseMove={(e) => handleMove(e.clientX, e.currentTarget.getBoundingClientRect())}
        onTouchMove={(e) => {
          const touch = e.touches[0];
          if (touch) handleMove(touch.clientX, e.currentTarget.getBoundingClientRect());
        }}
        role="img"
        aria-label="Weekly views chart"
      >
        <defs>
          <linearGradient id="engagement-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4A7C59" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#4A7C59" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#engagement-fill)" />
        <path d={linePath} fill="none" stroke="#4A7C59" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
        <line
          x1={active.x}
          y1={padY}
          x2={active.x}
          y2={height}
          stroke="#4A7C59"
          strokeOpacity={0.35}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <circle cx={active.x} cy={active.y} r="4" fill="#4A7C59" stroke="#f2e6d1" strokeWidth="2" />
      </svg>
      <div
        className={clsx(
          "pointer-events-none absolute top-0 rounded border px-2 py-1 font-robinhood text-[10px] tabular-nums shadow-sm transition-opacity",
          deskPaper.border,
          "bg-[#ebe0cc] text-[#20160d]",
          activeIndex === null ? "opacity-0" : "opacity-100"
        )}
        style={{
          left: `${(active.x / width) * 100}%`,
          transform: "translate(-50%, -110%)",
        }}
      >
        {formatViews(data[displayIndex].views)} · {data[displayIndex].label}
      </div>
    </div>
  );
}

export function DeskEngagementPreview() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const displayIndex = activeIndex ?? weekData.length - 1;
  const displayViews = weekData[displayIndex]?.views ?? TOTAL_VIEWS;

  return (
    <div
      className={clsx(
        "group rounded-md p-5 transition-all duration-200",
        deskPaper.card,
        "hover:border-[#8d6f4d] hover:shadow-[0_12px_40px_rgba(32,22,13,0.12)]"
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className={clsx("font-robinhood text-[11px] uppercase tracking-[0.24em]", deskPaper.inkLabel)}>Engagement</div>
        <div className="flex items-center gap-2">
          <span
            className={clsx(
              "rounded-full border px-2 py-0.5 font-robinhood text-[9px] uppercase tracking-wider",
              deskPaper.border,
              deskPaper.inkHeading,
              "bg-[#f2e6d1]"
            )}
          >
            1W
          </span>
          <Link
            href="/desk/newsroom/analytics"
            className={clsx(
              "font-robinhood text-[10px] uppercase tracking-wider opacity-70 transition-opacity hover:opacity-100",
              deskPaper.accent
            )}
          >
            Open analytics →
          </Link>
        </div>
      </div>

      <div className="mb-1 flex items-baseline gap-2">
        <span className={clsx("font-robinhood text-[28px] font-medium leading-none tabular-nums tracking-tight transition-all", deskPaper.inkHeading)}>
          {activeIndex !== null ? formatViews(displayViews) : formatViews(TOTAL_VIEWS)}
        </span>
        <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>{activeIndex !== null ? "daily" : "views"}</span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-robinhood text-[13px] font-medium tabular-nums text-desk-green">+{WEEK_CHANGE_PCT}%</span>
        <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>this week</span>
        <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>·</span>
        <span className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>4m 12s avg read</span>
      </div>

      <WeeklyRobinhoodChart data={weekData} activeIndex={activeIndex} onActiveIndex={setActiveIndex} />

      <div className="mt-2 flex justify-between px-0.5">
        {weekData.map((d, i) => (
          <span
            key={`${d.label}-${i}`}
            className={clsx(
              "w-4 text-center font-robinhood text-[10px] tabular-nums transition-colors",
              i === displayIndex ? "font-medium text-desk-green" : deskPaper.inkMeta
            )}
          >
            {d.day}
          </span>
        ))}
      </div>
    </div>
  );
}

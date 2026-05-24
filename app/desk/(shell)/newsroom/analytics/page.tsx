"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";

const impressionTrend = [62, 58, 71, 68, 74, 82, 78, 85, 79, 88, 92, 86, 94, 98, 91, 96, 102, 99, 108, 104, 112, 118, 115, 121, 126, 122, 130, 128, 135, 142];

const kpiMetrics = [
  {
    id: "impressions",
    label: "Total impressions",
    value: "142.8K",
    delta: "+18.4%",
    deltaUp: true,
    prior: "120.6K prior",
    spark: [48, 52, 55, 58, 62, 65, 68, 72, 74, 78, 82, 86],
  },
  {
    id: "readers",
    label: "Unique readers",
    value: "38.2K",
    delta: "+12.1%",
    deltaUp: true,
    prior: "34.1K prior",
    spark: [62, 64, 66, 68, 70, 71, 73, 74, 76, 78, 79, 82],
  },
  {
    id: "readtime",
    label: "Avg read time",
    value: "4m 12s",
    delta: "+0:34",
    deltaUp: true,
    prior: "3m 38s prior",
    spark: [55, 58, 57, 60, 62, 61, 64, 66, 65, 68, 70, 72],
  },
  {
    id: "completion",
    label: "Completion rate",
    value: "67%",
    delta: "+4.2%",
    deltaUp: true,
    prior: "62.8% prior",
    spark: [58, 59, 60, 61, 62, 63, 64, 65, 65, 66, 66, 67],
  },
];

const secondaryMetrics = [
  { label: "Social referrals", value: "9.4K", delta: "+22%", note: "X · LinkedIn · Direct" },
  { label: "Newsletter CTR", value: "3.8%", delta: "+0.6%", note: "Editorial digest" },
  { label: "Pages / session", value: "2.4", delta: "+0.3", note: "Cross-article depth" },
  { label: "Return reader rate", value: "41%", delta: "+2.8%", note: "7-day window" },
];

const topStories = [
  { rank: 1, title: "Texas Capital Is Moving On-Chain", section: "Texas Business", views: 28400, read: "5m 02s", shares: 412, completion: 72, trend: "+14%" },
  { rank: 2, title: "Federal Reserve Digital Dollar", section: "Finance", views: 24100, read: "4m 48s", shares: 388, completion: 68, trend: "+11%" },
  { rank: 3, title: "Sovereign Wealth Funds in Tokenized Assets", section: "Markets", views: 19700, read: "3m 55s", shares: 301, completion: 61, trend: "+9%" },
  { rank: 4, title: "Dallas Crypto Hedge Fund Collapse", section: "Investigations", views: 16200, read: "6m 11s", shares: 276, completion: 74, trend: "+6%" },
];

const channels = [
  { name: "Organic search", pct: 38, sessions: "54.3K", color: "#6a5843" },
  { name: "Direct", pct: 27, sessions: "38.6K", color: "#8d6f4d" },
  { name: "Social", pct: 18, sessions: "25.7K", color: "#a6896a" },
  { name: "Newsletter", pct: 11, sessions: "15.7K", color: "#c8b698" },
  { name: "Referral", pct: 6, sessions: "8.6K", color: "#dcd0b8" },
];

const readDepth = [
  { band: "0–25%", pct: 8 },
  { band: "25–50%", pct: 14 },
  { band: "50–75%", pct: 21 },
  { band: "75–100%", pct: 67 },
];

function formatViews(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function Sparkline({ points, className }: { points: number[]; className?: string }) {
  const w = 88;
  const h = 28;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((p - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={clsx("h-7 w-[88px]", className)} aria-hidden>
      <polyline fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" points={coords.join(" ")} />
    </svg>
  );
}

function TrendChart({ data }: { data: number[] }) {
  const w = 720;
  const h = 160;
  const pad = { top: 8, right: 8, bottom: 24, left: 36 };
  const innerW = w - pad.left - pad.right;
  const innerH = h - pad.top - pad.bottom;
  const max = Math.max(...data);
  const min = Math.min(...data) * 0.85;
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = pad.left + (i / (data.length - 1)) * innerW;
    const y = pad.top + innerH - ((v - min) / range) * innerH;
    return { x, y, v };
  });

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `${points.map((p) => `${p.x},${p.y}`).join(" ")} ${pad.left + innerW},${pad.top + innerH} ${pad.left},${pad.top + innerH}`;

  const yTicks = [min, min + range * 0.5, max].map((v) => Math.round(v));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-full w-full" role="img" aria-label="Impression trend over 30 days">
      {yTicks.map((tick, i) => {
        const y = pad.top + innerH - ((tick - min) / range) * innerH;
        return (
          <g key={tick}>
            <line x1={pad.left} y1={y} x2={pad.left + innerW} y2={y} stroke="#bca882" strokeOpacity={0.35} strokeWidth="1" />
            <text x={pad.left - 6} y={y + 3} textAnchor="end" className="fill-[#786347] text-[9px] font-robinhood">
              {tick}K
            </text>
          </g>
        );
      })}
      {[0, 7, 14, 21, 29].map((day) => {
        const x = pad.left + (day / (data.length - 1)) * innerW;
        return (
          <text key={day} x={x} y={h - 4} textAnchor="middle" className="fill-[#786347] text-[9px] font-robinhood">
            {day === 0 ? "Apr 24" : day === 29 ? "May 23" : `+${day}d`}
          </text>
        );
      })}
      <polygon points={area} fill="#8d6f4d" fillOpacity={0.12} />
      <polyline fill="none" stroke="#8d6f4d" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" points={line} />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="3.5" fill="#8d6f4d" />
    </svg>
  );
}

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>{children}</div>
  );
}

export default function NewsroomAnalyticsPage() {
  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      {/* Header + command bar */}
      <div className="mb-6">
        <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
          ← Back to newsroom
        </Link>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.28em]", deskPaper.inkLabel)}>
              Business intelligence · Editorial desk
            </div>
            <h1 className={clsx("mt-1 font-cormorant text-4xl", deskPaper.inkHeading)}>Engagement Analytics</h1>
            <p className={clsx("mt-2 max-w-3xl font-robinhood text-sm leading-relaxed", deskPaper.inkBody)}>
              Full-spectrum impression data, read-depth signals, referral mix, and byline performance across the editorial desk.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-desk-green opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-desk-green" />
            </span>
            <span className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.inkMeta)}>Live · Updated 2m ago</span>
          </div>
        </div>

        <div className={clsx("mt-5 flex flex-wrap items-center gap-2 rounded-md border px-3 py-2.5", deskPaper.border, deskPaper.pageAlt)}>
          {["Last 30 days", "All sections", "Compare prior period"].map((filter, i) => (
            <button
              key={filter}
              type="button"
              className={clsx(
                "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                i === 0 ? clsx(deskPaper.borderStrong, "bg-[#f2e6d1]", deskPaper.inkHeading) : clsx(deskPaper.border, deskPaper.inkMeta, deskPaper.hover)
              )}
            >
              {filter}
            </button>
          ))}
          <div className={clsx("mx-1 hidden h-4 w-px sm:block", deskPaper.divider)} />
          <button
            type="button"
            className={clsx(
              "rounded border px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider",
              deskPaper.border,
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Export CSV
          </button>
          <span className={clsx("ml-auto font-robinhood text-[10px] tabular-nums", deskPaper.inkMeta)}>Reporting window · Apr 24 – May 23, 2026</span>
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {kpiMetrics.map((m) => (
          <div key={m.id} className={clsx("rounded-md border p-4", deskPaper.card)}>
            <div className="flex items-start justify-between gap-2">
              <PanelLabel>{m.label}</PanelLabel>
              <Sparkline points={m.spark} className={deskPaper.accent} />
            </div>
            <div className={clsx("mt-2 font-robinhood text-2xl font-semibold tabular-nums", deskPaper.inkHeading)}>{m.value}</div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <span className={clsx("font-robinhood text-[11px] tabular-nums", m.deltaUp ? "text-desk-green" : "text-red-600")}>{m.delta}</span>
              <span className={clsx("font-robinhood text-[10px] tabular-nums", deskPaper.inkMeta)}>{m.prior}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary KPI strip */}
      <div className={clsx("mb-6 grid gap-px overflow-hidden rounded-md border sm:grid-cols-2 xl:grid-cols-4", deskPaper.border)}>
        {secondaryMetrics.map((m) => (
          <div key={m.label} className={clsx("flex items-center justify-between gap-4 px-4 py-3", deskPaper.pageAlt)}>
            <div>
              <div className={clsx("font-robinhood text-[9px] uppercase tracking-[0.18em]", deskPaper.inkLabel)}>{m.label}</div>
              <div className={clsx("mt-1 font-robinhood text-lg font-medium tabular-nums", deskPaper.inkHeading)}>{m.value}</div>
            </div>
            <div className="text-right">
              <div className="font-robinhood text-[11px] tabular-nums text-desk-green">{m.delta}</div>
              <div className={clsx("mt-0.5 font-robinhood text-[10px]", deskPaper.inkMeta)}>{m.note}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <section className={clsx("mb-6 rounded-md border p-5", deskPaper.card)}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <PanelLabel>Impression trend</PanelLabel>
            <div className={clsx("mt-1 font-robinhood text-[13px]", deskPaper.inkBody)}>Daily impressions · 30-day rolling window</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 bg-[#8d6f4d]" />
              <span className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>Current period</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-0.5 w-4 border-t border-dashed border-[#bca882]" />
              <span className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>Prior period</span>
            </div>
          </div>
        </div>
        <div className="h-40 w-full">
          <TrendChart data={impressionTrend} />
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Ranked stories table */}
        <section className={clsx("overflow-hidden rounded-md border", deskPaper.card)}>
          <div className="border-b border-[#bca882]/35 px-5 py-4">
            <PanelLabel>Top performing stories</PanelLabel>
            <div className={clsx("mt-1 font-robinhood text-[12px]", deskPaper.inkMeta)}>Ranked by impressions · current reporting window</div>
          </div>
          <div className={clsx("hidden grid-cols-[32px_1.4fr_0.7fr_0.6fr_0.6fr_0.5fr_0.5fr_56px] gap-2 border-b px-4 py-2 lg:grid", deskPaper.border, deskPaper.pageAlt)}>
            {["#", "Story", "Section", "Views", "Avg read", "Shares", "Complete", "Δ"].map((h) => (
              <div key={h} className={clsx("font-robinhood text-[9px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
                {h}
              </div>
            ))}
          </div>
          {topStories.map((row, index) => (
            <div
              key={row.rank}
              className={clsx(
                "grid grid-cols-1 gap-2 border-b px-4 py-3 last:border-b-0 lg:grid-cols-[32px_1.4fr_0.7fr_0.6fr_0.6fr_0.5fr_0.5fr_56px] lg:items-center lg:gap-2",
                index % 2 === 0 ? "bg-[#f2e6d1]" : "bg-[#ebe0cc]",
                deskPaper.border
              )}
            >
              <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.accent)}>{row.rank}</div>
              <div className={clsx("font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>{row.title}</div>
              <div className={clsx("font-robinhood text-[10px] uppercase tracking-wide lg:block", deskPaper.inkMeta)}>{row.section}</div>
              <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{formatViews(row.views)}</div>
              <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{row.read}</div>
              <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{row.shares}</div>
              <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{row.completion}%</div>
              <div className="font-robinhood text-[11px] tabular-nums text-desk-green">{row.trend}</div>
            </div>
          ))}
        </section>

        <div className="space-y-6">
          {/* Channel mix */}
          <section className={clsx("rounded-md border p-5", deskPaper.card)}>
            <PanelLabel>Traffic by channel</PanelLabel>
            <div className={clsx("mt-1 mb-4 font-robinhood text-[12px]", deskPaper.inkMeta)}>Session attribution · 142.8K total</div>

            <div className="mb-4 flex h-3 overflow-hidden rounded-sm">
              {channels.map((c) => (
                <div key={c.name} style={{ width: `${c.pct}%`, backgroundColor: c.color }} title={`${c.name} ${c.pct}%`} />
              ))}
            </div>

            <div className="space-y-2">
              {channels.map((c) => (
                <div key={c.name} className="grid grid-cols-[10px_1fr_48px_56px] items-center gap-2">
                  <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: c.color }} />
                  <span className={clsx("font-robinhood text-[11px]", deskPaper.inkBody)}>{c.name}</span>
                  <span className={clsx("text-right font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{c.sessions}</span>
                  <span className={clsx("text-right font-robinhood text-[11px] font-medium tabular-nums", deskPaper.inkHeading)}>{c.pct}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Read depth distribution */}
          <section className={clsx("rounded-md border p-5", deskPaper.card)}>
            <PanelLabel>Read depth distribution</PanelLabel>
            <div className={clsx("mt-1 mb-4 font-robinhood text-[12px]", deskPaper.inkMeta)}>Scroll depth bands · all stories</div>
            <div className="space-y-3">
              {readDepth.map((band) => (
                <div key={band.band}>
                  <div className="mb-1 flex justify-between">
                    <span className={clsx("font-robinhood text-[11px]", deskPaper.inkBody)}>{band.band}</span>
                    <span className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkHeading)}>{band.pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-sm bg-[#dcd0b8]">
                    <div className="h-full rounded-sm bg-[#6a5843]" style={{ width: `${band.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

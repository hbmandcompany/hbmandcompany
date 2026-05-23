"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";

const metrics = [
  { label: "Total impressions", value: "142.8K", delta: "+18.4%", period: "Last 30 days" },
  { label: "Unique readers", value: "38.2K", delta: "+12.1%", period: "Last 30 days" },
  { label: "Avg read time", value: "4m 12s", delta: "+0:34", period: "Across all bylines" },
  { label: "Completion rate", value: "67%", delta: "+4.2%", period: "Scroll depth 80%+" },
  { label: "Social referrals", value: "9.4K", delta: "+22%", period: "X · LinkedIn · Direct" },
  { label: "Newsletter CTR", value: "3.8%", delta: "+0.6%", period: "Editorial digest" },
];

const topStories = [
  { title: "Texas Capital Is Moving On-Chain", views: "28.4K", read: "5m 02s", share: "412" },
  { title: "Federal Reserve Digital Dollar", views: "24.1K", read: "4m 48s", share: "388" },
  { title: "Sovereign Wealth Funds in Tokenized Assets", views: "19.7K", read: "3m 55s", share: "301" },
  { title: "Dallas Crypto Hedge Fund Collapse", views: "16.2K", read: "6m 11s", share: "276" },
];

const channels = [
  { name: "Organic search", pct: 38 },
  { name: "Direct", pct: 27 },
  { name: "Social", pct: 18 },
  { name: "Newsletter", pct: 11 },
  { name: "Referral", pct: 6 },
];

export default function NewsroomAnalyticsPage() {
  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
            ← Back to newsroom
          </Link>
          <h1 className={clsx("mt-3 font-cormorant text-4xl", deskPaper.inkHeading)}>Engagement Analytics</h1>
          <p className={clsx("mt-2 max-w-2xl font-robinhood text-sm", deskPaper.inkBody)}>
            Full-spectrum impression data, read-depth signals, referral mix, and byline performance across the editorial desk.
          </p>
        </div>
        <div className={clsx("rounded-md px-4 py-2 font-robinhood text-[11px] uppercase tracking-wider", deskPaper.card, deskPaper.inkMeta)}>
          Live · Updated 2m ago
        </div>
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className={clsx("rounded-md p-5", deskPaper.card)}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>{m.label}</div>
            <div className={clsx("mt-2 font-robinhood text-3xl font-semibold", deskPaper.inkHeading)}>{m.value}</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-robinhood text-[12px] text-desk-green">{m.delta}</span>
              <span className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>{m.period}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
        <section className={clsx("rounded-md p-6", deskPaper.card)}>
          <div className={clsx("mb-6 font-robinhood text-[11px] uppercase tracking-[0.24em]", deskPaper.inkLabel)}>
            Top performing stories
          </div>
          <div className="space-y-3">
            {topStories.map((s, i) => (
              <div key={s.title} className={clsx("flex items-center gap-4 rounded-md p-4", deskPaper.panelRaised)}>
                <div className={clsx("w-8 font-cormorant text-xl", deskPaper.accent)}>{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <div className={clsx("truncate font-cormorant text-lg", deskPaper.inkHeading)}>{s.title}</div>
                  <div className={clsx("mt-1 font-robinhood text-[11px]", deskPaper.inkMeta)}>
                    {s.views} views · {s.read} avg read · {s.share} shares
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={clsx("rounded-md p-6", deskPaper.card)}>
          <div className={clsx("mb-6 font-robinhood text-[11px] uppercase tracking-[0.24em]", deskPaper.inkLabel)}>
            Traffic by channel
          </div>
          <div className="space-y-4">
            {channels.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex justify-between">
                  <span className={clsx("font-robinhood text-[12px]", deskPaper.inkBody)}>{c.name}</span>
                  <span className={clsx("font-robinhood text-[12px]", deskPaper.inkHeading)}>{c.pct}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#dcd0b8]">
                  <div className="h-full rounded-full bg-[#8d6f4d]" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { clsx } from "clsx";
import { deskPaper } from "@/components/desk/desk-paper";
import { DeskEmptyState } from "@/components/desk/DeskEmptyState";
import { countWords } from "@/components/desk/desk-article-mappers";
import type { Article } from "@/lib/supabase/types";

function PanelLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>{children}</div>
  );
}

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function groupCount(articles: Article[], key: (a: Article) => string | null) {
  const map = new Map<string, number>();
  for (const article of articles) {
    const value = key(article)?.trim() || "Unassigned";
    map.set(value, (map.get(value) ?? 0) + 1);
  }
  return Array.from(map.entries()).sort((a, b) => b[1] - a[1]);
}

export default function AnalyticsClient({ articles }: { articles: Article[] }) {
  const totalPublished = articles.length;
  const byWeight = groupCount(articles, (a) => a.weight);
  const bySection = groupCount(articles, () => "Desk");
  const latest = articles[0]?.published_at ?? null;
  const topStories = articles.slice(0, 10);

  if (articles.length === 0) {
    return (
      <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
        <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
          ← Back to newsroom
        </Link>
        <h1 className={clsx("mt-3 font-cormorant text-4xl", deskPaper.inkHeading)}>Engagement Analytics</h1>
        <div className="mt-12">
          <DeskEmptyState title="No published articles yet." subtitle="Analytics will populate once stories are published." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-6">
        <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
          ← Back to newsroom
        </Link>
        <div className="mt-3">
          <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.28em]", deskPaper.inkLabel)}>
            Editorial desk · Published corpus
          </div>
          <h1 className={clsx("mt-1 font-cormorant text-4xl", deskPaper.inkHeading)}>Engagement Analytics</h1>
          <p className={clsx("mt-2 max-w-3xl font-robinhood text-sm leading-relaxed", deskPaper.inkBody)}>
            Real counts from published articles in Supabase — weight mix, section filing, and recent publication activity.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className={clsx("rounded-md border p-4", deskPaper.card)}>
          <PanelLabel>Total published</PanelLabel>
          <div className={clsx("mt-2 font-robinhood text-2xl font-semibold tabular-nums", deskPaper.inkHeading)}>{totalPublished}</div>
        </div>
        <div className={clsx("rounded-md border p-4", deskPaper.card)}>
          <PanelLabel>By weight</PanelLabel>
          <div className="mt-2 space-y-1">
            {byWeight.slice(0, 4).map(([label, count]) => (
              <div key={label} className="flex justify-between font-robinhood text-[12px]">
                <span className={deskPaper.inkBody}>{label}</span>
                <span className={clsx("tabular-nums", deskPaper.inkHeading)}>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={clsx("rounded-md border p-4", deskPaper.card)}>
          <PanelLabel>By section</PanelLabel>
          <div className="mt-2 space-y-1">
            {bySection.map(([label, count]) => (
              <div key={label} className="flex justify-between font-robinhood text-[12px]">
                <span className={deskPaper.inkBody}>{label}</span>
                <span className={clsx("tabular-nums", deskPaper.inkHeading)}>{count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={clsx("rounded-md border p-4", deskPaper.card)}>
          <PanelLabel>Latest article</PanelLabel>
          <div className={clsx("mt-2 font-robinhood text-lg tabular-nums", deskPaper.inkHeading)}>{formatDate(latest)}</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <section className={clsx("rounded-md border p-5", deskPaper.card)}>
          <PanelLabel>Weight breakdown</PanelLabel>
          <div className="mt-4 space-y-3">
            {byWeight.map(([label, count]) => {
              const pct = totalPublished ? Math.round((count / totalPublished) * 100) : 0;
              return (
                <div key={label}>
                  <div className="mb-1 flex justify-between font-robinhood text-[11px]">
                    <span className={deskPaper.inkBody}>{label}</span>
                    <span className={deskPaper.inkHeading}>{count} · {pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-sm bg-[#dcd0b8]">
                    <div className="h-full rounded-sm bg-[#6a5843]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className={clsx("rounded-md border p-5", deskPaper.card)}>
          <PanelLabel>Section breakdown</PanelLabel>
          <div className="mt-4 space-y-3">
            {bySection.map(([label, count]) => {
              const pct = totalPublished ? Math.round((count / totalPublished) * 100) : 0;
              return (
                <div key={label}>
                  <div className="mb-1 flex justify-between font-robinhood text-[11px]">
                    <span className={deskPaper.inkBody}>{label}</span>
                    <span className={deskPaper.inkHeading}>{count} · {pct}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-sm bg-[#dcd0b8]">
                    <div className="h-full rounded-sm bg-[#8d6f4d]" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className={clsx("mt-6 overflow-hidden rounded-md border", deskPaper.card)}>
        <div className={clsx("border-b px-5 py-4", deskPaper.border)}>
          <PanelLabel>Recently published</PanelLabel>
          <div className={clsx("mt-1 font-robinhood text-[12px]", deskPaper.inkMeta)}>Top 10 by publication date</div>
        </div>
        <div className={clsx("hidden grid-cols-[1.4fr_0.7fr_0.6fr_0.7fr] gap-2 border-b px-4 py-2 lg:grid", deskPaper.border, deskPaper.pageAlt)}>
          {["Story", "Section", "Words", "Published"].map((h) => (
            <div key={h} className={clsx("font-robinhood text-[9px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
              {h}
            </div>
          ))}
        </div>
        {topStories.map((row, index) => (
          <div
            key={row.id}
            className={clsx(
              "grid grid-cols-1 gap-2 border-b px-4 py-3 last:border-b-0 lg:grid-cols-[1.4fr_0.7fr_0.6fr_0.7fr] lg:items-center",
              index % 2 === 0 ? "bg-[#f2e6d1]" : "bg-[#ebe0cc]",
              deskPaper.border,
            )}
          >
            <div className={clsx("font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>{row.title}</div>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-wide", deskPaper.inkMeta)}>Desk</div>
            <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>
              {countWords(row.body).toLocaleString()}
            </div>
            <div className={clsx("font-robinhood text-[12px] tabular-nums", deskPaper.inkBody)}>{formatDate(row.published_at)}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

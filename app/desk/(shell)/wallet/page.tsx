"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { IconSearch } from "@/components/desk/desk-icons";
import type { DeskStatusTone } from "@/components/desk/StatusPill";

type ArticlePayout = {
  id: string;
  headline: string;
  section: string;
  published: string;
  baseRate: string;
  bonus: string;
  total: string;
  week: string;
  status: "Paid" | "Pending" | "In review";
  tone: DeskStatusTone;
};

const articlePayouts: ArticlePayout[] = [
  {
    id: "a1",
    headline: "The Federal Reserve's Digital Dollar and What It Means for Stablecoin Operators",
    section: "Finance",
    published: "—",
    baseRate: "$850",
    bonus: "—",
    total: "$850",
    week: "May 19 – 25",
    status: "Pending",
    tone: "amber",
  },
  {
    id: "a2",
    headline: "Inside the Collapse of a Dallas-Based Crypto Hedge Fund",
    section: "Investigations",
    published: "—",
    baseRate: "$990",
    bonus: "—",
    total: "$990",
    week: "May 19 – 25",
    status: "In review",
    tone: "blue",
  },
  {
    id: "a3",
    headline: "Texas Capital Is Moving On-Chain and the State Knows It",
    section: "Texas Business",
    published: "May 12",
    baseRate: "$720",
    bonus: "$90",
    total: "$810",
    week: "May 12 – 18",
    status: "Paid",
    tone: "green",
  },
  {
    id: "a4",
    headline: "How Municipal Governments Are Experimenting With Blockchain-Based Toll Systems",
    section: "Infrastructure",
    published: "May 3",
    baseRate: "$880",
    bonus: "$100",
    total: "$980",
    week: "May 5 – 11",
    status: "Paid",
    tone: "green",
  },
];

const ARTICLE_PAGE_SIZE = 3;

const bankDeposits = [
  { id: "b1", label: "Weekly payout", amount: "+$810.00", date: "May 16, 2026", status: "Posted", tone: "green" as const },
  { id: "b2", label: "Weekly payout", amount: "+$980.00", date: "May 9, 2026", status: "Posted", tone: "green" as const },
  { id: "b3", label: "View bonus", amount: "+$90.00", date: "May 9, 2026", status: "Posted", tone: "green" as const },
];

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
        {title}
      </span>
      <div className={clsx("h-px flex-1", deskPaper.divider)} />
    </div>
  );
}

function matchesArticleSearch(row: ArticlePayout, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [row.headline, row.section, row.published, row.week, row.status, row.total]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export default function DeskWalletPage() {
  const { user } = useDesk();
  const firstName = user.name.split(" ")[0] ?? user.name;
  const [articlePage, setArticlePage] = useState(0);
  const [articleSearch, setArticleSearch] = useState("");

  const filteredArticles = useMemo(
    () => articlePayouts.filter((row) => matchesArticleSearch(row, articleSearch)),
    [articleSearch]
  );

  const articlePageCount = Math.max(1, Math.ceil(filteredArticles.length / ARTICLE_PAGE_SIZE));
  const safeArticlePage = Math.min(articlePage, articlePageCount - 1);
  const pageArticles = useMemo(
    () => filteredArticles.slice(safeArticlePage * ARTICLE_PAGE_SIZE, safeArticlePage * ARTICLE_PAGE_SIZE + ARTICLE_PAGE_SIZE),
    [filteredArticles, safeArticlePage]
  );

  function handleArticleSearch(value: string) {
    setArticleSearch(value);
    setArticlePage(0);
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] px-6 py-8">
      <div className="mb-8">
        <h1 className={clsx("font-cormorant text-4xl", deskPaper.inkHeading)}>Wallet</h1>
        <p className={clsx("mt-2 max-w-2xl font-robinhood text-sm", deskPaper.inkBody)}>
          {firstName}&apos;s byline earnings — payout per article and weekly disbursements.
        </p>
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-stretch">
        <section className={clsx("flex min-h-0 flex-col rounded-md p-5", deskPaper.card)}>
          <div className="mb-4 flex items-center gap-3">
            <span className={clsx("shrink-0 font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
              Article payouts
            </span>
            <div className={clsx("h-px flex-1", deskPaper.divider)} />
            <div className="relative w-full max-w-[200px]">
              <IconSearch className={clsx("pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2", deskPaper.inkLabel)} />
              <input
                type="search"
                value={articleSearch}
                onChange={(e) => handleArticleSearch(e.target.value)}
                placeholder="Quick search…"
                aria-label="Search article payouts"
                className={clsx(
                  "h-8 w-full rounded-md border pl-8 pr-2 font-robinhood text-[11px] outline-none transition-colors",
                  deskPaper.input
                )}
              />
            </div>
          </div>
          <div className={clsx("overflow-hidden rounded-md border", deskPaper.border, "bg-[#f2e6d1]")}>
            <div
              className={clsx(
                "hidden grid-cols-[1.4fr_0.7fr_0.6fr_0.6fr_0.5fr_0.6fr_0.7fr_100px] gap-2 border-b px-3 py-2 lg:grid",
                deskPaper.border,
                deskPaper.pageAlt
              )}
            >
              {["Article", "Section", "Published", "Base", "Bonus", "Total", "Week", "Status"].map((h) => (
                <div key={h} className={clsx("font-robinhood text-[9px] uppercase tracking-[0.16em]", deskPaper.inkLabel)}>
                  {h}
                </div>
              ))}
            </div>
            {pageArticles.length === 0 ? (
              <div className={clsx("px-4 py-8 text-center font-robinhood text-[12px]", deskPaper.inkMeta)}>
                No articles match your search.
              </div>
            ) : (
              pageArticles.map((row, index) => (
              <div
                key={row.id}
                className={clsx(
                  "grid grid-cols-1 gap-2 border-b px-3 py-3 lg:grid-cols-[1.4fr_0.7fr_0.6fr_0.6fr_0.5fr_0.6fr_0.7fr_100px] lg:items-center lg:gap-2",
                  index === pageArticles.length - 1 ? "border-b-0" : deskPaper.border,
                  "bg-[#f2e6d1] hover:bg-[#ebe0cc]"
                )}
              >
                <div className={clsx("line-clamp-2 font-robinhood text-[12px] font-medium leading-snug", deskPaper.inkHeading)}>
                  {row.headline}
                </div>
                <div className={clsx("font-robinhood text-[11px] uppercase tracking-wide", deskPaper.inkMeta)}>{row.section}</div>
                <div className={clsx("font-robinhood text-[12px]", deskPaper.inkBody)}>{row.published}</div>
                <div className={clsx("font-robinhood text-[12px]", deskPaper.inkBody)}>{row.baseRate}</div>
                <div className={clsx("font-robinhood text-[12px]", deskPaper.inkMeta)}>{row.bonus}</div>
                <div className={clsx("font-robinhood text-[12px] font-medium", deskPaper.inkHeading)}>{row.total}</div>
                <div className={clsx("font-robinhood text-[11px]", deskPaper.inkMeta)}>{row.week}</div>
                <div>
                  <PaperStatusPill label={row.status} tone={row.tone} />
                </div>
              </div>
            ))
            )}
          </div>

          <div className={clsx("mt-auto flex items-center justify-between border-t pt-3", deskPaper.border)}>
            <button
              type="button"
              disabled={safeArticlePage === 0}
              onClick={() => setArticlePage((p) => Math.max(0, p - 1))}
              className={clsx(
                "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
                deskPaper.inkMeta,
                deskPaper.hover
              )}
            >
              Prev
            </button>
            <span className={clsx("font-robinhood text-[10px]", deskPaper.inkLabel)}>
              {safeArticlePage + 1} / {articlePageCount}
            </span>
            <button
              type="button"
              disabled={safeArticlePage >= articlePageCount - 1}
              onClick={() => setArticlePage((p) => Math.min(articlePageCount - 1, p + 1))}
              className={clsx(
                "rounded px-2 py-1 font-robinhood text-[10px] uppercase tracking-wider disabled:opacity-30",
                deskPaper.inkMeta,
                deskPaper.hover
              )}
            >
              Next
            </button>
          </div>
        </section>

        <section className={clsx("rounded-md p-5", deskPaper.card)}>
          <SectionHeading title="Banking" />

          <div className={clsx("rounded-md border p-5", deskPaper.border, "bg-[#f2e6d1]")}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.22em]", deskPaper.inkLabel)}>
                  Available balance
                </div>
                <div className={clsx("mt-2 font-robinhood text-3xl font-semibold tabular-nums", deskPaper.inkHeading)}>
                  $2,430.00
                </div>
              </div>
              <PaperStatusPill label="Active" tone="green" />
            </div>

            <div className={clsx("mt-5 grid gap-3 border-t pt-4 sm:grid-cols-2", deskPaper.border)}>
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Account holder</div>
                <div className={clsx("mt-1 font-robinhood text-[13px]", deskPaper.inkHeading)}>{user.name}</div>
              </div>
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Institution</div>
                <div className={clsx("mt-1 font-robinhood text-[13px]", deskPaper.inkBody)}>Editorial Payroll · Partner Bank</div>
              </div>
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Account</div>
                <div className={clsx("mt-1 font-robinhood text-[13px] tabular-nums", deskPaper.inkBody)}>Checking ·••• 4821</div>
              </div>
              <div>
                <div className={clsx("font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Routing</div>
                <div className={clsx("mt-1 font-robinhood text-[13px] tabular-nums", deskPaper.inkBody)}>•••• 9021</div>
              </div>
            </div>

            <div className={clsx("mt-4 flex flex-wrap gap-2 border-t pt-4", deskPaper.border)}>
              <span className={clsx("rounded-full border px-3 py-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.border, deskPaper.inkMeta)}>
                ACH deposits
              </span>
              <span className={clsx("rounded-full border px-3 py-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.border, deskPaper.inkMeta)}>
                Weekly · Fridays
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className={clsx("mb-2 font-robinhood text-[10px] uppercase tracking-[0.18em]", deskPaper.inkLabel)}>
              Recent deposits
            </div>
            <div className="space-y-1">
              {bankDeposits.map((deposit) => (
                <div
                  key={deposit.id}
                  className={clsx(
                    "flex items-center justify-between gap-3 rounded-md border px-3 py-2.5",
                    deskPaper.border,
                    "bg-[#f2e6d1] hover:bg-[#ebe0cc]"
                  )}
                >
                  <div>
                    <div className={clsx("font-robinhood text-[12px]", deskPaper.inkHeading)}>{deposit.label}</div>
                    <div className={clsx("font-robinhood text-[10px]", deskPaper.inkMeta)}>{deposit.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-robinhood text-[13px] tabular-nums text-desk-green">{deposit.amount}</span>
                    <PaperStatusPill label={deposit.status} tone={deposit.tone} className="scale-90" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

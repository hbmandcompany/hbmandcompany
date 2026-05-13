"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

type Volume = {
  id: string;
  title: string;
  category: "Core" | "Governance" | "Treasury" | "Infrastructure" | "Support";
  audience: "Operators" | "Finance" | "Governance" | "Developers";
  summary: string;
  chapters: readonly string[];
  issues: readonly string[];
};

const volumes: readonly Volume[] = [
  {
    id: "vol-i",
    title: "Volume I — Foundational Architecture",
    category: "Core",
    audience: "Developers",
    summary:
      "System boundaries, application surfaces, ownership model, and the shared operating assumptions that hold the HBM stack together.",
    chapters: [
      "Platform topology",
      "Shared components and release flow",
      "Repository structure and change control",
      "Environment and deployment assumptions",
    ],
    issues: ["Where do I start reading the stack?", "How is the codebase organized?", "Which system owns which function?"],
  },
  {
    id: "vol-ii",
    title: "Volume II — Governance Mechanics",
    category: "Governance",
    audience: "Governance",
    summary:
      "Proposal formats, quorum rules, execution windows, voting thresholds, and the operational life cycle of capital decisions.",
    chapters: [
      "Proposal intake and drafting",
      "Voting rights and thresholds",
      "Execution clocks and settlement windows",
      "Archival record and audit surfaces",
    ],
    issues: ["How are votes counted?", "What happens after a proposal passes?", "How do we audit a prior decision?"],
  },
  {
    id: "vol-iii",
    title: "Volume III — Treasury & Capital Routing",
    category: "Treasury",
    audience: "Finance",
    summary:
      "Treasury posture, reserve logic, payout sequencing, and how capital is routed after governance approval.",
    chapters: [
      "Reserve structure",
      "Payment scheduling and treasury controls",
      "Yield and operating liquidity",
      "Reconciliation and reporting",
    ],
    issues: ["When does money move?", "How are payouts scheduled?", "How do we reconcile treasury activity?"],
  },
  {
    id: "vol-iv",
    title: "Volume IV — Infrastructure & Reliability",
    category: "Infrastructure",
    audience: "Operators",
    summary:
      "Hosting, observability, incident response, failover assumptions, chain-facing services, and continuity planning.",
    chapters: [
      "Runtime surfaces",
      "Monitoring and alerting",
      "Failover and recovery",
      "Operational checklists",
    ],
    issues: ["What breaks first?", "How do we recover a service?", "Where do infrastructure alerts route?"],
  },
  {
    id: "vol-v",
    title: "Volume V — Common Issues & Support Cases",
    category: "Support",
    audience: "Operators",
    summary:
      "Structured answers for common operator questions, user problems, permissions issues, and general infrastructure confusion.",
    chapters: [
      "Access and permissions",
      "Wallet and signing issues",
      "Proposal state confusion",
      "Reporting and documentation lookups",
    ],
    issues: ["Why can’t I see a proposal?", "Why didn’t a scheduled action execute?", "How do I resolve a permissions error?"],
  },
] as const;

const filters = ["All", "Core", "Governance", "Treasury", "Infrastructure", "Support"] as const;

export default function DocumentationContent() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return volumes.filter((volume) => {
      const matchesFilter = activeFilter === "All" || volume.category === activeFilter;
      const haystack = [
        volume.title,
        volume.summary,
        volume.category,
        volume.audience,
        ...volume.chapters,
        ...volume.issues,
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = q.length === 0 || haystack.includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <div className="min-h-screen bg-[#0d0d10] text-cream">
      <NavBar />

      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4rem)] md:px-12 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#111114] via-[#0d0d10] to-black px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.48)] md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-30" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-12">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.34em] text-gold/55">Documentation</p>
              <h1 className="mt-4 max-w-5xl font-cormorant text-[2.4rem] font-light leading-[1.01] tracking-[-0.04em] text-cream/[0.94] md:text-[3.8rem]">
                A library for the stack,
                {" "}
                <span className="font-semibold italic text-gold/62">organized like it expects to be used.</span>
              </h1>
              <p className="mt-6 max-w-4xl text-pretty font-luxury-sans text-[1.02rem] leading-[1.86] text-silver-dim/74 md:text-[1.12rem]">
                This is the public documentation room: volumes, infrastructure references, governance procedures, and
                support-ready answers for common issues. Search the library, filter by domain, and move from problem to
                source without wandering through noise.
              </p>
            </div>

            <aside className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-6">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Library controls</p>
              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-2 block font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">
                    Search volumes
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search governance, treasury, issues, infrastructure..."
                    className="w-full rounded-xl border border-white/[0.12] bg-black/40 px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-gold/35"
                  />
                </label>

                <div>
                  <span className="mb-2 block font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">
                    Filter by domain
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`rounded-full border px-3 py-1.5 font-mono-hbm text-[8px] uppercase tracking-[0.16em] transition-colors ${
                          activeFilter === filter
                            ? "border-gold/35 bg-gold/10 text-gold/80"
                            : "border-white/[0.12] text-silver-dim/70 hover:bg-white/[0.05]"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="border-t border-white/[0.08] pt-4 text-sm leading-relaxed text-silver-dim/72">
                  {filtered.length} volume{filtered.length === 1 ? "" : "s"} currently match this view.
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-12 grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-6">
            {filtered.map((volume) => (
              <article
                key={volume.id}
                className="rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-b from-obsidian/80 to-void/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">
                      {volume.category} · {volume.audience}
                    </p>
                    <h2 className="mt-3 font-cormorant text-[1.85rem] font-semibold leading-snug text-cream/90">
                      {volume.title}
                    </h2>
                  </div>
                  <div className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-silver-dim/72">
                    {volume.chapters.length} chapters
                  </div>
                </div>

                <p className="mt-5 max-w-4xl text-[1rem] leading-[1.9] text-silver-dim/74">{volume.summary}</p>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
                  <div>
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">Volume contents</p>
                    <ul className="mt-3 grid gap-3">
                      {volume.chapters.map((chapter) => (
                        <li
                          key={chapter}
                          className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm leading-relaxed text-silver-dim/72"
                        >
                          {chapter}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">
                      Common issues addressed
                    </p>
                    <ul className="mt-3 space-y-3">
                      {volume.issues.map((issue) => (
                        <li key={issue} className="border-l border-gold/30 pl-4 text-sm leading-relaxed text-silver-dim/72">
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Suggested paths</p>
              <div className="mt-4 space-y-3">
                {[
                  "New operator? Start with Foundational Architecture, then Infrastructure & Reliability.",
                  "Handling proposal confusion? Go straight to Governance Mechanics.",
                  "Tracing money movement? Read Treasury & Capital Routing before support tickets.",
                ].map((item) => (
                  <p key={item} className="text-sm leading-relaxed text-silver-dim/72">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-b from-obsidian/80 to-void/95 p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Elsewhere in the house</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Governance", href: "/governance" },
                  { label: "Investor Relations", href: "/investor-relations" },
                  { label: "Ethereum", href: "/ethereum" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] px-4 py-3 font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-silver-dim/72 transition-colors hover:bg-white/[0.04]"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <FooterDark />
    </div>
  );
}

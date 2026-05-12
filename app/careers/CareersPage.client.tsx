"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

function parseLocalYmd(ymd: string): Date {
  const [y, m, d] = ymd.split("-").map((n) => Number.parseInt(n, 10));
  return new Date(y, m - 1, d);
}

function HiringCalendarModal({
  highlight,
  open,
  onClose,
}: {
  highlight: Date;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const y = highlight.getFullYear();
  const m = highlight.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const mark = highlight.getDate();
  const labels = ["S", "M", "T", "W", "T", "F", "S"] as const;
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const heading = highlight.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const longDate = highlight.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-void/70 backdrop-blur-sm"
        aria-label="Close calendar"
        onClick={onClose}
      />
      <div
        className="relative z-[71] w-full max-w-[280px] rounded-2xl border border-white/[0.12] bg-obsidian/95 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.65)] backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="hiring-cal-title"
      >
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <p id="hiring-cal-title" className="font-mono-hbm text-[8px] uppercase tracking-[0.32em] text-gold/50">
              Posting reference
            </p>
            <p className="mt-2 font-cormorant text-2xl font-light text-cream/90">{heading}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 font-mono-hbm text-[10px] uppercase tracking-[0.2em] text-silver-dim/45 transition-colors hover:bg-white/[0.06] hover:text-cream/80"
            aria-label="Close"
          >
            Esc
          </button>
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {labels.map((L, i) => (
            <div key={`w-${i}`} className="flex h-7 items-center justify-center font-mono-hbm text-[8px] uppercase tracking-[0.12em] text-silver-dim/40">
              {L}
            </div>
          ))}
          {cells.map((day, i) => (
            <div key={`c-${i}`} className="flex h-8 items-center justify-center">
              {day === null ? null : (
                <span
                  className={[
                    "flex h-7 w-7 items-center justify-center rounded-lg font-mono-hbm text-[11px] tabular-nums",
                    day === mark
                      ? "bg-gold/15 text-gold/90 ring-1 ring-gold/40"
                      : "text-silver-dim/55",
                  ].join(" ")}
                >
                  {day}
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-5 border-t border-white/[0.06] pt-4 font-mono-hbm text-[10px] leading-[1.6] text-silver-dim/60">
          {longDate}
        </p>
      </div>
    </div>
  );
}

/* ─── Data ─── */

type Department = "All" | "Engineering" | "Design" | "Research" | "Product" | "Operations";

interface Job {
  id: string;
  title: string;
  department: Exclude<Department, "All">;
  type: "Full-Time" | "Part-Time" | "Contract";
  location: string;
  level: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const jobs: Job[] = [
  /* ── Engineering ── */
  {
    id: "eng-01",
    title: "Protocol Engineer",
    department: "Engineering",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Write, audit, and ship smart contracts across EVM-compatible networks. You'll work directly on the infrastructure layer — protocols, vaults, governance mechanisms — that underpins the HBM portfolio.",
    responsibilities: [
      "Author and deploy Solidity contracts on mainnet and L2 (Base, Arbitrum, Optimism)",
      "Contribute to internal audit processes and formal verification tooling",
      "Document system architecture and upgrade paths with precision",
      "Participate in protocol governance research and threat modeling",
    ],
    requirements: [
      "Working knowledge of Solidity and the EVM execution model",
      "Familiarity with Foundry or Hardhat testing frameworks",
      "Understanding of common DeFi primitives (AMMs, lending, vaults)",
      "Strong written communication — our code review culture is thorough",
    ],
  },
  {
    id: "eng-02",
    title: "Full-Stack Engineer — App Portfolio",
    department: "Engineering",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Build across our consumer and institutional app suite — BlackLetter, ThreeWiseMen, 52PickUp, and MoneyBagg. You'll own full features from schema to deployed UI in a Next.js-first stack.",
    responsibilities: [
      "Develop and maintain Next.js applications across the HBM product portfolio",
      "Integrate on-chain reads (wagmi, viem, ethers) and REST/GraphQL data sources",
      "Build clean, dark-mode UI with strong typographic discipline",
      "Own CI/CD pipeline health for the apps you ship",
    ],
    requirements: [
      "Solid Next.js / React and TypeScript fundamentals",
      "Experience with Tailwind CSS or a comparable utility-first CSS system",
      "Comfort reading smart contract ABIs and working with blockchain explorers",
      "Attention to performance — we measure bundle size and Core Web Vitals",
    ],
  },
  {
    id: "eng-03",
    title: "iOS Engineer — Observability",
    department: "Engineering",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Work on LightRain — our read-only iOS intelligence app built on Base. You'll shape a Bloomberg Terminal-style experience in SwiftUI, powered by Swift Charts, GraphQL, and WebSocket feeds from the PIOL oracle.",
    responsibilities: [
      "Build and maintain SwiftUI views for real-time on-chain data display",
      "Implement Swift Charts visualizations for risk and analytics panels",
      "Manage WebSocket connections and GraphQL subscriptions with reliability",
      "Collaborate on the PIOL oracle integration for off-chain data bridging",
    ],
    requirements: [
      "Proficiency in Swift and SwiftUI",
      "Familiarity with Swift Charts or comparable charting on iOS",
      "Experience with WebSocket or real-time data in mobile contexts",
      "Clean, modular code style — this is an institutional-grade product",
    ],
  },
  {
    id: "eng-04",
    title: "Data & Analytics Engineer",
    department: "Engineering",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Own the data layer across our analytics infrastructure — Snowflake for risk/analytics pipelines and MongoDB for operational state. You'll feed the dashboards and oracles that make our apps authoritative.",
    responsibilities: [
      "Design and maintain ELT pipelines from on-chain and off-chain sources into Snowflake",
      "Model risk and yield datasets consumed by LightRain and 52PickUp",
      "Maintain MongoDB schemas for operational app state across the portfolio",
      "Partner with engineering to surface actionable metrics to product surfaces",
    ],
    requirements: [
      "Working knowledge of SQL and a cloud data warehouse (Snowflake preferred)",
      "Comfort with Python or dbt for pipeline orchestration",
      "Understanding of blockchain data formats (logs, traces, decoded ABI events)",
      "Precision in data modeling — bad data here has real-money consequences",
    ],
  },
  /* ── Design ── */
  {
    id: "des-01",
    title: "Product Designer",
    department: "Design",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Design across a portfolio spanning institutional document signing, DeFi yield discovery, crypto gifting, and on-chain observability. Each product has a distinct tone — your job is to hold that identity while building rigorous, usable interfaces.",
    responsibilities: [
      "Own end-to-end design for features across BlackLetter, 52PickUp, and ThreeWiseMen",
      "Produce high-fidelity Figma files and interactive prototypes for engineering handoff",
      "Define and maintain component libraries consistent with each product's visual language",
      "Run lightweight usability evaluations and translate findings into product decisions",
    ],
    requirements: [
      "Strong Figma proficiency — component-level and auto-layout fluency",
      "Portfolio demonstrating typographic discipline and dark-mode UI craft",
      "Ability to design for information density without visual clutter",
      "Baseline understanding of how web3 products differ in trust and state requirements",
    ],
  },
  {
    id: "des-02",
    title: "Brand & Motion Designer",
    department: "Design",
    type: "Contract",
    location: "Remote",
    level: "Associate",
    description:
      "Shape the visual language of HBM & Company and its sub-brands — from mark refinement to motion that lives in the browser and on social. You'll work where luxury restraint meets cryptographic seriousness.",
    responsibilities: [
      "Develop and extend brand identity guidelines for HBM and portfolio products",
      "Create motion assets for web (CSS/Framer/Lottie) and social channels",
      "Produce press and media kit materials on request",
      "Maintain typographic and color system coherence across all touchpoints",
    ],
    requirements: [
      "Strong portfolio showing brand and motion work — not just UI",
      "Experience in After Effects, Figma, or equivalent motion tooling",
      "Appreciation for restraint — we do not decorate, we deliberate",
      "Ability to work asynchronously with clear creative briefs and minimal revision cycles",
    ],
  },
  /* ── Research ── */
  {
    id: "res-01",
    title: "On-Chain Research Analyst",
    department: "Research",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Produce the signal that informs treasury positions and protocol allocations. You'll track DeFi protocol mechanics, governance events, yield dynamics, and risk vectors across the chains where HBM operates.",
    responsibilities: [
      "Publish internal research briefs on protocol health, TVL trends, and governance outcomes",
      "Model yield opportunities for 52PickUp's discovery surface",
      "Monitor on-chain risk signals that feed the LightRain analytics layer",
      "Maintain a living database of protocol risk ratings across our covered universe",
    ],
    requirements: [
      "Demonstrated ability to read and interpret on-chain data (Dune, Nansen, or equivalent)",
      "Working knowledge of DeFi primitives — lending, liquidity, staking, governance",
      "Clear written communication — research that cannot be read is not research",
      "Intellectual rigor: we cite sources, we show methodology, we update when wrong",
    ],
  },
  {
    id: "res-02",
    title: "Risk & Compliance Analyst",
    department: "Research",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Map the regulatory and operational risk landscape across our portfolio. You'll synthesize global digital asset regulatory developments, draft internal compliance frameworks, and support treasury risk reporting.",
    responsibilities: [
      "Track legislative and regulatory developments across US, EU, and APAC jurisdictions",
      "Produce risk matrices for new product deployments and protocol integrations",
      "Assist with AML/KYC framework documentation and vendor due diligence",
      "Draft quarterly risk disclosure updates in coordination with legal counsel",
    ],
    requirements: [
      "Background in finance, law, or a related analytical discipline",
      "Familiarity with digital asset regulatory frameworks (MiCA, SEC guidance, CFTC)",
      "Meticulous attention to detail — a missed clause here is consequential",
      "Comfort operating in jurisdictional ambiguity with principled judgment",
    ],
  },
  /* ── Product ── */
  {
    id: "prd-01",
    title: "Associate Product Manager",
    department: "Product",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Help define what we build and why. You'll work across our app portfolio — from the utilitarian (MoneyBagg, LightRain) to the ceremonial (ThreeWiseMen, BlackLetter) — ensuring each product solves a real problem with appropriate tone.",
    responsibilities: [
      "Write detailed product specifications and acceptance criteria for engineering",
      "Conduct competitive landscape analysis for each product vertical",
      "Own the roadmap coordination between research, design, and engineering",
      "Synthesize user feedback into prioritized product improvements",
    ],
    requirements: [
      "Structured thinking — you write crisp PRDs, not vague aspirations",
      "Genuine curiosity about crypto-native user behavior and on-chain UX patterns",
      "Ability to hold product vision while adapting to technical constraints",
      "Experience shipping at least one product from concept to live — any context counts",
    ],
  },
  /* ── Operations ── */
  {
    id: "ops-01",
    title: "Protocol Operations Associate",
    department: "Operations",
    type: "Full-Time",
    location: "Remote — US",
    level: "Associate",
    description:
      "Keep the operational layer running — validator health, treasury execution, protocol integrations, and internal tooling. This is the role for someone who thrives in the unglamorous precision work that makes everything else possible.",
    responsibilities: [
      "Monitor validator node health and uptime across covered networks",
      "Execute treasury rebalancing and protocol interactions under defined procedures",
      "Maintain internal runbooks and incident response playbooks",
      "Coordinate operational timelines with engineering for protocol upgrades and migrations",
    ],
    requirements: [
      "Comfort with CLI tools and cloud infrastructure basics (AWS or GCP)",
      "Ability to remain composed under time-sensitive operational conditions",
      "Methodical documentation habits — if it is not written, it did not happen",
      "Interest in validator economics and network-level protocol behavior",
    ],
  },
];

const departments: Department[] = ["All", "Engineering", "Design", "Research", "Product", "Operations"];

const deptColors: Record<Exclude<Department, "All">, string> = {
  Engineering: "text-digital-80s/80",
  Design: "text-gold/80",
  Research: "text-silver/80",
  Product: "text-caramel/80",
  Operations: "text-garnet/80",
};

const deptDots: Record<Exclude<Department, "All">, string> = {
  Engineering: "bg-digital-80s/70",
  Design: "bg-gold/70",
  Research: "bg-silver/70",
  Product: "bg-caramel/70",
  Operations: "bg-garnet/70",
};

/** Set which hiring badge appears beside “Careers”. */
type HiringAvailability = "accepting" | "actively-hiring" | "not-accepting";

const HIRING_AVAILABILITY: HiringAvailability = "actively-hiring";

const hiringIndicator: Record<
  HiringAvailability,
  {
    label: string;
    dot: string;
    border: string;
    text: string;
    pulse?: boolean;
    /** ISO YYYY-MM-DD — used in the calendar modal when status is “actively hiring” (badge is clickable). */
    modalCalendarDate?: string;
  }
> = {
  accepting: {
    label: "Accepting applications",
    dot: "bg-emerald-400/90 shadow-[0_0_10px_rgba(52,211,153,0.35)]",
    border: "border-emerald-400/22",
    text: "text-emerald-200/80",
  },
  "actively-hiring": {
    label: "Actively hiring",
    pulse: true,
    dot: "bg-gold/95 shadow-[0_0_14px_rgba(234,179,85,0.4)]",
    border: "border-gold/32",
    text: "text-gold/78",
    modalCalendarDate: "2026-05-30",
  },
  "not-accepting": {
    label: "Not accepting applications",
    dot: "bg-silver-dim/50",
    border: "border-white/[0.10]",
    text: "text-silver-dim/52",
  },
};

/* ─── Component ─── */

export default function CareersPage() {
  const PAGE_SIZE = 3;
  const hiring = hiringIndicator[HIRING_AVAILABILITY];
  const isActivelyHiring = HIRING_AVAILABILITY === "actively-hiring";
  const calendarHighlight = hiring.modalCalendarDate
    ? parseLocalYmd(hiring.modalCalendarDate)
    : new Date();

  const [calendarOpen, setCalendarOpen] = useState(false);

  const [activeDept, setActiveDept] = useState<Department>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = activeDept === "All" ? jobs : jobs.filter((j) => j.department === activeDept);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.department.toLowerCase().includes(q) ||
          j.description.toLowerCase().includes(q) ||
          j.responsibilities.some((r) => r.toLowerCase().includes(q)) ||
          j.requirements.some((r) => r.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeDept, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function changePage(next: number) {
    setPage(next);
    setOpenId(null);
  }

  useEffect(() => {
    setPage(1);
  }, [activeDept, query]);

  useEffect(() => {
    if (!calendarOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setCalendarOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [calendarOpen]);

  useEffect(() => {
    if (!isActivelyHiring) setCalendarOpen(false);
  }, [isActivelyHiring]);

  return (
    <>
      <NavBar />

      <HiringCalendarModal
        highlight={calendarHighlight}
        open={isActivelyHiring && calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />

      {/* ════════════════ HERO + LISTINGS (merged — former headline anchor) ════════════════ */}
      <section className="relative min-h-[85vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0 min-h-full">
          <Image
            src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=85"
            alt=""
            fill
            className="object-cover object-center brightness-[0.28] grayscale"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/35 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/85 via-void/40 to-transparent" />
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.055]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(180,175,170,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180,175,170,0.12) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            maskImage: "radial-gradient(ellipse 90% 70% at 30% 40%, black 0%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 30% 40%, black 0%, transparent 75%)",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 z-[1] purple-bloom opacity-35" aria-hidden />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-24 pt-[calc(env(safe-area-inset-top,0px)+8rem)] md:px-12 md:pb-32">
          {/* Kicker — same vertical slot as removed headline */}
          <div className="mb-8 flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-gold/50" />
              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.44em] text-gold/60">
                Careers
              </span>
            </div>

            {isActivelyHiring ? (
              <button
                type="button"
                onClick={() => setCalendarOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={calendarOpen}
                aria-label={`${hiring.label}. Open hiring calendar reference.`}
                className={[
                  "flex items-center gap-2.5 rounded-full border bg-black/20 px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm",
                  "cursor-pointer outline-none transition-all duration-200 ease-out will-change-transform",
                  "hover:scale-[1.04] hover:border-white/[0.24] hover:bg-black/[0.28] hover:shadow-[0_8px_28px_rgba(0,0,0,0.35)]",
                  "active:scale-[0.97]",
                  "focus-visible:ring-2 focus-visible:ring-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                  hiring.border,
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 shrink-0 rounded-full transition-transform duration-200",
                    hiring.dot,
                    hiring.pulse ? "motion-safe:animate-pulse" : "",
                  ].join(" ")}
                  aria-hidden
                />
                <span className={`font-mono-hbm text-[9px] uppercase tracking-[0.22em] ${hiring.text}`}>
                  {hiring.label}
                </span>
              </button>
            ) : (
              <div
                role="status"
                aria-label={`Hiring status: ${hiring.label}`}
                className={[
                  "flex cursor-default items-center gap-2.5 rounded-full border bg-black/20 px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm",
                  "transition-all duration-200 ease-out will-change-transform",
                  "hover:scale-[1.02] hover:border-white/[0.16]",
                  hiring.border,
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 shrink-0 rounded-full",
                    hiring.dot,
                    hiring.pulse ? "motion-safe:animate-pulse" : "",
                  ].join(" ")}
                  aria-hidden
                />
                <span className={`font-mono-hbm text-[9px] uppercase tracking-[0.22em] ${hiring.text}`}>
                  {hiring.label}
                </span>
              </div>
            )}
          </div>

          {/* Search + filters */}
          <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-void/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:flex-row md:items-center md:gap-5 md:p-5">
            <div className="relative flex-1 md:max-w-sm">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-silver-dim/35"
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="search"
                placeholder="Search roles, skills, or teams…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpenId(null); }}
                className="w-full rounded-full border border-white/[0.12] bg-black/25 py-2 pl-9 pr-10 font-mono-hbm text-[10px] uppercase tracking-[0.18em] text-cream/80 placeholder-silver-dim/35 outline-none transition-colors duration-200 focus:border-gold/35 focus:bg-black/35"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-silver-dim/35 hover:text-silver-dim/60"
                  aria-label="Clear search"
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-2 md:flex-1">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => { setActiveDept(dept); setOpenId(null); }}
                  className={[
                    "rounded-full border px-3.5 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.24em] transition-all duration-300",
                    activeDept === dept
                      ? "border-gold/45 bg-gold/15 text-cream/90"
                      : "border-white/[0.12] bg-black/20 text-silver-dim/50 hover:border-white/25 hover:text-cream/75",
                  ].join(" ")}
                >
                  {dept}
                  {dept !== "All" && (
                    <span className="ml-1.5 opacity-45">
                      {jobs.filter((j) => j.department === dept).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <span className="shrink-0 font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-silver-dim/45 md:text-right">
              {filtered.length} role{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Listings */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-cormorant text-2xl font-light italic text-cream/35">
                No roles match that search.
              </p>
              <button
                type="button"
                onClick={() => { setQuery(""); setActiveDept("All"); }}
                className="mt-6 font-mono-hbm text-[9px] uppercase tracking-[0.26em] text-gold/55 hover:text-gold/85"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {paginated.map((job) => {
                  const isOpen = openId === job.id;
                  return (
                    <article
                      key={job.id}
                      className={[
                        "group relative rounded-2xl border backdrop-blur-sm transition-all duration-500",
                        isOpen
                          ? "border-gold/25 bg-obsidian/85 shadow-[0_12px_56px_rgba(0,0,0,0.65)]"
                          : "border-white/[0.08] bg-obsidian/55 hover:border-white/[0.14] hover:bg-obsidian/70",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : job.id)}
                        aria-expanded={isOpen}
                        className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 px-6 py-5 text-left md:gap-6 md:px-8 md:py-6"
                      >
                        <span className={`h-2 w-2 shrink-0 rounded-full ${deptDots[job.department]}`} />

                        <div className="flex min-w-0 items-center gap-6 md:gap-8 lg:gap-12">
                          <div className="min-w-0 shrink">
                            <p className="font-cormorant text-[1.25rem] font-light leading-tight text-cream/92 md:text-[1.45rem]">
                              {job.title}
                            </p>
                            <div className="mt-1.5 flex flex-wrap items-center gap-2.5">
                              <span className={`font-mono-hbm text-[9px] uppercase tracking-[0.24em] ${deptColors[job.department]}`}>
                                {job.department}
                              </span>
                              <span className="h-3 w-px bg-white/[0.1]" />
                              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-silver-dim/40">
                                {job.type}
                              </span>
                              <span className="h-3 w-px bg-white/[0.1]" />
                              <span className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-silver-dim/40">
                                {job.location}
                              </span>
                            </div>
                          </div>

                          {!isOpen ? (
                            <div className="relative hidden min-h-[3.25rem] min-w-0 flex-1 md:block">
                              <p className="pointer-events-none absolute inset-0 overflow-hidden text-left font-mono-hbm text-[11px] leading-[1.65] text-silver-dim/65 opacity-0 transition-opacity duration-200 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] group-hover:opacity-100 group-focus-within:opacity-100">
                                {job.description}
                              </p>
                            </div>
                          ) : null}
                        </div>

                        <span
                          className={`shrink-0 text-silver-dim/30 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </button>

                      {isOpen ? (
                        <div className="border-t border-white/[0.06] px-6 pb-10 pt-8 md:px-8">
                          <p className="mb-10 max-w-2xl font-mono-hbm text-[13px] leading-[1.9] text-silver-dim/72">
                            {job.description}
                          </p>

                          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                            <div>
                              <p className="mb-5 font-mono-hbm text-[8px] uppercase tracking-[0.36em] text-gold/45">
                                Responsibilities
                              </p>
                              <ul className="space-y-3.5">
                                {job.responsibilities.map((r, i) => (
                                  <li key={i} className="flex items-start gap-3.5">
                                    <span className="mt-[0.45em] h-px w-5 shrink-0 bg-gold/30" />
                                    <span className="font-mono-hbm text-[12px] leading-[1.85] text-silver-dim/62">{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-5 font-mono-hbm text-[8px] uppercase tracking-[0.36em] text-gold/45">
                                What we look for
                              </p>
                              <ul className="space-y-3.5">
                                {job.requirements.map((r, i) => (
                                  <li key={i} className="flex items-start gap-3.5">
                                    <span className="mt-[0.45em] h-px w-5 shrink-0 bg-white/15" />
                                    <span className="font-mono-hbm text-[12px] leading-[1.85] text-silver-dim/62">{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-white/[0.05] pt-8">
                            <Link
                              href={`/contact?role=${encodeURIComponent(job.title)}`}
                              className="garnet-btn inline-block px-8 py-2.5 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void"
                            >
                              Express interest
                            </Link>
                            <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-silver-dim/28">
                              Introductions accelerate the process.
                            </p>
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 ? (
                <div className="mt-10 flex items-center justify-between border-t border-white/[0.08] pt-8">
                  <button
                    type="button"
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                    className="flex items-center gap-2 font-mono-hbm text-[9px] uppercase tracking-[0.26em] text-silver-dim/45 transition-colors hover:text-cream/75 disabled:pointer-events-none disabled:opacity-20"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Prev
                  </button>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => changePage(i + 1)}
                        className={[
                          "h-6 min-w-[1.5rem] rounded-full px-2 font-mono-hbm text-[9px] uppercase tracking-[0.18em] transition-all duration-200",
                          page === i + 1
                            ? "bg-gold/18 text-cream/85"
                            : "text-silver-dim/35 hover:text-cream/65",
                        ].join(" ")}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => changePage(page + 1)}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 font-mono-hbm text-[9px] uppercase tracking-[0.26em] text-silver-dim/45 transition-colors hover:text-cream/75 disabled:pointer-events-none disabled:opacity-20"
                  >
                    Next
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      {/* ════════════════ FOOTER CONTENT ════════════════ */}
      <section className="relative bg-void pb-32 pt-16">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border border-white/[0.05] md:grid-cols-2">
            {[
              {
                label: "How we hire",
                body: "We don't post roles for optics. Every listing is a real gap we intend to close. Our process: a written introduction, a calibrated technical or craft exercise, and a direct conversation with the person you'd actually work with. We move deliberately and don't keep candidates waiting without reason.",
                cta: null,
              },
              {
                label: "No role that fits?",
                body: "If your craft belongs in this house but the exact match isn't here yet, send an introduction anyway. We're interested in judgment, not job description alignment.",
                cta: { label: "Send an introduction", href: "/contact" },
              },
            ].map((col, i) => (
              <div
                key={col.label}
                className={[
                  "flex flex-col gap-5 p-8 md:p-10",
                  i === 0 ? "border-b border-white/[0.05] md:border-b-0 md:border-r" : "",
                ].join(" ")}
              >
                <h3 className="font-cormorant text-2xl font-light text-cream/80">{col.label}</h3>
                <p className="font-mono-hbm text-[12px] leading-[1.9] text-silver-dim/55">{col.body}</p>
                {col.cta ? (
                  <Link
                    href={col.cta.href}
                    className="mt-auto inline-block w-fit border border-white/[0.10] px-7 py-2.5 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-cream/65 transition-all duration-300 hover:border-gold/30 hover:text-cream"
                  >
                    {col.cta.label}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterDark typography="luxury" />
    </>
  );
}

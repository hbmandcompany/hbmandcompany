import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

const disclosures = [
  {
    title: "Capital formation posture",
    detail:
      "HBM communicates as an operating house: holdings, software revenue exposure, governance posture, and reserve logic are presented as durable context rather than campaign copy.",
  },
  {
    title: "Treasury and reserve discipline",
    detail:
      "Cash, on-chain assets, and reserve commitments are framed against survivability, board readability, and the ability to withstand diligence under a cold read.",
  },
  {
    title: "Governance and accountability",
    detail:
      "Leadership cadence, decision rights, and reporting surfaces are organized so counterparties can understand who approves what, when, and under which record.",
  },
] as const;

const cadence = [
  "Periodic updates prioritize what changed, why it matters, and what remains unresolved.",
  "Capital deployment is described against scope, milestone, and accountability rather than narrative momentum.",
  "Treasury commentary is written for boards, investors, and regulators first; everyone else reads downstream from that standard.",
] as const;

const enterpriseStack = [
  {
    name: "LightRain",
    lane: "Treasury, risk, and operating telemetry",
    fit:
      "LightRain is the observability layer the house uses when reserves, wallet exposure, and on-chain operating data need to be translated into a board-readable control surface. The workflow maps cleanly to Fortune 500 treasury teams that already expect Bloomberg-, ERP-, and BI-style visibility before approving capital movement.",
    stack:
      "Read-only analytics, portfolio risk instrumentation, and PIOL-fed external context give leadership a single surveillance surface instead of fragmented chain explorers and spreadsheet stitching.",
  },
  {
    name: "MoneyBagg",
    lane: "Balance aggregation and finance operations",
    fit:
      "MoneyBagg is positioned around the same problem large enterprises face across banks, custodians, and business units: too many balances, too many ledgers, and not enough consolidated visibility. We use that stack logic where finance teams need one answer about where assets sit and how they reconcile.",
    stack:
      "Cross-chain wallet aggregation, self-custody posture, and consolidated balance reporting align with Fortune 500-style controllership disciplines around cash positioning, settlement visibility, and exception management.",
  },
  {
    name: "BlackLetter",
    lane: "Execution, approvals, and document control",
    fit:
      "BlackLetter addresses a workflow every regulated enterprise already understands: signatures, approvals, and records that must survive counsel review. Inside the house, that informs how we think about deal execution, policy acknowledgements, and controlled document flow.",
    stack:
      "Chain-of-custody execution, tamper-evident records, and premium signing posture fit naturally beside the legal, procurement, and governance systems that dominate Fortune 500 operating environments.",
  },
] as const;

const fortune500Context = [
  "We are not claiming blanket Fortune 500 deployment. The point is workflow adjacency: our software stack is built around the same control problems those enterprises already pay to solve.",
  "The house values products that can sit beside existing systems of record rather than demand a theatrical rip-and-replace event.",
  "What investors should track is not consumer virality but enterprise legibility: can the product survive treasury, legal, controllership, and board review at the same time?",
] as const;

export const metadata: Metadata = {
  title: "Investor Relations",
  description:
    "HBM & Company investor relations — institutional reporting posture, disclosure principles, treasury discipline, and governance context for long-horizon counterparties.",
  alternates: {
    canonical: "https://hbmandcompany.com/investor-relations",
  },
  openGraph: {
    title: "Investor Relations — HBM & Company",
    description: "Institutional reporting posture, disclosure principles, and treasury discipline.",
    url: "https://hbmandcompany.com/investor-relations",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM Investor Relations" }],
  },
  twitter: {
    title: "Investor Relations — HBM & Company",
    description: "Institutional reporting posture, disclosure principles, and treasury discipline.",
    images: ["/og-image.png"],
  },
};

export default function InvestorRelationsPage() {
  return (
    <div className="min-h-screen bg-void text-cream">
      <NavBar />

      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4rem)] md:px-12 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-obsidian via-void to-black px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.45)] md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-50" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(ellipse_at_top,rgba(218,165,32,0.14),transparent_62%)]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-14">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.34em] text-gold/55">Investor Relations</p>
              <h1 className="mt-4 max-w-4xl font-cormorant text-[2.3rem] font-light leading-[1.02] tracking-[-0.035em] text-cream/[0.92] md:text-[3.6rem]">
                Reporting built for
                {" "}
                <span className="font-semibold italic text-gold/60">institutional scrutiny.</span>
              </h1>
              <p className="mt-6 max-w-3xl text-pretty font-luxury-sans text-[1.02rem] leading-[1.82] text-silver-dim/72 md:text-[1.12rem]">
                This is not a marketing quarterly. It is the part of the house where scope, treasury posture,
                governance structure, and accountability are described in a form leadership can use and counterparties
                can test.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Reporting cadence", value: "Quarterly + event-driven" },
                  { label: "Reserve posture", value: "Durability first" },
                  { label: "Governance lens", value: "Board legibility" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/45">
                      {item.label}
                    </p>
                    <p className="mt-2 font-cormorant text-[1.25rem] font-semibold leading-snug text-cream/88">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-6 backdrop-blur-sm">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Disclosure practice</p>
              <ul className="mt-5 space-y-4">
                {cadence.map((item) => (
                  <li key={item} className="border-l border-gold/30 pl-4 text-sm leading-relaxed text-silver-dim/72">
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href="/newspaper"
                  className="rounded-full border border-gold/30 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-gold/70 transition-colors hover:bg-gold/10"
                >
                  Read the paper
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/75 transition-colors hover:bg-white/[0.05]"
                >
                  Contact the house
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          {disclosures.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-b from-obsidian/80 to-void/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-gold/55">{item.title}</p>
              <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-obsidian/85 via-void/95 to-black p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:gap-10">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">Enterprise software fit</p>
              <h2 className="mt-3 max-w-4xl font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.55rem]">
                How the house software stack maps onto
                {" "}
                <span className="font-semibold italic text-gold/60">Fortune 500-style workflows.</span>
              </h2>
              <p className="mt-5 max-w-3xl text-pretty text-[1rem] leading-[1.9] text-silver-dim/74">
                The operating question is not whether a large enterprise suddenly becomes chain-native in one motion.
                The question is whether our software companies solve control, reporting, and execution problems that
                already exist inside the Fortune 500. That is where we see software leverage compounding.
              </p>
            </div>

            <aside className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Important context</p>
              <ul className="mt-4 space-y-4">
                {fortune500Context.map((item) => (
                  <li key={item} className="border-l border-gold/30 pl-4 text-sm leading-relaxed text-silver-dim/72">
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            {enterpriseStack.map((item) => (
              <article
                key={item.name}
                className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{item.name}</p>
                <h3 className="mt-3 font-cormorant text-[1.55rem] font-semibold leading-snug text-cream/88">
                  {item.lane}
                </h3>
                <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{item.fit}</p>
                <p className="mt-4 border-t border-white/[0.08] pt-4 text-sm leading-[1.85] text-silver-dim/64">
                  {item.stack}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#120f10] to-[#090909] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)]">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">How we report</p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.45rem]">
                Evidence first. Explanation second.
              </h2>
              <p className="mt-5 max-w-3xl text-pretty text-[1rem] leading-[1.9] text-silver-dim/74">
                HBM reports like a house that expects its records to be re-read months later by people who were not in
                the room when the decision was made. The standard is not speed of commentary. The standard is whether
                the commentary still stands after counsel, treasury, and leadership all take a turn through it.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Useful links</p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "The Company", href: "/about" },
                  { label: "Values & Thesis", href: "/values" },
                  { label: "All Projects", href: "/treasury" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-white/[0.08] px-4 py-3 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/75 transition-colors hover:bg-white/[0.04]"
                  >
                    <span>{link.label}</span>
                    <span aria-hidden>↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <FooterDark />
    </div>
  );
}

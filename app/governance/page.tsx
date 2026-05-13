import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

const rights = [
  {
    title: "Comparable to shareholder rights",
    body:
      "Participants receive voting power the way stockholders receive voting rights: ownership and participation are tied to the right to help decide direction, capital priorities, and operational changes.",
  },
  {
    title: "Executed on-chain",
    body:
      "Instead of mailing proxies and reconciling cap-table snapshots by hand, the house expresses those rights through explicit on-chain proposals, timestamps, thresholds, and recorded outcomes.",
  },
  {
    title: "Scheduled capital motion",
    body:
      "Governance is not ceremony for its own sake. It is the operating mechanism that decides where money goes, when it moves, and under which schedule or milestone that movement is authorized.",
  },
] as const;

const process = [
  {
    step: "01",
    title: "Proposal intake",
    detail:
      "Every governance action begins as a formal proposal: objective, rationale, timing, dependencies, and expected capital motion.",
  },
  {
    step: "02",
    title: "Review window",
    detail:
      "Participants read, challenge, and amend. The point is not speed alone; it is to surface whether the decision can survive scrutiny before money moves.",
  },
  {
    step: "03",
    title: "Voting and threshold",
    detail:
      "Votes are recorded against explicit quorum and passage rules so the result reads like institutional procedure, not an informal sentiment check.",
  },
  {
    step: "04",
    title: "Execution schedule",
    detail:
      "Approved actions convert into scheduled capital flows, treasury actions, or operator tasks. Governance decides; execution follows the approved timetable.",
  },
] as const;

const analogy = [
  "Imagine two people applying for the same role. A manager reviews both, weighs the merits, and votes to hire one over the other. The decision determines where compensation, responsibility, and resources will go.",
  "The house follows the same underlying protocol, but for capital allocation. Participants review options, weigh outcomes, and vote on which proposal deserves funding, sequencing, or priority.",
  "What on-chain governance changes is efficiency: once the vote clears, money can travel according to the approved schedule without a maze of disconnected intermediaries, reconciliations, and delayed authorizations.",
] as const;

const operatingLanes = [
  {
    title: "Treasury allocation",
    body:
      "Reserve movements, protocol allocations, and working-capital decisions are routed through governance so every meaningful deployment can be traced back to an approved record.",
  },
  {
    title: "Software priorities",
    body:
      "Product resources can be allocated by proposal, allowing the stack to evolve with a record of why certain releases or integrations moved ahead of others.",
  },
  {
    title: "Risk and timing",
    body:
      "Thresholds, clocks, and conditions matter. Governance does not only say yes or no; it defines when execution should occur and under which risk posture.",
  },
] as const;

export const metadata: Metadata = {
  title: "Governance",
  description:
    "HBM governance — an immersive explanation of participant voting rights, scheduled capital flow, proposal process, and how on-chain governance parallels shareholder decision-making.",
  alternates: {
    canonical: "https://hbmandcompany.com/governance",
  },
  openGraph: {
    title: "Governance — HBM & Company",
    description: "Participant voting rights and scheduled capital flow expressed through on-chain governance.",
    url: "https://hbmandcompany.com/governance",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM Governance" }],
  },
  twitter: {
    title: "Governance — HBM & Company",
    description: "Participant voting rights and scheduled capital flow expressed through on-chain governance.",
    images: ["/og-image.png"],
  },
};

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-void text-cream">
      <NavBar />

      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4rem)] md:px-12 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_left,rgba(218,165,32,0.12),transparent_38%),linear-gradient(135deg,#0b0b0c_0%,#111018_40%,#09090c_100%)] px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.48)] md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-45" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:40px_40px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-14">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.34em] text-gold/55">Governance</p>
              <h1 className="mt-4 max-w-5xl font-cormorant text-[2.4rem] font-light leading-[1.01] tracking-[-0.04em] text-cream/[0.94] md:text-[3.8rem]">
                Voting rights for participants,
                {" "}
                <span className="font-semibold italic text-gold/62">executed like capital should move.</span>
              </h1>
              <p className="mt-6 max-w-4xl text-pretty font-luxury-sans text-[1.02rem] leading-[1.86] text-silver-dim/74 md:text-[1.12rem]">
                In ordinary public markets, shareholders vote and capital follows the corporate decision. The house
                applies the same logic on-chain: participants receive formal voting power, proposals are evaluated
                against explicit rules, and approved outcomes tell money where to travel and when to arrive.
              </p>
            </div>

            <aside className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-6 backdrop-blur-sm">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Why it matters</p>
              <div className="mt-5 space-y-4">
                {rights.map((item) => (
                  <div key={item.title} className="border-l border-gold/30 pl-4">
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-silver-dim/72">{item.body}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-obsidian/80 to-void/95 p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)]">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">Everyday analogy</p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.5rem]">
                Hiring decisions explain the protocol.
              </h2>
              <div className="mt-6 space-y-5">
                {analogy.map((paragraph) => (
                  <p key={paragraph} className="max-w-3xl text-[1rem] leading-[1.9] text-silver-dim/74">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Shareholder parallel</p>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Traditional stock", value: "Owners vote, management executes, capital follows the corporate decision." },
                  { label: "HBM governance", value: "Participants vote, smart execution follows, and capital travels on the approved schedule." },
                  { label: "Efficiency gain", value: "Less administrative drag between decision and movement of money." },
                ].map((item) => (
                  <div key={item.label} className="border-b border-white/[0.08] pb-4 last:border-b-0 last:pb-0">
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-silver-dim/72">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 xl:grid-cols-4">
          {process.map((item) => (
            <article
              key={item.step}
              className="rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-b from-obsidian/80 to-void/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{item.step}</p>
              <h3 className="mt-3 font-cormorant text-[1.55rem] font-semibold leading-snug text-cream/88">{item.title}</h3>
              <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-gold/[0.12] bg-gradient-to-br from-black to-[#0d0a0a] p-6 md:p-8">
          <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">Operating lanes</p>
          <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.4rem]">
            Governance is how the house schedules money.
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {operatingLanes.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{item.title}</p>
                <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/documentation"
              className="rounded-full border border-gold/30 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-gold/70 transition-colors hover:bg-gold/10"
            >
              Read Documentation
            </Link>
            <Link
              href="/investor-relations"
              className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/76 transition-colors hover:bg-white/[0.05]"
            >
              Investor Relations
            </Link>
          </div>
        </section>
      </main>

      <FooterDark />
    </div>
  );
}

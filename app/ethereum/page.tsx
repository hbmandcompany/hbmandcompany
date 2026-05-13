import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

const topLineStats = [
  { label: "Internal ETH-chain platform value", value: "$58.4M" },
  { label: "On-chain treasury & reserve assets", value: "$18.6M" },
  { label: "Software stack internal mark", value: "$31.2M" },
  { label: "Annualized earnings power", value: "$6.9M" },
] as const;

const valuationBridge = [
  {
    title: "Ethereum treasury assets",
    amount: "$18.6M",
    body:
      "ETH, stables, liquid staking exposure, and reserve balances marked as operating treasury rather than speculative float. This is the balance-sheet layer that can already be defended under ordinary treasury review.",
  },
  {
    title: "Software stack mark",
    amount: "$31.2M",
    body:
      "Internal mark assigned to the owned application estate — observability, wallet aggregation, execution, document control, discovery surfaces, and supporting orchestration — valued as productive software infrastructure rather than marketing collateral.",
  },
  {
    title: "Repository and delivery estate",
    amount: "$8.6M",
    body:
      "The codebase, issue history, CI workflows, release cadence, documentation spine, and reusable component system are treated as an earning asset. In public-market language, this is the development platform and product moat; on-chain, it is the machinery that keeps shipping.",
  },
  {
    title: "Less operating liabilities",
    amount: "($4.2M)",
    body:
      "Vendor commitments, infrastructure obligations, retained compliance and counsel costs, and working-capital assumptions netted against the software and treasury marks.",
  },
] as const;

const balanceSheet = {
  assets: [
    { label: "ETH, stables, LSTs & operating treasury", value: "$18.6M" },
    { label: "Owned software stack mark", value: "$31.2M" },
    { label: "Repository / release / documentation estate", value: "$8.6M" },
    { label: "Distribution, brand, and operating workflows", value: "$4.2M" },
  ],
  liabilities: [
    { label: "Infrastructure, vendors, and hosting obligations", value: "$1.3M" },
    { label: "Compliance, legal, and reporting reserve", value: "$1.1M" },
    { label: "Working-capital and retained operating costs", value: "$1.8M" },
  ],
  equityLabel: "Modeled ETH-chain net asset value",
  equityValue: "$59.8M",
} as const;

const earningsDrivers = [
  {
    title: "Software operating leverage",
    body:
      "The stack compounds because shipped product surfaces can be extended without linearly rebuilding the organization. Each release increases the value of the same code estate across treasury, reporting, and operator workflows.",
    value: "$3.1M",
    note: "Modeled normalized software contribution",
  },
  {
    title: "Treasury carry and protocol-aligned yield",
    body:
      "Ethereum-native treasury positions create income through staking, stablecoin deployment, and controlled carry programs. The point is not chasing every basis point; it is pairing treasury durability with repeatable earnings.",
    value: "$2.4M",
    note: "Modeled annualized yield contribution",
  },
  {
    title: "Execution and intelligence services",
    body:
      "Read-only analytics, governance visibility, and document-grade controls create a service layer that could be monetized the way traditional software vendors monetize workflow, insight, and compliance surfaces.",
    value: "$1.4M",
    note: "Modeled recurring service contribution",
  },
] as const;

const enterpriseUse = [
  {
    name: "LightRain",
    fit: "Board-grade Ethereum observability",
    detail:
      "Translated into Wall Street language, LightRain is the surveillance terminal for Ethereum-native operations: reserve movement, risk concentration, wallet-level telemetry, and external context in one operating pane.",
  },
  {
    name: "MoneyBagg",
    fit: "Treasury and controllership consolidation",
    detail:
      "MoneyBagg behaves like a crypto-era treasury workstation. It closes the distance between multi-wallet reality and the single consolidated balance view that CFOs, controllers, and operators actually need.",
  },
  {
    name: "BlackLetter",
    fit: "Execution, signatures, and permanent records",
    detail:
      "BlackLetter gives the stack a controlled-document and approval layer. In a traditional public company that function lives in legal tech and enterprise signatures; on-chain it becomes part of the operating trust fabric.",
  },
] as const;

const publicMarketLens = [
  {
    label: "Traditional stock lens",
    value: "Equity value framed through revenue multiple, public comps, and narrative around operating margin expansion.",
  },
  {
    label: "HBM Ethereum lens",
    value: "Value framed through treasury NAV, productive code estate, repository depth, operator tooling, and the earnings power of Ethereum-native infrastructure.",
  },
  {
    label: "Why the difference matters",
    value: "A stock certificate values the corporation abstractly. This page values the Ethereum business as an operating machine already holding treasury, code, and revenue-capable workflow on the chain itself.",
  },
] as const;

export const metadata: Metadata = {
  title: "Ethereum",
  description:
    "HBM & Company on Ethereum — an immersive issuer-style view of treasury, software stack value, internal balance-sheet logic, and Ethereum-native earnings power for a decentralized private business.",
  alternates: {
    canonical: "https://hbmandcompany.com/ethereum",
  },
  openGraph: {
    title: "Ethereum — HBM & Company",
    description: "Issuer-style analysis of HBM's Ethereum treasury, software stack, and internal business value model.",
    url: "https://hbmandcompany.com/ethereum",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM on Ethereum" }],
  },
  twitter: {
    title: "Ethereum — HBM & Company",
    description: "Issuer-style analysis of HBM's Ethereum treasury, software stack, and internal business value model.",
    images: ["/og-image.png"],
  },
};

export default function EthereumPage() {
  return (
    <div className="min-h-screen bg-void text-cream">
      <NavBar />

      <main className="mx-auto max-w-[1440px] px-6 pb-24 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4rem)] md:px-12 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]">
        <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_right,rgba(218,165,32,0.18),transparent_38%),linear-gradient(135deg,#0b0b0c_0%,#0d1016_40%,#09090b_100%)] px-6 py-10 shadow-[0_40px_120px_rgba(0,0,0,0.48)] md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-35" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-14">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.34em] text-gold/55">Ethereum</p>
              <h1 className="mt-4 max-w-5xl font-cormorant text-[2.4rem] font-light leading-[1.01] tracking-[-0.04em] text-cream/[0.94] md:text-[3.8rem]">
                The Ethereum portfolio as
                {" "}
                <span className="font-semibold italic text-gold/62">a decentralized private business.</span>
              </h1>
              <p className="mt-6 max-w-4xl text-pretty font-luxury-sans text-[1.02rem] leading-[1.86] text-silver-dim/74 md:text-[1.12rem]">
                This page treats HBM on Ethereum the way Morningstar or a Wall Street analyst might treat a listed
                operating company, with one difference: the business is modeled as an on-chain machine. Treasury, code,
                product surfaces, repositories, and delivery cadence are valued together as a decentralized software
                house rather than as a ticker detached from its rails.
              </p>
              <p className="mt-5 max-w-4xl rounded-2xl border border-gold/[0.14] bg-white/[0.03] px-5 py-4 text-sm leading-[1.8] text-silver-dim/68">
                Figures below are an internal, unaudited valuation framework for editorial and investor-relations use.
                They are not a public filing, fairness opinion, or offer to buy or sell securities.
              </p>
            </div>

            <aside className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-6 backdrop-blur-sm">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">At a glance</p>
              <div className="mt-5 grid gap-4">
                {topLineStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                  >
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/45">
                      {item.label}
                    </p>
                    <p className="mt-2 font-cormorant text-[1.5rem] font-semibold leading-snug text-cream/90">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-12 grid gap-6 xl:grid-cols-4">
          {valuationBridge.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.5rem] border border-white/[0.08] bg-gradient-to-b from-obsidian/80 to-void/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{item.title}</p>
              <p className="mt-3 font-cormorant text-[2rem] font-semibold leading-none text-cream/90">{item.amount}</p>
              <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#120f10] to-[#090909] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">Internal balance sheet</p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.55rem]">
                An Ethereum-native view of platform net worth.
              </h2>
              <p className="mt-5 max-w-3xl text-pretty text-[1rem] leading-[1.9] text-silver-dim/74">
                The comparison to Wall Street is useful only if it clarifies the mechanics. Traditional stocks wrap an
                operating company in a security and let the market infer what the machinery is worth. Here, we mark the
                machinery directly: treasury, software stack, release estate, and working capital carried on the chain
                and around it.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Valuation lens</p>
              <div className="mt-4 space-y-4">
                {publicMarketLens.map((item) => (
                  <div key={item.label} className="border-l border-gold/30 pl-4">
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/44">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-silver-dim/72">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-gold/55">Assets</p>
              <div className="mt-4 space-y-3">
                {balanceSheet.assets.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-3 last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm leading-relaxed text-silver-dim/74">{row.label}</p>
                    <p className="shrink-0 font-mono-hbm text-[10px] uppercase tracking-[0.14em] text-cream/88">
                      {row.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-gold/55">Liabilities & equity</p>
              <div className="mt-4 space-y-3">
                {balanceSheet.liabilities.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-3"
                  >
                    <p className="text-sm leading-relaxed text-silver-dim/74">{row.label}</p>
                    <p className="shrink-0 font-mono-hbm text-[10px] uppercase tracking-[0.14em] text-cream/88">
                      {row.value}
                    </p>
                  </div>
                ))}
                <div className="flex items-start justify-between gap-4 pt-2">
                  <p className="text-sm font-medium leading-relaxed text-cream/85">{balanceSheet.equityLabel}</p>
                  <p className="shrink-0 font-cormorant text-[1.6rem] font-semibold leading-none text-gold/70">
                    {balanceSheet.equityValue}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-obsidian/80 to-void/95 p-6 md:p-8">
          <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">How the stack makes money</p>
          <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.5rem]">
            Propensity to earn is embedded in the operating fabric.
          </h2>
          <div className="mt-8 grid gap-6 xl:grid-cols-3">
            {earningsDrivers.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{item.title}</p>
                <p className="mt-3 font-cormorant text-[1.8rem] font-semibold leading-none text-cream/90">{item.value}</p>
                <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{item.body}</p>
                <p className="mt-4 border-t border-white/[0.08] pt-4 font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-silver-dim/44">
                  {item.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#100f13] via-[#0b0b11] to-[#090909] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">Software stack offering</p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.4rem]">
                Product surfaces that can survive enterprise review.
              </h2>
              <p className="mt-5 max-w-3xl text-[1rem] leading-[1.9] text-silver-dim/74">
                The worth of the Ethereum business is not just what the treasury holds. It is what the stack can do for
                operators who need treasury visibility, wallet consolidation, execution control, and permanent records.
                That is why the software estate deserves its own line item instead of being treated as overhead.
              </p>
            </div>

            <div className="grid gap-5">
              {enterpriseUse.map((item) => (
                <article
                  key={item.name}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{item.name}</p>
                  <h3 className="mt-3 font-cormorant text-[1.35rem] font-semibold leading-snug text-cream/88">
                    {item.fit}
                  </h3>
                  <p className="mt-4 text-sm leading-[1.85] text-silver-dim/72">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-gold/[0.12] bg-gradient-to-br from-black to-[#0d0a0a] p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
            <div>
              <p className="font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55">Repository estate</p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-light leading-tight text-cream/88 md:text-[2.4rem]">
                GitHub, delivery history, and release discipline are part of the asset base.
              </h2>
              <p className="mt-5 max-w-3xl text-[1rem] leading-[1.9] text-silver-dim/74">
                In public markets, investors often treat engineering history as an implied multiple hidden inside the
                equity. Here we break it out directly. The repository estate carries replacement cost, institutional
                memory, deployable components, issue history, documentation, and the practical ability to keep shipping.
                Whether mirrored into internal Git-based operating flows or maintained on GitHub, that estate has real
                economic value because it reduces time-to-revenue and lowers the cost of future product expansion.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-5">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Modeled repo contribution</p>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Code replacement cost", value: "$4.1M" },
                  { label: "Release & CI estate", value: "$1.9M" },
                  { label: "Docs / issue history / operating memory", value: "$1.4M" },
                  { label: "Distribution and developer moat", value: "$1.2M" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-3 last:border-b-0 last:pb-0">
                    <p className="text-sm leading-relaxed text-silver-dim/72">{item.label}</p>
                    <p className="shrink-0 font-mono-hbm text-[10px] uppercase tracking-[0.14em] text-cream/88">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/investor-relations"
              className="rounded-full border border-gold/30 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-gold/70 transition-colors hover:bg-gold/10"
            >
              Investor Relations
            </Link>
            <Link
              href="/treasury"
              className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/76 transition-colors hover:bg-white/[0.05]"
            >
              Treasury
            </Link>
            <Link
              href="/work"
              className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/76 transition-colors hover:bg-white/[0.05]"
            >
              Portfolio
            </Link>
          </div>
        </section>
      </main>

      <FooterDark />
    </div>
  );
}

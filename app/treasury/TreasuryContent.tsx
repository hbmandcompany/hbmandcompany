"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";

const marqueeItems = [
  "Coverage",
  "Underwriting",
  "Book-building",
  "Settlement",
  "NAV discipline",
  "Governance",
  "Liquidity",
  "Counterparty",
  "Risk budget",
  "Attestation",
];

const phases = [
  {
    num: "I",
    title: "Coverage & mandate",
    subtitle: "Where banking meets the chain",
    body:
      "Every treasury position begins as a coverage decision: which markets, which rails, which counterparties deserve our name on the wire. We define mandate bands the way a desk defines sector limits — not as suggestions, but as binding guardrails for principal risk.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=88",
    imageAlt: "Trading floor screens and charts",
  },
  {
    num: "II",
    title: "Underwriting & diligence",
    subtitle: "Data room discipline, on-chain",
    body:
      "Protocol exposure is underwritten like a syndicated facility: smart-contract review, economic stress paths, dependency mapping, and legal opinion where the instrument touches regulated custody. Nothing clears the committee without a written thesis and a signed risk budget.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=88",
    imageAlt: "Documents and analysis",
  },
  {
    num: "III",
    title: "Book-building & allocation",
    subtitle: "Order, size, and priority",
    body:
      "Liquidity is allocated across wallets and venues with the same sequencing logic as a book-building window: priority to settlement certainty, then to carry efficiency, then to strategic governance rights. We do not chase flow — we build the book we are willing to defend in a drawdown.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=88",
    imageAlt: "Data visualization",
  },
  {
    num: "IV",
    title: "Execution & syndication",
    subtitle: "Settlement-grade finality",
    body:
      "Execution is monitored block-by-block: slippage tolerances, MEV-aware routing where applicable, and post-trade reconciliation to the general ledger. When we participate with external desks, terms are documented like a syndicate — roles, fees, and information rights are explicit before a single wei moves.",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=88",
    imageAlt: "Abstract digital network",
  },
  {
    num: "V",
    title: "Surveillance & reporting",
    subtitle: "The balance sheet never sleeps",
    body:
      "Ongoing surveillance mirrors covenant monitoring: NAV marks, staking yields, protocol upgrades, and governance calendars feed a single risk dashboard. Reporting to internal stakeholders uses the same vocabulary we expect from investment banking — variance, concentration, liquidity ladder, and scenario narratives.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=88",
    imageAlt: "Financial planning",
  },
];

const rails = [
  {
    title: "Counterparty & KYC",
    body:
      "On- and off-ramp relationships are vetted at onboarding; limits scale with attestation quality. We treat stablecoin issuers and custodians as rated counterparties, not interchangeable APIs.",
  },
  {
    title: "Liquidity ladder",
    body:
      "Mandated buckets for same-day settlement, 7-day liquidity, and long-duration carry — rebalanced on a schedule, not on sentiment. Stress tests assume correlated drawdowns across ETH, LSTs, and majors.",
  },
  {
    title: "Governance & ops",
    body:
      "Votes and validator operations are budgeted like operating expenses: time, reputation, and slashing risk are priced before we delegate. Treasury and protocol ops share one operating committee.",
  },
];

const standards = [
  {
    title: "One ledger",
    body:
      "ETH, liquid staking tokens, and stables roll into a single consolidated view — marks, accruals, and P&L — not a patchwork of wallets and spreadsheets.",
  },
  {
    title: "Yield with a thesis",
    body:
      "Carry programs are approved with a written view on duration, smart-contract surface, and exit liquidity. No anonymous farms; no undisclosed leverage.",
  },
  {
    title: "Institutional tone",
    body:
      "We speak the language of investment banking when we describe our own books: mandate, concentration, covenants, and surveillance — because counterparties deserve clarity.",
  },
];

export default function TreasuryContent() {
  return (
    <>
      <NavBar />

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-screen flex-col justify-end pb-16 pt-28 md:pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1920&q=90"
            alt=""
            fill
            className="object-cover object-center grayscale"
            priority
            unoptimized
          />
          <div className="grain-overlay-hero" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-void/70 via-void/45 to-void" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/35 to-void/70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 75% 70% at 40% 45%, transparent 25%, rgba(2,2,5,0.75) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 hero-glow opacity-80" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="mb-6">
            <span className="inline-block border border-gold/25 bg-void/40 px-3 py-1.5 font-mono-hbm text-[10px] uppercase tracking-[0.35em] text-gold/55 backdrop-blur-sm">
              Treasury — Principal balance sheet
            </span>
          </div>

          <h1 className="mb-8 leading-[0.9] tracking-tight">
            <span className="block font-cormorant text-[clamp(3.2rem,11vw,9rem)] font-light text-cream/95">
              The art of
            </span>
            <span className="block font-cormorant text-[clamp(3.2rem,11vw,9rem)] font-semibold italic text-gradient-gold">
              holding risk well.
            </span>
          </h1>

          <p className="max-w-xl font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.28em] text-silver/50">
            Mandate · diligence · execution · surveillance — the same cadence as a bulge-bracket
            financing desk, applied to digital asset treasury and protocol-aligned capital.
          </p>

          <div className="mt-8 flex max-w-xl flex-col gap-4 sm:mt-10 md:flex-row md:flex-wrap md:items-center">
            <Link
              href="/acquire-hbm"
              className="garnet-btn inline-block px-9 py-3.5 text-center font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void transition-[box-shadow] duration-500 [box-shadow:0_12px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.12)] hover:[box-shadow:0_18px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.14),0_0_48px_rgba(180,175,170,0.07)]"
            >
              Acquire HBM
            </Link>
            <p className="font-mono-hbm text-[9px] uppercase leading-relaxed tracking-[0.2em] text-silver-dim/45 md:max-w-[14rem]">
              Platform currency — participate on our rails or buy via the linked venue.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 right-10 z-10 hidden flex-col items-center gap-2 md:flex">
          <span className="font-mono-hbm text-[9px] uppercase tracking-[0.3em] text-silver-dim/35">
            Scroll
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-gold/35 to-transparent" />
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="overflow-hidden border-y border-white/[0.04] bg-charcoal/40 py-3">
        <div className="flex animate-marquee gap-0 whitespace-nowrap">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="inline-flex items-center gap-8 px-8">
                {marqueeItems.map((label) => (
                  <span key={`${i}-${label}`} className="inline-flex items-center gap-8">
                    <span className="font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/45">
                      {label}
                    </span>
                    <span className="inline-block h-3 w-px bg-gold/20" />
                  </span>
                ))}
              </span>
            ))}
        </div>
      </div>

      {/* ═══ EDITORIAL — THE DESK ═══ */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="pointer-events-none absolute inset-0 purple-bloom opacity-50" aria-hidden />
        <SectionReveal>
          <div className="relative h-[58vh] min-h-[420px] overflow-hidden rounded-2xl md:h-[72vh]">
            <Image
              src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1800&q=88"
              alt="Institutional finance"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-void/92 via-void/55 to-void/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-2xl p-8 md:p-14">
              <span className="mb-5 inline-block border border-gold/30 px-2.5 py-1 font-mono-hbm text-[9px] uppercase tracking-[0.32em] text-gold/70">
                How we run principal risk
              </span>
              <h2 className="mb-5 font-cormorant text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.02] text-cream">
                Treasury is not a wallet.
                <br />
                <span className="font-semibold italic text-gradient-gold">It is a desk.</span>
              </h2>
              <p className="max-w-md font-mono-hbm text-[10px] uppercase leading-relaxed tracking-[0.2em] text-silver/50">
                We borrow the discipline of investment banking — coverage memos, committee minutes,
                allocation grids, and surveillance rhythms — because on-chain capital deserves the same
                seriousness as any other balance sheet.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ═══ PHASES — FULL-HEIGHT IMMERSIVE STRIPES ═══ */}
      {phases.map((phase, i) => (
        <section
          key={phase.num}
          className={`relative min-h-[88vh] overflow-hidden ${
            i % 2 === 0 ? "section-mid" : "section-dark"
          }`}
        >
          {i % 2 === 0 ? (
            <div className="pointer-events-none absolute inset-0 city-glow opacity-30" aria-hidden />
          ) : (
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `linear-gradient(rgba(180,175,170,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(180,175,170,0.05) 1px, transparent 1px)`,
                backgroundSize: "48px 48px",
              }}
              aria-hidden
            />
          )}

          <div className="relative z-10 mx-auto grid min-h-[88vh] max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 lg:gap-24">
            <SectionReveal direction={i % 2 === 0 ? "left" : "right"}>
              <div
                className={`relative aspect-[4/5] max-h-[min(72vh,640px)] w-full overflow-hidden rounded-2xl ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={phase.image}
                  alt={phase.imageAlt}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/65 via-transparent to-void/20" />
                <div className="absolute left-5 top-5 font-mono-hbm text-[10rem] font-light leading-none text-cream/[0.04] md:text-[12rem]">
                  {phase.num}
                </div>
              </div>
            </SectionReveal>

            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <SectionReveal delay={0.08}>
                <span className="mb-4 block font-mono-hbm text-[9px] uppercase tracking-[0.38em] text-gold/50">
                  Phase {phase.num}
                </span>
                <h2 className="mb-2 font-cormorant text-[clamp(2rem,3.5vw,3rem)] font-light text-cream">
                  {phase.title}
                </h2>
                <p className="mb-8 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-silver-dim/55">
                  {phase.subtitle}
                </p>
                <p className="font-mono-hbm text-[15px] leading-[1.75] text-silver/80 md:text-[16px]">
                  {phase.body}
                </p>
                <div className="mt-10 h-px w-16 bg-gradient-to-r from-gold/50 to-transparent" />
              </SectionReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ RAILS — BENTO ═══ */}
      <section className="relative border-t border-white/[0.04] py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 amber-bloom opacity-25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="mb-14 text-center">
              <span className="mb-4 block font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/45">
                Compliance & risk architecture
              </span>
              <h2 className="mx-auto max-w-3xl font-cormorant text-[clamp(2rem,4vw,3.25rem)] font-light leading-tight text-cream">
                Rails that would pass a{" "}
                <span className="font-semibold italic text-gradient-gold">credit committee.</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {rails.map((r, idx) => (
              <SectionReveal key={r.title} delay={idx * 0.08}>
                <div className="group h-full rounded-xl border border-white/[0.05] bg-void/30 p-8 transition-all duration-500 hover:border-gold/20 hover:bg-void/50">
                  <div className="mb-6 h-px w-8 bg-gold/40 transition-all duration-500 group-hover:w-14" />
                  <h3 className="mb-4 font-cormorant text-xl font-light text-cream/90 md:text-2xl">
                    {r.title}
                  </h3>
                  <p className="font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.14em] text-silver-dim/55">
                    {r.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SPLIT — NUMBERS & NARRATIVE ═══ */}
      <section className="section-dark relative overflow-hidden py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 city-glow opacity-35" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
            <SectionReveal>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl lg:sticky lg:top-28">
                <Image
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=88"
                  alt="Executive in formal setting"
                  fill
                  className="object-cover object-center grayscale"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/25 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 rounded-xl border border-white/[0.08] bg-void/55 p-6 backdrop-blur-md">
                  <p className="font-cormorant text-3xl font-light tabular-nums text-cream/90 md:text-4xl">
                    14 networks
                  </p>
                  <p className="mt-2 font-mono-hbm text-[9px] uppercase tracking-[0.25em] text-silver-dim/50">
                    Consolidated marks · daily roll-forward · committee-reviewed limits
                  </p>
                </div>
              </div>
            </SectionReveal>

            <div className="space-y-12">
              <SectionReveal delay={0.05}>
                <h2 className="font-cormorant text-[clamp(1.85rem,3.5vw,2.75rem)] font-light leading-tight text-cream">
                  From prospectus language to{" "}
                  <span className="italic font-semibold text-gradient-gold">proof of reserves.</span>
                </h2>
                <p className="mt-6 font-mono-hbm text-[15px] leading-relaxed text-silver/75">
                  Investment banking taught us that narrative without reconciliation is marketing.
                  We publish internal standards that mirror what a treasurer would demand from a
                  subsidiary: position limits, stress scenarios, and attestation cadence — whether or
                  not a regulator ever asks for them.
                </p>
                <p className="mt-5 font-mono-hbm text-[15px] leading-relaxed text-silver-dim/75">
                  When we participate in a protocol round, we document rationale like a fairness
                  opinion: valuation method, comparables, dilution path, and governance rights. When
                  we stake, we model slashing and downtime like operational risk in a loan book.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.12}>
                <div className="rounded-xl border border-digital-80s/20 bg-digital-80s/[0.04] px-6 py-5">
                  <p className="font-mono-hbm text-[12px] leading-relaxed text-silver/78">
                    <span className="text-cream/90">Nothing on this site constitutes an offer</span>{" "}
                    of securities, banking services, or investment advice. Figures are illustrative
                    unless separately attested by an independent third party.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE STANDARD ═══ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="mb-14 text-center">
              <span className="mb-4 block font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/40">
                The standard
              </span>
              <h2 className="font-cormorant text-[clamp(2rem,4vw,3.5rem)] font-light leading-[1.05] text-cream">
                Balance-sheet discipline
                <br />
                <span className="italic font-semibold text-gradient-gold">without theater.</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {standards.map((s, i) => (
              <SectionReveal key={s.title} delay={i * 0.1}>
                <div className="rounded-xl border border-white/[0.04] p-9 transition-all duration-500 hover:border-gold/18">
                  <div className="mb-7 h-px w-8 bg-gold/40" />
                  <h3 className="mb-4 font-cormorant text-xl font-light text-cream/85">{s.title}</h3>
                  <p className="font-mono-hbm text-[9px] uppercase leading-relaxed tracking-[0.15em] text-silver-dim/50">
                    {s.body}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.25}>
            <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/work"
                className="garnet-btn inline-block px-10 py-3.5 text-center font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void"
              >
                Portfolio &amp; holdings
              </Link>
              <Link
                href="/contact"
                className="gold-outline-btn inline-block px-10 py-3.5 text-center font-mono-hbm text-[10px] uppercase tracking-[0.22em]"
              >
                Institutional inquiries
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ CLOSING FULL BLEED ═══ */}
      <section className="relative h-[52vh] min-h-[340px] overflow-hidden md:h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&q=85"
          alt=""
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/55 via-void/25 to-void" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 font-mono-hbm text-[9px] uppercase tracking-[0.4em] text-gold/50">
            HBM &amp; Company — Treasury
          </span>
          <p className="max-w-2xl font-cormorant text-[clamp(1.6rem,3.5vw,2.75rem)] font-light leading-[1.15] text-cream/85">
            Principal capital, held with the same rigor we demand
            <br />
            <span className="italic font-semibold text-gradient-gold">from the protocols we back.</span>
          </p>
        </div>
      </section>

      <FooterDark typography="luxury" />
    </>
  );
}

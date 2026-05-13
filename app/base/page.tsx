import type { ReactNode } from "react";
import Link from "next/link";
import FooterDark from "@/components/FooterDark";
import NavBar from "@/components/NavBar";
import SectionReveal from "@/components/SectionReveal";
import BaseLayerStack from "@/components/base/BaseLayerStack";
import ChapterMark from "@/components/base/ChapterMark";
import ExecutionTimeline from "@/components/base/ExecutionTimeline";
import FaultProofSchematic from "@/components/base/FaultProofSchematic";
import Footnote from "@/components/base/Footnote";
import InlineCode from "@/components/base/InlineCode";
import LatencyBudgetBar from "@/components/base/LatencyBudgetBar";
import ReconciliationLoop from "@/components/base/ReconciliationLoop";
import SequencerFlowDiagram from "@/components/base/SequencerFlowDiagram";
import SpecRow from "@/components/base/SpecRow";
import TechnicalTable from "@/components/base/TechnicalTable";
import USDCFlowDiagram from "@/components/base/USDCFlowDiagram";
import { baseCopy } from "@/lib/base-copy";

const pageShell =
  "mx-auto max-w-[1440px] px-6 pb-24 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4rem)] md:px-12 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]";
const proseClass = "max-w-[68ch] text-[1rem] leading-[1.9] text-silver-dim/74";
const headlineClass =
  "mt-4 max-w-5xl font-cormorant text-[2.2rem] font-light leading-[1.02] tracking-[-0.04em] text-cream/[0.94] md:text-[3.35rem]";
const labelClass = "font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-gold/55";
const cardClass =
  "rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]";

type LinkItem = Readonly<{
  label: string;
  href: string;
}>;

type SurfaceTone = "hero" | "default" | "muted" | "emphasis";

const surfaceToneClass: Record<SurfaceTone, string> = {
  hero:
    "relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_right,rgba(218,165,32,0.16),transparent_38%),linear-gradient(135deg,#0b0b0c_0%,#0d1016_42%,#09090b_100%)] shadow-[0_40px_120px_rgba(0,0,0,0.48)]",
  default:
    "rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-obsidian/80 to-void/95 shadow-[0_24px_80px_rgba(0,0,0,0.32)]",
  muted:
    "rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-[#100f13] via-[#0b0b11] to-[#090909] shadow-[0_24px_80px_rgba(0,0,0,0.32)]",
  emphasis:
    "relative overflow-hidden rounded-[2rem] border border-gold/[0.12] bg-gradient-to-br from-black via-[#090a0d] to-[#060607] shadow-[0_32px_100px_rgba(0,0,0,0.42)]",
};

function Surface({
  children,
  tone,
  className,
  id,
}: {
  children: ReactNode;
  tone: SurfaceTone;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`${surfaceToneClass[tone]} ${className ?? ""}`}>
      {children}
    </section>
  );
}

function ResourceGroup({
  title,
  items,
}: {
  title: string;
  items: ReadonlyArray<LinkItem>;
}) {
  return (
    <article className={cardClass}>
      <p className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-gold/55">{title}</p>
      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const external = item.href.startsWith("http") || item.href.startsWith("mailto:");
          return (
            <a
              key={`${title}-${item.label}`}
              href={item.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] px-4 py-3 font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-silver-dim/74 transition-colors hover:bg-white/[0.04] hover:text-cream/88"
            >
              <span>{item.label}</span>
              <span aria-hidden>{external ? "↗" : "→"}</span>
            </a>
          );
        })}
      </div>
    </article>
  );
}

export default function BasePage() {
  const copy = baseCopy;
  const {
    cover,
    chapterMarks,
    sections: {
      layerZero,
      settlement,
      sequencer,
      usdc,
      execution,
      reconciliation,
      latency,
      risk,
      roadmap,
      index,
    },
  } = copy;

  return (
    <div className="min-h-screen bg-void text-cream">
      <NavBar />

      <main className={pageShell}>
        <Surface tone="hero" className="px-6 py-10 md:px-10 md:py-14">
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-35" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:42px_42px]" />

          <SectionReveal className="relative z-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:gap-14">
              <div>
                <p className={labelClass}>Base</p>
                <h1 className="mt-4 max-w-5xl font-cormorant text-[2.8rem] font-light leading-[0.98] tracking-[-0.045em] text-cream/[0.95] md:text-[4.7rem]">
                  <span className="block italic text-gold/68">{cover.titleLines[0]}</span>
                  <span className="block">{cover.titleLines[1]}</span>
                  <span className="block">{cover.titleLines[2]}</span>
                </h1>
                <p className="mt-6 max-w-[58ch] text-pretty text-[1.02rem] leading-[1.86] text-silver-dim/72 md:text-[1.12rem]">
                  {cover.body}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#base-from-first-principles"
                    className="rounded-full border border-gold/30 px-4 py-2 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/72 transition-colors hover:bg-gold/10"
                  >
                    {cover.ctas.read}
                  </a>
                  <Link
                    href="/"
                    className="rounded-full border border-white/[0.12] px-4 py-2 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-silver-dim/76 transition-colors hover:bg-white/[0.05]"
                  >
                    {cover.ctas.back}
                  </Link>
                </div>
              </div>

              <aside className="rounded-[1.5rem] border border-gold/[0.14] bg-white/[0.03] p-6 backdrop-blur-sm">
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">Execution surface</p>
                <BaseLayerStack className="mt-5 w-full text-cream/86" accent="bordeaux" />
                <p className="mt-5 text-sm leading-[1.85] text-silver-dim/70">
                  Lightra uses Base as the low-friction execution rail beneath the protocol: Ethereum-secured data
                  posting, Coinbase sequencing, native USDC depth, and a latency profile that keeps one-block
                  strategies economically viable.
                </p>
              </aside>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
              {cover.strip.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.2rem] border border-white/[0.08] bg-white/[0.03] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
                >
                  <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-silver-dim/42">{item.label}</p>
                  <p className="mt-2 text-sm leading-snug text-cream/88">{item.value}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="base-from-first-principles" tone="default" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.layerZero} />
            <h2 className={headlineClass}>{layerZero.headline}</h2>

            <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(22rem,0.9fr)]">
              <div className="grid gap-6 md:grid-cols-3">
                {layerZero.columns.map((column) => (
                  <article key={column.eyebrow} className={cardClass}>
                    <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{column.eyebrow}</p>
                    <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{column.body}</p>
                  </article>
                ))}
              </div>
              <aside className={cardClass}>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Layer stack</p>
                <BaseLayerStack className="mt-5 w-full text-cream/84" accent="bordeaux" />
              </aside>
            </div>

            <div className="mt-10">
              <TechnicalTable rows={layerZero.table} background="ivory" />
              <Footnote>{layerZero.footnote}</Footnote>
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="settlement-mechanics" tone="muted" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.settlement} />
            <h2 className={headlineClass}>{settlement.headline}</h2>

            <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]">
              <div className="space-y-6">
                {settlement.paragraphs.map((paragraph, index) => (
                  <p key={index} className={proseClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={cardClass}>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Settlement timeline</p>
                <FaultProofSchematic className="mt-6 w-full text-cream/84" accent="bordeaux" />
              </div>
            </div>

            <div className="mt-10">
              <TechnicalTable rows={settlement.table} background="parchment" />
              <Footnote>{settlement.footnote}</Footnote>
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="sequencer" tone="emphasis" className="mt-12 px-6 py-10 md:px-8 md:py-10">
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-25" />
          <SectionReveal className="relative z-10 text-cream">
            <ChapterMark {...chapterMarks.sequencer} />
            <h2 className={headlineClass}>{sequencer.headline}</h2>

            <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]">
              <div className="space-y-6">
                {sequencer.paragraphs.map((paragraph, index) => (
                  <p key={index} className={proseClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className={cardClass}>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Ordering path</p>
                <SequencerFlowDiagram className="mt-6 w-full text-cream/84" accent="bordeaux" />
              </div>
            </div>

            <div className="mt-10">
              <TechnicalTable rows={sequencer.table} background="noir" />
              <Footnote>{sequencer.footnote}</Footnote>
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="native-usdc" tone="default" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.usdc} />
            <h2 className={headlineClass}>{usdc.headline}</h2>

            <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)]">
              <div className="space-y-6">
                {usdc.paragraphs.map((paragraph, index) => (
                  <p key={index} className={proseClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="space-y-6">
                <div className={cardClass}>
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Canonical flow</p>
                  <USDCFlowDiagram className="mt-6 w-full text-cream/84" accent="bordeaux" />
                </div>
                <TechnicalTable rows={usdc.table} background="ivory" />
              </div>
            </div>

            <Footnote>{usdc.footnote}</Footnote>
          </SectionReveal>
        </Surface>

        <Surface id="lightra-on-base" tone="muted" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.execution} />
            <h2 className={headlineClass}>{execution.headline}</h2>

            <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]">
              <div>
                <p className={proseClass}>{execution.intro}</p>
                <div className="mt-8 grid gap-4">
                  {execution.specs.map((spec) => (
                    <article key={spec.label} className={cardClass}>
                      <h3 className="font-cormorant text-[1.55rem] font-semibold leading-snug text-cream/88">
                        {spec.label}
                      </h3>
                      <p className="mt-3 text-sm leading-[1.85] text-silver-dim/72">{spec.value}</p>
                      <div className="mt-4">
                        <InlineCode>{spec.address}</InlineCode>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className={cardClass}>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Execution timeline</p>
                <ExecutionTimeline className="mt-6 w-full text-cream/84" accent="bordeaux" />
              </div>
            </div>

            <div className="mt-10">
              <TechnicalTable rows={execution.table} background="parchment" />
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="piol-on-base" tone="default" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.reconciliation} />
            <h2 className={headlineClass}>{reconciliation.headline}</h2>

            <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.95fr)]">
              <div className="space-y-6">
                {reconciliation.paragraphs.map((paragraph, index) => (
                  <p key={index} className={proseClass}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="space-y-6">
                <div className={cardClass}>
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Off-chain control plane</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {reconciliation.codes.map((item) => (
                      <InlineCode key={item}>{item}</InlineCode>
                    ))}
                  </div>
                </div>
                <div className={cardClass}>
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Reconciliation loop</p>
                  <ReconciliationLoop className="mt-6 w-full text-cream/84" accent="bordeaux" />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <TechnicalTable rows={reconciliation.table} background="ivory" />
              <Footnote>{reconciliation.footnote}</Footnote>
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="latency-budget" tone="muted" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.latency} />
            <h2 className={headlineClass}>{latency.headline}</h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {latency.columns.map((column) => (
                <article key={column.eyebrow} className={cardClass}>
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{column.eyebrow}</p>
                  <p className="mt-4 text-sm leading-[1.9] text-silver-dim/72">{column.body}</p>
                </article>
              ))}
            </div>

            <div className={`${cardClass} mt-8`}>
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">Budget map</p>
              <LatencyBudgetBar className="mt-6 w-full" accent="bordeaux" />
            </div>

            <div className="mt-10">
              <TechnicalTable rows={latency.table} background="parchment" />
              <Footnote>{latency.footnote}</Footnote>
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="base-risk" tone="emphasis" className="mt-12 px-6 py-10 md:px-8 md:py-10">
          <div className="pointer-events-none absolute inset-0 purple-bloom opacity-18" />
          <SectionReveal className="relative z-10 text-cream">
            <ChapterMark {...chapterMarks.risk} />
            <h2 className={headlineClass}>{risk.headline}</h2>

            <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
              {risk.cards.map((card) => {
                const controlParts = card.control.split(" · ");
                const controlLabel = controlParts[0];
                const controlValue = controlParts.slice(1).join(" · ");

                return (
                  <article key={card.ordinal} className={cardClass}>
                    <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{card.ordinal}</p>
                    <h3 className="mt-3 font-cormorant text-[1.55rem] font-semibold leading-snug text-cream/88">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.85] text-silver-dim/72">{card.body}</p>
                    <div className="mt-5 text-cream/88">
                      <SpecRow label={controlLabel} value={controlValue} accent />
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8">
              <TechnicalTable rows={risk.table} background="noir" />
            </div>

            <p className="mt-10 text-center font-cormorant text-[1.55rem] italic text-gold/72">{risk.citation}</p>
          </SectionReveal>
        </Surface>

        <Surface id="roadmap" tone="default" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.roadmap} />
            <h2 className={headlineClass}>{roadmap.headline}</h2>

            <div className="mt-10 grid gap-6 xl:grid-cols-2">
              <article className={cardClass}>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{roadmap.headings.base}</p>
                <div className="mt-6 space-y-5 border-l border-gold/18 pl-5">
                  {roadmap.base.map((item) => (
                    <div key={`${item.date}-${item.title}`}>
                      <p className="font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-silver-dim/44">{item.date}</p>
                      <h3 className="mt-2 font-cormorant text-[1.35rem] font-semibold leading-snug text-cream/88">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.85] text-silver-dim/72">{item.body}</p>
                    </div>
                  ))}
                </div>
              </article>

              <article className={cardClass}>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-gold/55">{roadmap.headings.lightra}</p>
                <div className="mt-6 space-y-5 border-l border-gold/18 pl-5">
                  {roadmap.lightra.map((item) => (
                    <div key={`${item.date}-${item.title}`}>
                      <p className="font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-silver-dim/44">{item.date}</p>
                      <h3 className="mt-2 font-cormorant text-[1.35rem] font-semibold leading-snug text-cream/88">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-[1.85] text-silver-dim/72">{item.body}</p>
                    </div>
                  ))}
                </div>
              </article>
            </div>

            <div className="mt-10">
              <TechnicalTable rows={roadmap.table} background="ivory" />
            </div>
          </SectionReveal>
        </Surface>

        <Surface id="index-and-correspondence" tone="muted" className="mt-12 p-6 md:p-8">
          <SectionReveal className="text-cream">
            <ChapterMark {...chapterMarks.index} />
            <h2 className={headlineClass}>{index.headline}</h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <ResourceGroup title={index.headings.toc} items={index.toc} />
              <ResourceGroup title={index.headings.base} items={index.referencesBase} />
              <ResourceGroup title={index.headings.lightra} items={index.referencesLightra} />
              <ResourceGroup title={index.headings.correspondence} items={index.correspondence} />
            </div>

            <div className="mt-10">
              <TechnicalTable rows={index.table} background="parchment" />
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Link
                href="/ethereum"
                className="rounded-full border border-gold/30 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-gold/70 transition-colors hover:bg-gold/10"
              >
                Ethereum
              </Link>
              <Link
                href="/investor-relations"
                className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/76 transition-colors hover:bg-white/[0.05]"
              >
                Investor Relations
              </Link>
              <Link
                href="/documentation"
                className="rounded-full border border-white/[0.12] px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-silver-dim/76 transition-colors hover:bg-white/[0.05]"
              >
                Documentation
              </Link>
            </div>

            <p className="mt-10 text-center font-cormorant text-[1.55rem] italic text-cream/88">{index.close}</p>
          </SectionReveal>
        </Surface>
      </main>

      <FooterDark />
    </div>
  );
}

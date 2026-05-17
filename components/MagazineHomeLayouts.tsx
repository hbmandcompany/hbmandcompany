"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import VotingProtocolSignup from "@/components/VotingProtocolSignup";
export { HeroNewspaperEdition } from "@/components/HeroNewspaperEdition";
import {
  MagazineSectionMasthead,
  type MagazineStory,
  type SuiteStory,
} from "@/components/MagazineStoryCards";
import {
  IconSessionRing,
  IconCompStacks,
  IconCollab,
  IconTrade,
  IconStaking,
  IconRadio,
} from "@/components/IllustrativeIcons";

const goldOutlineCta =
  "gold-outline-btn inline-block px-3 py-1 text-[10px] uppercase tracking-[0.18em] sm:px-4 sm:py-1.5 sm:text-label-xs sm:tracking-[0.2em]";

export type WireBrief = {
  storyId: string;
  category: string;
  headline: string;
  dek?: string;
  dateline: string;
  imageSrc?: string;
};

function RecordThumbCard({ item, className }: { item: WireBrief; className?: string }) {
  return (
    <Link
      href={`/newspaper?story=${item.storyId}`}
      className={clsx(
        "group relative flex min-h-0 flex-col overflow-hidden border border-white/[0.08] bg-obsidian transition-colors hover:border-gold/22 hover:bg-obsidian/95",
        className,
      )}
    >
      <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden bg-midnight">
        {item.imageSrc ? (
          <Image src={item.imageSrc} alt="" fill className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" unoptimized />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-midnight to-void" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-3.5">
        <span className="font-mono-hbm text-[7px] uppercase tracking-[0.26em] text-gold/58">{item.category}</span>
        <h3 className="font-cormorant text-base font-light leading-tight text-cream/88 line-clamp-3 group-hover:text-gold md:text-[1.05rem]">
          {item.headline}
        </h3>
        {item.dek ? (
          <p className="font-robinhood line-clamp-2 text-[11px] leading-snug text-silver-dim/65">{item.dek}</p>
        ) : null}
        <span className="mt-auto font-mono-hbm text-[7px] uppercase tracking-[0.2em] text-silver-dim/40">{item.dateline}</span>
      </div>
    </Link>
  );
}

function RecordHeadlineRow({ item }: { item: WireBrief }) {
  return (
    <Link
      href={`/newspaper?story=${item.storyId}`}
      className="group grid grid-cols-[72px_1fr] gap-3 border-b border-white/[0.06] py-3 last:border-b-0 hover:bg-white/[0.02]"
    >
      <div className="relative aspect-square overflow-hidden bg-midnight">
        {item.imageSrc ? (
          <Image src={item.imageSrc} alt="" fill className="object-cover" unoptimized />
        ) : null}
      </div>
      <div className="min-w-0">
        <span className="font-mono-hbm text-[7px] uppercase tracking-[0.22em] text-garnet/55">{item.category}</span>
        <p className="font-cormorant mt-0.5 text-sm font-light leading-snug text-cream/85 group-hover:text-gold line-clamp-2">
          {item.headline}
        </p>
        <span className="font-mono-hbm mt-1 block text-[7px] text-silver-dim/42">{item.dateline}</span>
      </div>
    </Link>
  );
}

export function MagazineRecordGrid({
  features,
  briefs,
  headlines,
}: {
  features: SuiteStory[];
  briefs: WireBrief[];
  headlines: WireBrief[];
}) {
  const [lead, ...restFeatures] = features;

  return (
    <div className="magazine-record-grid">
      <div className="magazine-record-grid__lead">
        <Link
          href={`/newspaper?story=${lead.storyId}`}
          className="card-3d group grid h-full overflow-hidden border border-white/[0.09] bg-obsidian md:grid-cols-2"
        >
          <div className="relative min-h-[220px] md:min-h-0">
            {lead.imageSrc ? (
              <Image src={lead.imageSrc} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" unoptimized />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
          </div>
          <article className="flex flex-col justify-center gap-3 p-5 md:p-6 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono-hbm text-[8px] uppercase tracking-[0.24em] text-gold/65">{lead.category}</span>
              <span className="font-mono-hbm text-[10px] uppercase tracking-[0.12em] text-gold/75">{lead.stat}</span>
            </div>
            <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 group-hover:text-gold md:text-2xl lg:text-[1.65rem]">
              {lead.title}
            </h3>
            <p className="font-robinhood line-clamp-4 text-sm leading-relaxed text-silver-dim/75">{lead.description}</p>
            <span className={clsx(goldOutlineCta, "mt-1 w-fit")}>Read Story →</span>
          </article>
        </Link>
      </div>

      <div className="magazine-record-grid__rail border border-white/[0.08] bg-obsidian/80 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
          <span className="font-mono-hbm text-[8px] uppercase tracking-[0.3em] text-garnet/60">Latest</span>
          <Link href="/treasury" className={goldOutlineCta}>
            Docs
          </Link>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {headlines.map((h) => (
            <RecordHeadlineRow key={h.storyId} item={h} />
          ))}
        </div>
      </div>

      {restFeatures.map((f) => (
        <RecordThumbCard
          key={f.storyId}
          item={{
            storyId: f.storyId,
            category: f.category,
            headline: f.title,
            dek: f.description,
            dateline: f.stat,
            imageSrc: f.imageSrc,
          }}
          className="magazine-record-grid__cell"
        />
      ))}

      {briefs.map((b) => (
        <RecordThumbCard key={b.storyId} item={b} className="magazine-record-grid__cell" />
      ))}
    </div>
  );
}

function storyToBrief(story: MagazineStory): WireBrief {
  return {
    storyId: story.storyId,
    category: story.category,
    headline: story.headline,
    dek: story.dek,
    dateline: story.dateline,
    imageSrc: story.imageSrc,
  };
}

export function FrontPageNewsGrid({ stories }: { stories: MagazineStory[] }) {
  const [lead, ...rest] = stories;
  const railStories = rest.slice(0, 2);
  const thumbStories = rest.slice(2);

  return (
    <div className="front-page-grid">
      <div className="front-page-grid__lead">
        <Link
          href={`/newspaper?story=${lead.storyId}`}
          className="card-3d group grid h-full overflow-hidden border border-white/[0.09] bg-obsidian md:grid-cols-2"
        >
          <div className="relative min-h-[240px] md:min-h-[280px]">
            {lead.imageSrc ? (
              <Image
                src={lead.imageSrc}
                alt={lead.imageAlt ?? lead.headline}
                fill
                sizes="(max-width: 768px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
              <p className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-cream/45">{lead.dateline}</p>
            </div>
          </div>
          <article className="flex flex-col justify-center gap-3 p-5 md:p-6 lg:p-7">
            <span className="font-mono-hbm text-[8px] uppercase tracking-[0.24em] text-gold/65">{lead.category}</span>
            <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 transition-colors group-hover:text-gold md:text-2xl lg:text-[1.75rem]">
              {lead.headline}
            </h3>
            <p className="font-robinhood line-clamp-5 text-sm leading-relaxed text-silver-dim/75">{lead.dek}</p>
            <span className={clsx(goldOutlineCta, "mt-1 w-fit")}>Read Story →</span>
          </article>
        </Link>
      </div>

      <div className="front-page-grid__rail border border-white/[0.08] bg-obsidian/80 p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-2 border-b border-white/[0.07] pb-3">
          <span className="font-mono-hbm text-[8px] uppercase tracking-[0.3em] text-garnet/60">Also on the front</span>
          <Link href="/newspaper" className={goldOutlineCta}>
            All Stories
          </Link>
        </div>
        <div className="divide-y divide-white/[0.05]">
          {railStories.map((story) => (
            <RecordHeadlineRow key={story.storyId} item={storyToBrief(story)} />
          ))}
        </div>
      </div>

      {thumbStories.map((story) => (
        <RecordThumbCard key={story.storyId} item={storyToBrief(story)} className="front-page-grid__cell" />
      ))}
    </div>
  );
}

const RADIO_STATIONS = [
  { id: "session", Icon: IconSessionRing, label: "Session", sub: "Tracking · clock discipline" },
  { id: "comp", Icon: IconCompStacks, label: "Comp", sub: "Lanes · recall-safe" },
  { id: "collab", Icon: IconCollab, label: "Collab", sub: "Shared timeline" },
  { id: "trade", Icon: IconTrade, label: "Trade", sub: "Beats · listings" },
  { id: "staking", Icon: IconStaking, label: "Staking", sub: "Lock · yield" },
  { id: "radio", Icon: IconRadio, label: "Radio", sub: "Broadcast · rotation" },
] as const;

const RADIO_QUEUE = [
  { title: "Midnight Ledger", artist: "HBM Session Band", dur: "3:42" },
  { title: "Stem Architecture", artist: "Comp Desk", dur: "4:08" },
  { title: "Trade Lane", artist: "Producer Counter", dur: "2:55" },
  { title: "Rotation Rights", artist: "Radio Syndicate", dur: "5:12" },
];

export function ConsequenceRadioDeck() {
  const [activeStation, setActiveStation] = useState("radio");
  const [playing, setPlaying] = useState(true);
  const station = RADIO_STATIONS.find((s) => s.id === activeStation) ?? RADIO_STATIONS[5];

  return (
    <div className="consequence-radio-shell overflow-hidden border border-white/[0.09] bg-gradient-to-b from-obsidian to-void">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="border-b border-white/[0.08] p-5 md:p-6 lg:col-span-5 lg:border-b-0 lg:border-r">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="font-mono-hbm text-[8px] uppercase tracking-[0.34em] text-garnet/65">— Consequence</p>
              <h2 className="font-cormorant mt-1 text-2xl font-light italic text-cream/88 md:text-[1.75rem]">
                Radio
              </h2>
            </div>
            <span className="font-mono-hbm rounded-full border border-gold/25 bg-gold/10 px-2.5 py-1 text-[8px] uppercase tracking-[0.22em] text-gold/75">
              Live
            </span>
          </div>

          <div className="relative aspect-square max-h-[280px] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-midnight shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]">
            <Image
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=85"
              alt=""
              fill
              className="object-cover opacity-90"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-cream/50">Now Playing</p>
              <p className="font-cormorant mt-1 text-lg text-cream/90">{RADIO_QUEUE[0].title}</p>
              <p className="font-robinhood text-xs text-silver-dim/65">{RADIO_QUEUE[0].artist}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="h-1 overflow-hidden rounded-full bg-white/[0.08]">
              <div className="h-full w-[38%] rounded-full bg-gradient-to-r from-garnet/80 to-gold/70" />
            </div>
            <div className="mt-2 flex items-center justify-between font-mono-hbm text-[8px] uppercase tracking-[0.2em] text-silver-dim/45">
              <span>1:24</span>
              <span>{RADIO_QUEUE[0].dur}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-cream transition hover:border-gold/30"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <Link href="/contact" className="garnet-btn px-4 py-2 font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-void">
              Get Consequence
            </Link>
          </div>
        </div>

        <div className="p-5 md:p-6 lg:col-span-7">
          <p className="font-mono-hbm mb-3 text-[8px] uppercase tracking-[0.3em] text-silver-dim/45">Stations</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {RADIO_STATIONS.map(({ id, Icon, label, sub }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveStation(id)}
                className={clsx(
                  "flex min-h-[100px] flex-col justify-between rounded-xl border p-3 text-left transition-all duration-300",
                  activeStation === id
                    ? "border-gold/35 bg-gold/[0.08] shadow-[0_0_24px_rgba(180,175,170,0.08)]"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-gold/20",
                )}
              >
                <Icon className={clsx("h-9 w-9", activeStation === id ? "text-gold/80" : "text-gold/35")} />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cream/80">{label}</p>
                  <p className="mt-0.5 text-[9px] leading-snug text-silver-dim/55">{sub}</p>
                </div>
              </button>
            ))}
          </div>

          <p className="font-mono-hbm mb-2 mt-5 text-[8px] uppercase tracking-[0.28em] text-silver-dim/42">Up Next · {station.label}</p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {RADIO_QUEUE.map((track) => (
              <div
                key={track.title}
                className="shrink-0 rounded-lg border border-white/[0.07] bg-obsidian/90 px-3 py-2 min-w-[140px]"
              >
                <p className="font-cormorant text-sm text-cream/85 line-clamp-1">{track.title}</p>
                <p className="font-robinhood text-[10px] text-silver-dim/55">{track.artist}</p>
                <span className="font-mono-hbm text-[8px] text-silver-dim/40">{track.dur}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DeskWireNewsGrid() {
  const wireStories: WireBrief[] = [
    {
      storyId: "reserve-holdings",
      category: "Markets Desk",
      headline: "Reserve Holdings Update: Verified Rails and Governance Cadence",
      dek: "Enterprise posture on DeFi infrastructure and digital-asset custody.",
      dateline: "May 16, 2026",
      imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=85",
    },
    {
      storyId: "treasury-cadence",
      category: "Treasury Wire",
      headline: "Balance-Sheet Discipline Briefings Open for Q2",
      dateline: "May 15, 2026",
      imageSrc: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=85",
    },
    {
      storyId: "whitepaper-access",
      category: "Documentation",
      headline: "Whitepaper: Institutional Reserve Framework",
      dateline: "Updated weekly",
    },
  ];

  return (
    <div className="desk-wire-grid">
      <div className="desk-wire-grid__mast">
        <MagazineSectionMasthead
          eyebrow="— Markets Desk"
          title="Institutional Reserve Wire"
          aside="Treasury · Governance · Access"
          compact
        />
      </div>

      <article className="desk-wire-grid__lead card-3d overflow-hidden border border-white/[0.09] bg-obsidian">
        <div className="grid md:grid-cols-2">
          <div className="relative min-h-[200px] md:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85"
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian/40 md:bg-gradient-to-l md:from-obsidian/30" />
          </div>
          <div className="flex flex-col gap-4 p-6 md:p-7">
            <span className="font-mono-hbm text-[8px] uppercase tracking-[0.28em] text-gold/62">Lead Brief</span>
            <h3 className="font-cormorant text-2xl font-light leading-tight text-cream/88 md:text-[1.75rem]">
              Institutional <span className="text-gradient-gold font-medium italic">Reserve</span>
            </h3>
            <p className="font-robinhood text-sm leading-relaxed text-silver-dim/75">
              An enterprise holdings company committed to the infrastructure of decentralized finance and digital
              assets—organizing capital around rails you can verify and durable governance.
            </p>
            <Link href="/treasury" className={clsx(goldOutlineCta, "w-fit")}>
              Read Treasury Desk →
            </Link>
          </div>
        </div>
      </article>

      <div className="desk-wire-grid__list border border-white/[0.08] bg-obsidian/90">
        {wireStories.map((w) => (
          <RecordHeadlineRow key={w.storyId} item={w} />
        ))}
      </div>

      <div className="desk-wire-grid__signup card-3d border border-white/[0.09] bg-obsidian p-5 md:p-6">
        <VotingProtocolSignup
          typography="robinhood"
          instanceId="home-desk-wire"
          eyebrow="TREASURY"
          heading="Join the Reserve"
          description="Request briefings on reserves, cadence, and balance-sheet discipline. By submitting, you agree we may contact you about treasury operations."
          submitLabel="Request Access"
          embedded
          fullDiscretion
        />
      </div>

      <div className="desk-wire-grid__tiles grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "Whitepaper", href: "/documentation" },
          { label: "Governance", href: "/governance" },
          { label: "Investor Relations", href: "/investor-relations" },
          { label: "Legal Entity", href: "/legal-entity" },
        ].map((t) => (
          <Link
            key={t.label}
            href={t.href}
            className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-3 text-center font-mono-hbm text-[8px] uppercase tracking-[0.2em] text-silver-dim/60 transition hover:border-gold/25 hover:text-gold/75"
          >
            {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

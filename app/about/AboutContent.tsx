"use client";

import Image from "next/image";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import SectionReveal from "@/components/SectionReveal";
import { aboutTeam, aboutValues } from "@/lib/hbm-company-data";

const marqueeFr = [
  { fr: "Patrimoine", en: "Patrimony" },
  { fr: "La maison", en: "The house" },
  { fr: "Lignée", en: "Lineage" },
  { fr: "Mesure", en: "Measure" },
  { fr: "Serment", en: "Covenant" },
  { fr: "Flambeau", en: "Torch" },
  { fr: "Calme", en: "Restraint" },
  { fr: "Durée", en: "Duration" },
];

const chapters = [
  {
    num: "I",
    titleFr: "La maison",
    titleEn: "The house at the edge of the century",
    lead:
      "Long before “crypto” became a dinner-table word, there was already a kind of French clarity we admired: the insistence that a maison is not a logo — it is a lineage of judgment, renewed each generation without spectacle.",
    body:
      "HBM & Company was imagined in that spirit. Not a fund that markets its quarter, but a private house that holds assets, builds software, and answers only to its own sense of duration. We borrowed the posture of the grandes maisons — discretion, craft, refusal of the merely fashionable — and applied it to programmable money.",
    image:
      "https://images.unsplash.com/photo-1431274172761-452ca91393e9?w=1600&q=88",
    imageAlt: "Paris from the river at dusk",
  },
  {
    num: "II",
    titleFr: "Une lignée",
    titleEn: "Lineage, not novelty",
    lead:
      "In Paris, one speaks of filiation: who taught whom, which atelier shaped which hand. We treat protocol architecture the same way — every deployment carries the imprint of those who came before it.",
    body:
      "Our founders were engineers who had read too many prospectuses and bankers who had written too many. They met in the uncanny valley between settlement finality and boardroom comfort — and decided the next century would be won by whoever could speak both languages without cynicism. That compact became the firm.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=88",
    imageAlt: "Candlelit library corridor",
  },
  {
    num: "III",
    titleFr: "Patrimoine & protocole",
    titleEn: "Patrimony meets protocol",
    lead:
      "Patrimoine is not nostalgia. It is the belief that what you hold should still mean something when the fashion has passed — whether that holding is limestone, parchment, or a cold key.",
    body:
      "We consolidate digital asset treasury and wholly-owned software the way a house consolidates its workshops: one ledger, one standard of care, one intolerance for shortcuts. The chain is our atelier; governance is our gilding; silence in the press is often our finest varnish.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=88",
    imageAlt: "Rows of archival volumes",
  },
  {
    num: "IV",
    titleFr: "Le serment du calme",
    titleEn: "The covenant of calm",
    lead:
      "There is a French virtue in restraint — not coldness, but the refusal to perform urgency for an audience. We do not chase headlines; we compound where others churn.",
    body:
      "Our counterparties are institutions and founders who think in generations as readily as in quarters. We engage selectively, prefer introductions, and keep our word as if it were engraved — because in open networks, reputation is the only metal that never tarnishes.",
    image:
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=1600&q=88",
    imageAlt: "Hands crafting with precision",
  },
  {
    num: "V",
    titleFr: "Où l'on écrit dans le métal",
    titleEn: "Where one writes in metal",
    lead:
      "The old engravers said the line must survive the hammer. We say the same of code: it must survive adversaries, upgrades, and the boredom of maintenance.",
    body:
      "Today the house spans validator operations, protocol governance, and balance-sheet positions across fourteen networks and twelve jurisdictions — still private, still principal, still allergic to the easy gesture. The story continues in commits, not press releases.",
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=88",
    imageAlt: "Modern architecture facade",
  },
];

export default function AboutContent() {
  return (
    <>
      <NavBar />

      {/* ═══ HERO ═══ */}
      <section className="relative flex min-h-screen flex-col justify-end pb-16 pt-[calc(env(safe-area-inset-top,0px)+7rem)] md:pb-24">
        <div className="absolute inset-0 z-0 min-h-[100dvh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=90"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-[1.08] brightness-[0.92]"
            priority
            unoptimized
          />
          {/* Monochrome plate — reads as silver-gelatin over the graded photo */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-white/[0.12] via-transparent to-black/35 mix-blend-soft-light"
            aria-hidden
          />
          <div className="grain-overlay-hero" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-b from-void/45 via-void/35 to-void/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-void/70 via-void/30 to-void/55" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 65% at 20% 40%, rgba(34,232,200,0.06) 0%, transparent 55%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 hero-glow opacity-70" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <div className="mb-6">
            <span className="inline-block border border-gold/25 bg-void/45 px-3 py-1.5 font-mono-hbm text-[10px] uppercase tracking-[0.35em] text-gold/55 backdrop-blur-sm">
              The Company — Lore & lineage
            </span>
          </div>

          <h1 className="mb-6 leading-[0.9] tracking-tight">
            <span className="block font-cormorant text-[clamp(3rem,10vw,8.5rem)] font-light text-cream/95">
              HBM
            </span>
            <span className="block font-cormorant text-[clamp(3rem,10vw,8.5rem)] font-semibold italic text-gradient-gold">
              &amp; Company
            </span>
          </h1>

          <p className="max-w-md font-cormorant text-xl font-light italic leading-snug text-cream/55 md:text-2xl">
            « Une maison ne se vend pas au bruit du siècle. Elle se transmet au silence du
            métier. »
          </p>
          <p className="mt-4 max-w-sm font-mono-hbm text-[10px] uppercase leading-relaxed tracking-[0.26em] text-silver-dim/45">
            A house is not sold to the noise of the age — it is passed down through the silence of
            craft. (Epigraph — the firm&apos;s private journal, MMXXI)
          </p>
        </div>

        <div className="absolute bottom-8 right-10 z-10 hidden flex-col items-center gap-2 md:flex">
          <span className="font-mono-hbm text-[9px] uppercase tracking-[0.3em] text-silver-dim/35">
            Descendre
          </span>
          <div className="h-12 w-px bg-gradient-to-b from-gold/30 to-transparent" />
        </div>
      </section>

      {/* ═══ MARQUEE — FRENCH / ENGLISH ═══ */}
      <div className="overflow-hidden border-y border-white/[0.04] bg-charcoal/35 py-3">
        <div className="flex animate-marquee gap-0 whitespace-nowrap">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <span key={i} className="inline-flex items-center gap-10 px-10">
                {marqueeFr.map((item) => (
                  <span key={`${i}-${item.fr}`} className="inline-flex items-center gap-10">
                    <span className="font-cormorant text-lg italic text-cream/50 md:text-xl">
                      {item.fr}
                    </span>
                    <span className="font-mono-hbm text-[8px] uppercase tracking-[0.32em] text-silver-dim/35">
                      {item.en}
                    </span>
                    <span className="inline-block h-3 w-px bg-gold/15" />
                  </span>
                ))}
              </span>
            ))}
        </div>
      </div>

      {/* ═══ EDITORIAL OPENING ═══ */}
      <section className="relative mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-28">
        <div className="pointer-events-none absolute inset-0 purple-bloom opacity-40" aria-hidden />
        <SectionReveal>
          <div className="relative min-h-[62vh] overflow-hidden rounded-2xl md:min-h-[70vh]">
            <Image
              src="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1800&q=88"
              alt="Seine and city light"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/25" />
            <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 max-w-3xl p-8 md:p-16">
              <span className="mb-6 inline-block font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/60">
                Prologue
              </span>
              <h2 className="mb-6 font-cormorant text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] text-cream">
                The tale of a firm
                <br />
                <span className="font-semibold italic text-gradient-gold">written in quiet.</span>
              </h2>
              <p className="max-w-lg font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver/50">
                This is not a timeline of press releases. It is the interior map of how we think —
                borrowed light from French craft culture, from banking rigor, and from the strange
                beauty of open ledgers.
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* ═══ CHAPTERS — IMMERSIVE ═══ */}
      {chapters.map((ch, i) => (
        <section
          key={ch.num}
          className={`relative min-h-[90vh] overflow-hidden ${
            i % 2 === 0 ? "section-mid" : "section-dark"
          }`}
        >
          {i % 2 === 0 ? (
            <div className="pointer-events-none absolute inset-0 city-glow opacity-28" aria-hidden />
          ) : (
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.1]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px)",
              }}
              aria-hidden
            />
          )}

          <div className="relative z-10 mx-auto grid min-h-[90vh] max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-12 lg:gap-28">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <SectionReveal direction={i % 2 === 0 ? "left" : "right"}>
                <div className="relative aspect-[4/5] max-h-[min(76vh,680px)] w-full overflow-hidden rounded-2xl">
                  <Image
                    src={ch.image}
                    alt={ch.imageAlt}
                    fill
                    className="object-cover object-center"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-void/15" />
                  <div className="absolute left-6 top-6 font-cormorant text-[clamp(5rem,18vw,10rem)] font-light leading-none text-cream/[0.07]">
                    {ch.num}
                  </div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="font-cormorant text-2xl italic text-cream/40 md:text-3xl">
                      {ch.titleFr}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>

            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <SectionReveal delay={0.06}>
                <span className="mb-3 block font-mono-hbm text-[9px] uppercase tracking-[0.4em] text-gold/45">
                  Chapitre {ch.num}
                </span>
                <h2 className="mb-4 font-cormorant text-[clamp(1.85rem,3.2vw,2.65rem)] font-light leading-tight text-cream">
                  {ch.titleEn}
                </h2>
                <p className="mb-6 font-cormorant text-lg font-light italic leading-relaxed text-cream/55 md:text-xl">
                  {ch.lead}
                </p>
                <p className="font-mono-hbm text-[15px] leading-[1.8] text-silver-dim/85 md:text-[16px]">
                  {ch.body}
                </p>
                <div className="mt-10 flex items-center gap-4">
                  <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-gold/45 to-transparent" />
                  <span className="font-mono-hbm text-[8px] uppercase tracking-[0.35em] text-silver-dim/30">
                    HBM &amp; Company — mémoire interne
                  </span>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      ))}

      {/* ═══ VALUES — SALON GRID ═══ */}
      <section className="relative border-t border-white/[0.04] py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 amber-bloom opacity-30" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <div className="mb-14 text-center">
              <span className="mb-4 block font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/45">
                Les quatre pierres
              </span>
              <h2 className="font-cormorant text-[clamp(2rem,4vw,3.25rem)] font-light text-cream">
                The four stones of{" "}
                <span className="italic font-semibold text-gradient-gold">the house.</span>
              </h2>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {aboutValues.map((v, idx) => (
              <SectionReveal key={v.code} delay={idx * 0.07}>
                <div className="group h-full rounded-xl border border-white/[0.06] bg-void/25 p-7 transition-all duration-500 hover:border-gold/22 hover:bg-void/45">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-gold/40">
                      {v.code}
                    </span>
                    <div className="h-px w-6 bg-gold/25 transition-all duration-500 group-hover:w-10" />
                    <span className="font-cormorant text-lg text-cream/85">{v.label}</span>
                  </div>
                  <p className="font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.12em] text-silver-dim/50">
                    {v.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM — SALON ═══ */}
      <section className="section-dark relative py-24 md:py-36">
        <div className="pointer-events-none absolute inset-0 city-glow opacity-35" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <div className="mb-16 md:flex md:items-end md:justify-between">
            <div>
              <SectionReveal>
                <span className="mb-4 block font-mono-hbm text-[9px] uppercase tracking-[0.35em] text-gold/50">
                  Le cercle
                </span>
              </SectionReveal>
              <SectionReveal delay={0.06}>
                <h2 className="font-cormorant text-[clamp(2.2rem,4vw,3.5rem)] font-light text-cream">
                  Those who keep{" "}
                  <span className="italic font-semibold text-gradient-gold">the flame.</span>
                </h2>
              </SectionReveal>
            </div>
            <SectionReveal delay={0.12}>
              <p className="mt-6 max-w-sm font-mono-hbm text-[10px] uppercase leading-relaxed tracking-[0.2em] text-silver-dim/45 md:mt-0">
                Names you will not find on conference badges. Judgment you will find in every line
                of code we ship and every position we hold.
              </p>
            </SectionReveal>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutTeam.map((member, i) => (
              <SectionReveal key={member.name} delay={i * 0.08}>
                <div className="group cursor-default">
                  <div className="relative mb-5 aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 22vw"
                      className="object-cover object-top transition-all duration-700 group-hover:scale-[1.03]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-void/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-gold/30 via-gold/10 to-transparent" />
                  </div>
                  <h3 className="font-cormorant text-xl font-light text-cream/90 md:text-2xl">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-gold/55">
                    {member.role}
                  </p>
                  <p className="mt-2 font-mono-hbm text-[12px] leading-relaxed text-silver-dim/65">
                    {member.focus}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 purple-bloom opacity-25" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 text-center md:px-12">
          <SectionReveal>
            <h2 className="mx-auto mb-6 max-w-3xl font-cormorant text-[clamp(2rem,4vw,3.25rem)] font-light leading-tight text-cream">
              Si votre ouvrage mérite le silence
              <br />
              <span className="italic font-semibold text-gradient-gold">avant le bruit.</span>
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.08}>
            <p className="mx-auto mb-10 max-w-md font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/50">
              If your work deserves quiet before noise — we listen to introductions, not pitches in
              the feed.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.14}>
            <Link
              href="/contact"
              className="garnet-btn inline-block px-12 py-4 font-mono-hbm text-[10px] uppercase tracking-[0.24em] text-void"
            >
              Begin engagement
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ═══ CLOSING FULL BLEED ═══ */}
      <section className="relative h-[55vh] min-h-[360px] overflow-hidden md:h-[62vh]">
        <Image
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1920&q=85"
          alt=""
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-void/20 to-void" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <span className="mb-4 font-mono-hbm text-[9px] uppercase tracking-[0.42em] text-gold/50">
            HBM &amp; Company
          </span>
          <p className="max-w-2xl font-cormorant text-[clamp(1.65rem,3.5vw,2.85rem)] font-light italic leading-[1.2] text-cream/82">
            « On ne hérite pas la maison. On la surveille un jour de plus que le siècle ne
            dure. »
          </p>
          <p className="mt-5 max-w-md font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-silver-dim/40">
            We do not inherit the house — we watch over it one day longer than the age endures.
          </p>
        </div>
      </section>

      <FooterDark typography="luxury" />
    </>
  );
}

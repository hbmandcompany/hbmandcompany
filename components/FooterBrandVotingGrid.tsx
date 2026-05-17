"use client";

import clsx from "clsx";
import Link from "next/link";
import BrandBandCardChrome from "./BrandBandCardChrome";
import HbmLogo from "./HbmLogo";
import VotingProtocolSignup from "./VotingProtocolSignup";

type BrandSide = "left" | "right";
type Band = "default" | "thesis";

const THESIS_ACCESS_LINKS = [
  { label: "Whitepaper", href: "/documentation" },
  { label: "Governance", href: "/governance" },
  { label: "Investor Relations", href: "/investor-relations" },
  { label: "Legal Entity", href: "/legal-entity" },
] as const;

function ThesisAccessTiles({ uiFont }: { uiFont: string }) {
  return (
    <div className="thesis-access-tiles grid grid-cols-2 gap-2 border-t border-white/[0.08] pb-4 pt-4 sm:grid-cols-4 md:pb-5 md:pt-5">
      {THESIS_ACCESS_LINKS.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className={clsx(
            uiFont,
            "rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-3 text-center text-[8px] uppercase tracking-[0.2em] text-silver-dim/60 transition hover:border-gold/25 hover:text-gold/75",
          )}
        >
          {t.label}
        </Link>
      ))}
    </div>
  );
}

export default function FooterBrandVotingGrid({
  typography = "luxury",
  instanceId = "footer",
  brandSide = "right",
  showLogo = true,
  showWordmark = true,
  band = "default",
  defaultEditorialAlignEnd: defaultEditorialAlignEndProp,
}: {
  typography?: "luxury" | "robinhood";
  instanceId?: string;
  /** `left`: brand column first, left-aligned; voting right. `right`: voting left; brand right-aligned (footer). */
  brandSide?: BrandSide;
  /** When false, the HB mark and optional wordmark row are omitted. */
  showLogo?: boolean;
  /** When false, only the HB mark is shown (no "HBM & Company" type). Ignored if `showLogo` is false. */
  showWordmark?: boolean;
  /** `thesis`: house thesis narrative + qualified-access signup. */
  band?: Band;
  /** When `band="default"`, editorial + logo align toward the voting column (`true`) or the outer margin (`false`). Defaults from `brandSide`. */
  defaultEditorialAlignEnd?: boolean;
}) {
  const displayFont = typography === "robinhood" ? "font-robinhood" : "font-cormorant";
  const uiFont = typography === "robinhood" ? "font-robinhood" : "font-mono-hbm";

  /** Same note + trigger treatment as the “Qualified access” signup block (sentence case, readable silver). */
  const qualifiedFormNoteClassName = `${uiFont} mt-3 text-[11px] md:text-[12px] font-light leading-[1.82] tracking-[0.04em] text-silver-dim/65 normal-case`;

  const brandTrailing = brandSide === "right";
  const defaultBrandAlignEnd =
    band === "default"
      ? (defaultEditorialAlignEndProp !== undefined ? defaultEditorialAlignEndProp : brandTrailing)
      : brandTrailing;

  const logoRow =
    showLogo ? (
      <Link
        href="/"
        className={clsx(
          "flex max-w-full flex-nowrap items-center group w-fit min-w-0",
          showWordmark && "gap-3.5",
          band === "thesis" && "opacity-[0.92]",
          (band === "default" ? defaultBrandAlignEnd : brandTrailing) && "lg:ml-auto",
        )}
      >
        <HbmLogo
          size={band === "thesis" ? 40 : 38}
          className="shrink-0 text-gold/60 group-hover:text-gold transition-all duration-400"
        />
        {showWordmark ? (
          <div className="flex flex-col leading-none">
            <span
              className={`${displayFont} inline-flex min-w-0 flex-nowrap items-baseline text-lg font-light uppercase text-cream/70 group-hover:text-cream`}
            >
              <span className="inline-flex items-baseline gap-x-0.5 md:gap-x-1">
                <span className="tracking-[0.22em] transition-colors duration-300">HBM</span>
                <span className="shrink-0 tracking-tight text-gold/60 group-hover:text-gold transition-colors duration-300">
                  &
                </span>
              </span>
              <span className="tracking-[0.22em] pl-1.5 transition-colors duration-300 md:pl-2">Company</span>
            </span>
          </div>
        ) : null}
      </Link>
    ) : null;

  const defaultEditorial = (
    <div className="relative mt-2 flex flex-col gap-5 md:mt-3 md:gap-6">
      <p
        className={clsx(
          `${displayFont} w-full text-pretty text-[1.65rem] font-light italic leading-[1.06] tracking-[-0.02em] text-cream/[0.68] antialiased sm:text-[2.05rem] md:text-[2.3rem] lg:text-[2.55rem] xl:text-[2.8rem] [text-shadow:0_2px_40px_rgba(0,0,0,0.45)]`,
          defaultBrandAlignEnd && "lg:ml-auto lg:max-w-max lg:text-right",
        )}
      >
        Institutional{" "}
        <span className="font-semibold italic text-gold/40 [text-shadow:0_2px_32px_rgba(0,0,0,0.4)]">Reserve</span>
      </p>

      <p
        className={clsx(
          `${uiFont} max-w-lg text-[12px] uppercase tracking-[0.15em] leading-[1.88] text-silver-dim/58 md:max-w-2xl md:text-[14px] lg:text-[15px] md:tracking-[0.14em]`,
          defaultBrandAlignEnd && "lg:ml-auto",
        )}
      >
        An enterprise holdings company committed to the infrastructure of decentralized finance and digital
        assets—organizing capital around rails you can verify and durable governance.
      </p>
    </div>
  );

  const thesisEditorial = (
    <div className="relative flex flex-col gap-3 md:gap-4">
      <div>
        <p className={`${uiFont} text-label-xs uppercase tracking-[0.38em] text-gold/55`}>— thesis</p>
        <div className="mt-2 space-y-1 md:mt-2.5">
          <p
            className={clsx(
              `${displayFont} max-w-[18ch] text-[clamp(1.85rem,4.2vw,3rem)] font-light italic leading-[1.04] tracking-[-0.03em] text-cream/[0.92] antialiased [text-shadow:0_2px_56px_rgba(0,0,0,0.6)]`,
              brandTrailing && "lg:ml-auto",
            )}
          >
            HBM: Public Offering.
          </p>
          <p
            className={clsx(
              `${displayFont} max-w-[22ch] text-[clamp(1.75rem,3.9vw,2.75rem)] font-light italic leading-[1.06] tracking-[-0.025em] text-gold/50 antialiased [text-shadow:0_2px_44px_rgba(0,0,0,0.5)]`,
              brandTrailing && "lg:ml-auto",
            )}
          >
            All Rights Reserved
          </p>
        </div>
      </div>

      <p
        className={clsx(
          `${uiFont} max-w-md text-[10px] uppercase tracking-[0.28em] text-silver-dim/45`,
          brandTrailing && "lg:ml-auto",
        )}
      >
        Long horizon · Proof-first · Selective deployment
      </p>

      <p
        className={clsx(
          `${uiFont} max-w-md border-t border-white/[0.08] pt-2 text-[10px] uppercase tracking-[0.24em] text-silver-dim/40 md:pt-2.5`,
          brandTrailing && "lg:ml-auto",
        )}
      >
        Full Discretion
      </p>
    </div>
  );

  const signupThesis = (
    <VotingProtocolSignup
      typography={typography}
      instanceId={instanceId}
      embedded
      eyebrow="Qualified access"
      heading={
        <>
          Speak with the <span className="font-semibold italic">house</span>
        </>
      }
      description={
        <>
          Request a confidential introduction when your mandate intersects ours. By submitting, you agree we may contact
          you to assess fit, diligence, and related stewardship matters. See our{" "}
          <a href="/privacy" className="text-gold/50 hover:text-gold/70 transition-colors">
            Privacy policy
          </a>
          .
        </>
      }
      descriptionClassName={qualifiedFormNoteClassName}
      submitLabel="Request Access"
      successMessage="If there is a fit, the house will follow up by email."
    />
  );

  const thesisRightStack = (
    <div className="flex w-full min-w-0 max-w-lg flex-col">{signupThesis}</div>
  );

  const brandColumn = (
    <div
      className={clsx(
        "flex w-full min-w-0 flex-col gap-8",
        band === "default" && "max-w-xl",
        band === "thesis" && "max-w-2xl",
        band === "thesis" && brandTrailing && "lg:justify-self-end lg:items-end lg:text-right",
        band === "default" && defaultBrandAlignEnd && "lg:justify-self-end lg:items-end lg:text-right",
        band === "default" && !defaultBrandAlignEnd && "lg:justify-self-start lg:items-start lg:text-left",
      )}
    >
      {band === "default" && logoRow}
      {band === "thesis" ? thesisEditorial : defaultEditorial}
    </div>
  );

  const thesisVotingColumn = (
    <div className="w-full min-w-0 self-start lg:justify-self-stretch">{thesisRightStack}</div>
  );

  if (band === "default") {
    return (
      <div className="w-full border-b border-white/[0.04] py-12 md:py-16 lg:py-20">
        <BrandBandCardChrome className="p-6 md:p-8 lg:p-10">
          <div className="relative z-10 grid grid-cols-1 gap-10 md:gap-12 lg:grid-cols-2 lg:items-start lg:gap-0">
            {brandSide === "left" ? (
              <>
                <div className="min-w-0 lg:pr-10 xl:pr-12">{brandColumn}</div>
                <div className="min-w-0 border-t border-white/[0.08] pt-10 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-10 xl:pl-12">
                  <VotingProtocolSignup
                    typography={typography}
                    instanceId={instanceId}
                    embedded
                    fullDiscretion
                    descriptionClassName={qualifiedFormNoteClassName}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="min-w-0 border-t border-white/[0.08] pt-10 lg:border-r lg:border-t-0 lg:pt-0 lg:pr-10 xl:pr-12 lg:[order-1]">
                  <VotingProtocolSignup
                    typography={typography}
                    instanceId={instanceId}
                    embedded
                    fullDiscretion
                    descriptionClassName={qualifiedFormNoteClassName}
                  />
                </div>
                <div className="min-w-0 lg:pl-10 xl:pl-12 lg:[order-2]">{brandColumn}</div>
              </>
            )}
          </div>
        </BrandBandCardChrome>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-white/[0.04]">
      <div
        className={clsx(
          "grid w-full grid-cols-1 lg:items-start",
          "gap-5 py-4 md:gap-x-8 md:gap-y-5 md:py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-x-10 xl:gap-x-12",
        )}
      >
        {brandSide === "left" ? (
          <>
            {brandColumn}
            {thesisVotingColumn}
          </>
        ) : (
          <>
            {thesisVotingColumn}
            {brandColumn}
          </>
        )}
      </div>
      <ThesisAccessTiles uiFont={uiFont} />
    </div>
  );
}

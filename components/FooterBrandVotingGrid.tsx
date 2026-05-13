"use client";

import clsx from "clsx";
import Link from "next/link";
import HbmLogo from "./HbmLogo";
import VotingProtocolSignup from "./VotingProtocolSignup";

type BrandSide = "left" | "right";
type Band = "default" | "thesis";

export default function FooterBrandVotingGrid({
  typography = "luxury",
  instanceId = "footer",
  brandSide = "right",
  showLogo = true,
  showWordmark = true,
  band = "default",
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
}) {
  const displayFont = typography === "robinhood" ? "font-robinhood" : "font-cormorant";
  const uiFont = typography === "robinhood" ? "font-robinhood" : "font-mono-hbm";

  const brandTrailing = brandSide === "right";

  const logoRow =
    showLogo ? (
      <Link
        href="/"
        className={clsx(
          "flex max-w-full flex-nowrap items-center group w-fit min-w-0",
          showWordmark && "gap-3.5",
          band === "thesis" && "opacity-[0.92]",
          brandTrailing && "lg:ml-auto",
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
    <div className="relative mt-2 flex flex-col gap-8 md:mt-3">
      <div className="space-y-2.5">
        <p
          className={clsx(
            `${displayFont} max-w-[20ch] text-[clamp(1.85rem,4.15vw,2.9rem)] font-light italic leading-[1.06] tracking-[-0.02em] text-cream/[0.9] antialiased [text-shadow:0_2px_48px_rgba(0,0,0,0.55),0_0_60px_rgba(180,175,170,0.06)]`,
            brandTrailing && "lg:ml-auto",
          )}
        >
          Built to Last
        </p>
        <p
          className={clsx(
            `${displayFont} max-w-[20ch] text-[clamp(1.85rem,4.15vw,2.9rem)] font-light italic leading-[1.06] tracking-[-0.02em] text-gold/55 antialiased [text-shadow:0_2px_40px_rgba(0,0,0,0.45)]`,
            brandTrailing && "lg:ml-auto",
          )}
        >
          Ready to Scale
        </p>
      </div>

      <div className="flex max-w-lg flex-col gap-3.5">
        <p
          className={clsx(
            `${uiFont} text-[12px] uppercase tracking-[0.15em] leading-[1.9] text-silver-dim/75 md:text-[13px] md:tracking-[0.14em]`,
            brandTrailing && "lg:ml-auto",
          )}
        >
          An enterprise holdings company committed to the infrastructure of decentralized finance and digital assets.
        </p>

        <p
          className={clsx(
            `${uiFont} border-t border-white/[0.07] pt-3 text-[11px] uppercase tracking-[0.2em] text-silver-dim/42 md:pt-3.5 md:text-[11.5px]`,
            brandTrailing && "lg:ml-auto",
          )}
        >
          Full Discretion
        </p>
      </div>
    </div>
  );

  const thesisEditorial = (
    <div
      className={clsx(
        "relative flex flex-col gap-8 md:gap-10",
        !brandTrailing &&
          "border-l border-gold/[0.16] pl-6 md:pl-10 [box-shadow:inset_1px_0_0_rgba(180,175,170,0.08)]",
        brandTrailing &&
          "lg:border-l-0 lg:border-r lg:border-gold/[0.16] lg:pl-0 lg:pr-10 lg:[box-shadow:inset_-1px_0_0_rgba(180,175,170,0.08)]",
      )}
    >
      <div>
        <p className={`${uiFont} text-label-xs uppercase tracking-[0.38em] text-gold/55`}>— House thesis</p>
        <div className="mt-5 space-y-2 md:mt-7">
          <p
            className={clsx(
              `${displayFont} max-w-[18ch] text-[clamp(1.85rem,4.2vw,3rem)] font-light italic leading-[1.04] tracking-[-0.03em] text-cream/[0.92] antialiased [text-shadow:0_2px_56px_rgba(0,0,0,0.6)]`,
              brandTrailing && "lg:ml-auto",
            )}
          >
            Proof over noise.
          </p>
          <p
            className={clsx(
              `${displayFont} max-w-[22ch] text-[clamp(1.75rem,3.9vw,2.75rem)] font-light italic leading-[1.06] tracking-[-0.025em] text-gold/50 antialiased [text-shadow:0_2px_44px_rgba(0,0,0,0.5)]`,
              brandTrailing && "lg:ml-auto",
            )}
          >
            Endurance over velocity.
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
          `${displayFont} max-w-xl text-[0.95rem] font-light leading-[1.82] tracking-[-0.01em] text-cream/62 md:text-base md:leading-[1.84]`,
          brandTrailing && "lg:ml-auto",
        )}
      >
        Attention is finite by design. We engage when mandates intersect what we build and hold: decentralized rails,
        durable proof surfaces, and discretion measured in years—not impressions.
      </p>

      <p
        className={clsx(
          `${uiFont} max-w-md border-t border-white/[0.08] pt-4 text-[10px] uppercase tracking-[0.24em] text-silver-dim/40 md:pt-5`,
          brandTrailing && "lg:ml-auto",
        )}
      >
        Full Discretion
      </p>
    </div>
  );

  const signupDefault = <VotingProtocolSignup typography={typography} instanceId={instanceId} />;

  const signupThesis = (
    <VotingProtocolSignup
      typography={typography}
      instanceId={instanceId}
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
      descriptionClassName={`${uiFont} mt-3 text-[11px] md:text-[12px] font-light leading-[1.82] tracking-[0.04em] text-silver-dim/65 normal-case`}
      submitLabel="Request Access"
      successMessage="If there is a fit, the house will follow up by email."
    />
  );

  const thesisRightStack = (
    <div className="flex w-full min-w-0 max-w-lg flex-col gap-8 md:gap-9">
      <p className={`${displayFont} text-[0.95rem] font-light leading-[1.82] tracking-[-0.01em] text-cream/72 md:text-base md:leading-[1.84]`}>
        We organize capital around infrastructure that still makes sense when the timeline goes quiet—custody you can
        document, commitments you can re-verify, and governance that does not reset every funding season.
      </p>
      {signupThesis}
    </div>
  );

  const brandColumn = (
    <div
      className={clsx(
        "flex w-full min-w-0 flex-col gap-8",
        band === "default" && "max-w-xl",
        band === "thesis" && "max-w-2xl",
        brandTrailing && "lg:justify-self-end lg:items-end lg:text-right",
      )}
    >
      {band === "default" && logoRow}
      {band === "thesis" ? thesisEditorial : defaultEditorial}
    </div>
  );

  const votingColumn = (
    <div
      className={clsx(
        "w-full min-w-0 self-start",
        band === "thesis"
          ? "lg:justify-self-stretch"
          : brandTrailing
            ? "lg:justify-self-start"
            : "lg:justify-self-end",
      )}
    >
      {band === "thesis" ? thesisRightStack : signupDefault}
    </div>
  );

  return (
    <div
      className={clsx(
        "grid w-full grid-cols-1 border-b border-white/[0.04] lg:items-start",
        band === "thesis"
          ? "gap-10 py-12 md:gap-x-12 md:gap-y-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,36rem)] lg:gap-x-14 xl:gap-x-16"
          : "gap-12 py-16 md:gap-16 md:py-20 lg:grid-cols-2 lg:gap-16",
      )}
    >
      {brandSide === "left" ? (
        <>
          {brandColumn}
          {votingColumn}
        </>
      ) : (
        <>
          {votingColumn}
          {brandColumn}
        </>
      )}
    </div>
  );
}

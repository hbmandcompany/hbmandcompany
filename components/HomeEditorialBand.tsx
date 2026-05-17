"use client";

import type { ReactNode } from "react";
import SectionReveal from "@/components/SectionReveal";

/** Consistent homepage editorial band with section break (hero → desk rhythm). */
export function HomeEditorialBand({
  children,
  ariaLabel,
  showBreak = true,
  nested = false,
}: {
  children: ReactNode;
  ariaLabel: string;
  showBreak?: boolean;
  /** Second panel inside `.home-hero-culture-unified__card` — no outer band padding or section break. */
  nested?: boolean;
}) {
  const inner = (
    <div className="home-editorial-band__inner mx-auto w-full max-w-[1440px] px-6 md:px-12">
      <SectionReveal>{children}</SectionReveal>
    </div>
  );

  if (nested) {
    return (
      <section className="home-editorial-band home-editorial-band--nested" aria-label={ariaLabel}>
        {inner}
      </section>
    );
  }

  return (
    <>
      {showBreak ? <hr className="home-section-break" aria-hidden /> : null}
      <section className="home-editorial-band" aria-label={ariaLabel}>
        {inner}
      </section>
    </>
  );
}

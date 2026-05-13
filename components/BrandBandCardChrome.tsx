"use client";

import clsx from "clsx";
import type { ReactNode } from "react";

/** Same shell as the default `FooterBrandVotingGrid` band: gradient, border, gold orb, inset highlight. */
export default function BrandBandCardChrome({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-xl border border-white/[0.09] bg-gradient-to-b from-obsidian/95 via-void/90 to-void/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.55)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-gold/[0.04] blur-3xl md:h-40 md:w-40"
        aria-hidden
      />
      {children}
    </div>
  );
}

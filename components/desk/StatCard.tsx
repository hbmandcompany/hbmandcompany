"use client";

import Link from "next/link";
import { clsx } from "clsx";

export function StatCard({
  title,
  children,
  footerHref,
  footerLabel,
}: {
  title: string;
  children: React.ReactNode;
  footerHref?: string;
  footerLabel?: string;
}) {
  return (
    <section className={clsx("glass-panel-dark p-5", "border border-white/[0.04]")}>
      <div className="mb-4 font-robinhood text-[11px] uppercase tracking-[0.24em] text-silver-dim/40">
        {title}
      </div>
      {children}
      {footerHref && footerLabel ? (
        <div className="mt-5">
          <Link
            href={footerHref}
            className="font-robinhood text-[11px] text-silver-dim/40 transition-colors hover:text-silver-dim"
          >
            {footerLabel} →
          </Link>
        </div>
      ) : null}
    </section>
  );
}


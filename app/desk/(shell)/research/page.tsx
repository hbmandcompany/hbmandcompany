"use client";

import Link from "next/link";

export default function DeskResearchPage() {
  return (
    <div className="px-6 py-6">
      <div className="glass-panel-dark p-6">
        <div className="font-cormorant text-2xl font-semibold text-cream/90">Research</div>
        <p className="mt-3 font-robinhood text-[13px] text-silver-dim/60">
          Research is surfaced alongside briefs under Intelligence in this build.
        </p>
        <div className="mt-6">
          <Link href="/desk/intelligence" className="gold-outline-btn inline-block px-6 py-2 font-robinhood text-[11px] uppercase tracking-[0.26em]">
            Open intelligence
          </Link>
        </div>
      </div>
    </div>
  );
}


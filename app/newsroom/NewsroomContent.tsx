"use client";

import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import {
  BRIEFING_UPDATED_AT,
  NEWSROOM_BRIEFINGS,
  getBriefingById,
  getBriefingUpdatedLabel,
} from "@/lib/newsroomBriefings";

export default function NewsroomContent({ selectedId }: { selectedId: string | null }) {
  const selected = selectedId ? getBriefingById(selectedId) : undefined;
  const ordered = selected
    ? [selected, ...NEWSROOM_BRIEFINGS.filter((b) => b.id !== selected.id)]
    : [...NEWSROOM_BRIEFINGS];

  useEffect(() => {
    if (!selectedId) return;
    document.getElementById("selected-briefing")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [selectedId]);

  return (
    <div className="min-h-screen bg-void text-cream">
      <NavBar />

      <main className="mx-auto w-full max-w-[900px] px-6 pb-24 pt-[max(6.5rem,env(safe-area-inset-top,0px)+4.5rem)] md:px-12 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+5rem)]">
        <header className="border-b border-white/[0.08] pb-10">
          <p className="font-mono-hbm text-[10px] font-medium uppercase tracking-[0.34em] text-gold/55">
            News room
          </p>
          <h1 className="mt-3 font-cormorant text-3xl font-light leading-tight tracking-[-0.02em] text-cream/90 md:text-[2.35rem]">
            Briefings
          </h1>
          <p className="mt-3 font-mono-hbm text-[8px] uppercase tracking-[0.22em] text-silver-dim/42">
            <time dateTime={BRIEFING_UPDATED_AT}>Updated {getBriefingUpdatedLabel(BRIEFING_UPDATED_AT)}</time>
          </p>
          <p className="mt-6 max-w-xl text-pretty text-body-md leading-relaxed text-silver-dim/72">
            Read-only desk notes and governance context surfaced from the same feed as the home carousel. Select a story
            below or return to{" "}
            <Link href="/" className="text-gold/55 underline decoration-gold/25 underline-offset-4 hover:text-gold/75">
              the house
            </Link>
            .
          </p>
        </header>

        <ul className="mt-12 flex flex-col gap-6 md:mt-14 md:gap-8">
          {ordered.map((b) => {
            const isSelected = selectedId === b.id;
            return (
              <li key={b.id} id={isSelected ? "selected-briefing" : undefined}>
                <article
                  className={clsx(
                    "rounded-xl border bg-gradient-to-b from-obsidian/90 to-void/95 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:p-8",
                    isSelected
                      ? "border-gold/35 ring-1 ring-gold/20"
                      : "border-white/[0.08] transition-colors hover:border-white/[0.12]",
                  )}
                >
                  {isSelected ? (
                    <p className="font-mono-hbm text-[8px] font-semibold uppercase tracking-[0.2em] text-digital-80s">
                      Selected briefing
                    </p>
                  ) : null}
                  <p className="mt-2 font-mono-hbm text-[9px] font-medium uppercase tracking-[0.24em] text-gold/50">
                    {b.desk}
                  </p>
                  <h2 className="mt-2 font-cormorant text-xl font-semibold leading-snug tracking-[-0.02em] text-cream/[0.93] md:text-2xl md:leading-[1.15]">
                    {b.headline}
                  </h2>
                  <p className="mt-4 border-t border-white/[0.06] pt-4 font-mono-hbm text-[10px] font-light leading-relaxed tracking-[0.04em] text-silver-dim/72 md:text-[11px]">
                    {b.dek}
                  </p>
                  <p className="mt-5 font-mono-hbm text-[9px] uppercase tracking-[0.12em] text-silver-dim/38">
                    <Link
                      href={`/newsroom?story=${b.id}`}
                      className="text-gold/50 transition-colors hover:text-gold/70"
                    >
                      Permalink · Story {b.id}
                    </Link>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </main>

      <FooterDark />
    </div>
  );
}

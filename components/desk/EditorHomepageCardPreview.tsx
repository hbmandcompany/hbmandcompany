"use client";

import { clsx } from "clsx";
import { ArticleWeightBadge } from "./ArticleWeightBadge";

export function EditorHomepageCardPreview({
  headline,
  dek,
  section,
  weight,
}: {
  headline: string;
  dek: string;
  section: string;
  weight: string;
}) {
  const displayHeadline = headline.trim() || "Untitled story";
  const displayDek = dek.trim() || "Your dek will appear on the homepage card.";

  return (
    <section className={clsx("rounded-md border p-4", "border-[#bca882]/50 bg-[#f2e6d1]")}>
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", "text-[#786347]")}>
        Homepage card preview
      </div>
      <article className="mt-3 rounded-md border border-[#ccb896]/40 bg-[#ebe0cc] p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <span className="font-mono-hbm text-[9px] uppercase tracking-[0.2em] text-[#8d6f4d]">
            {section || "Section"}
          </span>
          <ArticleWeightBadge weight={weight || null} />
        </div>
        <h3 className="font-cormorant text-xl font-light leading-tight text-[#20160d]">{displayHeadline}</h3>
        <p className="mt-2 line-clamp-2 font-robinhood text-[12px] leading-relaxed text-[#4c3b28]">{displayDek}</p>
      </article>
    </section>
  );
}

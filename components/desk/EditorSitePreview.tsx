"use client";

import type { EditorImageState } from "./EditorImagePanel";
import { ArticleWeightBadge } from "./ArticleWeightBadge";

export function EditorSitePreview({
  headline,
  dek,
  body,
  section,
  byline,
  image,
  weight,
}: {
  headline: string;
  dek: string;
  body: string;
  section: string;
  byline: string;
  image: EditorImageState | null;
  weight?: string | null;
}) {
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const displayHeadline = headline.trim() || "Untitled story";
  const displayDek = dek.trim() || "Your dek will appear here as the story summary on the site.";
  const lede = paragraphs[0] ?? "Your opening paragraph will render here in Cormorant italic, matching the live newspaper article layout.";
  const rest = paragraphs.slice(1);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-[1.25rem] border border-[#c8b698]/40 bg-[#f2e6d1] shadow-[0_24px_80px_rgba(32,22,13,0.18)]">
      <div className="border-b border-[#bca882]/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0))] px-6 py-4">
        <p className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-[#786347]">Article page · HBM Newspaper</p>
        <p className="mt-1 font-robinhood text-[11px] text-[#6a5843]">How readers see the full story at /newspaper.</p>
      </div>

      <article className="px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">
            {section || "Section"} · Editorial Newsroom
          </p>
          <ArticleWeightBadge weight={weight} />
        </div>
        <h1 className="mt-3 font-cormorant text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#1f140c] md:text-[2.5rem]">
          {displayHeadline}
        </h1>
        <p className="mt-4 max-w-3xl border-b border-[#ccb896]/35 pb-5 font-luxury-sans text-[1.05rem] leading-relaxed text-[#4c3b28]">
          {displayDek}
        </p>

        <div className="mt-5 flex flex-wrap gap-5 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-[#6f5b45]">
          <span>{byline}</span>
          <span>Preview · Not published</span>
        </div>

        {image ? (
          <figure className="mt-8 overflow-hidden rounded-xl border border-[#bea884]/40 bg-[#eadbc1]/55">
            {/* eslint-disable-next-line @next/next/no-img-element -- blob preview URL */}
            <img
              src={image.url}
              alt={image.alt || displayHeadline}
              className="aspect-[16/10] w-full object-cover"
            />
            {image.caption ? (
              <figcaption className="border-t border-[#ccb896]/35 px-4 py-3 font-luxury-sans text-[0.85rem] leading-relaxed text-[#574633]">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : (
          <div className="mt-8 flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-[#bea884]/50 bg-[#eadbc1]/40">
            <p className="font-robinhood text-[12px] text-[#8d6f4d]">Upload a hero image to preview placement</p>
          </div>
        )}

        <p className="mt-8 max-w-3xl font-cormorant text-[1.25rem] font-medium italic leading-[1.45] text-[#2b1d11] md:text-[1.35rem]">
          {lede}
        </p>

        {rest.length > 0 ? (
          <div className="mt-6 space-y-5">
            {rest.map((paragraph) => (
              <p key={paragraph} className="font-luxury-sans text-[1rem] leading-[1.9] text-[#2f2419] md:text-[1.05rem]">
                {paragraph}
              </p>
            ))}
          </div>
        ) : null}
      </article>
    </div>
  );
}

"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { clsx } from "clsx";
import type { EditorImageState } from "./EditorImagePanel";
import { ArticleWeightBadge } from "./ArticleWeightBadge";

function splitBody(body: string) {
  const paragraphs = body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    lede: paragraphs[0] ?? "",
    rest: paragraphs.slice(1),
  };
}

function joinBody(lede: string, rest: string) {
  const parts = [lede.trim(), ...rest.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)].filter(Boolean);
  return parts.join("\n\n");
}

function AutoTextarea({
  value,
  onChange,
  placeholder,
  className,
  minRows = 1,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minRows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={minRows}
      className={clsx(
        "block w-full resize-none overflow-hidden border-0 bg-transparent outline-none ring-0 focus:ring-0",
        "placeholder:text-[#9a8262]/55",
        className,
      )}
    />
  );
}

export function LiveArticleEditor({
  headline,
  dek,
  body,
  section,
  byline,
  image,
  weight,
  onHeadlineChange,
  onDekChange,
  onBodyChange,
}: {
  headline: string;
  dek: string;
  body: string;
  section: string;
  byline: string;
  image: EditorImageState | null;
  weight?: string | null;
  onHeadlineChange: (value: string) => void;
  onDekChange: (value: string) => void;
  onBodyChange: (value: string) => void;
}) {
  const { lede, rest } = useMemo(() => splitBody(body), [body]);
  const restText = rest.join("\n\n");
  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).toUpperCase(),
    [],
  );

  function updateLede(nextLede: string) {
    onBodyChange(joinBody(nextLede, restText));
  }

  function updateRest(nextRest: string) {
    onBodyChange(joinBody(lede, nextRest));
  }

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-[#c8b698]/40 bg-[#f2e6d1] shadow-[0_24px_80px_rgba(32,22,13,0.18)]">
      <div className="border-b border-[#bca882]/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0))] px-6 py-5 md:px-10 md:py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono-hbm text-[10px] uppercase tracking-[0.35em] text-[#786347]">Live Edition</p>
            <h1 className="mt-2 font-cormorant text-[2rem] font-semibold leading-none tracking-[-0.04em] text-[#20160d] md:text-[2.75rem]">
              The HBM Newspaper
            </h1>
            <p className="mt-2 max-w-2xl font-luxury-sans text-[0.92rem] leading-relaxed text-[#4b3b29] md:text-[0.98rem]">
              Published directly from the editorial desk. Edit inline — what you type is what readers see at /newspaper.
            </p>
          </div>
          <div className="text-right font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-[#6a5843]">
            <p className="text-[#9a8262]">Update</p>
            <p className="mt-1">{today}</p>
          </div>
        </div>
      </div>

      <article className="px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">
            {section || "Section"} · Editorial Newsroom
          </p>
          <ArticleWeightBadge weight={weight} />
        </div>

        <AutoTextarea
          value={headline}
          onChange={onHeadlineChange}
          placeholder="Headline"
          minRows={2}
          className="mt-3 font-cormorant text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#1f140c] md:text-[2.85rem]"
        />

        <AutoTextarea
          value={dek}
          onChange={onDekChange}
          placeholder="Dek — summary line beneath the headline"
          minRows={2}
          className="mt-4 max-w-3xl border-b border-[#ccb896]/35 pb-5 font-luxury-sans text-[1.05rem] leading-relaxed text-[#4c3b28] md:text-[1.15rem]"
        />

        <div className="mt-5 flex flex-wrap gap-5 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-[#6f5b45]">
          <span>{byline}</span>
          <span>{today}</span>
          <span>Dallas desk treatment</span>
        </div>

        {image ? (
          <figure className="mt-8 overflow-hidden rounded-xl border border-[#bea884]/40 bg-[#eadbc1]/55">
            {/* eslint-disable-next-line @next/next/no-img-element -- blob preview URL */}
            <img
              src={image.url}
              alt={image.alt || headline || "Hero image"}
              className="aspect-[16/10] w-full object-cover"
            />
            {image.caption ? (
              <figcaption className="border-t border-[#ccb896]/35 px-4 py-3 font-luxury-sans text-[0.85rem] leading-relaxed text-[#574633]">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        ) : null}

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="min-w-0 space-y-5">
            <AutoTextarea
              value={lede}
              onChange={updateLede}
              placeholder="Opening lede — renders in Cormorant italic, matching the live article page."
              minRows={2}
              className="max-w-3xl font-cormorant text-[1.25rem] font-medium italic leading-[1.45] text-[#2b1d11] md:text-[1.45rem]"
            />

            <AutoTextarea
              value={restText}
              onChange={updateRest}
              placeholder="Body copy — separate paragraphs with a blank line. Each block renders as a body paragraph on the live article page."
              minRows={8}
              className="font-luxury-sans text-[1rem] leading-[1.9] text-[#2f2419] md:text-[1.05rem]"
            />
          </div>

          <aside className="hidden rounded-2xl border border-[#bea884]/40 bg-[#eadbc1]/55 p-5 xl:block">
            <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">Signal box</p>
            <p className="mt-4 font-luxury-sans text-[0.85rem] leading-relaxed text-[#574633]">
              Metrics and pull quotes from published briefings appear here on the live article page.
            </p>
          </aside>
        </div>
      </article>
    </div>
  );
}

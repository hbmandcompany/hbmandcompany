"use client";

import { clsx } from "clsx";
import type { EditorImageState } from "./EditorImagePanel";

export type EditorHomepagePreviewProps = {
  headline: string;
  dek: string;
  category: string;
  image: EditorImageState | null;
  /** Sidebar uses a single compact card; site preview shows all applicable layouts. */
  compact?: boolean;
};

function PreviewImageWell({
  image,
  headline,
  aspectClass,
}: {
  image: EditorImageState | null;
  headline: string;
  aspectClass: string;
}) {
  return (
    <div className={clsx("relative w-full shrink-0 overflow-hidden bg-midnight", aspectClass)}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element -- blob URLs in desk preview
        <img src={image.url} alt={image.alt || headline} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-midnight to-void" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 to-transparent" />
    </div>
  );
}

/** Matches `RecordThumbCard` / `DmnTopCard` on the public homepage (four-up grid). */
export function HomepagePreviewGridCard({
  headline,
  dek,
  category,
  image,
  showDek = true,
}: Omit<EditorHomepagePreviewProps, "compact"> & { showDek?: boolean }) {
  const displayHeadline = headline.trim() || "Untitled story";
  const displayDek = dek.trim() || "Your dek appears here on story cards across the homepage.";
  const displayCategory = category.trim() || "Section";

  return (
    <div className="pointer-events-none flex min-h-0 flex-col overflow-hidden border border-white/[0.08] bg-obsidian">
      <PreviewImageWell image={image} headline={displayHeadline} aspectClass="aspect-[16/11]" />
      <div className="flex flex-1 flex-col gap-1.5 p-3 md:p-3.5">
        <span className="font-mono-hbm text-[7px] uppercase tracking-[0.26em] text-gold/58">{displayCategory}</span>
        <h3 className="font-cormorant line-clamp-3 text-base font-light leading-tight text-cream/88 md:text-[1.05rem]">
          {displayHeadline}
        </h3>
        {showDek && dek.trim() ? (
          <p className="font-robinhood line-clamp-2 text-[11px] leading-snug text-silver-dim/65">{displayDek}</p>
        ) : showDek ? (
          <p className="font-robinhood line-clamp-2 text-[11px] italic leading-snug text-silver-dim/45">
            Add a dek to show summary text on grid cards.
          </p>
        ) : null}
        <span className="mt-auto font-mono-hbm text-[7px] uppercase tracking-[0.2em] text-silver-dim/40">Preview</span>
      </div>
    </div>
  );
}

/** Matches `DmnEditorialGrid` business lead — image + headline + full dek. */
export function HomepagePreviewLeadCard({
  headline,
  dek,
  category,
  image,
}: Omit<EditorHomepagePreviewProps, "compact">) {
  const displayHeadline = headline.trim() || "Untitled story";
  const displayDek = dek.trim() || "Lead stories show the full dek beside the hero image.";
  const displayCategory = category.trim() || "Section";

  return (
    <div className="pointer-events-none grid h-full grid-cols-1 overflow-hidden rounded-lg border border-white/[0.09] bg-obsidian md:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="relative min-h-[160px] md:min-h-[200px]">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image.url} alt={image.alt || displayHeadline} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-midnight to-void" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
      </div>
      <div className="flex flex-col justify-center gap-3 p-5 md:p-6">
        <span className="font-mono-hbm text-[8px] uppercase tracking-[0.26em] text-gold/62">{displayCategory}</span>
        <h3 className="font-cormorant text-xl font-light leading-tight text-cream/90 md:text-2xl">{displayHeadline}</h3>
        <p className="font-robinhood line-clamp-5 text-sm leading-relaxed text-silver-dim/75">{displayDek}</p>
      </div>
    </div>
  );
}

/** Matches `DmnTextStory` / `RecordHeadlineRow` when no hero image is set. */
export function HomepagePreviewTextRow({
  headline,
  category,
}: {
  headline: string;
  category: string;
}) {
  const displayHeadline = headline.trim() || "Untitled story";
  const displayCategory = category.trim() || "Section";

  return (
    <div className="pointer-events-none block border-b border-white/[0.06] py-3.5 last:border-b-0">
      <span className="font-mono-hbm text-[8px] uppercase tracking-[0.26em] text-gold/62">{displayCategory}</span>
      <p className="mt-1 line-clamp-3 font-cormorant text-sm font-light leading-snug text-cream/85 md:text-[15px]">
        {displayHeadline}
      </p>
    </div>
  );
}

export function EditorHomepagePreview({ headline, dek, category, image, compact = false }: EditorHomepagePreviewProps) {
  const hasImage = Boolean(image?.url);
  const hasDek = Boolean(dek.trim());

  if (compact) {
    return (
      <section className={clsx("rounded-md border p-4", "border-[#bca882]/50 bg-[#f2e6d1]")}>
        <div className="font-robinhood text-[10px] uppercase tracking-[0.2em] text-[#786347]">Homepage preview</div>
        <p className="mt-1 font-robinhood text-[11px] leading-relaxed text-[#6a5843]">
          Grid card on the public site (dark front page).
        </p>
        <div className="mt-3 overflow-hidden rounded-md ring-1 ring-[#ccb896]/40">
          <HomepagePreviewGridCard headline={headline} dek={dek} category={category} image={image} />
        </div>
        {!hasDek ? (
          <p className="mt-2 font-robinhood text-[10px] text-[#8d6f4d]">Add a dek to show description on cards.</p>
        ) : null}
        {!hasImage ? (
          <p className="mt-1 font-robinhood text-[10px] text-[#8d6f4d]">Upload a hero image for photo wells on the homepage.</p>
        ) : null}
      </section>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-white/[0.1] bg-void shadow-[0_24px_80px_rgba(2,2,5,0.45)]">
      <div className="border-b border-white/[0.08] bg-obsidian/80 px-6 py-4">
        <p className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-gold/62">Homepage preview · HBM Front Page</p>
        <p className="mt-1 font-robinhood text-[11px] text-silver-dim/65">
          How your headline, dek, and hero image appear in homepage modules after publish.
        </p>
      </div>

      <div className="space-y-8 px-4 py-6 md:px-6 md:py-8">
        <div>
          <h4 className="mb-3 font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-gold/55">Editorial grid card</h4>
          <p className="mb-3 font-robinhood text-[11px] text-silver-dim/55">
            Four-up rows and wire grids — image, headline, and dek (when provided).
          </p>
          <div className="max-w-sm">
            <HomepagePreviewGridCard headline={headline} dek={dek} category={category} image={image} />
          </div>
        </div>

        {hasImage ? (
          <div>
            <h4 className="mb-3 font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-gold/55">Lead story module</h4>
            <p className="mb-3 font-robinhood text-[11px] text-silver-dim/55">
              Business / markets lead blocks — larger image with headline and full dek.
            </p>
            <HomepagePreviewLeadCard headline={headline} dek={dek} category={category} image={image} />
          </div>
        ) : (
          <div>
            <h4 className="mb-3 font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-gold/55">Headline list (no image)</h4>
            <p className="mb-3 font-robinhood text-[11px] text-silver-dim/55">
              Without a hero image, stories appear as text-only headlines in sidebar lists — dek is not shown here.
            </p>
            <div className="max-w-md rounded-lg border border-white/[0.08] bg-obsidian/80 px-4 md:px-5">
              <HomepagePreviewTextRow headline={headline} category={category} />
            </div>
          </div>
        )}

        {hasImage && !hasDek ? (
          <p className="font-robinhood text-[11px] text-gold/70">
            Tip: Add a dek so summary text appears under the headline on grid cards and lead modules.
          </p>
        ) : null}
      </div>
    </div>
  );
}

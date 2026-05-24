"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { clsx } from "clsx";
import { useDesk } from "@/components/desk/DeskContext";
import { deskPaper } from "@/components/desk/desk-paper";
import { PaperStatusPill } from "@/components/desk/PaperStatusPill";
import { EditorImagePanel, type EditorImageState } from "@/components/desk/EditorImagePanel";
import { EditorSitePreview } from "@/components/desk/EditorSitePreview";
import { stories } from "@/components/desk/desk-stories-data";

const defaultDraft = {
  section: "Finance",
  status: "DRAFT" as const,
  tone: "neutral" as const,
};

type EditorView = "write" | "preview";

export default function StoryEditorPage() {
  const searchParams = useSearchParams();
  const storyId = searchParams.get("story");
  const { user } = useDesk();

  const existing = useMemo(() => stories.find((s) => s.id === storyId), [storyId]);

  const [view, setView] = useState<EditorView>("write");
  const [headline, setHeadline] = useState(existing?.headline ?? "");
  const [dek, setDek] = useState("");
  const [body, setBody] = useState(
    existing
      ? "The Federal Reserve's exploration of a central bank digital dollar has accelerated discussions among stablecoin operators about licensing, reserve requirements, and interstate compliance.\n\nOperators that have built on state money-transmitter frameworks may face a new federal layer — one that could consolidate oversight or fragment it further across agencies.\n\nThis piece examines what operators are preparing for, and what Texas-based issuers in particular are lobbying for."
      : ""
  );
  const [section, setSection] = useState(existing?.section ?? defaultDraft.section);
  const [heroImage, setHeroImage] = useState<EditorImageState | null>(null);

  useEffect(() => {
    return () => {
      if (heroImage?.url) URL.revokeObjectURL(heroImage.url);
    };
  }, [heroImage?.url]);

  function updateHeroImage(next: EditorImageState | null) {
    setHeroImage((prev) => {
      if (prev?.url && prev.url !== next?.url) URL.revokeObjectURL(prev.url);
      return next;
    });
  }

  const wordCount = useMemo(() => {
    const text = [headline, dek, body].join(" ");
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [headline, dek, body]);

  const status = existing?.status ?? defaultDraft.status;
  const tone = existing?.tone ?? defaultDraft.tone;

  return (
    <div className="flex min-h-[calc(100dvh-56px)] flex-col">
      <div className={clsx("flex flex-wrap items-center justify-between gap-3 border-b px-6 py-3", deskPaper.border, deskPaper.pageAlt)}>
        <div className="flex items-center gap-4">
          <Link href="/desk/newsroom" className={clsx("font-robinhood text-[11px] uppercase tracking-wider", deskPaper.accent)}>
            ← Desk
          </Link>
          <PaperStatusPill label={status} tone={tone} />
          <span className={clsx("font-robinhood text-[11px] tabular-nums", deskPaper.inkMeta)}>{wordCount.toLocaleString()} words</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className={clsx("flex rounded-md border p-0.5", deskPaper.border)}>
            <button
              type="button"
              onClick={() => setView("write")}
              className={clsx(
                "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                view === "write" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover)
              )}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setView("preview")}
              className={clsx(
                "rounded px-3 py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
                view === "preview" ? clsx(deskPaper.activeNav, deskPaper.inkHeading) : clsx(deskPaper.inkMeta, deskPaper.hover)
              )}
            >
              Site preview
            </button>
          </div>
          <button
            type="button"
            className={clsx(
              "rounded border px-4 py-2 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
              deskPaper.border,
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Save draft
          </button>
          <button
            type="button"
            className={clsx(
              "rounded-md border px-4 py-2 font-robinhood text-[10px] uppercase tracking-[0.18em] transition-colors",
              "border-[#6a5843] bg-[#8d6f4d] text-[#f2e6d1] hover:bg-[#6a5843]"
            )}
          >
            Submit for review
          </button>
        </div>
      </div>

      <div className="grid flex-1 gap-6 px-6 py-6 lg:grid-cols-[1fr_280px]">
        <div>
          {view === "write" ? (
            <div className={clsx("rounded-md border p-6", deskPaper.card, deskPaper.border)}>
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Headline"
                className={clsx(
                  "mb-4 w-full border-0 bg-transparent font-cormorant text-3xl outline-none placeholder:text-[#9a8262]/60",
                  deskPaper.inkHeading
                )}
              />
              <input
                value={dek}
                onChange={(e) => setDek(e.target.value)}
                placeholder="Dek — one-line summary for the story card"
                className={clsx(
                  "mb-6 w-full border-0 border-b bg-transparent pb-3 font-robinhood text-[15px] outline-none placeholder:text-[#9a8262]/60",
                  deskPaper.border,
                  deskPaper.inkBody
                )}
              />
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Start writing…"
                rows={18}
                className={clsx(
                  "w-full resize-none border-0 bg-transparent font-robinhood text-[15px] leading-[1.75] outline-none placeholder:text-[#9a8262]/60",
                  deskPaper.inkBody
                )}
              />
            </div>
          ) : (
            <EditorSitePreview
              headline={headline}
              dek={dek}
              body={body}
              section={section}
              byline={user.name}
              image={heroImage}
            />
          )}
        </div>

        <aside className="space-y-4">
          <EditorImagePanel image={heroImage} onImageChange={updateHeroImage} />

          <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Filing</div>
            <div className="mt-3 space-y-3">
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Section</div>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className={clsx("h-9 w-full rounded-md border px-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
                >
                  {["Finance", "Markets", "Investigations", "Technology", "Texas Business", "Infrastructure"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Assigned editor</div>
                <div className={clsx("font-robinhood text-[13px]", deskPaper.inkBody)}>Elena Vasquez</div>
              </div>
              <div>
                <div className={clsx("mb-1 font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>Due</div>
                <div className={clsx("font-robinhood text-[13px] tabular-nums", deskPaper.inkBody)}>
                  {existing?.meta ?? "Set deadline in desk"}
                </div>
              </div>
            </div>
          </section>

          <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Editor notes</div>
            <p className={clsx("mt-3 font-robinhood text-[12px] leading-relaxed", deskPaper.inkMeta)}>
              {existing?.status === "IN REVIEW"
                ? "Awaiting editor review. You will be notified when notes are returned."
                : "No open notes. Submit when ready for editorial review."}
            </p>
          </section>

          <section className={clsx("rounded-md border p-4", deskPaper.border, "bg-[#f2e6d1]")}>
            <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Auto-save</div>
            <div className={clsx("mt-2 font-robinhood text-[12px] text-desk-green")}>Saved just now</div>
          </section>
        </aside>
      </div>
    </div>
  );
}

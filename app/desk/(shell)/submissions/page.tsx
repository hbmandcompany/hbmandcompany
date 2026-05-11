"use client";

import { useMemo, useRef, useState } from "react";
import { clsx } from "clsx";
import { StatusPill } from "@/components/desk/StatusPill";

type SubmissionRow = {
  id: string;
  document: string;
  submittedBy: string;
  status: "Pending" | "Review" | "Approved" | "Rejected";
  reviewer: string;
  date: string;
};

const rows: SubmissionRow[] = [
  { id: "s1", document: "EtherBonds Series A term sheet", submittedBy: "Marcus Lin", status: "Review", reviewer: "Tomás Kessler", date: "May 11" },
  { id: "s2", document: "Monthly compliance brief — APAC delta", submittedBy: "Elena Vasquez", status: "Pending", reviewer: "Sophie Maier", date: "May 10" },
  { id: "s3", document: "Vendor custody exception memo", submittedBy: "Adaeze Obi", status: "Approved", reviewer: "John Mercer", date: "May 08" },
];

function statusTone(s: SubmissionRow["status"]) {
  switch (s) {
    case "Approved":
      return "green" as const;
    case "Rejected":
      return "red" as const;
    case "Review":
      return "blue" as const;
    case "Pending":
    default:
      return "neutral" as const;
  }
}

export default function DeskSubmissionsPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const fileList = useMemo(
    () =>
      files.map((f) => ({
        name: f.name,
        sizeKb: Math.max(1, Math.round(f.size / 1024)),
        type: f.type || "file",
      })),
    [files]
  );

  function addFiles(next: FileList | null) {
    if (!next || next.length === 0) return;
    setFiles((cur) => {
      const merged = [...cur];
      for (const f of Array.from(next)) merged.push(f);
      return merged;
    });
  }

  return (
    <div className="px-6 py-6">
      <div className="mb-6">
        <div className="font-cormorant text-2xl font-semibold text-cream">Submissions</div>
        <div className="mt-1 font-robinhood text-[13px] text-silver-dim/50">
          Document submissions pipeline. Uploads are stored client-side in this build.
        </div>
      </div>

      {/* Upload */}
      <section className="glass-panel-dark p-6">
        <div className="mb-3 font-robinhood text-[11px] uppercase tracking-[0.24em] text-silver-dim/40">
          Submit files
        </div>

        <div
          className={clsx(
            "rounded-lg border border-dashed p-6 transition-colors duration-300 ease-luxury",
            dragging ? "border-gold/35 bg-gold/5" : "border-white/[0.08] bg-charcoal/20"
          )}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            addFiles(e.dataTransfer.files);
          }}
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <div className="font-robinhood text-[13px] text-cream/80">Drop files here</div>
              <div className="mt-1 font-robinhood text-[11px] text-silver-dim/45">
                PDF, DOCX, images, and archives. Multiple files supported.
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="garnet-btn px-6 py-2.5 font-robinhood text-[11px] uppercase tracking-[0.28em]"
              >
                Choose files
              </button>
              <button
                type="button"
                onClick={() => setFiles([])}
                className="gold-outline-btn px-6 py-2.5 font-robinhood text-[11px] uppercase tracking-[0.28em]"
              >
                Clear
              </button>
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
          />

          {fileList.length ? (
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
              {fileList.map((f) => (
                <div
                  key={`${f.name}-${f.sizeKb}`}
                  className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-void/70 px-4 py-3"
                >
                  <div className="min-w-0">
                    <div className="truncate font-robinhood text-[12px] text-cream/80">{f.name}</div>
                    <div className="mt-1 font-robinhood text-[11px] text-silver-dim/45">
                      {f.type} · {f.sizeKb} KB
                    </div>
                  </div>
                  <div className="ml-4">
                    <StatusPill label="Queued" tone="gold" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 font-robinhood text-[12px] text-silver-dim/40">No files selected.</div>
          )}
        </div>
      </section>

      {/* Pipeline table */}
      <section className="mt-6 overflow-hidden rounded-lg border border-white/[0.04]">
        <div className="grid grid-cols-[minmax(260px,1fr)_160px_140px_160px_110px] border-b border-white/[0.04] bg-obsidian">
          {["Document", "Submitted By", "Status", "Reviewer", "Date"].map((h) => (
            <div key={h} className="flex h-9 items-center px-3 font-robinhood text-[11px] uppercase tracking-wider text-silver-dim/40">
              {h}
            </div>
          ))}
        </div>
        {rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-[minmax(260px,1fr)_160px_140px_160px_110px] border-b border-white/[0.02] bg-void hover:bg-charcoal-light/50"
          >
            <div className="flex h-10 items-center px-3 font-robinhood text-[13px] text-cream/80">{r.document}</div>
            <div className="flex h-10 items-center px-3 font-robinhood text-[12px] text-silver-dim/60">{r.submittedBy}</div>
            <div className="flex h-10 items-center px-3">
              <StatusPill label={r.status} tone={statusTone(r.status)} />
            </div>
            <div className="flex h-10 items-center px-3 font-robinhood text-[12px] text-silver-dim/60">{r.reviewer}</div>
            <div className="flex h-10 items-center px-3 font-robinhood text-[11px] text-silver-dim/40">{r.date}</div>
          </div>
        ))}
      </section>
    </div>
  );
}


"use client";

import { useRef } from "react";
import { clsx } from "clsx";
import { deskPaper } from "./desk-paper";

export type EditorImageState = {
  url: string;
  alt: string;
  caption: string;
  fileName: string;
};

export function EditorImagePanel({
  image,
  onImageChange,
}: {
  image: EditorImageState | null;
  onImageChange: (next: EditorImageState | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    onImageChange({
      url: URL.createObjectURL(file),
      alt: "",
      caption: "",
      fileName: file.name,
    });
  }

  function removeImage() {
    if (image?.url) URL.revokeObjectURL(image.url);
    onImageChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <section className={clsx("rounded-md border p-4", deskPaper.card, deskPaper.border)}>
      <div className={clsx("font-robinhood text-[10px] uppercase tracking-[0.2em]", deskPaper.inkLabel)}>Hero image</div>
      <p className={clsx("mt-1 font-robinhood text-[11px]", deskPaper.inkMeta)}>Upload the lead photo for site preview.</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      {image ? (
        <div className="mt-3 space-y-3">
          <div className={clsx("overflow-hidden rounded-md border", deskPaper.border)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- blob preview URL */}
            <img src={image.url} alt={image.alt || "Uploaded preview"} className="aspect-[16/10] w-full object-cover" />
          </div>
          <div className={clsx("truncate font-robinhood text-[10px]", deskPaper.inkMeta)}>{image.fileName}</div>
          <div>
            <label className={clsx("mb-1 block font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>
              Alt text
            </label>
            <input
              value={image.alt}
              onChange={(e) => onImageChange({ ...image, alt: e.target.value })}
              placeholder="Describe the image for accessibility"
              className={clsx("h-8 w-full rounded-md border px-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
            />
          </div>
          <div>
            <label className={clsx("mb-1 block font-robinhood text-[10px] uppercase tracking-wider", deskPaper.inkLabel)}>
              Caption
            </label>
            <input
              value={image.caption}
              onChange={(e) => onImageChange({ ...image, caption: e.target.value })}
              placeholder="Photo credit or caption"
              className={clsx("h-8 w-full rounded-md border px-2 font-robinhood text-[12px] outline-none", deskPaper.input)}
            />
          </div>
          <button
            type="button"
            onClick={removeImage}
            className={clsx(
              "w-full rounded border py-1.5 font-robinhood text-[10px] uppercase tracking-wider transition-colors",
              deskPaper.border,
              deskPaper.inkMeta,
              deskPaper.hover
            )}
          >
            Remove image
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={clsx(
            "mt-3 w-full rounded-md border border-dashed py-8 font-robinhood text-[11px] uppercase tracking-wider transition-colors",
            deskPaper.border,
            deskPaper.inkMeta,
            deskPaper.hover
          )}
        >
          Upload image
        </button>
      )}
    </section>
  );
}

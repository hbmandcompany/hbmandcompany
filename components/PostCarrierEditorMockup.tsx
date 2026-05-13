import clsx from "clsx";

/**
 * CapCut-inspired editor chrome: preview, tool rail, multi-track timeline, playhead.
 * Purely decorative — illustrates PostCarrier’s video / collaborative surface.
 * Grayscale treatment for print-like / monochrome art direction.
 */
export default function PostCarrierEditorMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.12] bg-[#0a0a0a] shadow-[0_32px_96px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.07)]"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
        }}
      />

      {/* Window chrome */}
      <div className="relative flex items-center justify-between border-b border-white/[0.08] bg-[#111111] px-3 py-2 md:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <span className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-white/40 md:text-[10px]">
          PostCarrier · Edit
        </span>
        <div className="w-12 md:w-16" />
      </div>

      {/* Preview monitor */}
      <div className="relative mx-3 mt-3 aspect-video overflow-hidden rounded-xl border border-white/[0.1] bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#080808] md:mx-4 md:mt-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_65%)]" />
        <div className="absolute inset-4 rounded-md border border-dashed border-white/[0.08]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/50 shadow-lg backdrop-blur-sm md:h-16 md:w-16">
            <span className="ml-1 block h-0 w-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-white/80 md:border-y-[9px] md:border-l-[14px]" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 font-mono-hbm text-[8px] tabular-nums text-white/55">
          00:12:08:14
        </div>
      </div>

      {/* Tool strip */}
      <div className="mx-3 mt-2 flex gap-1 rounded-lg border border-white/[0.08] bg-[#0d0d0d] p-1 md:mx-4">
        {[
          "border-white/[0.14] bg-white/[0.06]",
          "border-white/[0.12] bg-white/[0.05]",
          "border-white/[0.1] bg-white/[0.04]",
          "border-white/[0.1] bg-white/[0.04]",
          "border-white/[0.1] bg-white/[0.04]",
          "border-white/[0.14] bg-white/[0.06]",
          "border-white/[0.1] bg-white/[0.04]",
        ].map((c, i) => (
          <div key={i} className={clsx("h-7 flex-1 max-w-[2.5rem] rounded-md border md:h-8", c)} />
        ))}
      </div>

      {/* Timeline */}
      <div className="relative mx-3 mb-3 mt-2 rounded-xl border border-white/[0.08] bg-[#060606] p-2 md:mx-4 md:mb-4 md:mt-3 md:p-3">
        <div className="mb-2 flex h-5 items-end border-b border-white/[0.08] pl-9 md:pl-10">
          {["00:00", "", "00:05", "", "00:10", "", "00:15"].map((lab, i) => (
            <div
              key={i}
              className="flex-1 border-l border-white/[0.08] pl-1 font-mono-hbm text-[7px] text-white/30 md:text-[8px]"
            >
              {lab}
            </div>
          ))}
        </div>

        <div className="relative space-y-1.5 md:space-y-2">
          {[
            {
              label: "V1",
              clips: [{ w: "42%", cls: "from-white/[0.22] to-white/[0.08]" }],
            },
            {
              label: "A1",
              clips: [
                { w: "28%", cls: "from-white/[0.18] to-white/[0.06]" },
                { w: "32%", cls: "from-white/[0.14] to-white/[0.05]" },
              ],
            },
            {
              label: "CAP",
              clips: [{ w: "55%", cls: "from-white/[0.2] to-white/[0.07]" }],
            },
            {
              label: "FC",
              clips: [{ w: "70%", cls: "from-white/[0.16] to-white/[0.06] border-white/15" }],
            },
          ].map((row) => (
            <div key={row.label} className="relative flex h-8 items-center gap-1 md:h-9">
              <span className="absolute left-0 top-1/2 w-8 -translate-y-1/2 text-center font-mono-hbm text-[8px] uppercase tracking-wider text-white/35 md:w-9 md:text-[9px]">
                {row.label}
              </span>
              <div className="flex flex-1 items-center gap-1 pl-9 md:pl-10">
                {row.clips.map((clip, ci) => (
                  <div
                    key={ci}
                    className={clsx(
                      "h-6 rounded-md border border-white/10 bg-gradient-to-r shadow-sm md:h-7",
                      clip.cls,
                    )}
                    style={{ width: clip.w, minWidth: "2rem" }}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Playhead */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-px bg-white shadow-[0_0_10px_rgba(255,255,255,0.45)]"
            style={{ left: "38%", marginLeft: "2.25rem" }}
          />
          <div
            className="pointer-events-none absolute z-10 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-white"
            style={{ left: "calc(38% + 2.25rem)", top: "-2px" }}
          />
        </div>

        <p className="mt-2 border-t border-white/[0.06] pt-2 text-center font-mono-hbm text-[8px] uppercase tracking-[0.2em] text-white/30 md:text-[9px]">
          Multi-track · non-destructive · verifiable exports
        </p>
      </div>
    </div>
  );
}

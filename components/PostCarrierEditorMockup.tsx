import clsx from "clsx";

/**
 * CapCut-inspired editor chrome: preview, tool rail, multi-track timeline, playhead.
 * Purely decorative — illustrates PostCarrier’s video / collaborative surface.
 */
export default function PostCarrierEditorMockup() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#2c2c34] bg-[#101014] shadow-[0_32px_96px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.07)]"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(34,232,200,0.06) 0%, transparent 50%, rgba(139,92,246,0.04) 100%)",
        }}
      />

      {/* Window chrome */}
      <div className="relative flex items-center justify-between border-b border-[#2a2a32] bg-[#18181d] px-3 py-2 md:px-4">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono-hbm text-[9px] uppercase tracking-[0.28em] text-white/40 md:text-[10px]">
          PostCarrier · Edit
        </span>
        <div className="w-12 md:w-16" />
      </div>

      {/* Preview monitor */}
      <div className="relative mx-3 mt-3 aspect-video overflow-hidden rounded-xl border border-[#33333b] bg-gradient-to-br from-[#1a2230] via-[#12141c] to-[#0a0a0e] md:mx-4 md:mt-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,232,200,0.08)_0%,transparent_65%)]" />
        <div className="absolute inset-4 rounded-md border border-dashed border-white/[0.06]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/35 shadow-lg backdrop-blur-sm md:h-16 md:w-16">
            <span className="ml-1 block h-0 w-0 border-y-[7px] border-y-transparent border-l-[11px] border-l-cream/75 md:border-y-[9px] md:border-l-[14px]" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-mono-hbm text-[8px] tabular-nums text-white/50">
          00:12:08:14
        </div>
      </div>

      {/* Tool strip */}
      <div className="mx-3 mt-2 flex gap-1 rounded-lg border border-[#2a2a32] bg-[#16161c] p-1 md:mx-4">
        {[
          "border-cyan-400/25 bg-cyan-400/10",
          "border-violet-400/25 bg-violet-400/10",
          "border-amber-400/20 bg-amber-400/10",
          "border-white/10 bg-white/[0.04]",
          "border-white/10 bg-white/[0.04]",
          "border-digital-80s/30 bg-digital-80s/10",
          "border-white/10 bg-white/[0.04]",
        ].map((c, i) => (
          <div
            key={i}
            className={clsx("h-7 flex-1 max-w-[2.5rem] rounded-md border md:h-8", c)}
          />
        ))}
      </div>

      {/* Timeline */}
      <div className="relative mx-3 mb-3 mt-2 rounded-xl border border-[#2a2a32] bg-[#0c0c10] p-2 md:mx-4 md:mb-4 md:mt-3 md:p-3">
        <div className="mb-2 flex h-5 items-end border-b border-[#25252c] pl-9 md:pl-10">
          {["00:00", "", "00:05", "", "00:10", "", "00:15"].map((lab, i) => (
            <div
              key={i}
              className="flex-1 border-l border-white/[0.07] pl-1 font-mono-hbm text-[7px] text-white/25 md:text-[8px]"
            >
              {lab}
            </div>
          ))}
        </div>

        <div className="relative space-y-1.5 md:space-y-2">
          {[
            {
              label: "V1",
              clips: [{ w: "42%", cls: "bg-gradient-to-r from-cyan-500/45 to-cyan-400/25" }],
            },
            {
              label: "A1",
              clips: [
                { w: "28%", cls: "from-fuchsia-500/35 to-fuchsia-400/20" },
                { w: "32%", cls: "from-fuchsia-500/25 to-violet-500/20" },
              ],
            },
            {
              label: "CAP",
              clips: [{ w: "55%", cls: "bg-gradient-to-r from-amber-400/35 to-amber-500/15" }],
            },
            {
              label: "FC",
              clips: [{ w: "70%", cls: "bg-gradient-to-r from-digital-80s/25 to-teal-600/15 border-digital-80s/30" }],
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
            className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-px bg-[#ff3b4a] shadow-[0_0_12px_rgba(255,59,74,0.9)]"
            style={{ left: "38%", marginLeft: "2.25rem" }}
          />
          <div
            className="pointer-events-none absolute z-10 h-0 w-0 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[6px] border-t-[#ff3b4a]"
            style={{ left: "calc(38% + 2.25rem)", top: "-2px" }}
          />
        </div>

        <p className="mt-2 border-t border-white/[0.05] pt-2 text-center font-mono-hbm text-[8px] uppercase tracking-[0.2em] text-white/30 md:text-[9px]">
          Multi-track · non-destructive · verifiable exports
        </p>
      </div>
    </div>
  );
}

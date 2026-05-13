import type { BaseTechnicalRow } from "@/lib/base-copy";

interface TechnicalTableProps {
  rows: ReadonlyArray<BaseTechnicalRow>;
  caption?: string;
  background?: "ivory" | "parchment" | "noir";
}

const styles = {
  ivory: {
    wrap: "border-white/[0.08] bg-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
    row: "border-white/[0.08] text-cream/88",
    label: "text-silver-dim/48",
    value: "text-cream/92",
    caption: "text-silver-dim/62",
  },
  parchment: {
    wrap: "border-gold/[0.12] bg-gradient-to-br from-[#100f13] via-[#0c0c11] to-[#09090b] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
    row: "border-white/[0.08] text-cream/88",
    label: "text-gold/52",
    value: "text-cream/92",
    caption: "text-silver-dim/62",
  },
  noir: {
    wrap: "border-gold/[0.14] bg-gradient-to-br from-black via-[#090a0d] to-[#060607] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]",
    row: "border-white/[0.07] text-cream/90",
    label: "text-gold/52",
    value: "text-cream/94",
    caption: "text-silver-dim/62",
  },
} as const;

export default function TechnicalTable({
  rows,
  caption,
  background = "ivory",
}: TechnicalTableProps) {
  const tone = styles[background];

  return (
    <div className="w-full">
      <div className={`overflow-hidden rounded-[1rem] border ${tone.wrap}`}>
        {rows.map((row, index) => (
          <div
            key={`${row.label}-${index}`}
            className={`grid grid-cols-[auto_1fr_auto] items-start gap-3 px-4 py-3 font-mono-hbm text-[12px] ${
              index < rows.length - 1 ? `border-b ${tone.row}` : tone.row
            }`}
          >
            <span className={`uppercase tracking-[0.12em] ${tone.label}`}>{row.label}</span>
            <span className="mt-[0.7em] h-px w-full bg-white/[0.08]" aria-hidden />
            <div className="text-right">
              <div className={`tracking-[0.04em] ${tone.value}`}>{row.value}</div>
              {row.sub ? <div className={`mt-1 text-[10px] uppercase tracking-[0.12em] ${tone.label}`}>{row.sub}</div> : null}
            </div>
          </div>
        ))}
      </div>
      {caption ? (
        <p className={`mt-2 text-[11px] leading-relaxed ${tone.caption}`}>{caption}</p>
      ) : null}
    </div>
  );
}

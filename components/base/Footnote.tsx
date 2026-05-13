import type { ReactNode } from "react";

interface FootnoteProps {
  children: ReactNode;
  index?: number;
}

export default function Footnote({ children, index }: FootnoteProps) {
  return (
    <div className="mt-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" aria-hidden />
      <p className="flex items-start gap-2 pt-3 text-[11px] leading-[1.7] text-silver-dim/72">
        <span className="shrink-0 font-mono-hbm text-[10px] text-gold/65">
          {typeof index === "number" ? <sup>{index}</sup> : "†"}
        </span>
        <span>{children}</span>
      </p>
    </div>
  );
}

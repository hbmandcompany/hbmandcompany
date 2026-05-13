interface ChapterMarkProps {
  section: string;
  french: string;
  english: string;
}

export default function ChapterMark({ section, french, english }: ChapterMarkProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 text-current">
        <span className="font-mono-hbm text-[11px] uppercase tracking-[0.22em] text-gold/55">
          {section}
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-gold/55" aria-hidden />
        <span className="font-cormorant text-[15px] italic text-cream/88">{french}</span>
        <span className="text-[13px] text-silver-dim/52">—</span>
        <span className="text-[13px] text-silver-dim/72">{english}</span>
      </div>
      <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-gold/25 to-transparent" aria-hidden />
    </div>
  );
}

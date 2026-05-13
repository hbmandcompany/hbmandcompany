interface SpecRowProps {
  label: string;
  value: string;
  accent?: boolean;
}

export default function SpecRow({ label, value, accent = false }: SpecRowProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 font-mono-hbm text-[12px]">
      <span className="uppercase tracking-[0.14em] text-current opacity-60">{label}</span>
      <span className="mt-[0.2em] h-px w-full bg-white/[0.08]" aria-hidden />
      <span className={accent ? "text-gold/72" : "text-current"}>{value}</span>
    </div>
  );
}

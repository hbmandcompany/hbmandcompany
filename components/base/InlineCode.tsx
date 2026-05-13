interface InlineCodeProps {
  children: string;
}

export default function InlineCode({ children }: InlineCodeProps) {
  return (
    <code className="rounded-md border border-gold/[0.16] bg-white/[0.05] px-2 py-1 font-mono-hbm text-[12px] text-cream/88 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
      {children}
    </code>
  );
}

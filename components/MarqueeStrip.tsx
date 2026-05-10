"use client";

interface MarqueeStripProps {
  items: string[];
  reverse?: boolean;
  speed?: "slow" | "normal" | "fast";
}

export default function MarqueeStrip({ items, reverse = false, speed = "slow" }: MarqueeStripProps) {
  const durations = { slow: "55s", normal: "35s", fast: "22s" };
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-4 border-y border-white/[0.03] bg-obsidian/80">
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{
          animation: `marquee ${durations[speed]} linear infinite ${reverse ? "reverse" : ""}`,
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-mono-hbm text-label-xs text-gold/50 uppercase tracking-[0.3em] px-8">
              {item}
            </span>
            <span className="text-garnet/40 text-xs select-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

import { baseCopy } from "@/lib/base-copy";

interface LatencyBudgetBarProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function LatencyBudgetBar({
  className,
  accent = "bordeaux",
}: LatencyBudgetBarProps) {
  const copy = baseCopy.illustrations.latencyBudget;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";
  const total = 250;
  const fills = ["#f3ede2", "#eadfce", "#f3ede2", "#eadfce", "#f3ede2", "#eadfce", "#f3ede2"] as const;

  return (
    <svg
      viewBox="0 0 900 170"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="latency-budget-title latency-budget-desc"
    >
      <title id="latency-budget-title">{copy.title}</title>
      <desc id="latency-budget-desc">{copy.desc}</desc>

      {copy.segments.map((segment, index) => {
        const previous = copy.segments.slice(0, index).reduce((sum, item) => sum + item.ms, 0);
        const x = 32 + (previous / total) * 804;
        const width = (segment.ms / total) * 804;
        return (
          <g key={segment.label}>
            <rect x={x} y="68" width={width} height="42" fill={fills[index]} stroke="#6b5a4a" strokeOpacity="0.32" strokeWidth="1" />
            <text
              x={x + width / 2}
              y="50"
              textAnchor="middle"
              fontFamily="var(--font-base-plex)"
              fontSize="9"
              letterSpacing="1.1"
              fill="#3a2f28"
            >
              {segment.label}
            </text>
          </g>
        );
      })}

      <path d="M 836 62 V 124" stroke={accentColor} strokeWidth="1.5" fill="none" />
      <path d="M 32 132 H 836" stroke={accentColor} strokeWidth="1" fill="none" />
      <path d="M 32 128 V 136" stroke={accentColor} strokeWidth="1" fill="none" />
      <path d="M 836 128 V 136" stroke={accentColor} strokeWidth="1" fill="none" />
      <text x="836" y="152" textAnchor="end" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="1.4" fill={accentColor}>
        {copy.total}
      </text>
    </svg>
  );
}

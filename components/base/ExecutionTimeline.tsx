import { baseCopy } from "@/lib/base-copy";

interface ExecutionTimelineProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function ExecutionTimeline({
  className,
  accent = "bordeaux",
}: ExecutionTimelineProps) {
  const copy = baseCopy.illustrations.executionTimeline;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";
  const widths = [15, 8, 55, 40, 120];
  const total = 250;

  return (
    <svg
      viewBox="0 0 720 170"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="execution-timeline-title execution-timeline-desc"
    >
      <title id="execution-timeline-title">{copy.title}</title>
      <desc id="execution-timeline-desc">{copy.desc}</desc>

      {copy.labels.map((label, index) => {
        const previous = widths.slice(0, index).reduce((sum, value) => sum + value, 0);
        const x = 24 + (previous / total) * 672;
        const width = (widths[index] / total) * 672;

        return (
          <g key={label}>
            <rect
              x={x}
              y="58"
              width={width}
              height="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d={`M ${x} 58 H ${x + width}`} stroke={index === widths.length - 1 ? accentColor : "currentColor"} strokeWidth="2" fill="none" />
            <text
              x={x + width / 2}
              y="42"
              textAnchor="middle"
              fontFamily="var(--font-base-plex)"
              fontSize="9"
              letterSpacing="1.3"
              fill="currentColor"
            >
              {label}
            </text>
          </g>
        );
      })}

      <text x="696" y="134" textAnchor="end" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="1.6" fill={accentColor}>
        {copy.total}
      </text>
    </svg>
  );
}

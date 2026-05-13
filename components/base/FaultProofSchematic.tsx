import { baseCopy } from "@/lib/base-copy";

interface FaultProofSchematicProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function FaultProofSchematic({
  className,
  accent = "bordeaux",
}: FaultProofSchematicProps) {
  const copy = baseCopy.illustrations.faultProof;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";
  const points = [40, 150, 300, 520, 662];

  return (
    <svg
      viewBox="0 0 720 180"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="fault-proof-title fault-proof-desc"
    >
      <title id="fault-proof-title">{copy.title}</title>
      <desc id="fault-proof-desc">{copy.desc}</desc>

      <rect x="40" y="92" width="480" height="22" fill={accentColor} opacity="0.1" />
      <path d="M 40 103 H 680" stroke="currentColor" strokeWidth="1" fill="none" />

      {points.map((point, index) => (
        <g key={copy.labels[index]}>
          <circle cx={point} cy="103" r="3" fill={index === points.length - 1 ? accentColor : "currentColor"} />
          <text
            x={point}
            y="46"
            textAnchor="middle"
            fontFamily="var(--font-base-plex)"
            fontSize="9"
            letterSpacing="1.2"
            fill="currentColor"
          >
            {copy.labels[index]}
          </text>
        </g>
      ))}

      <rect x="658" y="99" width="8" height="8" fill={accentColor} stroke="none" />
      <text x="40" y="132" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.2" fill={accentColor}>
        {copy.challenge}
      </text>
      <text x="672" y="132" textAnchor="end" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.2" fill={accentColor}>
        {copy.final}
      </text>
      <text x="150" y="158" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.2" fill="currentColor">
        {copy.lightra}
      </text>
    </svg>
  );
}

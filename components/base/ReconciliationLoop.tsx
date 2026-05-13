import { baseCopy } from "@/lib/base-copy";

interface ReconciliationLoopProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function ReconciliationLoop({
  className,
  accent = "bordeaux",
}: ReconciliationLoopProps) {
  const copy = baseCopy.illustrations.reconciliationLoop;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";

  const nodes = [
    { label: copy.labels.base, x: 228, y: 28 },
    { label: copy.labels.indexer, x: 386, y: 86 },
    { label: copy.labels.mongo, x: 394, y: 222 },
    { label: copy.labels.reconciliations, x: 224, y: 306 },
    { label: copy.labels.lightrain, x: 58, y: 236 },
    { label: copy.labels.attestation, x: 54, y: 106 },
    { label: copy.labels.piol, x: 206, y: 148, accent: true },
    { label: copy.labels.snowflake, x: 226, y: 378 },
  ] as const;

  return (
    <svg
      viewBox="0 0 520 450"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="reconciliation-loop-title reconciliation-loop-desc"
    >
      <title id="reconciliation-loop-title">{copy.title}</title>
      <desc id="reconciliation-loop-desc">{copy.desc}</desc>

      <path d="M 260 62 C 360 70, 418 126, 422 239" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 394 257 C 350 314, 300 340, 230 338" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 204 334 C 140 334, 88 304, 78 252" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 74 224 C 72 164, 104 112, 176 104" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 242 184 C 250 250, 252 300, 258 370" stroke={accentColor} strokeWidth="1" strokeDasharray="4 4" fill="none" />
      <path d="M 278 370 C 290 300, 292 250, 286 184" stroke={accentColor} strokeWidth="1" strokeDasharray="4 4" fill="none" />

      {nodes.map((node) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y={node.y}
            width="110"
            height="32"
            rx="4"
            stroke={node.accent ? accentColor : "currentColor"}
            strokeWidth="1"
            fill="none"
          />
          <text
            x={node.x + 55}
            y={node.y + 20}
            textAnchor="middle"
            fontFamily="var(--font-base-plex)"
            fontSize="8.5"
            letterSpacing="1.1"
            fill="currentColor"
          >
            {node.label}
          </text>
        </g>
      ))}

      <text x="376" y="420" textAnchor="end" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="1.4" fill={accentColor}>
        {copy.labels.latency}
      </text>
    </svg>
  );
}

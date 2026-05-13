import { baseCopy } from "@/lib/base-copy";

interface SequencerFlowDiagramProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function SequencerFlowDiagram({
  className,
  accent = "bordeaux",
}: SequencerFlowDiagramProps) {
  const copy = baseCopy.illustrations.sequencerFlow;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";

  const nodes = [
    { label: copy.labels.user, x: 110, y: 32, w: 180, h: 34 },
    { label: copy.labels.mempool, x: 110, y: 98, w: 180, h: 34 },
    { label: copy.labels.privateLane, x: 332, y: 106, w: 160, h: 30, dashed: true },
    { label: copy.labels.sequencer, x: 110, y: 168, w: 180, h: 34 },
    { label: copy.labels.block, x: 110, y: 238, w: 180, h: 34 },
    { label: copy.labels.batch, x: 110, y: 308, w: 180, h: 34 },
    { label: copy.labels.root, x: 110, y: 378, w: 180, h: 34 },
  ] as const;

  return (
    <svg
      viewBox="0 0 520 440"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="sequencer-flow-title sequencer-flow-desc"
    >
      <title id="sequencer-flow-title">{copy.title}</title>
      <desc id="sequencer-flow-desc">{copy.desc}</desc>

      {nodes.map((node) => (
        <g key={node.label}>
          <rect
            x={node.x}
            y={node.y}
            width={node.w}
            height={node.h}
            rx="4"
            stroke={node.label === copy.labels.privateLane ? accentColor : "currentColor"}
            strokeWidth="1"
            strokeDasharray={node.dashed ? "4 4" : undefined}
            fill="none"
          />
          <text
            x={node.x + node.w / 2}
            y={node.y + node.h / 2 + 3}
            textAnchor="middle"
            fontFamily="var(--font-base-plex)"
            fontSize="9"
            letterSpacing="1.4"
            fill="currentColor"
          >
            {node.label}
          </text>
        </g>
      ))}

      <path d="M 200 66 V 98" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 196 94 L 200 98 L 204 94" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 200 132 V 168" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 196 164 L 200 168 L 204 164" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 200 202 V 238" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 196 234 L 200 238 L 204 234" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 200 272 V 308" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 196 304 L 200 308 L 204 304" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 200 342 V 378" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 196 374 L 200 378 L 204 374" stroke="currentColor" strokeWidth="1" fill="none" />

      <path
        d="M 332 121 C 300 121, 286 121, 290 185"
        stroke={accentColor}
        strokeWidth="1"
        strokeDasharray="4 4"
        fill="none"
      />
      <path d="M 286 181 L 290 185 L 294 181" stroke={accentColor} strokeWidth="1" fill="none" />
    </svg>
  );
}

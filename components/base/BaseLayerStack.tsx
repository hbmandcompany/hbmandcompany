import { baseCopy } from "@/lib/base-copy";

interface BaseLayerStackProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function BaseLayerStack({
  className,
  accent = "bordeaux",
}: BaseLayerStackProps) {
  const copy = baseCopy.illustrations.baseLayerStack;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";

  return (
    <svg
      viewBox="0 0 560 420"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="base-layer-stack-title base-layer-stack-desc"
    >
      <title id="base-layer-stack-title">{copy.title}</title>
      <desc id="base-layer-stack-desc">{copy.desc}</desc>

      <defs>
        <pattern id="base-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M 0 0 L 0 8" stroke="currentColor" strokeOpacity="0.12" />
        </pattern>
      </defs>

      <rect x="110" y="34" width="340" height="64" rx="4" stroke="currentColor" strokeWidth="1" fill="url(#base-hatch)" />
      <text x="280" y="72" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="2" fill="currentColor">
        {copy.labels.l1}
      </text>

      <rect x="78" y="154" width="404" height="108" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 78 154 H 482" stroke={accentColor} strokeWidth="2" fill="none" />
      <text x="280" y="208" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="2" fill="currentColor">
        {copy.labels.l2}
      </text>
      <text x="280" y="228" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.4" fill="currentColor" opacity="0.72">
        {copy.labels.equivalence}
      </text>
      <text x="492" y="185" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.4" fill="currentColor" opacity="0.74">
        {copy.labels.fault}
      </text>

      <rect x="54" y="314" width="452" height="72" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="280" y="342" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="2" fill="currentColor">
        {copy.labels.protocol}
      </text>

      {copy.labels.contracts.map((label, index) => (
        <g key={label}>
          <rect
            x={110 + index * 72}
            y="352"
            width="44"
            height="18"
            rx="2"
            stroke={index === 2 ? accentColor : "currentColor"}
            strokeWidth="1"
            fill="none"
          />
          <text
            x={132 + index * 72}
            y="364"
            textAnchor="middle"
            fontFamily="var(--font-base-plex)"
            fontSize="7.5"
            letterSpacing="1"
            fill="currentColor"
          >
            {label}
          </text>
        </g>
      ))}

      <rect x="270" y="342" width="8" height="8" fill={accentColor} stroke="none" />

      <path d="M 280 98 V 140" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 276 136 L 280 140 L 284 136" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="298" y="122" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.2" fill="currentColor" opacity="0.74">
        {copy.labels.calldata}
      </text>

      <path d="M 280 262 V 300" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 276 296 L 280 300 L 284 296" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="298" y="286" fontFamily="var(--font-base-plex)" fontSize="9" letterSpacing="1.2" fill="currentColor" opacity="0.74">
        {copy.labels.evm}
      </text>
    </svg>
  );
}

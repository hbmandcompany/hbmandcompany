import { baseCopy } from "@/lib/base-copy";

interface USDCFlowDiagramProps {
  className?: string;
  accent?: "bordeaux" | "none";
}

export default function USDCFlowDiagram({
  className,
  accent = "bordeaux",
}: USDCFlowDiagramProps) {
  const copy = baseCopy.illustrations.usdcFlow;
  const accentColor = accent === "bordeaux" ? "#7d3037" : "currentColor";

  return (
    <svg
      viewBox="0 0 540 220"
      className={className}
      width="100%"
      role="img"
      aria-labelledby="usdc-flow-title usdc-flow-desc"
    >
      <title id="usdc-flow-title">{copy.title}</title>
      <desc id="usdc-flow-desc">{copy.desc}</desc>

      <text x="24" y="26" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="1.6" fill="currentColor">
        {copy.labels.bridged}
      </text>

      <rect x="24" y="48" width="132" height="34" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="204" y="48" width="90" height="34" rx="4" stroke={accentColor} strokeWidth="1" fill="none" />
      <rect x="342" y="48" width="118" height="34" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="90" y="69" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" fill="currentColor">
        {copy.labels.ethereum}
      </text>
      <text x="249" y="69" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" fill="currentColor">
        {copy.labels.bridge}
      </text>
      <text x="401" y="69" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" fill="currentColor">
        {copy.labels.base}
      </text>
      <path d="M 156 65 H 204" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 294 65 H 342" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M 192 53 L 306 79" stroke={accentColor} strokeWidth="2" fill="none" />
      <path d="M 306 53 L 192 79" stroke={accentColor} strokeWidth="2" fill="none" />

      <text x="24" y="138" fontFamily="var(--font-base-plex)" fontSize="10" letterSpacing="1.6" fill="currentColor">
        {copy.labels.native}
      </text>

      <rect x="24" y="160" width="132" height="34" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <rect x="342" y="160" width="118" height="34" rx="4" stroke="currentColor" strokeWidth="1" fill="none" />
      <text x="90" y="181" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" fill="currentColor">
        {copy.labels.circle}
      </text>
      <text x="401" y="181" textAnchor="middle" fontFamily="var(--font-base-plex)" fontSize="9" fill="currentColor">
        {copy.labels.base}
      </text>
      <path d="M 156 177 H 342" stroke={accentColor} strokeWidth="1" fill="none" />
      <path d="M 338 173 L 342 177 L 338 181" stroke={accentColor} strokeWidth="1" fill="none" />
      <path d="M 254 177 L 261 184 L 275 168" stroke={accentColor} strokeWidth="2" fill="none" />
    </svg>
  );
}

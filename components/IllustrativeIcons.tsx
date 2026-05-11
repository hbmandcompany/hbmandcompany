/** Custom line icons for studio / Suite sections — stroke uses currentColor */

function svgProps(className?: string) {
  return {
    className,
    viewBox: "0 0 56 56",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg" as const,
    "aria-hidden": true as const,
  };
}

export function IconTriptychWave({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
      <path d="M12 36c4-14 8-14 12 0s8 14 12 0 8-14 12 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 22h4M22 22h4M30 22h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

export function IconSamplerPads({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <rect x="10" y="10" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={14 + col * 9}
            y={14 + row * 9}
            width="7"
            height="7"
            rx="1.5"
            fill="currentColor"
            opacity={row * 4 + col === 5 ? 0.5 : 0.18}
          />
        ))
      )}
    </svg>
  );
}

export function IconDiffusionArcs({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M8 40c10-18 18-22 28-8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
      <path d="M12 44c8-12 14-14 22-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path
        d="M20 18v-4M26 16l2-3.5M32 18v-5M23 24h-3M33 24h-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSessionRing({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <ellipse cx="28" cy="28" rx="22" ry="10" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
      <path d="M14 28c4-8 10-8 14 0s10 8 14 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="28" cy="28" r="3" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconCollab({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="20" cy="22" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="36" cy="22" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="28" cy="36" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M24.5 26.5l2.2 4M31.5 26.5l-2.2 4M25.5 33.5h5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M28 14v4M26 16l2-2.5 2 2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function IconFaderBank({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${14 + i * 12}, 12)`}>
          <rect x="0" y="0" width="4" height="32" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
          <rect x="-1" y={8 + i * 3} width="6" height="8" rx="2" fill="currentColor" opacity="0.45" />
        </g>
      ))}
    </svg>
  );
}

export function IconCompStacks({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M10 22h36" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <path d="M10 28h28M10 34h32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <rect x="14" y="16" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M22 20v16M30 18v18M38 22v12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrade({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M10 40h36" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
      {/* candle bodies + wicks */}
      <path d="M15 32v10M13 35h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M25 26v14M23 30h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
      <path d="M35 30v8M33 33h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M45 34v6M43 36h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* price trend */}
      <path
        d="M12 34c6-4 10-8 18-6s12-10 22-14"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="round"
        opacity="0.45"
        fill="none"
      />
      <path
        d="M40 14h6M43 11v6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconStaking({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 42h32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.28" />
      <rect x="14" y="33" width="28" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <rect x="17" y="25" width="22" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.85" />
      <rect x="20" y="17" width="16" height="7" rx="2" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <path
        d="M28 7l6 6.5H22L28 7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
        opacity="0.65"
      />
    </svg>
  );
}

export function IconRadio({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <rect x="8" y="20" width="40" height="26" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M28 20V14l-2-4h4l-2 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" fill="none" />
      <circle cx="20" cy="33" r="7" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16.5 33h7M20 29.5v7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.35" />
      <path d="M32 28h12M32 33h10M32 38h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.42" />
      <path
        d="M40 12c4 2 6 6 6 10M36 14c3 1.5 4.5 5 4.5 8.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        opacity="0.38"
      />
    </svg>
  );
}

export function IconPrintMeter({ className }: { className?: string }) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 40h32" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={14 + i * 6} y={38 - i * 5} width="4" height={8 + i * 5} rx="1" fill="currentColor" opacity={0.2 + i * 0.12} />
      ))}
      <path d="M28 12 L34 28H22L28 12Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

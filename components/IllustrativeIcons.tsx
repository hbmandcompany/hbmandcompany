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

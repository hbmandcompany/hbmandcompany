interface HbmLogoProps {
  size?: number;
  className?: string;
}

export default function HbmLogo({ size = 44, className = "" }: HbmLogoProps) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.12)}
      viewBox="0 0 44 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer oval frame */}
      <ellipse
        cx="22" cy="25"
        rx="21.3" ry="24"
        stroke="currentColor" strokeWidth="0.65"
      />

      {/* Inner oval — lighter */}
      <ellipse
        cx="22" cy="25"
        rx="16.5" ry="18.5"
        stroke="currentColor" strokeWidth="0.3" opacity="0.4"
      />

      {/* Diamond tips — compass points */}
      {/* Top */}
      <path d="M22 0.8 L23.6 4.2 L22 3.2 L20.4 4.2 Z" fill="currentColor" />
      {/* Bottom */}
      <path d="M22 49.2 L20.4 45.8 L22 46.8 L23.6 45.8 Z" fill="currentColor" />
      {/* Right */}
      <path d="M43.5 25 L40.1 26.6 L41.1 25 L40.1 23.4 Z" fill="currentColor" />
      {/* Left */}
      <path d="M0.5 25 L3.9 23.4 L2.9 25 L3.9 26.6 Z" fill="currentColor" />

      {/* Small mid-oval accent marks at 45° positions */}
      <circle cx="37.1" cy="10.1" r="0.8" fill="currentColor" opacity="0.35" />
      <circle cx="37.1" cy="39.9" r="0.8" fill="currentColor" opacity="0.35" />
      <circle cx="6.9"  cy="10.1" r="0.8" fill="currentColor" opacity="0.35" />
      <circle cx="6.9"  cy="39.9" r="0.8" fill="currentColor" opacity="0.35" />

      {/* Monogram — H and B with slight overlap */}
      <text
        x="4.5"
        y="33"
        fontFamily="'Cormorant Garamond', 'Cormorant', Georgia, serif"
        fontSize="25"
        fontWeight="300"
        fill="currentColor"
        letterSpacing="-2.5"
      >
        HB
      </text>
    </svg>
  );
}

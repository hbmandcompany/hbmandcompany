import Link from "next/link";
import HbmLogo from "./HbmLogo";

const footerColumns = [
  {
    heading: "Company",
    links: [
      { label: "The Company", href: "/about" },
      { label: "Our Team", href: "/about#team" },
      { label: "Values & Thesis", href: "/about#values" },
      { label: "Careers", href: "/contact" },
      { label: "Press Kit", href: "/contact" },
      { label: "Legal Entity", href: "/privacy" },
    ],
  },
  {
    heading: "Protocol",
    links: [
      { label: "Network Overview", href: "/work" },
      { label: "Governance", href: "/work" },
      { label: "Validators", href: "/work" },
      { label: "Bridge Infrastructure", href: "/work" },
      { label: "Documentation", href: "/contact" },
      { label: "Whitepaper", href: "/contact" },
    ],
  },
  {
    heading: "Portfolio",
    links: [
      { label: "All Projects", href: "/work" },
      { label: "DeFi", href: "/work" },
      { label: "Infrastructure", href: "/work" },
      { label: "Custody", href: "/work" },
      { label: "Layer-2", href: "/work" },
      { label: "Governance", href: "/work" },
    ],
  },
  {
    heading: "Ecosystem",
    links: [
      { label: "Ethereum", href: "/work" },
      { label: "Solana", href: "/work" },
      { label: "Base", href: "/work" },
      { label: "Avalanche", href: "/work" },
      { label: "Cosmos", href: "/work" },
      { label: "Arbitrum", href: "/work" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Research Reports", href: "/contact" },
      { label: "Market Data", href: "/contact" },
      { label: "Quarterly Review", href: "/contact" },
      { label: "Newsletter", href: "/contact" },
      { label: "Media Kit", href: "/contact" },
      { label: "Risk Framework", href: "/contact" },
    ],
  },
  {
    heading: "Compliance",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Risk Disclosure", href: "/terms" },
      { label: "Cookie Policy", href: "/privacy" },
      { label: "AML / KYC", href: "/contact" },
      { label: "Regulatory", href: "/contact" },
    ],
  },
];

const socials = [
  {
    label: "X (Twitter)",
    href: "https://twitter.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "https://discord.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Mirror",
    href: "https://mirror.xyz",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 3c2.21 0 4 1.79 4 4v10h-8V7c0-2.21 1.79-4 4-4z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "$4.08B", label: "Consolidated treasury NAV" },
  { value: "6.1%", label: "Blended yield (TTM)" },
  { value: "$162.4M", label: "Software revenue (LTM)" },
  { value: "+8.7%", label: "vs. ETH (YoY)" },
];

export default function FooterDark({
  typography = "luxury",
}: {
  typography?: "luxury" | "robinhood";
}) {
  const displayFont = typography === "robinhood" ? "font-robinhood" : "font-cormorant";
  const uiFont = typography === "robinhood" ? "font-robinhood" : "font-mono-hbm";

  return (
    <footer className="relative bg-void overflow-hidden">
      {/* Ambient atmosphere */}
      <div className="absolute inset-0 purple-bloom pointer-events-none opacity-60" />
      <div className="absolute inset-0 garnet-bloom-top pointer-events-none opacity-40" />

      {/* Top gold rule */}
      <div className="gold-rule w-full" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">

        {/* ─── Upper footer: brand + stats ─── */}
        <div className="py-16 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 border-b border-white/[0.04]">
          {/* Brand block */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3.5 group w-fit">
              <HbmLogo
                size={38}
                className="text-gold/60 group-hover:text-gold transition-all duration-400"
              />
              <div className="flex flex-col leading-none">
                <span
                  className={`${displayFont} inline-flex items-baseline text-lg font-light uppercase text-cream/70 group-hover:text-cream`}
                >
                  <span className="inline-flex items-baseline gap-x-0.5 md:gap-x-1">
                    <span className="tracking-[0.22em] transition-colors duration-300">HBM</span>
                    <span className="shrink-0 tracking-tight text-gold/60 group-hover:text-gold transition-colors duration-300">
                      &
                    </span>
                  </span>
                  <span className="tracking-[0.22em] pl-1.5 transition-colors duration-300 md:pl-2">Company</span>
                </span>
              </div>
            </Link>
            <p className={`${displayFont} text-display-sm text-cream/60 font-light italic leading-tight max-w-sm`}>
              Built in the dark.<br />
              Deployed at scale.
            </p>
            <p className={`${uiFont} text-label-xs text-silver-dim/68 uppercase tracking-[0.15em] max-w-xs leading-relaxed`}>
              A private holding company operating at the intersection of
              decentralized finance and digital asset infrastructure.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href="mailto:hbmandcompany@gmail.com"
                className={`${uiFont} text-label-sm text-silver-dim hover:text-gold transition-colors duration-300 tracking-[0.05em]`}
              >
                hbmandcompany@gmail.com
              </a>
              <p className={`${uiFont} text-label-xs text-silver-dim/30 uppercase tracking-[0.15em]`}>
                Inquiries by introduction only
              </p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-4 content-start">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass-panel-dark p-5 md:p-6"
              >
                <div className={`${displayFont} text-display-md text-gold font-bold leading-none mb-1`}>
                  {s.value}
                </div>
                    <div className={`${uiFont} text-label-xs text-silver-dim/58 uppercase tracking-[0.14em] leading-snug`}>
                      {s.label}
                    </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Main link grid ─── */}
        <div className="py-16 md:py-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 border-b border-white/[0.04]">
          {footerColumns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h4 className={`${uiFont} text-label-xs text-gold/70 uppercase tracking-[0.28em] pb-2 border-b border-gold/[0.08]`}>
                {col.heading}
              </h4>
              <nav className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`${uiFont} text-label-xs text-silver-dim/30 hover:text-silver-dim transition-colors duration-300 uppercase tracking-[0.12em] leading-relaxed group flex items-center gap-1.5`}
                  >
                    <span className="w-0 h-px bg-garnet group-hover:w-3 transition-all duration-300 shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* ─── Social + offices ─── */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-10 border-b border-white/[0.04]">
          {/* Socials */}
          <div className="flex flex-col gap-4">
            <h4 className={`${uiFont} text-label-xs text-gold/70 uppercase tracking-[0.28em]`}>
              Connect
            </h4>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/[0.05] text-silver-dim/55 hover:text-gold hover:border-gold/28 transition-all duration-300 group"
                >
                  {s.icon}
                  <span className={`${uiFont} text-label-xs uppercase tracking-[0.15em]`}>
                    {s.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Offices */}
          <div className="flex flex-col gap-4">
            <h4 className={`${uiFont} text-label-xs text-gold/70 uppercase tracking-[0.28em]`}>
              Offices
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {[
                { city: "Dallas", region: "Primary HQ", detail: "WYOMING REGISTERED" },
                { city: "Berlin",   region: "Continental EU", detail: "EU OPERATIONS" },
                { city: "Tokyo",    region: "APAC",          detail: "Asia-Pacific" },
              ].map((o) => (
                <div
                  key={o.city}
                  className="glass-panel-dark px-4 py-3"
                >
                  <div className={`${displayFont} text-body-md text-cream/70 font-light`}>{o.city}</div>
                  <div className={`${uiFont} text-label-xs text-gold/50 uppercase tracking-[0.15em] mt-0.5`}>{o.region}</div>
                  <div className={`${uiFont} text-[9px] text-silver-dim/30 uppercase tracking-[0.1em] mt-1`}>{o.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom bar ─── */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`${uiFont} text-label-xs text-silver-dim/30 uppercase tracking-[0.2em]`}>
            © {new Date().getFullYear()} HBM & Company. All rights reserved.
          </p>
          <p className={`${uiFont} text-label-xs text-silver-dim/20 uppercase tracking-[0.15em] text-center max-w-md`}>
            Not financial advice. Digital assets involve substantial risk of loss.
            Nothing herein constitutes an offer to sell securities.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Privacy", href: "/privacy" },
              { label: "Terms",   href: "/terms" },
              { label: "Risk",    href: "/terms" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`${uiFont} text-label-xs text-silver-dim/30 hover:text-silver-dim transition-colors duration-300 uppercase tracking-[0.15em]`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";

const purchaseUrl = process.env.NEXT_PUBLIC_HBM_PURCHASE_URL?.trim();

export default function AcquireHbmContent() {
  return (
    <>
      <NavBar />

      <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden section-dark px-6 pb-28 pt-[calc(env(safe-area-inset-top,0px)+7rem)] md:px-12 md:pb-32 md:pt-[calc(env(safe-area-inset-top,0px)+8rem)]">
        <div className="pointer-events-none absolute inset-0 purple-bloom opacity-50" aria-hidden />
        <div className="pointer-events-none absolute inset-0 city-glow opacity-35" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[720px] text-center">
          <span className="mb-6 inline-block border border-gold/25 bg-void/50 px-3 py-1.5 font-mono-hbm text-[10px] uppercase tracking-[0.35em] text-gold/55 backdrop-blur-sm">
            Platform currency
          </span>

          <h1 className="mb-4 font-cormorant text-[clamp(3rem,10vw,5.5rem)] font-light leading-[0.95] text-cream/95">
            HBM
          </h1>
          <p className="mx-auto mb-10 max-w-lg font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.24em] text-silver/45">
            The native unit of participation on our rails — acquire through the venue below or
            engage treasury for directed allocation.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            {purchaseUrl ? (
              <a
                href={purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="garnet-btn inline-block px-10 py-4 text-center font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void"
              >
                Buy HBM
              </a>
            ) : (
              <Link
                href="/contact"
                className="garnet-btn inline-block px-10 py-4 text-center font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void"
              >
                Engage treasury
              </Link>
            )}
            <Link
              href="/treasury"
              className="gold-outline-btn inline-block px-10 py-4 text-center font-mono-hbm text-[10px] uppercase tracking-[0.22em]"
            >
              How treasury works
            </Link>
          </div>

          <p className="mx-auto mt-10 max-w-md font-mono-hbm text-[9px] uppercase leading-relaxed tracking-[0.16em] text-silver-dim/40">
            Digital assets involve substantial risk. Nothing herein is an offer of securities. Do
            your own diligence before transacting.
          </p>
        </div>
      </section>

      <FooterDark typography="luxury" />
    </>
  );
}

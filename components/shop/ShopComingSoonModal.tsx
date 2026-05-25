"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

export function ShopComingSoonModal() {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-void/92 px-6 backdrop-blur-heavy"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shop-coming-soon-title"
      aria-describedby="shop-coming-soon-description"
    >
      <div className="absolute inset-0 purple-bloom pointer-events-none opacity-40" aria-hidden />
      <div className="absolute inset-0 garnet-bloom-top pointer-events-none opacity-30" aria-hidden />

      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/[0.08] bg-obsidian/95 p-10 text-center shadow-deep md:p-12"
      >
        <p className="font-mono-hbm text-[10px] uppercase tracking-[0.32em] text-gold/55">
          HBM Goods
        </p>

        <h1
          id="shop-coming-soon-title"
          className="mt-5 font-cormorant text-[clamp(2rem,5vw,2.75rem)] font-light leading-[1.05] text-cream"
        >
          The shop is
          <span className="block italic font-semibold text-gradient-gold">coming soon.</span>
        </h1>

        <div className="mx-auto mt-6 h-px w-16 bg-gold/30" aria-hidden />

        <p
          id="shop-coming-soon-description"
          className="mx-auto mt-6 max-w-sm font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.14em] text-silver-dim/55"
        >
          We are preparing the first HBM & Company collection — apparel, accessories, and
          hardware crafted with the same standard as our editorial work. The storefront opens
          shortly.
        </p>

        <a
          href="https://hbmandcompany.com"
          className="garnet-btn garnet-btn-soft mt-10 inline-block font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void/88 px-8 py-3"
        >
          Return to HBM & Company
        </a>
      </motion.div>
    </div>
  );
}

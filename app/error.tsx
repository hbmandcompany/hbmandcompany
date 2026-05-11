"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 bg-void px-6 py-24 text-center">
      <h1 className="font-cormorant text-2xl font-light text-cream md:text-3xl">
        Something went wrong
      </h1>
      <p className="max-w-md font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/60">
        This page hit an unexpected error. You can try again or return home.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="garnet-btn px-8 py-3 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-void"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border border-white/[0.12] px-8 py-3 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-cream/80 transition-colors hover:border-gold/30 hover:text-cream"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

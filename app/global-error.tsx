"use client";

import { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
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
    <html lang="en-US">
      <body className="bg-void text-cream antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-12 text-center">
          <h1 className="font-cormorant text-2xl font-light md:text-3xl">Something went wrong</h1>
          <p className="max-w-md font-mono-hbm text-[11px] uppercase leading-relaxed tracking-[0.18em] text-silver-dim/60">
            A critical error occurred. Please try reloading the page.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full border border-gold/30 bg-gold/10 px-8 py-3 font-mono-hbm text-[10px] uppercase tracking-[0.22em] text-cream transition-colors hover:bg-gold/20"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

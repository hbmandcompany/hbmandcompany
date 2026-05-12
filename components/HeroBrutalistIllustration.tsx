"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { paintLinocut } from "@/components/linocutPaint";

const ALT =
  "Linocut / woodblock style abstract print: hand-carved shapes, ink, and warm handmade paper";

type Props = {
  className?: string;
};

export default function HeroBrutalistIllustration({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    function paint() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);
      const bw = Math.max(1, Math.round(rect.width * dpr));
      const bh = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      const cw = Math.max(1, rect.width);
      const ch = Math.max(1, rect.height);
      paintLinocut(ctx, cw, ch, dpr, { variantKey: 0, density: "hero" });
    }

    paint();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      className={clsx(
        "hero-brutalist-root pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]",
        className,
      )}
      role="img"
      aria-label={ALT}
    >
      <div className="hero-brutalist-canvas-wrap absolute inset-0" aria-hidden>
        <canvas ref={canvasRef} className="hero-brutalist-canvas h-full w-full object-cover" aria-hidden />
      </div>
      <div className="hero-brutalist-frame-grid hero-linocut-veil absolute inset-0 z-10" aria-hidden />
    </div>
  );
}

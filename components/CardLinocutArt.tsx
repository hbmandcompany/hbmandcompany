"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";
import { paintLinocut, type LinocutComposition } from "@/components/linocutPaint";

const VARIANT_KEYS: Record<string, number> = {
  lightrain: 17,
  moneyba: 29,
  treasury: 71,
  governance: 83,
  custody: 91,
  tokenomics: 97,
  "black-letter": 41,
  pickup: 53,
  spatial: 67,
};

const COMPOSITION_BY_VARIANT: Partial<Record<string, LinocutComposition>> = {
  lightrain: "lightrain",
  moneyba: "moneyba",
};

const PLACEHOLDER_LABEL_BY_VARIANT: Partial<Record<string, string>> = {
  lightrain: "LightRain Illustration Placeholder",
  moneyba: "MoneyBagg Illustration Placeholder",
  "black-letter": "BlackLetter Illustration Placeholder",
  pickup: "52PickUp Illustration Placeholder",
  spatial: "ThreeWiseMen Illustration Placeholder",
};

export type CardLinocutVariant = keyof typeof VARIANT_KEYS;

type Props = {
  variant: string;
  className?: string;
  /** When set, the dashed placeholder label is hidden until the parent `.group` is hovered or focused. */
  hidePlaceholderUntilHover?: boolean;
};

export default function CardLinocutArt({ variant, className, hidePlaceholderUntilHover }: Props) {
  const vk = VARIANT_KEYS[variant] ?? 19;
  const composition = COMPOSITION_BY_VARIANT[variant] ?? "default";
  const placeholderLabel = PLACEHOLDER_LABEL_BY_VARIANT[variant];
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
      paintLinocut(ctx, cw, ch, dpr, { variantKey: vk, density: "card", composition });
    }

    paint();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ro = new ResizeObserver(() => paint());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [variant, vk, composition]);

  return (
    <div
      className={clsx(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] bg-[#5f5852]",
        className,
      )}
      aria-hidden
    >
      {placeholderLabel ? (
        <div
          className={clsx(
            "absolute inset-0 grid place-items-center bg-gradient-to-br from-[#121826] via-[#1b2235] to-[#20142a]",
            hidePlaceholderUntilHover &&
              "transition-opacity duration-300 max-md:opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100 md:group-active:opacity-100",
          )}
        >
          <div className="rounded-md border border-dashed border-gold/35 bg-black/20 px-4 py-2 text-center">
            <p className="font-mono-hbm text-[10px] uppercase tracking-[0.16em] text-gold/80">{placeholderLabel}</p>
          </div>
        </div>
      ) : (
        <canvas ref={canvasRef} className="h-full w-full object-cover" />
      )}
      <div className="hero-brutalist-frame-grid hero-linocut-veil absolute inset-0 z-10" />
    </div>
  );
}

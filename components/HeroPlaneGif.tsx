"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { parseGIF, decompressFrames } from "gifuct-js";
import type { ParsedFrame } from "gifuct-js";

type HeroPlaneGifProps = {
  src: string;
  alt: string;
  /** Multiplies each frame's delay; 2 ≈ half playback speed */
  slowFactor?: number;
  className?: string;
  sizes?: string;
};

const MAX_DPR = 2;
const MAX_DT_MS = 48;

function get2dContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
  const opts: CanvasRenderingContext2DSettings = {
    alpha: true,
    desynchronized: true,
  };
  try {
    return canvas.getContext("2d", opts);
  } catch {
    return canvas.getContext("2d", { alpha: true });
  }
}

export default function HeroPlaneGif({
  src,
  alt,
  slowFactor = 2.25,
  className,
  sizes = "(max-width: 640px) 234px, (max-width: 1024px) 268px, 324px",
}: HeroPlaneGifProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion === true) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface: HTMLCanvasElement = canvas;

    const ctx = get2dContext(surface);
    if (!ctx) return;

    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    const gifCanvas = document.createElement("canvas");
    const gifCtx = gifCanvas.getContext("2d", { alpha: true });
    if (!tempCtx || !gifCtx) return;

    const renderCtx: CanvasRenderingContext2D = ctx;
    const patchCtx: CanvasRenderingContext2D = tempCtx;
    const composeCtx: CanvasRenderingContext2D = gifCtx;

    let cancelled = false;
    let rafId = 0;
    let frameIndex = 0;
    let needsDisposal = false;
    let frameImageData: ImageData | null = null;
    let loadedFrames: ParsedFrame[] = [];
    let gifW = 0;
    let gifH = 0;

    let accumulated = 0;
    let lastTs = 0;
    let displayW = 0;
    let displayH = 0;
    let dpr = 1;

    function syncDisplayBackingStore() {
      const rect = surface.getBoundingClientRect();
      const w = Math.max(1, rect.width);
      const h = Math.max(1, rect.height);
      const nextDpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, MAX_DPR);
      const bw = Math.max(1, Math.round(w * nextDpr));
      const bh = Math.max(1, Math.round(h * nextDpr));
      if (surface.width !== bw || surface.height !== bh || dpr !== nextDpr) {
        surface.width = bw;
        surface.height = bh;
        dpr = nextDpr;
      }
      displayW = w;
      displayH = h;
    }

    function blitToDisplay() {
      syncDisplayBackingStore();
      renderCtx.setTransform(1, 0, 0, 1, 0, 0);
      renderCtx.scale(dpr, dpr);
      renderCtx.imageSmoothingEnabled = true;
      renderCtx.imageSmoothingQuality = "high";
      renderCtx.clearRect(0, 0, displayW, displayH);
      renderCtx.drawImage(gifCanvas, 0, 0, gifW, gifH, 0, 0, displayW, displayH);
    }

    function drawPatch(frame: ParsedFrame) {
      const dims = frame.dims;
      if (
        !frameImageData ||
        frameImageData.width !== dims.width ||
        frameImageData.height !== dims.height
      ) {
        tempCanvas.width = dims.width;
        tempCanvas.height = dims.height;
        frameImageData = patchCtx.createImageData(dims.width, dims.height);
      }
      frameImageData.data.set(frame.patch);
      patchCtx.putImageData(frameImageData, 0, 0);
      composeCtx.drawImage(tempCanvas, dims.left, dims.top);
    }

    function drawOneGifFrame() {
      if (cancelled || loadedFrames.length === 0) return;

      const frame = loadedFrames[frameIndex];

      if (needsDisposal) {
        composeCtx.clearRect(0, 0, gifCanvas.width, gifCanvas.height);
        needsDisposal = false;
      }

      drawPatch(frame);
      blitToDisplay();

      if (frame.disposalType === 2) {
        needsDisposal = true;
      }

      frameIndex = (frameIndex + 1) % loadedFrames.length;
    }

    function tick(now: number) {
      if (cancelled) return;

      if (!lastTs) {
        lastTs = now;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(MAX_DT_MS, Math.max(0, now - lastTs));
      lastTs = now;
      accumulated += dt;

      const prevIndex = (frameIndex - 1 + loadedFrames.length) % loadedFrames.length;
      const holdMs = Math.max(20, loadedFrames[prevIndex].delay) * slowFactor;

      /* One advance per vsync avoids multi-step jumps that read as stutter */
      if (accumulated >= holdMs && loadedFrames.length > 0) {
        accumulated -= holdMs;
        if (accumulated > holdMs * 3) {
          accumulated = holdMs * 0.35;
        }
        drawOneGifFrame();
      }

      rafId = requestAnimationFrame(tick);
    }

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            if (!cancelled && loadedFrames.length > 0) blitToDisplay();
          })
        : null;
    ro?.observe(surface);

    fetch(src)
      .then((r) => r.arrayBuffer())
      .then((buffer) => {
        if (cancelled) return;
        const gif = parseGIF(buffer);
        const frames = decompressFrames(gif, true);
        if (frames.length === 0) return;

        loadedFrames = frames;
        gifW = gif.lsd.width;
        gifH = gif.lsd.height;
        gifCanvas.width = gifW;
        gifCanvas.height = gifH;

        composeCtx.imageSmoothingEnabled = true;
        composeCtx.imageSmoothingQuality = "high";

        frameIndex = 0;
        needsDisposal = false;
        drawOneGifFrame();

        lastTs = 0;
        accumulated = 0;
        if (!cancelled) rafId = requestAnimationFrame(tick);
      })
      .catch(() => {
        if (cancelled) return;
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          if (cancelled) return;
          syncDisplayBackingStore();
          renderCtx.setTransform(1, 0, 0, 1, 0, 0);
          renderCtx.scale(dpr, dpr);
          renderCtx.imageSmoothingEnabled = true;
          renderCtx.imageSmoothingQuality = "high";
          renderCtx.clearRect(0, 0, displayW, displayH);
          renderCtx.drawImage(img, 0, 0, displayW, displayH);
        };
      });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      ro?.disconnect();
    };
  }, [src, slowFactor, reduceMotion]);

  if (reduceMotion === true) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        unoptimized
        priority
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={className}
    />
  );
}

"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Immersive 8-bit pixel-art scenes for the featured-work cards.
 * Composition target is a real illustration, not an icon.
 */
const VB = { w: 96, h: 54 } as const;

export type FeaturedWorkPixelVariant = "black-letter" | "pickup" | "spatial";

const C = {
  /* common dark / light */
  void: "#04050a",
  pitch: "#070914",
  ink: "#0a0810",
  inkDeep: "#020306",
  inkHi: "#241c1c",

  /* parchment / paper */
  parchment: "#ead7af",
  parchmentHi: "#f4e6c2",
  parchmentLow: "#b9a474",
  parchmentShadow: "#7a6648",

  /* wax seal */
  wax: "#a02018",
  waxHi: "#e0402c",
  waxDark: "#581008",

  /* wood desk */
  wood: "#5a3a20",
  woodHi: "#7a5630",
  woodLow: "#3a2410",
  woodGrain: "#4a2c18",

  /* candle / flame */
  candle: "#e8e0c0",
  candleHi: "#fff8d8",
  flame: "#ffd874",
  flameHot: "#fff2c0",
  ember: "#e87038",

  /* gold */
  gold: "#c4a868",
  goldHi: "#e8d29a",
  goldLow: "#8a7440",
  goldDeep: "#5a4828",

  /* card felt */
  felt: "#1a4a2e",
  feltHi: "#2c6840",
  feltLow: "#0b2a18",
  feltDeep: "#04140a",

  /* card surfaces */
  cardWhite: "#f4ecdc",
  cardOff: "#d8cdb8",
  cardEdge: "#7a6e58",
  cardShadow: "#040608",
  cardBack: "#9c2030",
  cardBackHi: "#d04848",
  cardBackDeep: "#48101c",

  /* suits */
  hearts: "#c83838",
  heartsHi: "#f06868",
  diamonds: "#c83838",
  spades: "#0a0810",
  clubs: "#0a0810",

  /* night sky */
  skyDeep: "#04050f",
  skyMid: "#0a0e22",
  skyHi: "#181a36",
  skyHaze: "#2e1c3a",

  /* magi star */
  star: "#fff8d8",
  starGlow: "#f4d878",
  starCool: "#e8e8f0",

  /* robes */
  robeGold: "#b8924c",
  robeGoldHi: "#e8c878",
  robeGoldLow: "#6a5028",
  robeRuby: "#7a2030",
  robeRubyHi: "#a04050",
  robeRubyLow: "#3a0810",
  robeNavy: "#2a3a6a",
  robeNavyHi: "#4a5a9a",
  robeNavyLow: "#0c1428",
  skin: "#c89878",
  skinDark: "#7a4828",

  /* desert / city */
  duneDeep: "#3a2818",
  duneMid: "#5a4028",
  dune: "#8a6a48",
  duneHi: "#b89878",
  cityNight: "#0a0a1c",
  cityWarm: "#382010",
} as const;

const hash = (a: number, b = 0) => {
  const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function disc(cx: number, cy: number, r: number, fill: string, opacity = 1, key = "d"): ReactNode[] {
  const out: ReactNode[] = [];
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(Math.max(0, r * r - dy * dy)));
    out.push(
      <rect key={`${key}-${dy}`} x={cx - w} y={cy + dy} width={w * 2 + 1} height={1} fill={fill} opacity={opacity} />,
    );
  }
  return out;
}

/* ── tiny pixel font (3w × 5h) for digits 0-9 ─────────────────── */
const DIGIT_MASKS: Record<string, string[]> = {
  "0": ["###", "#.#", "#.#", "#.#", "###"],
  "1": [".#.", "##.", ".#.", ".#.", "###"],
  "2": ["##.", "..#", ".#.", "#..", "###"],
  "3": ["##.", "..#", ".##", "..#", "##."],
  "4": ["#.#", "#.#", "###", "..#", "..#"],
  "5": ["###", "#..", "##.", "..#", "##."],
  "6": [".##", "#..", "##.", "#.#", ".#."],
  "7": ["###", "..#", ".#.", ".#.", ".#."],
  "8": [".#.", "#.#", ".#.", "#.#", ".#."],
  "9": [".#.", "#.#", ".##", "..#", "##."],
};

function pixelDigits(
  text: string,
  x: number,
  y: number,
  scale: number,
  fill: string,
  opacity = 1,
  key = "dg",
): ReactNode[] {
  const out: ReactNode[] = [];
  for (let i = 0; i < text.length; i++) {
    const mask = DIGIT_MASKS[text[i]];
    if (!mask) continue;
    mask.forEach((row, r) => {
      [...row].forEach((c, ci) => {
        if (c === "#") {
          out.push(
            <rect
              key={`${key}-${i}-${r}-${ci}`}
              x={x + i * (4 * scale) + ci * scale}
              y={y + r * scale}
              width={scale}
              height={scale}
              fill={fill}
              opacity={opacity}
            />,
          );
        }
      });
    });
  }
  return out;
}

/* ── pixel suit glyphs ────────────────────────────────────────── */

function pixelHeart(x: number, y: number, scale: number, fill: string, fillHi: string, key = "h"): ReactNode[] {
  // 5×5 pixel heart
  const mask = [
    ".#.#.",
    "#####",
    "#####",
    ".###.",
    "..#..",
  ];
  const out: ReactNode[] = [];
  mask.forEach((row, r) => {
    [...row].forEach((c, ci) => {
      if (c === "#") {
        out.push(
          <rect
            key={`${key}-${r}-${ci}`}
            x={x + ci * scale}
            y={y + r * scale}
            width={scale}
            height={scale}
            fill={r === 1 && (ci === 0 || ci === 3) ? fillHi : fill}
          />,
        );
      }
    });
  });
  return out;
}

function pixelSpade(x: number, y: number, scale: number, fill: string, key = "s"): ReactNode[] {
  const mask = [
    "..#..",
    ".###.",
    "#####",
    "#####",
    "..#..",
    ".###.",
  ];
  return mask.flatMap((row, r) =>
    [...row].flatMap((c, ci) =>
      c === "#"
        ? [
            <rect
              key={`${key}-${r}-${ci}`}
              x={x + ci * scale}
              y={y + r * scale}
              width={scale}
              height={scale}
              fill={fill}
            />,
          ]
        : [],
    ),
  );
}

function pixelDiamond(x: number, y: number, scale: number, fill: string, key = "dm"): ReactNode[] {
  const mask = [
    "..#..",
    ".###.",
    "#####",
    ".###.",
    "..#..",
  ];
  return mask.flatMap((row, r) =>
    [...row].flatMap((c, ci) =>
      c === "#"
        ? [
            <rect
              key={`${key}-${r}-${ci}`}
              x={x + ci * scale}
              y={y + r * scale}
              width={scale}
              height={scale}
              fill={fill}
            />,
          ]
        : [],
    ),
  );
}

function pixelClub(x: number, y: number, scale: number, fill: string, key = "cl"): ReactNode[] {
  const mask = [
    "..#..",
    ".###.",
    "..#..",
    "#####",
    ".###.",
    ".###.",
  ];
  return mask.flatMap((row, r) =>
    [...row].flatMap((c, ci) =>
      c === "#"
        ? [
            <rect
              key={`${key}-${r}-${ci}`}
              x={x + ci * scale}
              y={y + r * scale}
              width={scale}
              height={scale}
              fill={fill}
            />,
          ]
        : [],
    ),
  );
}

/* ── Scene 1: Black Letter — wax-sealed envelope on a writing desk ─ */

function BlackLetter() {
  return (
    <g>
      {/* wood desk surface */}
      <rect x={0} y={0} width={96} height={54} fill={C.wood} />
      {/* wood grain */}
      {Array.from({ length: 18 }).map((_, i) => {
        const y = Math.floor(hash(i, 2) * 54);
        return (
          <rect
            key={`g-${i}`}
            x={0}
            y={y}
            width={96}
            height={1}
            fill={i % 2 ? C.woodGrain : C.woodLow}
            opacity={0.3 + hash(i, 5) * 0.25}
          />
        );
      })}
      {[
        [10, 6, 6, 3], [72, 50, 8, 2], [84, 14, 6, 2], [4, 36, 5, 2], [42, 50, 7, 2], [60, 4, 5, 2],
      ].map(([x, y, w, h], i) => (
        <rect key={`knot-${i}`} x={x} y={y} width={w} height={h} fill={C.woodLow} opacity={0.55} />
      ))}

      {/* ambient candle glow on left side of desk */}
      <rect x={0} y={4} width={32} height={48} fill={C.flame} opacity={0.07} />
      <rect x={2} y={6} width={24} height={44} fill={C.flame} opacity={0.06} />
      <rect x={4} y={8} width={18} height={40} fill={C.flame} opacity={0.05} />

      {/* envelope shadow */}
      <rect x={14} y={16} width={70} height={28} fill="#180a08" opacity={0.55} />
      <rect x={13} y={43} width={72} height={1} fill="#180a08" opacity={0.4} />

      {/* envelope body */}
      <rect x={12} y={14} width={72} height={28} fill={C.parchment} />
      {/* paper grain spots */}
      {Array.from({ length: 26 }).map((_, i) => {
        const x = 14 + Math.floor(hash(i, 1) * 68);
        const y = 16 + Math.floor(hash(i, 2) * 24);
        return (
          <rect
            key={`pt-${i}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={C.parchmentLow}
            opacity={0.18 + hash(i, 3) * 0.2}
          />
        );
      })}
      {/* envelope edges */}
      <rect x={12} y={14} width={72} height={1} fill={C.parchmentHi} />
      <rect x={12} y={41} width={72} height={1} fill={C.parchmentLow} />
      <rect x={12} y={14} width={1} height={28} fill={C.parchmentHi} opacity={0.7} />
      <rect x={83} y={14} width={1} height={28} fill={C.parchmentLow} opacity={0.6} />

      {/* gold inset border ornament */}
      <rect x={16} y={18} width={64} height={1} fill={C.gold} opacity={0.5} />
      <rect x={16} y={37} width={64} height={1} fill={C.gold} opacity={0.5} />
      <rect x={16} y={18} width={1} height={20} fill={C.gold} opacity={0.5} />
      <rect x={79} y={18} width={1} height={20} fill={C.gold} opacity={0.5} />
      {[[16, 18], [79, 18], [16, 37], [79, 37]].map(([cx, cy], i) => (
        <g key={`orn-${i}`}>
          <rect x={cx - 1} y={cy - 1} width={3} height={3} fill={C.gold} opacity={0.85} />
          <rect x={cx} y={cy} width={1} height={1} fill={C.goldHi} />
        </g>
      ))}

      {/* envelope flap (triangle V to center) */}
      <polygon points="12,14 48,32 84,14" fill={C.parchmentLow} />
      <polygon points="13,15 48,31 83,15" fill={C.parchment} opacity={0.4} />
      {/* flap shading (inside fold) */}
      <polygon points="12,14 48,32 84,14 84,15 48,33 12,15" fill={C.parchmentShadow} opacity={0.5} />
      {/* flap top edge highlight */}
      <rect x={12} y={14} width={72} height={1} fill={C.parchmentHi} opacity={0.8} />
      {/* fold crease subtle line down to seal */}
      <rect x={47} y={31} width={2} height={2} fill={C.parchmentShadow} opacity={0.6} />

      {/* address calligraphy (gold flourishes) under flap */}
      {[35, 39, 43, 53, 57, 61].map((x, i) => (
        <rect key={`ad-${i}`} x={x} y={38} width={3} height={1} fill={C.ink} opacity={0.5} />
      ))}
      <rect x={37} y={40} width={20} height={1} fill={C.ink} opacity={0.35} />

      {/* wax seal centered at flap tip */}
      <g>
        {/* drip below */}
        <rect x={42} y={35} width={2} height={3} fill={C.wax} opacity={0.7} />
        <rect x={52} y={35} width={2} height={4} fill={C.wax} opacity={0.65} />
        <rect x={43} y={37} width={1} height={2} fill={C.waxDark} opacity={0.6} />
        <rect x={52} y={38} width={1} height={2} fill={C.waxDark} opacity={0.6} />
        {/* shadow + dim disc behind */}
        {disc(48, 31, 7, C.waxDark, 0.45, "wax-shd")}
        {/* main seal */}
        {disc(48, 30, 6, C.wax, 1, "wax-1")}
        {/* highlight crescent */}
        <rect x={44} y={26} width={4} height={1} fill={C.waxHi} opacity={0.85} />
        <rect x={43} y={27} width={2} height={1} fill={C.waxHi} opacity={0.7} />
        <rect x={47} y={27} width={2} height={1} fill={C.waxHi} opacity={0.5} />
        {/* embossed "H" crest */}
        <rect x={45} y={28} width={1} height={5} fill={C.gold} opacity={0.9} />
        <rect x={50} y={28} width={1} height={5} fill={C.gold} opacity={0.9} />
        <rect x={45} y={30} width={6} height={1} fill={C.gold} opacity={0.9} />
        <rect x={45} y={28} width={1} height={1} fill={C.goldHi} />
        <rect x={50} y={28} width={1} height={1} fill={C.goldHi} />
        {/* tiny seal serifs */}
        <rect x={44} y={28} width={3} height={1} fill={C.gold} opacity={0.7} />
        <rect x={49} y={28} width={3} height={1} fill={C.gold} opacity={0.7} />
        <rect x={44} y={32} width={3} height={1} fill={C.gold} opacity={0.7} />
        <rect x={49} y={32} width={3} height={1} fill={C.gold} opacity={0.7} />
      </g>

      {/* quill pen — diagonal from lower-left to upper-right across envelope */}
      {/* shaft (polygon parallelogram) */}
      <polygon points="20,42 64,18 65,19 21,43" fill={C.inkDeep} opacity={0.4} />
      <polygon points="20,41 64,17 66,19 22,43" fill={C.ink} />
      <polygon points="20,41 64,17 64,18 20,42" fill={C.inkHi} opacity={0.7} />
      {/* feather barbs */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const baseX = 28 + i * 4;
        const baseY = 36 - i * 2;
        return (
          <g key={`fb-${i}`}>
            <rect x={baseX - 1} y={baseY} width={4} height={1} fill={C.ink} opacity={0.9} />
            <rect x={baseX} y={baseY - 1} width={3} height={1} fill={C.inkHi} opacity={0.6} />
          </g>
        );
      })}
      {/* feather plume tip */}
      <polygon points="58,22 66,16 68,18 64,24 56,26 50,28 54,24" fill={C.ink} opacity={0.92} />
      <polygon points="60,21 66,17 64,20" fill={C.inkHi} opacity={0.55} />
      {/* nib tip — gold */}
      <rect x={18} y={41} width={3} height={1} fill={C.goldHi} />
      <rect x={18} y={42} width={3} height={1} fill={C.gold} />
      <rect x={18} y={43} width={3} height={1} fill={C.goldLow} />
      <rect x={20} y={43} width={1} height={1} fill={C.ink} />

      {/* inkwell at lower right */}
      <rect x={74} y={44} width={12} height={2} fill="#1a0a0a" opacity={0.55} />
      <rect x={73} y={37} width={12} height={9} fill={C.ink} />
      <rect x={73} y={37} width={12} height={1} fill={C.inkHi} opacity={0.45} />
      <rect x={73} y={45} width={12} height={1} fill={C.inkDeep} />
      <rect x={74} y={38} width={1} height={7} fill={C.inkHi} opacity={0.45} />
      <rect x={83} y={38} width={1} height={7} fill={C.inkDeep} />
      {/* ink surface */}
      <rect x={74} y={37} width={10} height={1} fill="#180a0a" />
      <rect x={75} y={38} width={8} height={1} fill={C.ink} opacity={0.85} />
      {/* gold rim band */}
      <rect x={73} y={40} width={12} height={1} fill={C.gold} opacity={0.55} />
      <rect x={73} y={41} width={12} height={1} fill={C.goldLow} opacity={0.5} />

      {/* candle holder + candle on the left */}
      {/* base saucer */}
      <rect x={1} y={28} width={11} height={3} fill={C.gold} />
      <rect x={1} y={28} width={11} height={1} fill={C.goldHi} />
      <rect x={1} y={30} width={11} height={1} fill={C.goldLow} />
      <rect x={3} y={31} width={7} height={1} fill={C.goldDeep} opacity={0.6} />
      {/* candle body */}
      <rect x={5} y={14} width={3} height={14} fill={C.candle} />
      <rect x={5} y={14} width={1} height={14} fill={C.candleHi} />
      <rect x={7} y={14} width={1} height={14} fill={C.parchmentShadow} opacity={0.5} />
      <rect x={5} y={14} width={3} height={1} fill={C.candleHi} />
      {/* wax drips */}
      <rect x={4} y={26} width={1} height={3} fill={C.candle} opacity={0.75} />
      <rect x={8} y={25} width={1} height={2} fill={C.candle} opacity={0.7} />
      {/* wick */}
      <rect x={6} y={12} width={1} height={2} fill={C.ink} />
      {/* flame */}
      <rect x={5} y={9} width={3} height={3} fill={C.flame} />
      <rect x={6} y={7} width={1} height={2} fill={C.flameHot} />
      <rect x={5} y={10} width={1} height={1} fill={C.ember} opacity={0.75} />
      <rect x={7} y={10} width={1} height={1} fill={C.ember} opacity={0.75} />
      <rect x={6} y={9} width={1} height={1} fill={C.flameHot} />
      {/* flame halo */}
      {disc(6, 9, 4, C.flame, 0.1, "fl-glow")}
      {disc(6, 9, 7, C.flame, 0.05, "fl-glow2")}
    </g>
  );
}

/* ── Scene 2: 52PickUp — playing cards on a felt table ─────────── */

function Pickup52() {
  return (
    <g>
      {/* felt table */}
      <rect x={0} y={0} width={96} height={54} fill={C.felt} />
      {/* felt texture noise */}
      {Array.from({ length: 140 }).map((_, i) => {
        const x = Math.floor(hash(i, 1) * 96);
        const y = Math.floor(hash(i, 2) * 54);
        return (
          <rect
            key={`ft-${i}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={hash(i, 3) > 0.5 ? C.feltHi : C.feltLow}
            opacity={0.3 + hash(i, 4) * 0.3}
          />
        );
      })}
      {/* vignette */}
      <rect x={0} y={0} width={96} height={4} fill={C.feltDeep} opacity={0.7} />
      <rect x={0} y={50} width={96} height={4} fill={C.feltDeep} opacity={0.7} />
      <rect x={0} y={0} width={4} height={54} fill={C.feltDeep} opacity={0.5} />
      <rect x={92} y={0} width={4} height={54} fill={C.feltDeep} opacity={0.5} />

      {/* ─── Card 1: back, upper-left, tilted ─── */}
      <polygon points="8,8 28,5 32,21 12,24" fill={C.cardShadow} opacity={0.55} />
      <polygon points="7,7 27,4 31,20 11,23" fill={C.cardBack} />
      <polygon points="7,7 27,4 27,5 7,8" fill={C.cardBackHi} opacity={0.6} />
      <polygon points="27,4 31,20 30,20 26,5" fill={C.cardBackDeep} opacity={0.7} />
      {/* card back pattern — gold lattice */}
      {[
        [12, 8], [16, 7], [20, 6], [24, 5],
        [13, 12], [17, 11], [21, 10], [25, 9],
        [14, 16], [18, 15], [22, 14], [26, 13],
        [15, 20], [19, 19], [23, 18],
      ].map(([x, y], i) => (
        <rect key={`bp-${i}`} x={x} y={y} width={2} height={1} fill={C.gold} opacity={0.5} />
      ))}
      <rect x={13} y={9} width={14} height={1} fill={C.gold} opacity={0.35} />
      <rect x={14} y={17} width={14} height={1} fill={C.gold} opacity={0.35} />

      {/* ─── Card 2: K♠ middle-back, tilted left ─── */}
      <polygon points="32,7 54,2 57,28 35,32" fill={C.cardShadow} opacity={0.55} />
      <polygon points="31,6 53,1 56,27 34,31" fill={C.cardWhite} />
      <polygon points="31,6 53,1 53,2 31,7" fill={C.cardOff} opacity={0.5} />
      <polygon points="53,1 56,27 55,27 52,2" fill={C.cardEdge} opacity={0.6} />
      {/* K top-left */}
      <rect x={34} y={6} width={1} height={5} fill={C.spades} />
      <rect x={35} y={8} width={1} height={1} fill={C.spades} />
      <rect x={36} y={6} width={1} height={2} fill={C.spades} />
      <rect x={36} y={9} width={1} height={2} fill={C.spades} />
      {/* small spade top-left */}
      {pixelSpade(34, 12, 1, C.spades, "s-tl")}
      {/* K bottom-right */}
      <rect x={50} y={22} width={1} height={5} fill={C.spades} />
      <rect x={51} y={24} width={1} height={1} fill={C.spades} />
      <rect x={52} y={22} width={1} height={2} fill={C.spades} />
      <rect x={52} y={25} width={1} height={2} fill={C.spades} />
      {/* small spade bottom-right */}
      {pixelSpade(50, 17, 1, C.spades, "s-br")}
      {/* large center spade */}
      {pixelSpade(40, 12, 2, C.spades, "s-c")}

      {/* ─── Card 3: face-up, big "52" foreground center ─── */}
      <polygon points="29,28 60,29 60,52 28,52" fill={C.cardShadow} opacity={0.7} />
      <rect x={28} y={28} width={32} height={22} fill={C.cardWhite} />
      <rect x={28} y={28} width={32} height={1} fill={C.cardOff} opacity={0.5} />
      <rect x={28} y={49} width={32} height={1} fill={C.cardEdge} opacity={0.55} />
      <rect x={28} y={28} width={1} height={22} fill={C.cardOff} opacity={0.6} />
      <rect x={59} y={28} width={1} height={22} fill={C.cardEdge} opacity={0.6} />
      {/* gold inset frame */}
      <rect x={30} y={30} width={28} height={1} fill={C.gold} opacity={0.45} />
      <rect x={30} y={47} width={28} height={1} fill={C.gold} opacity={0.45} />
      <rect x={30} y={30} width={1} height={18} fill={C.gold} opacity={0.45} />
      <rect x={57} y={30} width={1} height={18} fill={C.gold} opacity={0.45} />
      {/* corner ornaments */}
      {[[30, 30], [57, 30], [30, 47], [57, 47]].map(([cx, cy], i) => (
        <rect key={`cc-${i}`} x={cx - 1} y={cy - 1} width={3} height={3} fill={C.gold} opacity={0.65} />
      ))}
      {/* small "52" top-left + heart */}
      {pixelDigits("52", 31, 31, 1, C.hearts, 0.95, "tl52")}
      {pixelHeart(31, 37, 1, C.hearts, C.heartsHi, "tlh")}
      {/* small "52" bottom-right (rotated visually — just placed) + heart */}
      {pixelDigits("52", 51, 44, 1, C.hearts, 0.95, "br52")}
      {pixelHeart(53, 41, 1, C.hearts, C.heartsHi, "brh")}
      {/* huge center "52" */}
      {pixelDigits("52", 36, 33, 2, C.hearts, 1, "big52")}
      {pixelDigits("52", 36, 33, 2, C.heartsHi, 0.4, "big52hi")}
      {/* center small heart suit */}
      {pixelHeart(43, 43, 1, C.hearts, C.heartsHi, "ch")}

      {/* ─── Card 4: A♦ on the right, tilted forward ─── */}
      <polygon points="62,20 84,16 87,40 65,44" fill={C.cardShadow} opacity={0.55} />
      <polygon points="61,19 83,15 86,39 64,43" fill={C.cardWhite} />
      <polygon points="61,19 83,15 83,16 61,20" fill={C.cardOff} opacity={0.55} />
      <polygon points="83,15 86,39 85,39 82,16" fill={C.cardEdge} opacity={0.6} />
      {/* A top-left */}
      <rect x={64} y={20} width={1} height={4} fill={C.diamonds} />
      <rect x={66} y={20} width={1} height={4} fill={C.diamonds} />
      <rect x={65} y={20} width={1} height={1} fill={C.diamonds} />
      <rect x={64} y={22} width={3} height={1} fill={C.diamonds} />
      {/* small diamond top-left */}
      {pixelDiamond(64, 25, 1, C.diamonds, "d-tl")}
      {/* huge center diamond */}
      {pixelDiamond(70, 24, 2, C.diamonds, "d-c")}
      {/* A bottom-right */}
      <rect x={81} y={34} width={1} height={4} fill={C.diamonds} />
      <rect x={83} y={34} width={1} height={4} fill={C.diamonds} />
      <rect x={82} y={34} width={1} height={1} fill={C.diamonds} />
      <rect x={81} y={36} width={3} height={1} fill={C.diamonds} />

      {/* ─── Card 5: J♣ top-right edge, tilted ─── */}
      <polygon points="76,2 96,4 96,22 78,20" fill={C.cardShadow} opacity={0.5} />
      <polygon points="75,1 95,3 95,21 77,19" fill={C.cardWhite} />
      <polygon points="75,1 95,3 95,4 75,2" fill={C.cardOff} opacity={0.55} />
      <polygon points="95,3 95,21 94,21 94,4" fill={C.cardEdge} opacity={0.6} />
      {/* J top-left */}
      <rect x={78} y={3} width={3} height={1} fill={C.clubs} />
      <rect x={79} y={4} width={1} height={3} fill={C.clubs} />
      <rect x={78} y={6} width={2} height={1} fill={C.clubs} />
      {/* small club */}
      {pixelClub(78, 8, 1, C.clubs, "c-tl")}
      {/* center club */}
      {pixelClub(84, 8, 2, C.clubs, "c-c")}

      {/* ─── stack of cards in the lower-left ─── */}
      {[
        { x: 2, y: 47, w: 16, h: 2, fill: C.cardWhite, hi: C.cardOff },
        { x: 1, y: 45, w: 17, h: 2, fill: C.cardBack, hi: C.cardBackHi },
        { x: 3, y: 43, w: 16, h: 2, fill: C.cardWhite, hi: C.cardOff },
        { x: 2, y: 41, w: 17, h: 2, fill: C.cardBack, hi: C.cardBackHi },
        { x: 4, y: 39, w: 16, h: 2, fill: C.cardWhite, hi: C.cardOff },
      ].map((s, i) => (
        <g key={`stk-${i}`}>
          <rect x={s.x} y={s.y} width={s.w} height={s.h} fill={s.fill} />
          <rect x={s.x} y={s.y} width={s.w} height={1} fill={s.hi} opacity={0.55} />
        </g>
      ))}

      {/* falling card silhouette in the upper right (motion) */}
      <polygon points="74,32 78,33 76,40 72,39" fill={C.cardShadow} opacity={0.4} />
    </g>
  );
}

/* ── Scene 3: ThreeWiseMen — magi following the star ──────────── */

function ThreeWiseMen() {
  return (
    <g>
      {/* sky gradient */}
      <rect x={0} y={0} width={96} height={6} fill={C.skyDeep} />
      <rect x={0} y={6} width={96} height={6} fill={C.skyMid} />
      <rect x={0} y={12} width={96} height={6} fill={C.skyHi} />
      <rect x={0} y={18} width={96} height={6} fill={C.skyHaze} />
      <rect x={0} y={24} width={96} height={4} fill="#3a2842" opacity={0.95} />
      <rect x={0} y={28} width={96} height={4} fill="#4a2c34" opacity={0.95} />

      {/* tiny stars across sky */}
      {[
        [3, 2, 0.6], [9, 4, 0.4], [16, 1, 0.5], [22, 6, 0.45],
        [30, 3, 0.55], [38, 7, 0.4], [44, 2, 0.5], [50, 9, 0.45],
        [80, 19, 0.5], [86, 2, 0.55], [92, 5, 0.45], [12, 14, 0.35],
        [42, 12, 0.4], [54, 14, 0.35], [88, 14, 0.4], [6, 9, 0.5],
        [26, 11, 0.4], [74, 7, 0.5], [82, 9, 0.45], [56, 4, 0.55],
      ].map(([x, y, o], i) => (
        <rect key={`s-${i}`} x={x} y={y} width={1} height={1} fill={C.starCool} opacity={o as number} />
      ))}

      {/* Star of Bethlehem — center-upper-right at (66, 13) */}
      {/* radial halo */}
      {disc(66, 13, 12, C.starGlow, 0.05, "h1")}
      {disc(66, 13, 9, C.starGlow, 0.08, "h2")}
      {disc(66, 13, 6, C.starGlow, 0.18, "h3")}
      {disc(66, 13, 4, C.star, 0.5, "h4")}
      {disc(66, 13, 2, C.star, 1, "core")}
      <rect x={65} y={12} width={3} height={3} fill={C.flameHot} />
      <rect x={66} y={13} width={1} height={1} fill={C.starCool} />
      {/* axial beams */}
      <rect x={66} y={0} width={1} height={26} fill={C.star} opacity={0.7} />
      <rect x={65} y={2} width={1} height={22} fill={C.starGlow} opacity={0.4} />
      <rect x={67} y={2} width={1} height={22} fill={C.starGlow} opacity={0.4} />
      <rect x={40} y={13} width={52} height={1} fill={C.star} opacity={0.7} />
      <rect x={42} y={12} width={48} height={1} fill={C.starGlow} opacity={0.4} />
      <rect x={42} y={14} width={48} height={1} fill={C.starGlow} opacity={0.4} />
      {/* diagonal beams (stepped) */}
      {[2, 3, 4, 5, 6, 7, 8].map((i) => (
        <g key={`db-${i}`}>
          <rect x={66 + i} y={13 - i} width={1} height={1} fill={C.starGlow} opacity={0.5 - i * 0.04} />
          <rect x={66 - i} y={13 + i} width={1} height={1} fill={C.starGlow} opacity={0.5 - i * 0.04} />
          <rect x={66 - i} y={13 - i} width={1} height={1} fill={C.starGlow} opacity={0.5 - i * 0.04} />
          <rect x={66 + i} y={13 + i} width={1} height={1} fill={C.starGlow} opacity={0.5 - i * 0.04} />
        </g>
      ))}
      {/* longer NW/SE rays */}
      {[9, 10, 11, 12].map((i) => (
        <g key={`db2-${i}`}>
          <rect x={66 + i} y={13 - i} width={1} height={1} fill={C.starGlow} opacity={0.25 - i * 0.015} />
          <rect x={66 - i} y={13 + i} width={1} height={1} fill={C.starGlow} opacity={0.25 - i * 0.015} />
        </g>
      ))}

      {/* distant Bethlehem on the horizon under the star */}
      {[
        [54, 30, 4, 4], [58, 28, 3, 6], [61, 30, 4, 4], [65, 27, 4, 7],
        [69, 29, 3, 5], [72, 31, 4, 3], [76, 28, 3, 6], [79, 30, 3, 4],
      ].map(([x, y, w, h], i) => (
        <g key={`bh-${i}`}>
          <rect x={x} y={y} width={w} height={h} fill={C.cityNight} />
          {/* tiny warm windows */}
          <rect x={x + 1} y={y + 1} width={1} height={1} fill={C.cityWarm} opacity={0.85} />
          {i % 2 === 0 && <rect x={x + w - 2} y={y + h - 2} width={1} height={1} fill={C.cityWarm} opacity={0.7} />}
        </g>
      ))}
      {/* city domes */}
      {disc(62, 27, 2, C.cityNight, 1, "dom1")}
      <rect x={62} y={24} width={1} height={3} fill={C.cityNight} />
      <rect x={62} y={23} width={1} height={1} fill={C.gold} opacity={0.6} />
      {disc(70, 25, 2, C.cityNight, 1, "dom2")}
      <rect x={70} y={22} width={1} height={3} fill={C.cityNight} />
      <rect x={70} y={21} width={1} height={1} fill={C.gold} opacity={0.6} />

      {/* desert dune layers (back to front) */}
      {/* far dune */}
      <path
        d="M 0 32 Q 18 28 32 31 Q 46 34 60 30 Q 78 27 96 32 L 96 36 L 0 36 Z"
        fill={C.duneDeep}
        opacity={0.95}
      />
      {/* middle dune */}
      <path
        d="M 0 38 Q 22 33 40 37 Q 60 41 80 36 Q 90 33 96 38 L 96 44 L 0 44 Z"
        fill={C.duneMid}
      />
      {/* mid dune crest highlight */}
      <path
        d="M 0 38 Q 22 33 40 37 Q 60 41 80 36 Q 90 33 96 38"
        fill="none"
        stroke={C.dune}
        strokeWidth={0.7}
        opacity={0.6}
      />
      {/* front dune */}
      <path
        d="M 0 46 Q 20 41 44 45 Q 64 48 96 43 L 96 54 L 0 54 Z"
        fill={C.dune}
      />
      <path
        d="M 0 46 Q 20 41 44 45 Q 64 48 96 43"
        fill="none"
        stroke={C.duneHi}
        strokeWidth={0.7}
        opacity={0.7}
      />
      {/* sand grain noise */}
      {Array.from({ length: 40 }).map((_, i) => {
        const x = Math.floor(hash(i, 11) * 96);
        const y = 44 + Math.floor(hash(i, 13) * 10);
        return (
          <rect
            key={`sg-${i}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={hash(i, 17) > 0.5 ? C.duneHi : C.duneDeep}
            opacity={0.4 + hash(i, 19) * 0.3}
          />
        );
      })}

      {/* camel silhouette behind the magi */}
      {/* body */}
      <rect x={6} y={36} width={14} height={4} fill={C.duneDeep} opacity={0.85} />
      {/* humps */}
      <rect x={8} y={33} width={3} height={3} fill={C.duneDeep} opacity={0.85} />
      <rect x={13} y={32} width={3} height={4} fill={C.duneDeep} opacity={0.85} />
      {/* neck and head */}
      <rect x={18} y={32} width={2} height={4} fill={C.duneDeep} opacity={0.85} />
      <rect x={19} y={29} width={2} height={3} fill={C.duneDeep} opacity={0.85} />
      <rect x={21} y={30} width={2} height={2} fill={C.duneDeep} opacity={0.85} />
      {/* legs */}
      <rect x={7} y={40} width={1} height={4} fill={C.duneDeep} opacity={0.85} />
      <rect x={10} y={40} width={1} height={4} fill={C.duneDeep} opacity={0.85} />
      <rect x={15} y={40} width={1} height={4} fill={C.duneDeep} opacity={0.85} />
      <rect x={18} y={40} width={1} height={4} fill={C.duneDeep} opacity={0.85} />
      {/* tail */}
      <rect x={5} y={37} width={1} height={3} fill={C.duneDeep} opacity={0.85} />

      {/* ─── three wise men — robed silhouettes with crowns and gifts ─── */}
      {/* Magus 1 (left, ruby robe — Melchior) */}
      <g>
        {/* crown */}
        <rect x={24} y={30} width={6} height={1} fill={C.robeGold} />
        <rect x={24} y={29} width={1} height={1} fill={C.robeGold} />
        <rect x={26} y={29} width={1} height={1} fill={C.robeGold} />
        <rect x={28} y={29} width={1} height={1} fill={C.robeGold} />
        <rect x={25} y={28} width={1} height={1} fill={C.robeGoldHi} />
        <rect x={27} y={28} width={1} height={1} fill={C.robeGoldHi} />
        {/* head */}
        <rect x={25} y={31} width={4} height={2} fill={C.skin} />
        <rect x={25} y={32} width={4} height={1} fill={C.skinDark} opacity={0.7} />
        {/* robe */}
        <rect x={23} y={33} width={8} height={11} fill={C.robeRuby} />
        <rect x={23} y={33} width={1} height={11} fill={C.robeRubyLow} opacity={0.7} />
        <rect x={30} y={33} width={1} height={11} fill={C.robeRubyHi} opacity={0.55} />
        <rect x={24} y={33} width={6} height={1} fill={C.robeRubyHi} opacity={0.55} />
        {/* cloak folds */}
        <rect x={26} y={34} width={1} height={9} fill={C.robeRubyLow} opacity={0.6} />
        <rect x={28} y={34} width={1} height={9} fill={C.robeRubyLow} opacity={0.6} />
        {/* gift: small chest */}
        <rect x={24} y={42} width={6} height={3} fill={C.gold} />
        <rect x={24} y={42} width={6} height={1} fill={C.goldHi} />
        <rect x={24} y={44} width={6} height={1} fill={C.goldLow} />
        <rect x={26} y={43} width={2} height={1} fill={C.goldDeep} opacity={0.8} />
      </g>

      {/* Magus 2 (center, gold robe — Caspar) */}
      <g>
        {/* taller crown */}
        <rect x={40} y={26} width={6} height={1} fill={C.robeGold} />
        <rect x={40} y={25} width={1} height={1} fill={C.robeGold} />
        <rect x={42} y={24} width={1} height={2} fill={C.robeGold} />
        <rect x={44} y={25} width={1} height={1} fill={C.robeGold} />
        <rect x={45} y={26} width={1} height={1} fill={C.robeGold} />
        <rect x={42} y={23} width={1} height={1} fill={C.robeGoldHi} />
        {/* head */}
        <rect x={41} y={28} width={4} height={2} fill={C.skin} />
        <rect x={41} y={29} width={4} height={1} fill={C.skinDark} opacity={0.7} />
        {/* robe */}
        <rect x={39} y={30} width={8} height={14} fill={C.robeGold} />
        <rect x={39} y={30} width={1} height={14} fill={C.robeGoldLow} opacity={0.7} />
        <rect x={46} y={30} width={1} height={14} fill={C.robeGoldHi} opacity={0.55} />
        <rect x={40} y={30} width={6} height={1} fill={C.robeGoldHi} opacity={0.55} />
        {/* cloak folds */}
        <rect x={42} y={31} width={1} height={12} fill={C.robeGoldLow} opacity={0.6} />
        <rect x={44} y={31} width={1} height={12} fill={C.robeGoldLow} opacity={0.6} />
        {/* incense urn — held in front of robe */}
        <rect x={41} y={37} width={4} height={3} fill={C.gold} />
        <rect x={41} y={37} width={4} height={1} fill={C.goldHi} />
        <rect x={40} y={36} width={6} height={1} fill={C.gold} />
        <rect x={40} y={36} width={6} height={1} fill={C.goldHi} opacity={0.7} />
        {/* smoke wisps */}
        <rect x={42} y={34} width={1} height={1} fill={C.candleHi} opacity={0.45} />
        <rect x={43} y={32} width={2} height={1} fill={C.candleHi} opacity={0.4} />
        <rect x={41} y={30} width={1} height={1} fill={C.candleHi} opacity={0.35} />
        {/* staff */}
        <rect x={37} y={28} width={1} height={16} fill={C.gold} opacity={0.85} />
        <rect x={37} y={26} width={1} height={2} fill={C.goldHi} />
      </g>

      {/* Magus 3 (right, navy robe — Balthasar) */}
      <g>
        {/* turban / crown */}
        <rect x={54} y={30} width={6} height={2} fill={C.robeNavy} />
        <rect x={54} y={30} width={6} height={1} fill={C.robeNavyHi} opacity={0.6} />
        <rect x={56} y={29} width={2} height={1} fill={C.robeGold} />
        {/* jewel */}
        <rect x={57} y={31} width={1} height={1} fill={C.robeGoldHi} />
        {/* head */}
        <rect x={55} y={32} width={4} height={2} fill={C.skin} />
        <rect x={55} y={33} width={4} height={1} fill={C.skinDark} opacity={0.7} />
        {/* robe */}
        <rect x={53} y={34} width={8} height={10} fill={C.robeNavy} />
        <rect x={53} y={34} width={1} height={10} fill={C.robeNavyLow} opacity={0.7} />
        <rect x={60} y={34} width={1} height={10} fill={C.robeNavyHi} opacity={0.55} />
        <rect x={54} y={34} width={6} height={1} fill={C.robeNavyHi} opacity={0.55} />
        {/* cloak folds */}
        <rect x={56} y={35} width={1} height={9} fill={C.robeNavyLow} opacity={0.6} />
        <rect x={58} y={35} width={1} height={9} fill={C.robeNavyLow} opacity={0.6} />
        {/* gift: myrrh vial */}
        <rect x={54} y={42} width={3} height={3} fill={C.gold} />
        <rect x={54} y={42} width={3} height={1} fill={C.goldHi} />
        <rect x={54} y={44} width={3} height={1} fill={C.goldLow} />
        <rect x={55} y={41} width={1} height={1} fill={C.goldHi} />
      </g>

      {/* magi gazing — small glints catching star light */}
      <rect x={27} y={31} width={1} height={1} fill={C.starCool} opacity={0.7} />
      <rect x={43} y={28} width={1} height={1} fill={C.starCool} opacity={0.7} />
      <rect x={57} y={32} width={1} height={1} fill={C.starCool} opacity={0.7} />

      {/* warm light wash on figures from the star */}
      <rect x={20} y={24} width={50} height={22} fill={C.starGlow} opacity={0.05} />
      <rect x={36} y={22} width={40} height={20} fill={C.starGlow} opacity={0.04} />

      {/* footprints leading from left */}
      {[
        [2, 49], [6, 50], [10, 49], [14, 50], [18, 49],
      ].map(([x, y], i) => (
        <g key={`fp-${i}`}>
          <rect x={x} y={y} width={2} height={1} fill={C.duneDeep} opacity={0.6} />
        </g>
      ))}
    </g>
  );
}

const scenes: Record<FeaturedWorkPixelVariant, ReactNode> = {
  "black-letter": <BlackLetter />,
  pickup: <Pickup52 />,
  spatial: <ThreeWiseMen />,
};

export default function FeaturedWorkPixelArt({
  variant,
  className,
}: {
  variant: FeaturedWorkPixelVariant;
  className?: string;
}) {
  return (
    <svg
      className={clsx("h-full w-full", className)}
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid slice"
      shapeRendering="crispEdges"
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    >
      {scenes[variant]}
    </svg>
  );
}

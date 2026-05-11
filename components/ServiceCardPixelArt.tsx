"use client";

import type { ReactNode } from "react";
import clsx from "clsx";

/**
 * Immersive 8-bit pixel-art scenes. Higher resolution than icon-style
 * artwork — designed to read as full illustrations on the bento cards.
 * Each scene fills the 96×54 viewBox edge-to-edge.
 */
const VB = { w: 96, h: 54 } as const;

type Variant = "lightrain" | "treasury" | "governance" | "custody" | "tokenomics" | "moneyba";

const C = {
  /* dark fields */
  void: "#04050a",
  pitch: "#070914",
  midnight: "#0b0e1c",
  navy: "#141a2e",
  steel: "#2a3140",
  steelHi: "#4a5060",

  /* night atmosphere */
  hazeA: "#181a36",
  hazeB: "#1c1e3c",
  smog: "#2a2438",

  /* metals */
  gold: "#c4a868",
  goldHi: "#e8d29a",
  goldLow: "#8a7440",
  goldDeep: "#5a4828",
  brass: "#a68850",
  copper: "#9a6438",

  /* teal / data */
  teal: "#34d8b6",
  tealDim: "#1a8870",
  tealDark: "#0e4438",
  tealGhost: "#0c2a26",

  /* warm light */
  amberWin: "#d4a868",
  amberWinDim: "#7a5e3a",
  ember: "#e87038",
  emberHi: "#f4b060",
  flame: "#ffd874",
  flameHot: "#fff2c0",

  /* cool light */
  cool: "#7090b0",
  coolHi: "#a8c4d8",
  ice: "#c4e0e8",

  /* stone / interior */
  stoneLow: "#1c1814",
  stone: "#3a3530",
  stoneHi: "#5a5048",
  marbleLow: "#3a3228",
  marble: "#7a6e60",
  marbleHi: "#a89c88",
  marbleSheen: "#c8bca8",

  /* accents */
  ruby: "#c44848",
  rubyHi: "#f06868",
  ink: "#0a0810",
  violet: "#3a2858",
  violetHi: "#5a3c80",
} as const;

/* ── small helpers ─────────────────────────────────────────────── */

const hash = (a: number, b: number = 0) => {
  const x = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

function disc(cx: number, cy: number, r: number, fill: string, opacity = 1, key = "d"): ReactNode[] {
  const out: ReactNode[] = [];
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(Math.max(0, r * r - dy * dy)));
    out.push(
      <rect
        key={`${key}-${dy}`}
        x={cx - w}
        y={cy + dy}
        width={w * 2 + 1}
        height={1}
        fill={fill}
        opacity={opacity}
      />,
    );
  }
  return out;
}

function ringEdge(cx: number, cy: number, r: number, fill: string, opacity = 1, key = "r"): ReactNode[] {
  const out: ReactNode[] = [];
  for (let dy = -r; dy <= r; dy++) {
    const w = Math.floor(Math.sqrt(Math.max(0, r * r - dy * dy)));
    if (Math.abs(dy) === r) {
      out.push(
        <rect key={`${key}-e-${dy}`} x={cx - w} y={cy + dy} width={w * 2 + 1} height={1} fill={fill} opacity={opacity} />,
      );
    } else {
      out.push(<rect key={`${key}-l-${dy}`} x={cx - w} y={cy + dy} width={1} height={1} fill={fill} opacity={opacity} />);
      out.push(<rect key={`${key}-r-${dy}`} x={cx + w} y={cy + dy} width={1} height={1} fill={fill} opacity={opacity} />);
    }
  }
  return out;
}

function windowGrid(
  bx: number,
  by: number,
  bw: number,
  bh: number,
  step: number,
  density: number,
  color: string,
  altColor: string,
  key: string,
): ReactNode[] {
  const out: ReactNode[] = [];
  const cols = Math.max(0, Math.floor((bw - 1) / step));
  const rows = Math.max(0, Math.floor((bh - 1) / step));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = hash(bx * 31 + c * 5 + 1, by * 17 + r * 7 + 2);
      if (t < density) {
        out.push(
          <rect
            key={`${key}-${c}-${r}`}
            x={bx + 1 + c * step}
            y={by + 1 + r * step}
            width={1}
            height={1}
            fill={t < 0.2 ? altColor : color}
            opacity={0.5 + t * 0.5}
          />,
        );
      }
    }
  }
  return out;
}

/* ── Scene 1: LightRain ─────────────────────────────────────────── */
/*  Night cityscape in rain: layered skyline, moon halo, wet street
    with light reflections, foreground rain streaks. */

function LightRain() {
  const distant: { x: number; top: number; w: number }[] = [
    { x: 0, top: 26, w: 6 },
    { x: 6, top: 23, w: 4 },
    { x: 10, top: 24, w: 4 },
    { x: 14, top: 20, w: 7 },
    { x: 21, top: 25, w: 4 },
    { x: 25, top: 22, w: 6 },
    { x: 31, top: 25, w: 4 },
    { x: 35, top: 19, w: 7 },
    { x: 42, top: 23, w: 5 },
    { x: 47, top: 25, w: 4 },
    { x: 51, top: 21, w: 6 },
    { x: 57, top: 24, w: 5 },
    { x: 62, top: 22, w: 5 },
    { x: 67, top: 25, w: 4 },
    { x: 71, top: 20, w: 7 },
    { x: 78, top: 24, w: 5 },
    { x: 83, top: 22, w: 5 },
    { x: 88, top: 25, w: 8 },
  ];

  const mid: { x: number; top: number; w: number; step: number; density: number }[] = [
    { x: 0, top: 32, w: 14, step: 2, density: 0.45 },
    { x: 14, top: 28, w: 9, step: 2, density: 0.55 },
    { x: 23, top: 30, w: 14, step: 2, density: 0.5 },
    { x: 37, top: 26, w: 11, step: 2, density: 0.6 },
    { x: 48, top: 32, w: 14, step: 2, density: 0.45 },
    { x: 62, top: 28, w: 11, step: 2, density: 0.55 },
    { x: 73, top: 30, w: 13, step: 2, density: 0.5 },
    { x: 86, top: 26, w: 10, step: 2, density: 0.6 },
  ];

  return (
    <g>
      {/* sky bands */}
      <rect x={0} y={0} width={96} height={5} fill="#05060f" />
      <rect x={0} y={5} width={96} height={5} fill="#0a0b1c" />
      <rect x={0} y={10} width={96} height={5} fill="#0f1228" />
      <rect x={0} y={15} width={96} height={6} fill={C.hazeA} />
      <rect x={0} y={21} width={96} height={3} fill={C.hazeB} opacity={0.85} />

      {/* stars */}
      {[
        [4, 2], [11, 4], [18, 1], [27, 3], [33, 6], [44, 2],
        [51, 5], [58, 3], [62, 8], [69, 2], [82, 5], [91, 3],
        [8, 9], [37, 11], [60, 12], [88, 10],
      ].map(([x, y], i) => (
        <rect key={`s-${i}`} x={x} y={y} width={1} height={1} fill={C.gold} opacity={0.35 + ((i % 4) * 0.18)} />
      ))}

      {/* moon: halo + disc + craters */}
      <rect x={67} y={2} width={16} height={16} fill="#3a2c14" opacity={0.16} />
      <rect x={69} y={4} width={12} height={12} fill="#4a3a1c" opacity={0.2} />
      <rect x={71} y={6} width={8} height={8} fill="#7a5e30" opacity={0.28} />
      {disc(75, 10, 3, C.goldHi, 1, "moon")}
      <rect x={76} y={9} width={1} height={1} fill={C.goldLow} opacity={0.55} />
      <rect x={77} y={11} width={1} height={1} fill={C.goldLow} opacity={0.45} />
      <rect x={75} y={12} width={1} height={1} fill={C.goldLow} opacity={0.4} />

      {/* drifting clouds */}
      <rect x={0} y={12} width={28} height={3} fill="#181830" opacity={0.85} />
      <rect x={2} y={10} width={22} height={2} fill="#181830" opacity={0.7} />
      <rect x={6} y={9} width={14} height={1} fill="#181830" opacity={0.55} />
      <rect x={30} y={15} width={32} height={3} fill="#181830" opacity={0.7} />
      <rect x={34} y={13} width={20} height={2} fill="#181830" opacity={0.55} />
      <rect x={56} y={8} width={22} height={3} fill="#181830" opacity={0.6} />
      <rect x={60} y={6} width={14} height={2} fill="#181830" opacity={0.5} />
      {/* moonlit cloud rim */}
      <rect x={64} y={7} width={6} height={1} fill="#3a2e1c" opacity={0.55} />
      <rect x={70} y={8} width={4} height={1} fill="#4a3a24" opacity={0.5} />

      {/* distant skyline (rows of small dark buildings, base hidden) */}
      {distant.map((b, i) => (
        <rect key={`db-${i}`} x={b.x} y={b.top} width={b.w} height={32 - b.top} fill="#161c2a" />
      ))}
      {distant.flatMap((b, i) =>
        Array.from({ length: 6 }).map((_, j) => {
          const t = hash(i * 7 + j * 3 + 1, j);
          const u = hash(j * 11 + 5, i * 13 + 2);
          if (t > 0.75) return null;
          const x = b.x + Math.floor(u * b.w);
          const y = b.top + 1 + Math.floor(t * (32 - b.top - 1));
          const col = (i + j) % 5 === 0 ? C.amberWin : (i + j) % 3 === 0 ? C.cool : C.amberWinDim;
          return <rect key={`dw-${i}-${j}`} x={x} y={y} width={1} height={1} fill={col} opacity={0.6} />;
        }),
      )}

      {/* mid foreground buildings, full window grids */}
      {mid.map((b, i) => (
        <rect key={`mb-${i}`} x={b.x} y={b.top} width={b.w} height={48 - b.top} fill="#0a0c18" />
      ))}
      {/* roof highlights */}
      {mid.map((b, i) => (
        <rect key={`mt-${i}`} x={b.x} y={b.top} width={b.w} height={1} fill="#1a1e2c" />
      ))}
      {mid.flatMap((b, i) =>
        windowGrid(b.x, b.top, b.w, 48 - b.top, b.step, b.density, C.amberWin, C.cool, `mw${i}`),
      )}
      {/* rooftop antennas */}
      <rect x={20} y={24} width={1} height={4} fill={C.steel} opacity={0.65} />
      <rect x={42} y={22} width={1} height={4} fill={C.steel} opacity={0.65} />
      <rect x={40} y={20} width={3} height={1} fill={C.steel} opacity={0.45} />
      <rect x={66} y={24} width={1} height={4} fill={C.steel} opacity={0.65} />
      <rect x={84} y={22} width={1} height={4} fill={C.steel} opacity={0.6} />

      {/* wet street */}
      <rect x={0} y={48} width={96} height={6} fill="#05070e" />
      <rect x={0} y={47} width={96} height={1} fill="#0a0e18" />
      {/* curb shimmer */}
      <rect x={0} y={48} width={96} height={1} fill="#2a3a55" opacity={0.2} />

      {/* reflections of windows in the asphalt */}
      {mid.flatMap((b, i) =>
        Array.from({ length: 4 }).map((_, j) => {
          const t = hash(i * 13 + j * 9, j + 3);
          const x = b.x + Math.floor(t * b.w);
          return (
            <rect
              key={`rf-${i}-${j}`}
              x={x}
              y={48 + (j % 3)}
              width={1}
              height={1}
              fill={j % 2 === 0 ? C.amberWin : C.cool}
              opacity={0.16 + (j % 3) * 0.06}
            />
          );
        }),
      )}
      {/* moon reflection — broken line */}
      <rect x={73} y={49} width={5} height={1} fill={C.goldLow} opacity={0.28} />
      <rect x={74} y={50} width={3} height={1} fill={C.goldLow} opacity={0.2} />
      <rect x={75} y={51} width={1} height={1} fill={C.gold} opacity={0.35} />

      {/* puddle ripples */}
      <rect x={12} y={51} width={10} height={1} fill={C.teal} opacity={0.14} />
      <rect x={14} y={52} width={6} height={1} fill={C.teal} opacity={0.1} />
      <rect x={34} y={50} width={14} height={1} fill={C.teal} opacity={0.1} />
      <rect x={38} y={51} width={8} height={1} fill={C.teal} opacity={0.08} />
      <rect x={64} y={52} width={14} height={1} fill={C.teal} opacity={0.1} />

      {/* rain — atmospheric distant streaks */}
      {Array.from({ length: 56 }).map((_, i) => {
        const x = Math.floor(hash(i, 1) * 96);
        const y = Math.floor(hash(i, 2) * 48);
        const len = 2 + Math.floor(hash(i, 3) * 3);
        const hot = hash(i, 4) < 0.18;
        return (
          <rect
            key={`rn-${i}`}
            x={x}
            y={y}
            width={1}
            height={len}
            fill={hot ? C.cool : "#3a5070"}
            opacity={hot ? 0.55 : 0.3 + hash(i, 5) * 0.22}
          />
        );
      })}
      {/* heavier foreground rain */}
      {Array.from({ length: 26 }).map((_, i) => {
        const x = Math.floor(hash(i + 200, 1) * 96);
        const y = 36 + Math.floor(hash(i + 200, 2) * 14);
        return (
          <rect
            key={`rf2-${i}`}
            x={x}
            y={y}
            width={1}
            height={4 + Math.floor(hash(i + 200, 3) * 3)}
            fill="#5a7a9c"
            opacity={0.5}
          />
        );
      })}

      {/* bottom vignette */}
      <rect x={0} y={53} width={96} height={1} fill={C.void} />
    </g>
  );
}

/* ── Scene 2: Treasury — vault / trading hall ─────────────────── */

function Treasury() {
  // checkered floor: 8 cols across, rows 32-52 with perspective (rows get bigger toward viewer)
  const floorRows = [
    { y: 32, h: 2 },
    { y: 34, h: 2 },
    { y: 36, h: 3 },
    { y: 39, h: 3 },
    { y: 42, h: 4 },
    { y: 46, h: 4 },
    { y: 50, h: 4 },
  ];

  return (
    <g>
      {/* back wall — marble */}
      <rect x={0} y={0} width={96} height={32} fill={C.marbleLow} />
      {/* marble veining */}
      <rect x={6} y={4} width={20} height={1} fill={C.marble} opacity={0.25} />
      <rect x={28} y={10} width={14} height={1} fill={C.marble} opacity={0.2} />
      <rect x={52} y={6} width={18} height={1} fill={C.marble} opacity={0.25} />
      <rect x={72} y={14} width={18} height={1} fill={C.marble} opacity={0.2} />
      <rect x={18} y={20} width={26} height={1} fill={C.marble} opacity={0.18} />
      <rect x={56} y={22} width={22} height={1} fill={C.marble} opacity={0.18} />

      {/* back wall top moulding */}
      <rect x={0} y={0} width={96} height={2} fill={C.stoneLow} />
      <rect x={0} y={2} width={96} height={1} fill={C.stoneHi} opacity={0.4} />

      {/* three arched windows revealing a skyline */}
      {[8, 38, 68].map((wx, i) => (
        <g key={`arch-${i}`}>
          {/* arch interior background — night sky gradient */}
          <rect x={wx} y={6} width={20} height={22} fill="#0a0e1c" />
          <rect x={wx} y={6} width={20} height={3} fill="#1a1e36" opacity={0.7} />
          {/* curved top via stepped rects */}
          <rect x={wx} y={5} width={20} height={1} fill={C.marbleLow} />
          <rect x={wx - 1} y={6} width={1} height={4} fill={C.marbleLow} />
          <rect x={wx + 20} y={6} width={1} height={4} fill={C.marbleLow} />
          <rect x={wx} y={5} width={2} height={1} fill={C.marbleLow} />
          <rect x={wx + 18} y={5} width={2} height={1} fill={C.marbleLow} />
          <rect x={wx + 2} y={4} width={16} height={1} fill={C.marbleLow} />
          <rect x={wx + 4} y={3} width={12} height={1} fill={C.marbleLow} />

          {/* skyline behind window */}
          <rect x={wx + 1} y={20} width={18} height={8} fill="#0c1020" />
          {Array.from({ length: 6 }).map((_, j) => (
            <rect
              key={`sk-${i}-${j}`}
              x={wx + 1 + j * 3}
              y={20 - Math.floor(hash(i * 11 + j * 7, 3) * 4)}
              width={2}
              height={4 + Math.floor(hash(i * 11 + j * 7, 5) * 5)}
              fill={C.midnight}
            />
          ))}
          {/* tiny lit windows */}
          {Array.from({ length: 10 }).map((_, j) => {
            const x = wx + 1 + Math.floor(hash(i + j, 7) * 18);
            const y = 22 + Math.floor(hash(i + j, 9) * 5);
            return (
              <rect
                key={`skw-${i}-${j}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={(i + j) % 3 === 0 ? C.cool : C.amberWin}
                opacity={0.65}
              />
            );
          })}
          {/* moon glints */}
          <rect x={wx + 16} y={9} width={1} height={1} fill={C.goldHi} opacity={0.8} />
          <rect x={wx + 17} y={9} width={1} height={1} fill={C.gold} opacity={0.5} />

          {/* window cross frame */}
          <rect x={wx + 9} y={6} width={1} height={22} fill={C.stoneHi} opacity={0.5} />
          <rect x={wx} y={17} width={20} height={1} fill={C.stoneHi} opacity={0.5} />
        </g>
      ))}
      {/* sill */}
      <rect x={0} y={28} width={96} height={2} fill={C.stone} />
      <rect x={0} y={30} width={96} height={1} fill={C.stoneHi} opacity={0.5} />

      {/* columns left & right */}
      <rect x={2} y={3} width={4} height={29} fill={C.stone} />
      <rect x={3} y={3} width={1} height={29} fill={C.stoneHi} opacity={0.55} />
      <rect x={2} y={4} width={4} height={1} fill={C.stoneHi} opacity={0.6} />
      <rect x={2} y={29} width={4} height={1} fill={C.stoneHi} opacity={0.5} />
      <rect x={90} y={3} width={4} height={29} fill={C.stone} />
      <rect x={91} y={3} width={1} height={29} fill={C.stoneHi} opacity={0.55} />
      <rect x={90} y={4} width={4} height={1} fill={C.stoneHi} opacity={0.6} />
      <rect x={90} y={29} width={4} height={1} fill={C.stoneHi} opacity={0.5} />

      {/* checkered marble floor with perspective */}
      {floorRows.map((row, ri) => {
        // narrower row near back: edges pulled inward
        const inset = ri === 0 ? 0 : 0;
        return (
          <g key={`fr-${ri}`}>
            {Array.from({ length: 12 }).map((_, ci) => {
              const w = 96 / 12;
              const cellDark = (ri + ci) % 2 === 0;
              return (
                <rect
                  key={`fc-${ri}-${ci}`}
                  x={ci * w + inset}
                  y={row.y}
                  width={w}
                  height={row.h}
                  fill={cellDark ? C.marbleLow : "#5a4e3c"}
                  opacity={0.85 + (ri / 14)}
                />
              );
            })}
            {/* grout/sheen line on top of each row */}
            <rect x={0} y={row.y} width={96} height={1} fill={C.marbleSheen} opacity={0.07 + ri * 0.02} />
          </g>
        );
      })}

      {/* central trading terminal / monolith */}
      <rect x={36} y={14} width={24} height={26} fill={C.pitch} />
      <rect x={36} y={14} width={24} height={1} fill={C.steelHi} opacity={0.6} />
      <rect x={35} y={14} width={1} height={26} fill={C.steel} opacity={0.6} />
      <rect x={60} y={14} width={1} height={26} fill={C.steel} opacity={0.6} />
      {/* screen surround */}
      <rect x={38} y={16} width={20} height={20} fill="#020308" />
      {/* candlestick chart */}
      {[
        { x: 40, y: 26, len: 6, wick: [24, 33], up: true },
        { x: 42, y: 24, len: 8, wick: [22, 34], up: true },
        { x: 44, y: 22, len: 6, wick: [20, 30], up: false },
        { x: 46, y: 20, len: 8, wick: [18, 31], up: true },
        { x: 48, y: 22, len: 5, wick: [20, 30], up: false },
        { x: 50, y: 19, len: 9, wick: [17, 31], up: true },
        { x: 52, y: 18, len: 7, wick: [16, 28], up: true },
        { x: 54, y: 20, len: 4, wick: [18, 26], up: false },
        { x: 56, y: 17, len: 10, wick: [15, 30], up: true },
      ].map((cd, i) => (
        <g key={`cd-${i}`}>
          <rect x={cd.x} y={cd.wick[0]} width={1} height={cd.wick[1] - cd.wick[0]} fill={cd.up ? C.teal : C.ruby} opacity={0.55} />
          <rect x={cd.x - 1} y={cd.y} width={3} height={cd.len} fill={cd.up ? C.tealDim : C.ruby} />
          <rect x={cd.x - 1} y={cd.y} width={3} height={1} fill={cd.up ? C.teal : C.rubyHi} />
        </g>
      ))}
      {/* trend line */}
      <line x1={40} y1={28} x2={58} y2={18} stroke={C.gold} strokeWidth={0.6} opacity={0.55} />
      <rect x={56} y={17} width={2} height={1} fill={C.goldHi} />
      {/* screen scanline */}
      <rect x={38} y={28} width={20} height={1} fill={C.teal} opacity={0.1} />
      <rect x={38} y={32} width={20} height={1} fill={C.teal} opacity={0.07} />
      {/* readout glow under screen */}
      <rect x={38} y={36} width={20} height={1} fill={C.teal} opacity={0.4} />
      <rect x={40} y={37} width={3} height={1} fill={C.gold} opacity={0.55} />
      <rect x={45} y={37} width={5} height={1} fill={C.tealDim} opacity={0.55} />
      <rect x={52} y={37} width={4} height={1} fill={C.amberWin} opacity={0.55} />

      {/* floating coin/token above screen */}
      {disc(48, 9, 3, C.goldHi, 1, "coin")}
      <rect x={47} y={8} width={3} height={1} fill={C.gold} />
      <rect x={47} y={10} width={3} height={1} fill={C.goldLow} />
      <rect x={47} y={9} width={1} height={1} fill={C.goldDeep} opacity={0.7} />
      <rect x={49} y={9} width={1} height={1} fill={C.goldDeep} opacity={0.7} />
      {/* coin glow */}
      <rect x={43} y={5} width={11} height={9} fill={C.gold} opacity={0.06} />

      {/* gold bars stacked — left foreground */}
      {(() => {
        const out: ReactNode[] = [];
        const baseY = 48;
        // bottom row (3 bars)
        for (let i = 0; i < 3; i++) {
          const x = 6 + i * 6;
          out.push(<rect key={`gbl-${i}`} x={x} y={baseY} width={5} height={3} fill={C.gold} />);
          out.push(<rect key={`gblh-${i}`} x={x} y={baseY} width={5} height={1} fill={C.goldHi} />);
          out.push(<rect key={`gbld-${i}`} x={x} y={baseY + 2} width={5} height={1} fill={C.goldLow} />);
        }
        // middle row (2 bars)
        for (let i = 0; i < 2; i++) {
          const x = 9 + i * 6;
          out.push(<rect key={`gbm-${i}`} x={x} y={baseY - 3} width={5} height={3} fill={C.gold} />);
          out.push(<rect key={`gbmh-${i}`} x={x} y={baseY - 3} width={5} height={1} fill={C.goldHi} />);
          out.push(<rect key={`gbmd-${i}`} x={x} y={baseY - 1} width={5} height={1} fill={C.goldLow} />);
        }
        // top bar
        out.push(<rect key="gbt" x={12} y={baseY - 6} width={5} height={3} fill={C.gold} />);
        out.push(<rect key="gbth" x={12} y={baseY - 6} width={5} height={1} fill={C.goldHi} />);
        out.push(<rect key="gbtd" x={12} y={baseY - 4} width={5} height={1} fill={C.goldLow} />);
        return out;
      })()}

      {/* gold bars stacked — right foreground */}
      {(() => {
        const out: ReactNode[] = [];
        const baseY = 48;
        for (let i = 0; i < 3; i++) {
          const x = 72 + i * 6;
          out.push(<rect key={`gbr-${i}`} x={x} y={baseY} width={5} height={3} fill={C.gold} />);
          out.push(<rect key={`gbrh-${i}`} x={x} y={baseY} width={5} height={1} fill={C.goldHi} />);
          out.push(<rect key={`gbrd-${i}`} x={x} y={baseY + 2} width={5} height={1} fill={C.goldLow} />);
        }
        for (let i = 0; i < 2; i++) {
          const x = 75 + i * 6;
          out.push(<rect key={`gbmr-${i}`} x={x} y={baseY - 3} width={5} height={3} fill={C.gold} />);
          out.push(<rect key={`gbmrh-${i}`} x={x} y={baseY - 3} width={5} height={1} fill={C.goldHi} />);
          out.push(<rect key={`gbmrd-${i}`} x={x} y={baseY - 1} width={5} height={1} fill={C.goldLow} />);
        }
        out.push(<rect key="gbtr" x={78} y={baseY - 6} width={5} height={3} fill={C.gold} />);
        out.push(<rect key="gbtrh" x={78} y={baseY - 6} width={5} height={1} fill={C.goldHi} />);
        out.push(<rect key="gbtrd" x={78} y={baseY - 4} width={5} height={1} fill={C.goldLow} />);
        return out;
      })()}

      {/* terminal cast light onto floor */}
      <rect x={32} y={40} width={32} height={2} fill={C.teal} opacity={0.07} />
      <rect x={36} y={42} width={24} height={1} fill={C.teal} opacity={0.06} />

      {/* coin cast light */}
      <rect x={42} y={40} width={12} height={1} fill={C.gold} opacity={0.1} />
    </g>
  );
}

/* ── Scene 3: Governance — chamber / amphitheater ─────────────── */

function Governance() {
  return (
    <g>
      {/* domed ceiling background */}
      <rect x={0} y={0} width={96} height={28} fill={C.stoneLow} />
      {/* dome arches (stepped circles) */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={`dome-${i}`}
          x={4 + i * 4}
          y={4 + i}
          width={88 - i * 8}
          height={1}
          fill={C.stoneHi}
          opacity={0.18 + i * 0.04}
        />
      ))}
      {/* central oculus glow */}
      <rect x={42} y={2} width={12} height={4} fill={C.amberWin} opacity={0.12} />
      <rect x={44} y={3} width={8} height={2} fill={C.gold} opacity={0.18} />
      <rect x={46} y={4} width={4} height={1} fill={C.goldHi} opacity={0.35} />
      {/* dome ribs */}
      {[24, 36, 48, 60, 72].map((x, i) => (
        <line
          key={`rib-${i}`}
          x1={x}
          y1={4}
          x2={48}
          y2={3}
          stroke={C.stoneHi}
          strokeWidth={0.5}
          opacity={0.25}
        />
      ))}

      {/* banners hanging from ceiling */}
      {[14, 48, 78].map((x, i) => (
        <g key={`banner-${i}`}>
          <rect x={x - 1} y={6} width={1} height={1} fill={C.goldLow} />
          <rect x={x + 4} y={6} width={1} height={1} fill={C.goldLow} />
          <rect x={x} y={6} width={4} height={10} fill={i === 1 ? C.ruby : C.violet} />
          <rect x={x} y={6} width={4} height={1} fill={i === 1 ? C.rubyHi : C.violetHi} />
          <rect x={x + 1} y={7} width={2} height={2} fill={C.gold} opacity={0.7} />
          <rect x={x} y={15} width={1} height={1} fill={i === 1 ? "#7a2828" : "#241838"} />
          <rect x={x + 3} y={15} width={1} height={1} fill={i === 1 ? "#7a2828" : "#241838"} />
          <rect x={x + 1} y={16} width={2} height={1} fill={i === 1 ? "#7a2828" : "#241838"} opacity={0.7} />
        </g>
      ))}

      {/* back wall with emblem */}
      <rect x={0} y={20} width={96} height={6} fill={C.stoneLow} opacity={0.85} />
      <rect x={0} y={26} width={96} height={2} fill={C.stone} />
      <rect x={0} y={28} width={96} height={1} fill={C.stoneHi} opacity={0.6} />
      {/* emblem on back wall */}
      <rect x={42} y={20} width={12} height={6} fill={C.steel} opacity={0.7} />
      <rect x={44} y={21} width={8} height={4} fill={C.midnight} />
      {/* vote tally bars in screen */}
      <rect x={45} y={22} width={2} height={2} fill={C.teal} />
      <rect x={48} y={23} width={2} height={1} fill={C.ruby} opacity={0.7} />
      <rect x={45} y={24} width={5} height={1} fill={C.gold} opacity={0.6} />

      {/* columns left and right */}
      {[2, 8].map((x, i) => (
        <g key={`colL-${i}`}>
          <rect x={x} y={6} width={3} height={22} fill={C.stone} />
          <rect x={x} y={6} width={1} height={22} fill={C.stoneHi} opacity={0.55} />
          <rect x={x - 1} y={6} width={5} height={1} fill={C.stone} />
          <rect x={x - 1} y={28} width={5} height={1} fill={C.stone} />
          {/* fluting */}
          <rect x={x + 1} y={8} width={1} height={18} fill={C.marbleLow} opacity={0.4} />
        </g>
      ))}
      {[88, 94].map((x, i) => (
        <g key={`colR-${i}`}>
          <rect x={x} y={6} width={3} height={22} fill={C.stone} />
          <rect x={x} y={6} width={1} height={22} fill={C.stoneHi} opacity={0.55} />
          <rect x={x - 1} y={6} width={5} height={1} fill={C.stone} />
          <rect x={x - 1} y={28} width={5} height={1} fill={C.stone} />
          <rect x={x + 1} y={8} width={1} height={18} fill={C.marbleLow} opacity={0.4} />
        </g>
      ))}

      {/* podium with display in center */}
      <rect x={42} y={32} width={12} height={10} fill={C.stone} />
      <rect x={42} y={32} width={12} height={1} fill={C.stoneHi} opacity={0.6} />
      <rect x={42} y={41} width={12} height={1} fill={C.stoneLow} />
      {/* podium display */}
      <rect x={44} y={34} width={8} height={5} fill={C.ink} />
      <rect x={45} y={35} width={1} height={3} fill={C.teal} opacity={0.8} />
      <rect x={47} y={36} width={1} height={2} fill={C.gold} opacity={0.7} />
      <rect x={49} y={35} width={1} height={3} fill={C.tealDim} opacity={0.8} />
      <rect x={51} y={37} width={1} height={1} fill={C.ruby} opacity={0.8} />
      {/* spotlight on podium */}
      <polygon points="48,5 36,42 60,42" fill={C.gold} opacity={0.06} />
      <polygon points="48,5 42,42 54,42" fill={C.flame} opacity={0.05} />

      {/* concentric semicircular seating rows (tiered benches) */}
      {[
        { y: 30, x1: 14, x2: 82, color: C.stoneLow },
        { y: 33, x1: 12, x2: 84, color: C.stone },
        { y: 36, x1: 10, x2: 86, color: C.stoneLow },
        { y: 39, x1: 8, x2: 88, color: C.stone },
        { y: 42, x1: 6, x2: 90, color: C.stoneLow },
        { y: 45, x1: 4, x2: 92, color: C.stone },
      ].map((row, i) => (
        <g key={`row-${i}`}>
          {/* leave a gap for the podium */}
          <rect x={row.x1} y={row.y} width={28 - (row.x1 % 2)} height={2} fill={row.color} />
          <rect x={56 + (row.x1 % 2)} y={row.y} width={row.x2 - 56 - (row.x1 % 2)} height={2} fill={row.color} />
          <rect x={row.x1} y={row.y + 2} width={28 - (row.x1 % 2)} height={1} fill={C.stoneHi} opacity={0.35} />
          <rect x={56 + (row.x1 % 2)} y={row.y + 2} width={row.x2 - 56 - (row.x1 % 2)} height={1} fill={C.stoneHi} opacity={0.35} />
        </g>
      ))}

      {/* delegates — tiny figures on each bench, varying density */}
      {[
        { y: 28, x1: 16, x2: 80, step: 4 },
        { y: 31, x1: 14, x2: 82, step: 4 },
        { y: 34, x1: 12, x2: 84, step: 4 },
        { y: 37, x1: 10, x2: 86, step: 4 },
        { y: 40, x1: 8, x2: 88, step: 4 },
        { y: 43, x1: 6, x2: 90, step: 4 },
      ].flatMap((row, ri) => {
        const out: ReactNode[] = [];
        for (let x = row.x1; x <= row.x2 - 2; x += row.step) {
          if (x >= 40 && x <= 56) continue; // podium gap
          const t = hash(x + ri * 7, ri * 13);
          if (t < 0.18) continue;
          // body
          out.push(<rect key={`b-${ri}-${x}`} x={x} y={row.y} width={2} height={2} fill={C.midnight} />);
          // head
          out.push(<rect key={`h-${ri}-${x}`} x={x} y={row.y - 1} width={2} height={1} fill={t < 0.5 ? "#5a4838" : "#6a5848"} />);
          // gold-tinted highlight on speaker rows nearer the front
          if (ri >= 4 && t > 0.7) {
            out.push(<rect key={`hl-${ri}-${x}`} x={x} y={row.y} width={2} height={1} fill={C.gold} opacity={0.18} />);
          }
        }
        return out;
      })}

      {/* floor in front of seats */}
      <rect x={0} y={48} width={96} height={6} fill={C.marbleLow} />
      <rect x={0} y={47} width={96} height={1} fill={C.stoneHi} opacity={0.5} />
      {/* floor tile lines */}
      {[0, 16, 32, 48, 64, 80, 96].map((x, i) => (
        <line key={`tl-${i}`} x1={x} y1={48} x2={48 + (x - 48) * 1.3} y2={54} stroke={C.marble} strokeWidth={0.5} opacity={0.25} />
      ))}
      {/* central red carpet from podium */}
      <rect x={42} y={42} width={12} height={12} fill={C.ruby} opacity={0.65} />
      <rect x={42} y={42} width={12} height={1} fill={C.rubyHi} opacity={0.5} />
      <rect x={42} y={42} width={1} height={12} fill={C.rubyHi} opacity={0.3} />
    </g>
  );
}

/* ── Scene 4: Custody — vault chamber ─────────────────────────── */

function Custody() {
  return (
    <g>
      {/* chamber walls (background) */}
      <rect x={0} y={0} width={96} height={48} fill={C.stoneLow} />
      {/* wall block texture */}
      {Array.from({ length: 7 }).map((_, ri) =>
        Array.from({ length: 10 }).map((_, ci) => (
          <rect
            key={`wt-${ri}-${ci}`}
            x={ci * 10 + (ri % 2 ? 5 : 0)}
            y={ri * 6}
            width={10}
            height={1}
            fill={C.stone}
            opacity={0.6}
          />
        )),
      )}
      {[0, 6, 12, 18, 24, 30, 36, 42].map((y, i) => (
        <rect key={`wm-${i}`} x={0} y={y} width={96} height={1} fill={C.stoneHi} opacity={0.18} />
      ))}

      {/* ceiling lamps */}
      {[20, 48, 76].map((x, i) => (
        <g key={`lamp-${i}`}>
          <rect x={x - 2} y={0} width={4} height={2} fill={C.steel} />
          <rect x={x - 1} y={2} width={2} height={1} fill={C.flame} />
          {/* light cone (translucent triangle) */}
          <polygon
            points={`${x - 1},3 ${x + 1},3 ${x + 12},38 ${x - 12},38`}
            fill={C.flame}
            opacity={0.05}
          />
          <polygon
            points={`${x},3 ${x + 1},3 ${x + 6},38 ${x - 6},38`}
            fill={C.gold}
            opacity={0.08}
          />
        </g>
      ))}

      {/* massive vault door */}
      <rect x={28} y={10} width={40} height={36} fill={C.steel} />
      <rect x={28} y={10} width={40} height={1} fill={C.steelHi} opacity={0.5} />
      <rect x={28} y={45} width={40} height={1} fill={C.steelHi} opacity={0.3} />
      <rect x={28} y={10} width={1} height={36} fill={C.steelHi} opacity={0.4} />
      <rect x={67} y={10} width={1} height={36} fill={C.steelHi} opacity={0.2} />
      {/* door inner panel */}
      <rect x={30} y={12} width={36} height={32} fill={C.midnight} />
      {/* large round door */}
      {disc(48, 28, 14, C.steelHi, 0.95, "door")}
      {disc(48, 28, 13, C.steel, 1, "door2")}
      {disc(48, 28, 12, "#3a4250", 1, "door3")}
      {disc(48, 28, 11, C.steel, 1, "door4")}
      {/* concentric bolts */}
      {[
        [48, 16], [56, 18], [60, 24], [60, 32], [56, 38], [48, 40], [40, 38], [36, 32], [36, 24], [40, 18],
      ].map(([x, y], i) => (
        <g key={`bolt-${i}`}>
          <rect x={x - 1} y={y - 1} width={3} height={3} fill={C.steelHi} />
          <rect x={x} y={y} width={1} height={1} fill={C.flame} opacity={0.6} />
        </g>
      ))}
      {/* center handle wheel */}
      {disc(48, 28, 5, C.gold, 1, "wheel")}
      {ringEdge(48, 28, 6, C.goldHi, 0.85, "wheel-out")}
      {/* wheel spokes */}
      <rect x={47} y={22} width={2} height={12} fill={C.goldDeep} opacity={0.7} />
      <rect x={42} y={27} width={12} height={2} fill={C.goldDeep} opacity={0.7} />
      <line x1={43} y1={23} x2={53} y2={33} stroke={C.goldDeep} strokeWidth={0.6} opacity={0.6} />
      <line x1={43} y1={33} x2={53} y2={23} stroke={C.goldDeep} strokeWidth={0.6} opacity={0.6} />
      {/* center cap */}
      {disc(48, 28, 1, C.goldHi, 1, "cap")}

      {/* keypad / biometric panel — right side of door */}
      <rect x={70} y={20} width={8} height={12} fill={C.steel} />
      <rect x={70} y={20} width={8} height={1} fill={C.steelHi} opacity={0.5} />
      <rect x={71} y={21} width={6} height={3} fill={C.midnight} />
      <rect x={72} y={22} width={1} height={1} fill={C.ruby} />
      <rect x={73} y={22} width={1} height={1} fill={C.tealDim} opacity={0.6} />
      <rect x={74} y={22} width={1} height={1} fill={C.gold} opacity={0.5} />
      {/* keypad buttons */}
      {Array.from({ length: 3 }).map((_, r) =>
        Array.from({ length: 3 }).map((_, c) => (
          <rect
            key={`kb-${r}-${c}`}
            x={71 + c * 2}
            y={25 + r * 2}
            width={1}
            height={1}
            fill={C.steelHi}
            opacity={0.7}
          />
        )),
      )}

      {/* ID slot left */}
      <rect x={18} y={20} width={8} height={12} fill={C.steel} />
      <rect x={18} y={20} width={8} height={1} fill={C.steelHi} opacity={0.5} />
      <rect x={19} y={22} width={6} height={1} fill={C.ruby} opacity={0.8} />
      <rect x={20} y={22} width={3} height={1} fill={C.rubyHi} />
      <rect x={19} y={25} width={6} height={4} fill={C.midnight} />
      <rect x={20} y={26} width={4} height={2} fill={C.tealDim} opacity={0.7} />
      <rect x={21} y={27} width={2} height={1} fill={C.teal} />

      {/* floor — diamond tile pattern with perspective */}
      <rect x={0} y={46} width={96} height={8} fill={C.stoneLow} />
      {[
        { y: 46, h: 2 },
        { y: 48, h: 2 },
        { y: 50, h: 4 },
      ].map((row, ri) =>
        Array.from({ length: 14 }).map((_, ci) => (
          <rect
            key={`fl-${ri}-${ci}`}
            x={ci * 7 + (ri % 2 ? 3 : 0)}
            y={row.y}
            width={6}
            height={row.h}
            fill={(ri + ci) % 2 === 0 ? C.stone : C.stoneLow}
            opacity={0.7 + ri * 0.08}
          />
        )),
      )}
      {/* grout lines */}
      <rect x={0} y={46} width={96} height={1} fill={C.stoneHi} opacity={0.55} />
      <rect x={0} y={48} width={96} height={1} fill={C.stoneHi} opacity={0.3} />

      {/* gold bars on left pedestal */}
      <rect x={2} y={42} width={14} height={4} fill={C.stone} />
      <rect x={2} y={41} width={14} height={1} fill={C.stoneHi} opacity={0.4} />
      <rect x={4} y={37} width={4} height={4} fill={C.gold} />
      <rect x={4} y={37} width={4} height={1} fill={C.goldHi} />
      <rect x={4} y={40} width={4} height={1} fill={C.goldLow} />
      <rect x={9} y={37} width={4} height={4} fill={C.gold} />
      <rect x={9} y={37} width={4} height={1} fill={C.goldHi} />
      <rect x={9} y={40} width={4} height={1} fill={C.goldLow} />
      <rect x={6} y={33} width={5} height={4} fill={C.gold} />
      <rect x={6} y={33} width={5} height={1} fill={C.goldHi} />
      <rect x={6} y={36} width={5} height={1} fill={C.goldLow} />

      {/* gold bars on right pedestal */}
      <rect x={80} y={42} width={14} height={4} fill={C.stone} />
      <rect x={80} y={41} width={14} height={1} fill={C.stoneHi} opacity={0.4} />
      <rect x={82} y={37} width={4} height={4} fill={C.gold} />
      <rect x={82} y={37} width={4} height={1} fill={C.goldHi} />
      <rect x={82} y={40} width={4} height={1} fill={C.goldLow} />
      <rect x={87} y={37} width={4} height={4} fill={C.gold} />
      <rect x={87} y={37} width={4} height={1} fill={C.goldHi} />
      <rect x={87} y={40} width={4} height={1} fill={C.goldLow} />
      <rect x={84} y={33} width={5} height={4} fill={C.gold} />
      <rect x={84} y={33} width={5} height={1} fill={C.goldHi} />
      <rect x={84} y={36} width={5} height={1} fill={C.goldLow} />

      {/* security camera in corner */}
      <rect x={88} y={2} width={6} height={3} fill={C.steel} />
      <rect x={84} y={3} width={4} height={2} fill={C.steel} />
      <rect x={85} y={3} width={1} height={1} fill={C.ruby} />
      <rect x={84} y={2} width={1} height={1} fill={C.steelHi} opacity={0.5} />

      {/* glow on the wheel from front */}
      <rect x={42} y={26} width={12} height={4} fill={C.gold} opacity={0.1} />
    </g>
  );
}

/* ── Scene 5: Tokenomics — rocket launch ──────────────────────── */

function Tokenomics() {
  return (
    <g>
      {/* gradient sky — top to horizon */}
      <rect x={0} y={0} width={96} height={6} fill="#06070f" />
      <rect x={0} y={6} width={96} height={5} fill="#0a0c1c" />
      <rect x={0} y={11} width={96} height={4} fill="#16162e" />
      <rect x={0} y={15} width={96} height={4} fill="#241830" />
      <rect x={0} y={19} width={96} height={4} fill="#3a1c34" />
      <rect x={0} y={23} width={96} height={3} fill="#6a2438" opacity={0.95} />
      <rect x={0} y={26} width={96} height={3} fill="#a04830" opacity={0.95} />
      <rect x={0} y={29} width={96} height={3} fill="#d87838" opacity={0.95} />
      <rect x={0} y={32} width={96} height={2} fill="#f4a040" opacity={0.95} />

      {/* stars */}
      {[
        [4, 1], [12, 3], [22, 1], [33, 4], [44, 2], [55, 1],
        [66, 3], [78, 1], [88, 4], [92, 2], [18, 5], [70, 5],
      ].map(([x, y], i) => (
        <rect key={`stk-${i}`} x={x} y={y} width={1} height={1} fill={i % 3 === 0 ? C.goldHi : C.cool} opacity={0.4 + ((i % 4) * 0.15)} />
      ))}

      {/* sun glow on horizon */}
      <rect x={60} y={30} width={28} height={4} fill={C.flame} opacity={0.35} />
      <rect x={66} y={28} width={20} height={2} fill={C.flame} opacity={0.25} />
      {disc(78, 33, 4, C.flame, 0.75, "sun")}
      {disc(78, 33, 3, C.flameHot, 1, "sun2")}

      {/* distant mountain silhouette */}
      <rect x={0} y={32} width={96} height={3} fill={C.violet} opacity={0.7} />
      {[
        [0, 30, 14], [12, 28, 20], [28, 32, 10], [38, 29, 18], [54, 31, 14],
        [66, 30, 16], [80, 29, 16],
      ].map(([x, y, w], i) => (
        <rect key={`mt-${i}`} x={x} y={y} width={w} height={32 - y + 3} fill={C.violet} opacity={0.85} />
      ))}
      {/* mountain shading */}
      <rect x={20} y={30} width={6} height={1} fill={C.violetHi} opacity={0.5} />
      <rect x={44} y={31} width={6} height={1} fill={C.violetHi} opacity={0.5} />
      <rect x={70} y={31} width={6} height={1} fill={C.violetHi} opacity={0.5} />

      {/* distant city skyline on horizon */}
      <rect x={0} y={33} width={96} height={2} fill={C.midnight} opacity={0.85} />
      {[
        [2, 32, 4], [8, 31, 3], [14, 33, 5], [22, 32, 4], [28, 30, 3],
        [34, 33, 4], [40, 32, 4], [54, 33, 4], [60, 32, 3], [88, 33, 4],
      ].map(([x, y, w], i) => (
        <rect key={`cs-${i}`} x={x} y={y} width={w} height={35 - y} fill={C.midnight} opacity={0.9} />
      ))}

      {/* ground / launch pad */}
      <rect x={0} y={35} width={96} height={19} fill="#1c1410" />
      <rect x={0} y={35} width={96} height={1} fill="#2a1c14" />
      {/* pad scorch */}
      <rect x={36} y={45} width={28} height={9} fill={C.midnight} opacity={0.5} />
      <rect x={40} y={48} width={20} height={6} fill={C.pitch} opacity={0.6} />

      {/* launch gantry (left tower) */}
      <rect x={14} y={20} width={2} height={26} fill={C.steel} />
      <rect x={20} y={24} width={2} height={22} fill={C.steel} />
      <rect x={14} y={20} width={8} height={1} fill={C.steel} />
      <rect x={14} y={26} width={8} height={1} fill={C.steel} opacity={0.7} />
      <rect x={14} y={32} width={8} height={1} fill={C.steel} opacity={0.7} />
      <rect x={14} y={38} width={8} height={1} fill={C.steel} opacity={0.7} />
      <line x1={14} y1={20} x2={22} y2={26} stroke={C.steel} strokeWidth={0.6} opacity={0.5} />
      <line x1={14} y1={26} x2={22} y2={32} stroke={C.steel} strokeWidth={0.6} opacity={0.5} />
      <line x1={14} y1={32} x2={22} y2={38} stroke={C.steel} strokeWidth={0.6} opacity={0.5} />
      <line x1={22} y1={20} x2={14} y2={26} stroke={C.steel} strokeWidth={0.6} opacity={0.5} />
      <line x1={22} y1={26} x2={14} y2={32} stroke={C.steel} strokeWidth={0.6} opacity={0.5} />
      <line x1={22} y1={32} x2={14} y2={38} stroke={C.steel} strokeWidth={0.6} opacity={0.5} />
      {/* gantry warning light */}
      <rect x={17} y={18} width={2} height={2} fill={C.ruby} />
      <rect x={17} y={17} width={2} height={1} fill={C.rubyHi} opacity={0.7} />

      {/* rocket body */}
      <rect x={44} y={14} width={8} height={26} fill={C.marbleSheen} />
      <rect x={44} y={14} width={1} height={26} fill={C.marble} opacity={0.6} />
      <rect x={51} y={14} width={1} height={26} fill={C.stoneHi} opacity={0.4} />
      {/* nose cone */}
      <rect x={45} y={10} width={6} height={1} fill={C.ruby} />
      <rect x={46} y={9} width={4} height={1} fill={C.ruby} />
      <rect x={47} y={8} width={2} height={1} fill={C.ruby} />
      <rect x={47} y={7} width={2} height={1} fill={C.rubyHi} />
      <rect x={45} y={11} width={6} height={2} fill={C.ruby} opacity={0.8} />
      {/* windows */}
      <rect x={47} y={17} width={2} height={2} fill={C.cool} />
      <rect x={47} y={17} width={2} height={1} fill={C.coolHi} />
      <rect x={47} y={22} width={2} height={2} fill={C.cool} />
      <rect x={47} y={22} width={2} height={1} fill={C.coolHi} />
      {/* logo */}
      <rect x={46} y={28} width={4} height={3} fill={C.gold} opacity={0.85} />
      <rect x={47} y={29} width={2} height={1} fill={C.goldDeep} opacity={0.8} />
      {/* fins */}
      <rect x={40} y={36} width={4} height={6} fill={C.ruby} />
      <rect x={40} y={36} width={1} height={6} fill={C.rubyHi} opacity={0.5} />
      <rect x={40} y={42} width={4} height={1} fill="#7a2828" />
      <rect x={52} y={36} width={4} height={6} fill={C.ruby} />
      <rect x={55} y={36} width={1} height={6} fill={C.rubyHi} opacity={0.5} />
      <rect x={52} y={42} width={4} height={1} fill="#7a2828" />
      {/* thruster */}
      <rect x={45} y={40} width={6} height={2} fill={C.steel} />
      <rect x={45} y={42} width={6} height={1} fill={C.steelHi} opacity={0.5} />

      {/* flame trail */}
      <rect x={45} y={42} width={6} height={3} fill={C.flameHot} />
      <rect x={44} y={43} width={8} height={3} fill={C.flame} />
      <rect x={43} y={45} width={10} height={3} fill={C.ember} />
      <rect x={44} y={48} width={8} height={2} fill={C.ember} opacity={0.8} />
      <rect x={45} y={50} width={6} height={2} fill={C.ruby} opacity={0.6} />
      {/* flame flickers / sparks */}
      <rect x={43} y={47} width={1} height={1} fill={C.flame} opacity={0.8} />
      <rect x={52} y={46} width={1} height={1} fill={C.flame} opacity={0.8} />
      <rect x={41} y={50} width={1} height={1} fill={C.ember} opacity={0.7} />
      <rect x={54} y={49} width={1} height={1} fill={C.ember} opacity={0.7} />

      {/* exhaust smoke clouds */}
      <rect x={26} y={46} width={18} height={4} fill={C.marble} opacity={0.55} />
      <rect x={22} y={48} width={26} height={4} fill={C.marble} opacity={0.45} />
      <rect x={30} y={44} width={12} height={2} fill={C.marbleHi} opacity={0.4} />
      <rect x={52} y={46} width={18} height={4} fill={C.marble} opacity={0.55} />
      <rect x={48} y={48} width={26} height={4} fill={C.marble} opacity={0.45} />
      <rect x={54} y={44} width={12} height={2} fill={C.marbleHi} opacity={0.4} />
      <rect x={18} y={51} width={22} height={3} fill={C.marble} opacity={0.35} />
      <rect x={58} y={51} width={22} height={3} fill={C.marble} opacity={0.35} />
      {/* smoke wisps */}
      <rect x={14} y={50} width={4} height={1} fill={C.marbleHi} opacity={0.4} />
      <rect x={78} y={50} width={4} height={1} fill={C.marbleHi} opacity={0.4} />

      {/* token coin in orbit/path */}
      {disc(82, 8, 3, C.goldHi, 1, "orbit")}
      <rect x={81} y={7} width={3} height={1} fill={C.gold} />
      <rect x={81} y={9} width={3} height={1} fill={C.goldLow} />
      <rect x={82} y={8} width={1} height={1} fill={C.goldDeep} opacity={0.5} />
      {/* orbit trail */}
      <line x1={64} y1={6} x2={80} y2={8} stroke={C.gold} strokeWidth={0.5} opacity={0.4} />
      <rect x={66} y={5} width={1} height={1} fill={C.gold} opacity={0.5} />
      <rect x={70} y={6} width={1} height={1} fill={C.gold} opacity={0.5} />
      <rect x={74} y={7} width={1} height={1} fill={C.goldHi} opacity={0.6} />

      {/* trajectory arc from rocket */}
      <path
        d="M 48 12 Q 60 6 78 7"
        fill="none"
        stroke={C.gold}
        strokeWidth={0.6}
        strokeDasharray="2 2"
        opacity={0.45}
      />
    </g>
  );
}

/** Non-custodial wallet — device, key material, chain links */
function MoneybaWallet() {
  return (
    <g>
      <defs>
        <linearGradient id="mbFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#070914" stopOpacity={0} />
          <stop offset="55%" stopColor="#070914" stopOpacity={0.25} />
          <stop offset="100%" stopColor="#04050a" stopOpacity={0.85} />
        </linearGradient>
      </defs>
      <rect width={96} height={54} fill={C.pitch} />
      {Array.from({ length: 48 }).map((_, i) => {
        const x = (i % 12) * 8 + 2;
        const y = Math.floor(i / 12) * 8 + 4;
        return (
          <rect
            key={`g-${i}`}
            x={x}
            y={y}
            width={1}
            height={1}
            fill={C.navy}
            opacity={0.15 + (i % 5) * 0.04}
          />
        );
      })}
      <rect x={0} y={0} width={96} height={54} fill="url(#mbFade)" opacity={1} />
      {/* chain nodes */}
      {[
        [8, 38], [16, 40], [24, 38], [72, 40], [80, 38], [88, 40],
      ].map(([x, y], i) => (
        <g key={`ch-${i}`}>
          <rect x={x - 1} y={y - 1} width={4} height={4} fill={C.tealDim} opacity={0.85} />
          <rect x={x} y={y} width={2} height={2} fill={C.teal} opacity={0.9} />
        </g>
      ))}
      <line x1={10} y1={40} x2={88} y2={40} stroke={C.gold} strokeWidth={0.5} opacity={0.2} />
      {/* key / seed shard — left */}
      <rect x={10} y={16} width={3} height={18} fill={C.goldLow} />
      <rect x={11} y={14} width={1} height={4} fill={C.goldHi} />
      <rect x={10} y={20} width={3} height={2} fill={C.gold} />
      <rect x={10} y={26} width={3} height={2} fill={C.gold} />
      <rect x={10} y={32} width={3} height={2} fill={C.gold} />
      <path d="M 11 10 L 13 8 L 15 10 L 13 12 Z" fill={C.goldHi} opacity={0.9} />
      {/* hardware wallet body */}
      <rect x={32} y={11} width={34} height={32} fill={C.navy} />
      <rect x={33} y={12} width={32} height={30} fill={C.midnight} />
      <rect x={33} y={12} width={32} height={1} fill={C.steelHi} opacity={0.4} />
      {/* screen */}
      <rect x={37} y={16} width={24} height={18} fill="#020308" />
      <rect x={38} y={17} width={22} height={1} fill={C.teal} opacity={0.35} />
      <rect x={38} y={19} width={10} height={1} fill={C.tealDim} opacity={0.5} />
      <rect x={38} y={21} width={16} height={1} fill={C.tealDim} opacity={0.35} />
      <rect x={38} y={23} width={14} height={1} fill={C.gold} opacity={0.2} />
      <rect x={42} y={27} width={12} height={4} fill={C.teal} opacity={0.15} />
      <rect x={46} y={29} width={4} height={2} fill={C.teal} opacity={0.55} />
      {/* bezel screws */}
      {[[35, 14], [61, 14], [35, 38], [61, 38]].map(([x, y], i) => (
        <rect key={`sc-${i}`} x={x} y={y} width={2} height={2} fill={C.steel} opacity={0.7} />
      ))}
      {/* shield — self-custody */}
      <path
        d="M 74 14 L 82 18 L 82 28 L 78 34 L 74 32 Z"
        fill={C.tealDark}
        opacity={0.65}
        stroke={C.teal}
        strokeWidth={0.6}
      />
      {/* user silhouette inside shield */}
      <rect x={76} y={23} width={3} height={5} fill={C.gold} opacity={0.45} />
      {disc(77, 21, 2, C.goldHi, 0.5, "head")}
    </g>
  );
}

const scenes: Record<Variant, ReactNode> = {
  lightrain: <LightRain />,
  treasury: <Treasury />,
  governance: <Governance />,
  custody: <Custody />,
  tokenomics: <Tokenomics />,
  moneyba: <MoneybaWallet />,
};

export default function ServiceCardPixelArt({
  variant,
  className,
}: {
  variant: Variant;
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

export type { Variant as ServiceCardPixelVariant };

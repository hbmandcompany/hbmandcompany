/** Shared linocut / woodblock canvas paint (hero + cards). */

export type LinocutDensity = "hero" | "card";

/** Thematic compositions (card art). "default" is the abstract hero-style collage. */
export type LinocutComposition = "default" | "lightrain" | "moneyba";

export type PaintLinocutOptions = {
  variantKey?: number;
  density?: LinocutDensity;
  composition?: LinocutComposition;
};

const PAPER = "#9a9288";
const PAPER_DEEP = "#7a736a";
const CARVE_REVEAL = "#c4bdb4";
const INK = "#080807";
const INK_SOFT = "#12100e";
const HERO_PAPER = "#4e484d";
const HERO_PAPER_DEEP = "#1d1a23";
const HERO_CARVE_REVEAL = "#9f9793";
const HERO_INK = "#040407";
const HERO_INK_SOFT = "#0b0b10";

/** Deterministic 0–1; variantKey shifts the field per card/instance */
function r01(i: number, variantOffset = 0) {
  const x =
    Math.sin((i + variantOffset * 1.6180339887) * 12.9898 + 78.233 + variantOffset * 0.413) *
    43758.5453123;
  return x - Math.floor(x);
}

function fillCarvedQuad(
  ctx: CanvasRenderingContext2D,
  nx: number,
  ny: number,
  nw: number,
  nh: number,
  w: number,
  h: number,
  seed: number,
  fill: string,
  v: number,
) {
  const x = nx * w;
  const y = ny * h;
  const rw = nw * w;
  const rh = nh * h;
  const j = Math.min(w, h) * (0.01 + r01(seed, v) * 0.008);
  const pts: [number, number][] = [
    [x + j * (r01(seed + 1, v) - 0.5) * 2.2, y + j * (r01(seed + 2, v) - 0.5) * 2.2],
    [x + rw + j * (r01(seed + 3, v) - 0.5) * 2.2, y + j * (r01(seed + 4, v) - 0.5) * 2.2],
    [x + rw + j * (r01(seed + 5, v) - 0.5) * 2.2, y + rh + j * (r01(seed + 6, v) - 0.5) * 2.2],
    [x + j * (r01(seed + 7, v) - 0.5) * 2.2, y + rh + j * (r01(seed + 8, v) - 0.5) * 2.2],
  ];
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  ctx.lineTo(pts[1][0], pts[1][1]);
  ctx.lineTo(pts[2][0], pts[2][1]);
  ctx.lineTo(pts[3][0], pts[3][1]);
  ctx.closePath();
  ctx.fill();
}

function hatchInRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  rw: number,
  rh: number,
  angleDeg: number,
  step: number,
  opacity: number,
  v: number,
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, rw, rh);
  ctx.clip();
  ctx.strokeStyle = `rgba(10, 8, 7, ${opacity})`;
  ctx.lineWidth = 0.85;
  const cx = x + rw / 2;
  const cy = y + rh / 2;
  const rad = (angleDeg * Math.PI) / 180;
  ctx.translate(cx, cy);
  ctx.rotate(rad);
  const span = Math.hypot(rw, rh) * 1.2;
  for (let i = -span; i < span; i += step) {
    const wob = (r01(Math.floor(i + x), v) - 0.5) * 0.6;
    ctx.beginPath();
    ctx.moveTo(i + wob, -span);
    ctx.lineTo(i + wob, span);
    ctx.stroke();
  }
  ctx.restore();
}

function gougeStroke(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  paper: string,
  canvasW: number,
  canvasH: number,
  seed: number,
  v: number,
) {
  const segs = 10;
  ctx.strokeStyle = paper;
  ctx.lineWidth = 1.1 + r01(seed, v) * 0.35;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.globalAlpha = 0.88 + r01(seed + 1, v) * 0.1;
  ctx.beginPath();
  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;
    const off = Math.sin(t * Math.PI * 4 + seed) * Math.min(canvasW, canvasH) * 0.0035;
    const px2 = px + off;
    const py2 = py + off * 0.6;
    if (i === 0) ctx.moveTo(px2, py2);
    else ctx.lineTo(px2, py2);
  }
  ctx.stroke();
  ctx.globalAlpha = 1;
}

/** Irregular disk — reads like a carved coin / link. */
function fillCarvedDisk(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  seed: number,
  fill: string,
  v: number,
) {
  const n = 11;
  ctx.fillStyle = fill;
  ctx.beginPath();
  for (let k = 0; k <= n; k++) {
    const t = (k / n) * Math.PI * 2;
    const rr = r * (0.9 + r01(seed + k * 2, v) * 0.14);
    const x = cx + Math.cos(t) * rr;
    const y = cy + Math.sin(t) * rr;
    if (k === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: string | CanvasGradient | CanvasPattern,
) {
  const r = Math.min(radius, width * 0.5, height * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function paintLightRainScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  v: number,
  density: LinocutDensity,
) {
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#090f1a");
  bg.addColorStop(0.55, "#111b2d");
  bg.addColorStop(1, "#0f2f2c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const panelX = w * 0.12;
  const panelY = h * 0.2;
  const panelW = w * 0.76;
  const panelH = h * 0.62;
  const panelGrad = ctx.createLinearGradient(panelX, panelY, panelX + panelW, panelY + panelH);
  panelGrad.addColorStop(0, "rgba(26, 38, 58, 0.9)");
  panelGrad.addColorStop(1, "rgba(8, 16, 22, 0.94)");
  fillRoundedRect(ctx, panelX, panelY, panelW, panelH, Math.min(w, h) * 0.05, panelGrad);

  ctx.strokeStyle = "rgba(151, 242, 219, 0.4)";
  ctx.lineWidth = 1.2;
  ctx.strokeRect(panelX + 1.5, panelY + 1.5, panelW - 3, panelH - 3);

  const barCount = density === "card" ? 18 : 28;
  for (let i = 0; i < barCount; i++) {
    const bw = panelW * (0.015 + r01(i * 17, v) * 0.022);
    const bx = panelX + panelW * 0.04 + i * ((panelW * 0.9) / barCount);
    const bh = panelH * (0.1 + r01(i * 23 + 3, v) * 0.72);
    const by = panelY + panelH * 0.9 - bh;
    const neon = ctx.createLinearGradient(bx, by, bx, by + bh);
    neon.addColorStop(0, "rgba(139, 255, 226, 0.95)");
    neon.addColorStop(1, "rgba(60, 219, 188, 0.35)");
    fillRoundedRect(ctx, bx, by, bw, bh, bw * 0.45, neon);
  }

  const ringCount = density === "card" ? 3 : 4;
  ctx.lineWidth = Math.max(1, Math.min(w, h) * 0.004);
  for (let r = 0; r < ringCount; r++) {
    const rr = Math.min(w, h) * (0.14 + r * 0.07);
    ctx.strokeStyle = `rgba(133, 255, 230, ${0.32 - r * 0.06})`;
    ctx.beginPath();
    ctx.arc(w * 0.26, h * 0.35, rr, Math.PI * 1.15, Math.PI * 1.92);
    ctx.stroke();
  }

  const rainCount = density === "card" ? 70 : 118;
  for (let i = 0; i < rainCount; i++) {
    const x = r01(i * 7 + 5, v) * w;
    const y = r01(i * 11 + 9, v) * h * 0.68;
    const len = h * (0.02 + r01(i * 13, v) * 0.1);
    ctx.strokeStyle = `rgba(176, 255, 241, ${0.2 + r01(i * 19, v) * 0.45})`;
    ctx.lineWidth = 0.8 + r01(i * 29, v) * 1.1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - w * 0.012, y + len);
    ctx.stroke();
  }

  for (let i = 0; i < 8; i++) {
    const dx = w * (0.18 + i * 0.09);
    const dy = h * (0.79 + r01(i * 37, v) * 0.07);
    const rg = ctx.createRadialGradient(dx, dy, 0, dx, dy, Math.min(w, h) * 0.05);
    rg.addColorStop(0, "rgba(180, 255, 241, 0.5)");
    rg.addColorStop(1, "rgba(180, 255, 241, 0)");
    ctx.fillStyle = rg;
    ctx.beginPath();
    ctx.arc(dx, dy, Math.min(w, h) * 0.05, 0, Math.PI * 2);
    ctx.fill();
  }
}

function paintMoneyBaggScene(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  v: number,
  density: LinocutDensity,
) {
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#190c16");
  bg.addColorStop(0.6, "#28121f");
  bg.addColorStop(1, "#110a0f");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const glow = ctx.createRadialGradient(w * 0.52, h * 0.56, 0, w * 0.52, h * 0.56, w * 0.52);
  glow.addColorStop(0, "rgba(255, 214, 144, 0.28)");
  glow.addColorStop(1, "rgba(255, 214, 144, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  const handleY = h * 0.34;
  ctx.strokeStyle = "rgba(247, 214, 160, 0.85)";
  ctx.lineWidth = Math.max(2.8, Math.min(w, h) * 0.018);
  ctx.beginPath();
  ctx.moveTo(w * 0.39, handleY + h * 0.08);
  ctx.bezierCurveTo(w * 0.4, handleY - h * 0.04, w * 0.6, handleY - h * 0.04, w * 0.61, handleY + h * 0.08);
  ctx.stroke();

  const bagGrad = ctx.createLinearGradient(w * 0.3, h * 0.42, w * 0.7, h * 0.88);
  bagGrad.addColorStop(0, "#ffdda5");
  bagGrad.addColorStop(0.45, "#d39a56");
  bagGrad.addColorStop(1, "#8f5d2a");

  ctx.beginPath();
  ctx.moveTo(w * 0.32, h * 0.53);
  ctx.bezierCurveTo(w * 0.34, h * 0.44, w * 0.66, h * 0.44, w * 0.68, h * 0.53);
  ctx.bezierCurveTo(w * 0.72, h * 0.7, w * 0.63, h * 0.84, w * 0.5, h * 0.86);
  ctx.bezierCurveTo(w * 0.37, h * 0.84, w * 0.28, h * 0.7, w * 0.32, h * 0.53);
  ctx.closePath();
  ctx.fillStyle = bagGrad;
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 234, 190, 0.62)";
  ctx.lineWidth = Math.max(1.2, Math.min(w, h) * 0.006);
  ctx.stroke();

  // Luxury parody monogram: repeating mirrored arc glyphs (inspired, not exact logo copy).
  const patternRows = density === "card" ? 4 : 5;
  const patternCols = density === "card" ? 6 : 8;
  for (let row = 0; row < patternRows; row++) {
    for (let col = 0; col < patternCols; col++) {
      const px = w * 0.37 + col * ((w * 0.26) / patternCols);
      const py = h * 0.57 + row * ((h * 0.2) / patternRows);
      const glyphR = Math.min(w, h) * 0.0155;
      ctx.strokeStyle = `rgba(114, 63, 31, ${0.42 + r01(row * 31 + col * 7, v) * 0.22})`;
      ctx.lineWidth = Math.max(1.1, Math.min(w, h) * 0.0045);

      ctx.beginPath();
      ctx.arc(px - glyphR * 0.32, py, glyphR, Math.PI * 0.28, Math.PI * 1.72);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(px + glyphR * 0.78, py, glyphR, Math.PI * 1.28, Math.PI * 0.72);
      ctx.stroke();

      if ((row + col) % 3 === 0) {
        ctx.strokeStyle = "rgba(248, 213, 150, 0.24)";
        ctx.lineWidth = Math.max(0.8, Math.min(w, h) * 0.0028);
        ctx.beginPath();
        ctx.moveTo(px + glyphR * 0.16, py - glyphR * 0.84);
        ctx.lineTo(px + glyphR * 0.3, py + glyphR * 0.84);
        ctx.stroke();
      }
    }
  }

  const medallionR = Math.min(w, h) * 0.045;
  const medX = w * 0.5;
  const medY = h * 0.66;
  const medGrad = ctx.createRadialGradient(
    medX - medallionR * 0.28,
    medY - medallionR * 0.3,
    medallionR * 0.12,
    medX,
    medY,
    medallionR,
  );
  medGrad.addColorStop(0, "rgba(255, 246, 210, 0.94)");
  medGrad.addColorStop(1, "rgba(186, 121, 56, 0.9)");
  ctx.fillStyle = medGrad;
  ctx.beginPath();
  ctx.arc(medX, medY, medallionR, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 230, 185, 0.7)";
  ctx.lineWidth = Math.max(1, Math.min(w, h) * 0.004);
  ctx.stroke();

  ctx.strokeStyle = "rgba(95, 53, 24, 0.78)";
  ctx.lineWidth = Math.max(1.1, Math.min(w, h) * 0.0044);
  ctx.beginPath();
  ctx.arc(medX - medallionR * 0.22, medY, medallionR * 0.42, Math.PI * 0.32, Math.PI * 1.68);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(medX + medallionR * 0.2, medY, medallionR * 0.42, Math.PI * 1.32, Math.PI * 0.68);
  ctx.stroke();

  const coinCount = density === "card" ? 5 : 7;
  for (let i = 0; i < coinCount; i++) {
    const cx = w * (0.17 + r01(i * 43, v) * 0.66);
    const cy = h * (0.15 + r01(i * 47 + 2, v) * 0.64);
    const rr = Math.min(w, h) * (0.045 + r01(i * 53 + 4, v) * 0.03);
    const cg = ctx.createRadialGradient(cx - rr * 0.3, cy - rr * 0.35, rr * 0.1, cx, cy, rr);
    cg.addColorStop(0, "rgba(255, 248, 210, 0.96)");
    cg.addColorStop(1, "rgba(187, 126, 63, 0.88)");
    ctx.fillStyle = cg;
    ctx.beginPath();
    ctx.arc(cx, cy, rr, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 236, 198, 0.72)";
    ctx.lineWidth = Math.max(1, Math.min(w, h) * 0.0042);
    ctx.stroke();
  }
}

export function paintLinocut(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  dpr: number,
  options?: PaintLinocutOptions,
) {
  const v = options?.variantKey ?? 0;
  const density = options?.density ?? "hero";
  const composition = options?.composition ?? "default";
  const isHeroDefault = composition === "default" && density === "hero";
  const chipCount =
    composition !== "default" ? 0 : density === "card" ? 14 : 28;
  const gougeCount = composition !== "default" && density === "card" ? 6 : density === "card" ? 10 : 18;
  const speckleCount = density === "card" ? 160 : 420;
  const grainStep = density === "card" ? 5 : 3;
  const paper = isHeroDefault ? HERO_PAPER : PAPER;
  const paperDeep = isHeroDefault ? HERO_PAPER_DEEP : PAPER_DEEP;
  const carveReveal = isHeroDefault ? HERO_CARVE_REVEAL : CARVE_REVEAL;
  const ink = isHeroDefault ? HERO_INK : INK;
  const inkSoft = isHeroDefault ? HERO_INK_SOFT : INK_SOFT;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.imageSmoothingEnabled = true;

  const paperGrad = ctx.createLinearGradient(0, 0, w * 0.4, h);
  paperGrad.addColorStop(0, paper);
  paperGrad.addColorStop(0.55, paper);
  paperGrad.addColorStop(1, paperDeep);
  ctx.fillStyle = paperGrad;
  ctx.fillRect(0, 0, w, h);

  if (composition === "lightrain") {
    paintLightRainScene(ctx, w, h, v, density);
  } else if (composition === "moneyba") {
    paintMoneyBaggScene(ctx, w, h, v, density);
  } else {
    const blocks: { nx: number; ny: number; nw: number; nh: number; s: number; ink: string }[] = [
      { nx: 0, ny: 0, nw: 0.55, nh: 0.16, s: 11, ink },
      { nx: 0.48, ny: 0.06, nw: 0.52, nh: 0.34, s: 22, ink },
      { nx: 0, ny: 0.2, nw: 0.38, nh: 0.58, s: 33, ink },
      { nx: 0.3, ny: 0.4, nw: 0.7, nh: 0.38, s: 44, ink: inkSoft },
      { nx: 0.52, ny: 0.62, nw: 0.48, nh: 0.38, s: 55, ink },
      { nx: 0.06, ny: 0.72, nw: 0.42, nh: 0.26, s: 66, ink },
      { nx: 0.72, ny: 0.36, nw: 0.28, nh: 0.5, s: 77, ink: inkSoft },
      { nx: 0.14, ny: 0.48, nw: 0.22, nh: 0.2, s: 88, ink },
      { nx: 0.58, ny: 0.12, nw: 0.18, nh: 0.22, s: 99, ink },
    ];

    for (const b of blocks) {
      fillCarvedQuad(ctx, b.nx, b.ny, b.nw, b.nh, w, h, b.s + v, b.ink, v);
    }

    hatchInRect(ctx, w * 0.02, h * 0.22, w * 0.32, h * 0.5, -38, 4.2, 0.18, v);
    hatchInRect(ctx, w * 0.52, h * 0.1, w * 0.44, h * 0.28, 52, 3.8, 0.15, v);
    hatchInRect(ctx, w * 0.34, h * 0.44, w * 0.58, h * 0.32, -52, 4.5, 0.16, v);
    hatchInRect(ctx, w * 0.54, h * 0.66, w * 0.4, h * 0.28, 38, 5, 0.14, v);
  }

  for (let i = 0; i < chipCount; i++) {
    const nx = 0.04 + r01(i * 13, v) * 0.88;
    const ny = 0.06 + r01(i * 17 + 2, v) * 0.84;
    const nw = 0.04 + r01(i * 19, v) * 0.12;
    const nh = 0.03 + r01(i * 23, v) * 0.1;
    if (i % 5 === 0) {
      fillCarvedQuad(ctx, nx, ny, nw, nh, w, h, 200 + i + v, i % 3 === 0 ? ink : inkSoft, v);
    }
  }

  const paperReveal = carveReveal;
  for (let g = 0; g < gougeCount; g++) {
    const x1 = r01(g * 41, v) * w;
    const y1 = r01(g * 43 + 1, v) * h;
    const x2 = x1 + (r01(g * 47, v) - 0.3) * w * 0.35;
    const y2 = y1 + (r01(g * 53, v) - 0.4) * h * 0.25;
    gougeStroke(ctx, x1, y1, x2, y2, paperReveal, w, h, 300 + g + v, v);
  }

  ctx.strokeStyle = "rgba(32, 28, 24, 0.1)";
  ctx.lineWidth = 0.5;
  for (let y = 0; y < h; y += grainStep + Math.floor(r01(y, v) * 2)) {
    const wob = Math.sin(y * 0.08) * 1.2 + (r01(y, v) - 0.5) * 0.8;
    ctx.beginPath();
    ctx.moveTo(0, y + wob);
    ctx.lineTo(w, y + wob * 0.7);
    ctx.stroke();
  }

  for (let i = 0; i < speckleCount; i++) {
    const px = r01(i * 61, v) * w;
    const py = r01(i * 67 + 3, v) * h;
    const rs = 0.35 + r01(i * 71, v) * 1.8;
    const alphaBase = composition === "default" ? 0.06 : 0.03;
    const alphaSpan = composition === "default" ? 0.28 : 0.12;
    ctx.fillStyle =
      composition === "default"
        ? `rgba(6, 5, 4, ${alphaBase + r01(i * 79, v) * alphaSpan})`
        : `rgba(239, 216, 184, ${alphaBase + r01(i * 79, v) * alphaSpan})`;
    ctx.beginPath();
    ctx.arc(px, py, rs, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(24, 20, 18, 0.45)";
  ctx.lineWidth = 1.25;
  const m = Math.min(w, h) * 0.018;
  ctx.strokeRect(m * 0.6, m * 0.6, w - m * 1.2, h - m * 1.2);
  ctx.strokeStyle = "rgba(24, 20, 18, 0.2)";
  ctx.lineWidth = 0.6;
  ctx.strokeRect(m * 1.1, m * 1.1, w - m * 2.2, h - m * 2.2);

  ctx.fillStyle =
    composition === "default"
      ? isHeroDefault
        ? "rgba(4, 4, 8, 0.4)"
        : "rgba(12, 9, 8, 0.24)"
      : "rgba(10, 7, 9, 0.12)";
  ctx.fillRect(0, 0, w, h);
}

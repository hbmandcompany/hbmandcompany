import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontPath = path.join(root, "public/fonts/CormorantGaramond-Light.woff");

const BG = "#020203";
const AMP = "#B4AFAA";
const AMP_OPACITY = "0.65";

function svgMarkup(size, fontSize, y, fontBase64) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" fill="none">
  <defs>
    <style>
      @font-face {
        font-family: "Cormorant Garamond";
        font-style: normal;
        font-weight: 300;
        src: url("data:font/woff;base64,${fontBase64}") format("woff");
      }
    </style>
  </defs>
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text
    x="${size / 2}"
    y="${y}"
    text-anchor="middle"
    font-family="Cormorant Garamond, Georgia, serif"
    font-size="${fontSize}"
    font-weight="300"
    fill="${AMP}"
    opacity="${AMP_OPACITY}"
  >&amp;</text>
</svg>
`;
}

async function main() {
  const fontBase64 = (await readFile(fontPath)).toString("base64");
  const icon32 = svgMarkup(32, 26, 24, fontBase64);
  const icon180 = svgMarkup(180, 132, 128, fontBase64);

  await writeFile(path.join(root, "app/icon.svg"), icon32);
  await writeFile(path.join(root, "public/icon.svg"), icon32);

  const sharp = (await import("sharp")).default;
  await sharp(Buffer.from(icon180)).png().toFile(path.join(root, "app/apple-icon.png"));

  console.log("Generated app/icon.svg, public/icon.svg, app/apple-icon.png");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

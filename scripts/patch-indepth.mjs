import fs from "fs";

const p = "components/HomePageClient.tsx";
let s = fs.readFileSync(p, "utf8");

s = s.replace(
  /layout="sidebar" \/>\n                <\/SectionReveal>\n              \)\)\}\n            <\/motion\.div>/,
  'layout="sidebar" />\n                </SectionReveal>\n              ))}\n            </div>',
);

s = s.replace(
  '<div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-14">',
  ["<", "div", ' className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-14 xl:gap-x-16">'].join(""),
);

const start = "      {/* ═══════════════ IN DEPTH — magazine feature spread ═══════════════ */}";
const end = "      {/* ═══════════════ thesis ═══════════════ */}";
const i = s.indexOf(start);
const j = s.indexOf(end);
if (i < 0 || j < 0) {
  console.error("markers not found", i, j);
  process.exit(1);
}

const inDepth = fs.readFileSync("scripts/indepth-section.txt", "utf8");
s = s.slice(0, i) + inDepth + s.slice(j);

fs.writeFileSync(p, s);
console.log("patched");

import fs from "fs";

const p = "components/HomePageClient.tsx";
let s = fs.readFileSync(p, "utf8");

const replacement = `          <SectionReveal>
            <FrontPageNewsGrid stories={featuredStories} />
          </SectionReveal>`;

const open = '          <motion.div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-x-3 xl:gap-x-4">'.replace(
  "motion.",
  "",
);
const tag = "div";
const end = `              ))}\n            </${tag}>\n          </${tag}>`;

const i = s.indexOf(open);
if (i < 0) {
  console.error("open not found");
  process.exit(1);
}

const j = s.indexOf(end, i);
if (j < 0) {
  console.error("close not found");
  process.exit(1);
}

s = s.slice(0, i) + replacement + s.slice(j + end.length);

fs.writeFileSync(p, s);
console.log("done");

const fs = require("fs");
const path = require("path");

const p = path.join(__dirname, "..", "components", "HomePageClient.tsx");
const lines = fs.readFileSync(p, "utf8").split(/\r?\n/);

const featuredStart = lines.findIndex((l) => l.includes("WHAT WE BUILD"));
const featuredEnd = lines.findIndex((l) => l.includes("CHAINS MARQUEE"));
const suiteStart = lines.findIndex((l) => l.includes("FEATURED WORK (Suite"));
const suiteEnd = lines.findIndex((l, i) => i > suiteStart && l.includes("Consequence (music)"));

const featuredBlock = `      {/* ═══════════════ FEATURED STORIES — front page grid ═══════════════ */}
      <section className="relative flex min-h-0 flex-col justify-center overflow-hidden section-mid py-28 md:py-36 lg:py-44">
        <div className="pointer-events-none absolute inset-0 purple-bloom" aria-hidden />
        <div className="pointer-events-none absolute inset-0 city-glow opacity-35" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <MagazineSectionMasthead
              eyebrow="— Featured Stories"
              title="The Front Page"
              aside="Culture · Music · Film · Markets · Vol. I · 2026"
            />
          </SectionReveal>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-14">
            <SectionReveal className="lg:col-span-7 xl:col-span-8">
              <MagazineArticleCard story={leadStory} layout="lead" />
            </SectionReveal>
            <div className="flex flex-col gap-10 lg:col-span-5 lg:gap-12 xl:col-span-4">
              {stackedStories.map((story, index) => (
                <SectionReveal key={story.storyId} delay={0.06 + index * 0.06}>
                  <MagazineArticleCard story={story} layout="sidebar" />
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CHAINS MARQUEE ═══════════════ */}`.split(/\r?\n/);

const suiteBlock = `      {/* ═══════════════ ON THE RECORD — secondary articles ═══════════════ */}
      <section className="relative overflow-hidden py-28 md:py-40 lg:py-48 section-raised">
        <div className="pointer-events-none absolute inset-0 amber-bloom opacity-35" aria-hidden />
        <div className="pointer-events-none absolute inset-0 garnet-bloom-top" aria-hidden />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <MagazineSectionMasthead
              eyebrow="— On The Record"
              title="Stories Worth the read"
              aside="Long reads · Dispatches · Analysis"
            />
          </SectionReveal>

          <div className="mb-10 flex justify-end md:mb-12">
            <Link href="/treasury" className={goldOutlineCta}>
              Documentation
            </Link>
          </div>

          <div className="flex flex-col gap-10 md:gap-12">
            {suiteSections.map((work, workIndex) => (
              <SectionReveal key={work.pixelVariant} delay={0.06 + workIndex * 0.08}>
                <MagazineRiverCard work={work} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Consequence (music) — mid band ═══════════════ */}`.split(/\r?\n/);

if (featuredStart < 0 || featuredEnd < 0) throw new Error("featured markers");
if (suiteStart < 0 || suiteEnd < 0) throw new Error("suite markers");

const out = [
  ...lines.slice(0, featuredStart),
  ...featuredBlock,
  ...lines.slice(featuredEnd),
];

const suiteStart2 = out.findIndex((l) => l.includes("FEATURED WORK (Suite"));
const suiteEnd2 = out.findIndex((l, i) => i > suiteStart2 && l.includes("Consequence (music)"));
const final = [...out.slice(0, suiteStart2), ...suiteBlock, ...out.slice(suiteEnd2)];

fs.writeFileSync(p, final.join("\n"), "utf8");
console.log("sections patched");

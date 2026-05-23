import fs from "fs";

const p = "components/HomePageClient.tsx";
let s = fs.readFileSync(p, "utf8");

const heroOld = `        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center gap-0 pl-[max(1.25rem,env(safe-area-inset-left,0px))] pr-[max(1.25rem,env(safe-area-inset-right,0px))] text-center md:px-12 md:translate-x-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:gap-y-7 lg:px-12 lg:text-left lg:translate-x-12 xl:translate-x-16 xl:gap-x-14 xl:gap-y-9"
        >
          <motion.div variants={heroItem} className="mb-4 flex w-full flex-col items-center md:mb-5 lg:col-span-12 lg:mb-0">
            <span className="font-mono-hbm text-[9px] font-medium uppercase tracking-[0.42em] text-gold/55 md:text-[10px]">
              Breaking · Culture &amp; Markets
            </span>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-quote-serif hero-editorial-headline font-cormorant font-light text-cream/[0.44] [text-shadow:0_3px_32px_rgba(0,0,0,0.42)] lg:col-span-12 lg:mt-0"
          >
            <span className="inline-flex max-w-full flex-nowrap items-baseline justify-center gap-x-[0.35em] lg:justify-center">
              <AnimatedHeadline text="The New Sound" delay={0} nowrap />
              <AnimatedHeadline
                text="Of Capital"
                delay={0}
                nowrap
                className="font-semibold italic text-cream/[0.48] [filter:drop-shadow(0_4px_24px_rgba(0,0,0,0.35))]"
              />
            </span>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-visual mt-4 w-full max-w-[min(100%,320px)] sm:mt-5 sm:max-w-[min(100%,380px)] lg:col-span-5 lg:row-start-3 lg:mt-0 lg:max-w-[min(100%,440px)] xl:max-w-[min(100%,460px)] lg:justify-self-start"
          >
            <BrandBandCardChrome className="flex h-auto min-h-[420px] flex-col px-4 pt-5 pb-3 sm:min-h-0 md:px-5 md:pt-6 md:pb-3.5 lg:px-6 lg:pt-7 lg:pb-4">
              <HeroNewsCarousel />
            </BrandBandCardChrome>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-prose hero-editorial-quote-serif relative mt-10 w-full max-w-lg border-y border-white/[0.07] py-8 text-left md:mt-11 md:max-w-2xl md:py-10 lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:mt-0 lg:max-w-none lg:border-y-0 lg:py-6 lg:pb-1 lg:pl-10 lg:pr-0 xl:pb-1.5 xl:pl-12 -translate-y-6 md:-translate-y-7 lg:-translate-y-10 xl:-translate-y-12"
          >
            <p className="hero-editorial-luxury-prose max-w-[35ch] text-pretty text-[1.18rem] font-light leading-[1.38] tracking-[-0.017em] text-cream/52 antialiased md:text-[1.34rem] md:leading-[1.42] md:text-cream/56">
              <span className="float-left mr-3 mt-1 text-[3.45rem] font-semibold leading-[0.78] tracking-[-0.05em] text-gold/66 md:text-[4.125rem]">
                C
              </span>
              ulture, music, and film no longer sit adjacent to capital — they are priced by it. HBM &amp; Company
              publishes the stories behind the markets: who owns the masters, who funds the slate, and who reads the
              ledger when the room goes quiet.
            </p>
            <p className="hero-editorial-luxury-prose mt-6 max-w-[42ch] text-pretty border-t border-white/[0.07] pt-5 text-[1.02rem] font-light leading-[1.58] tracking-[-0.01em] text-cream/62 antialiased md:mt-7 md:max-w-[48ch] md:pt-6 md:text-[1.1rem] md:leading-[1.62] md:text-cream/66">
              From breakout artists to on-chain film finance, our desk tracks the flows that move taste, rights, and
              yield — with the discretion of a private bank and the pace of a newsroom.
            </p>
            <div className="mt-6 inline-block rounded-md bg-white/[0.06] px-2 pb-px pt-0 md:mt-7">
              <span className="font-mono-hbm text-[8px] uppercase leading-none tracking-[0.34em] text-gold/58 md:text-[9px]">
                Editor&apos;s Note
              </span>
            </div>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="hero-editorial-pillars mt-6 w-full text-right md:mt-7 lg:col-span-5 lg:row-start-4 lg:mt-0 lg:self-end lg:text-left -translate-y-3 md:-translate-y-4 lg:-translate-y-8 xl:-translate-y-9"
          >
            <p className="font-mono-hbm text-[9px] uppercase tracking-[0.38em] text-silver-dim/55 md:text-[10px]">
              Culture · Markets · Capital
            </p>
          </motion.div>

        </motion.div>`;

const heroNew = `        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto w-full max-w-[1440px] px-[max(1.25rem,env(safe-area-inset-left,0px))] md:px-12"
        >
          <motion.div variants={heroItem}>
            <HeroMagazineMasthead />
          </motion.div>
          <motion.div variants={heroItem} className="md:px-2">
            <HeroMagazineRow />
          </motion.div>
        </motion.div>`;

if (!s.includes(heroOld)) {
  console.error("hero block not found");
  process.exit(1);
}
s = s.replace(heroOld, heroNew);

s = s.replace(
  `      {/* ═══════════════ Request access — below hero ═══════════════ */}
      <section className="relative overflow-x-hidden bg-void" aria-label="Request access to the voting protocol">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 py-12 md:px-12 md:py-14">
          <FooterBrandVotingGrid
            typography="robinhood"
            instanceId="home-below-hero"
            brandSide="left"
            band="default"
            defaultEditorialAlignEnd={false}
            showLogo={false}
          />
        </div>
      </section>`,
  `      {/* ═══════════════ Markets desk wire ═══════════════ */}
      <section className="relative overflow-x-hidden bg-void py-10 md:py-12" aria-label="Markets desk and treasury wire">
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <DeskWireNewsGrid />
          </SectionReveal>
        </div>
      </section>`,
);

const recordStart = "      {/* ═══════════════ ON THE RECORD — secondary articles ═══════════════ */}";
const radioStart = "      {/* ═══════════════ CONSEQUENCE RADIO";
const i = s.indexOf(recordStart);
const j = s.indexOf("      {/* ═══════════════ thesis ═══════════════ */}");
if (i < 0 || j < 0) {
  console.error("section markers", i, j);
  process.exit(1);
}

const recordRadio = `      {/* ═══════════════ ON THE RECORD — dense magazine grid ═══════════════ */}
      <section className="relative overflow-hidden py-12 md:py-16 section-raised">
        <div className="pointer-events-none absolute inset-0 amber-bloom opacity-35" aria-hidden />
        <div className="pointer-events-none absolute inset-0 garnet-bloom-top" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <MagazineSectionMasthead
              eyebrow="— On The Record"
              title="Stories Worth the read"
              titleAccent="the read"
              aside="Long reads · Dispatches · Analysis"
              compact
            />
          </SectionReveal>
          <SectionReveal>
            <MagazineRecordGrid
              features={suiteSections}
              briefs={recordBriefs}
              headlines={recordHeadlines}
            />
          </SectionReveal>
        </div>
      </section>

      {/* ═══════════════ CONSEQUENCE RADIO — Pandora-style desk ═══════════════ */}
      <section className="relative overflow-hidden py-12 md:py-16 section-mid" aria-label="Consequence Radio">
        <div className="pointer-events-none absolute inset-0 purple-bloom" aria-hidden />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-12">
          <SectionReveal>
            <ConsequenceRadioDeck />
          </SectionReveal>
        </div>
      </section>

`;

s = s.slice(0, i) + recordRadio + s.slice(j);

s = s.replace("py-14 md:py-18 lg:py-20", "py-12 md:py-16");

fs.writeFileSync(p, s);
console.log("ok");

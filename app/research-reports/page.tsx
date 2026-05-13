import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import {
  VANITY_ARCHIVE_ITEMS,
  VANITY_EDITOR_NOTE,
  VANITY_FEED_UPDATED_AT,
  VANITY_GOVERNANCE_ITEMS,
  VANITY_LIBRARY_ENTRIES,
} from "@/lib/vanityResearchFeed";

export const metadata: Metadata = {
  title: "Research Reports",
  description:
    "HBM Research Reports — an immersive review surface styled like a scholarly journal, populated from Vanity.company library and governance materials.",
  alternates: {
    canonical: "https://hbmandcompany.com/research-reports",
  },
  openGraph: {
    title: "Research Reports — HBM & Company",
    description: "A scholarly review surface populated from Vanity.company library and governance materials.",
    url: "https://hbmandcompany.com/research-reports",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM Research Reports" }],
  },
  twitter: {
    title: "Research Reports — HBM & Company",
    description: "A scholarly review surface populated from Vanity.company library and governance materials.",
    images: ["/og-image.png"],
  },
};

export default function ResearchReportsPage() {
  const lead = VANITY_LIBRARY_ENTRIES[0];
  const papers = VANITY_LIBRARY_ENTRIES.slice(1);

  return (
    <div className="min-h-screen bg-[#1a1312] text-[#2c1c16]">
      <NavBar />

      <main className="px-4 pb-24 pt-[max(6.25rem,env(safe-area-inset-top,0px)+4rem)] md:px-8 md:pb-32 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-[#dcc9be]/15 bg-[#f7efe8] shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
          <div className="border-b border-[#d4beb1]/45 px-6 py-8 md:px-10 md:py-10">
            <p className="font-mono-hbm text-[10px] uppercase tracking-[0.34em] text-[#8b4b45]">Research Reports</p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="font-cormorant text-[2.4rem] font-semibold leading-none tracking-[-0.04em] text-[#281611] md:text-[3.6rem] lg:text-[4.2rem]">
                  The HBM Review
                </h1>
                <p className="mt-3 max-w-3xl text-pretty font-luxury-sans text-[1rem] leading-[1.8] text-[#5d433a] md:text-[1.1rem]">
                  A Harvard Review-style editorial surface for research, governance, and archival material currently
                  sourced from the Vanity.company library and governance register.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-[#77574f] md:grid-cols-3">
                <div>
                  <p className="text-[#9d6b64]">Source</p>
                  <p className="mt-1">Vanity.company</p>
                </div>
                <div>
                  <p className="text-[#9d6b64]">Updated</p>
                  <p className="mt-1">{VANITY_FEED_UPDATED_AT}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-[#9d6b64]">Issue</p>
                  <p className="mt-1">Volume I · Spring 2026</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
            <section className="border-b border-[#d4beb1]/45 px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-[#8b4b45]">{lead.section}</p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-semibold leading-[1.02] tracking-[-0.03em] text-[#281611] md:text-[3rem]">
                {lead.title}
              </h2>
              <p className="mt-4 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-[#7c5f57]">
                {lead.author} · {lead.publishedAt}
              </p>
              <p className="mt-6 max-w-3xl font-luxury-sans text-[1.05rem] leading-[1.9] text-[#4d3b35] md:text-[1.12rem]">
                {lead.excerpt}
              </p>
              <a
                href={lead.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#a86b62]/40 px-4 py-2 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-[#7a4139] transition-colors hover:bg-[#ebddd4]"
              >
                Read on Vanity
                <span aria-hidden>↗</span>
              </a>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {papers.map((paper) => (
                  <article
                    key={paper.id}
                    className="rounded-[1.5rem] border border-[#d6c1b4]/55 bg-[#fbf4ee] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]"
                  >
                    <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-[#8c5c54]">{paper.section}</p>
                    <h3 className="mt-3 font-cormorant text-[1.45rem] font-semibold leading-snug text-[#281611]">
                      {paper.title}
                    </h3>
                    <p className="mt-2 font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-[#7d665f]">
                      {paper.author} · {paper.publishedAt}
                    </p>
                    <p className="mt-4 text-sm leading-[1.85] text-[#57443d]">{paper.excerpt}</p>
                    <a
                      href={paper.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-[#8a4e46] transition-colors hover:text-[#6d2f28]"
                    >
                      Open source document
                      <span aria-hidden>↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <aside className="px-6 py-8 lg:px-8 lg:py-10">
              <div className="rounded-[1.5rem] border border-[#d6c1b4]/55 bg-[#fbf4ee] p-5">
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-[#8b4b45]">Editor&apos;s note</p>
                <p className="mt-4 text-sm leading-[1.85] text-[#57443d]">{VANITY_EDITOR_NOTE}</p>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#d6c1b4]/55 bg-[#efe1d6] p-5">
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-[#8b4b45]">Governance watch</p>
                <div className="mt-4 space-y-4">
                  {VANITY_GOVERNANCE_ITEMS.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border-b border-[#d6c1b4]/65 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-[#8c5c54]">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-cormorant text-[1.2rem] font-semibold leading-snug text-[#281611]">
                        {item.title}
                      </h3>
                      <p className="mt-2 font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-[#7d665f]">
                        {item.stage} · Closes {item.closes}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-[#d6c1b4]/55 bg-[#fbf4ee] p-5">
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.22em] text-[#8b4b45]">Archive ledger</p>
                <ul className="mt-4 space-y-3">
                  {VANITY_ARCHIVE_ITEMS.map((item) => (
                    <li key={item.index}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-[#d7c4b7]/55 px-4 py-3 transition-colors hover:bg-[#efe1d6]"
                      >
                        <p className="font-mono-hbm text-[8px] uppercase tracking-[0.16em] text-[#8c5c54]">
                          {item.index}
                        </p>
                        <p className="mt-1 font-cormorant text-[1.1rem] font-semibold text-[#281611]">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#6e5750]">{item.meta}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <FooterDark />
    </div>
  );
}

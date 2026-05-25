import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import { getBriefingByIdFromList } from "@/lib/desk/article-to-briefing";
import { getBriefingUpdatedLabel } from "@/lib/newsroomBriefings";
import { getPublicBriefings } from "@/lib/supabase/queries/briefings.server";

export const metadata: Metadata = {
  title: "Newspaper",
  description:
    "HBM Newspaper — a paper-of-record view into the desk briefings surfaced from the hero carousel: markets, governance, archival infrastructure, and adoption signals.",
  alternates: {
    canonical: "https://hbmandcompany.com/newspaper",
  },
  openGraph: {
    title: "Newspaper — HBM & Company",
    description: "A paper-of-record view into the house briefings and linked desk signals.",
    url: "https://hbmandcompany.com/newspaper",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "HBM Newspaper" }],
  },
  twitter: {
    title: "Newspaper — HBM & Company",
    description: "A paper-of-record view into the house briefings and linked desk signals.",
    images: ["/og-image.png"],
  },
};

export const dynamic = "force-dynamic";

type Search = { story?: string | string[] };

export default async function NewspaperPage({ searchParams }: { searchParams: Search }) {
  const { briefings, updatedAt, source } = await getPublicBriefings();

  const raw = searchParams.story;
  const queryId = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  const selected =
    (queryId && getBriefingByIdFromList(briefings, queryId)) || briefings[0];

  if (!selected) {
    return (
      <div className="min-h-screen bg-void text-[#18130b]">
        <NavBar />
        <main className="px-4 pb-20 pt-[max(6.25rem,env(safe-area-inset-top,0px)+4rem)] md:px-8">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#c8b698]/20 bg-[#f2e6d1] p-10 text-center">
            <h1 className="font-cormorant text-3xl font-semibold text-[#20160d]">The HBM Newspaper</h1>
            <p className="mt-4 font-luxury-sans text-[#4b3b29]">
              No published stories yet. Publish from the desk to populate this edition.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block font-mono-hbm text-[10px] uppercase tracking-[0.18em] text-[#6c4320]"
            >
              Return Home
            </Link>
          </div>
        </main>
        <FooterDark />
      </div>
    );
  }

  const frontPage = briefings.filter((story) => story.id !== selected.id);

  return (
    <div className="min-h-screen bg-void text-[#18130b]">
      <NavBar />

      <main className="px-4 pb-20 pt-[max(6.25rem,env(safe-area-inset-top,0px)+4rem)] md:px-8 md:pb-28 md:pt-[max(7rem,env(safe-area-inset-top,0px)+4.5rem)]">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[2rem] border border-[#c8b698]/20 bg-[#f2e6d1] shadow-[0_40px_120px_rgba(0,0,0,0.42)]">
          <div className="border-b border-[#bca882]/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0))] px-6 py-6 md:px-10 md:py-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono-hbm text-[10px] uppercase tracking-[0.35em] text-[#786347]">
                  {source === "supabase" ? "Live Edition" : "Wednesday Edition"}
                </p>
                <h1 className="mt-3 font-cormorant text-[2.35rem] font-semibold leading-none tracking-[-0.04em] text-[#20160d] md:text-[3.5rem] lg:text-[4.25rem]">
                  The HBM Newspaper
                </h1>
                <p className="mt-3 max-w-2xl text-pretty font-luxury-sans text-[0.98rem] leading-relaxed text-[#4b3b29] md:text-[1.05rem]">
                  {source === "supabase"
                    ? "Published directly from the editorial desk. The lead brief runs here; the rest of the feed stays on the front page."
                    : "A paper-of-record treatment for the same desk signals surfaced inside the home hero carousel. The selected brief runs lead; the rest of the feed remains on the front page."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-right font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-[#6a5843] md:grid-cols-3">
                <div>
                  <p className="text-[#9a8262]">Updated</p>
                  <p className="mt-1">{getBriefingUpdatedLabel(updatedAt)}</p>
                </div>
                <div>
                  <p className="text-[#9a8262]">Lead Story</p>
                  <p className="mt-1">{selected.headline.slice(0, 32)}{selected.headline.length > 32 ? "…" : ""}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <p className="text-[#9a8262]">Stories</p>
                  <p className="mt-1">{briefings.length} on the front page</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)]">
            <article className="border-b border-[#bca882]/35 px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
              <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">
                {selected.section} · {selected.desk}
              </p>
              <h2 className="mt-3 font-cormorant text-[2rem] font-semibold leading-[0.98] tracking-[-0.03em] text-[#1f140c] md:text-[2.85rem]">
                {selected.headline}
              </h2>
              <p className="mt-4 max-w-3xl border-b border-[#ccb896]/35 pb-5 font-luxury-sans text-[1.05rem] leading-relaxed text-[#4c3b28] md:text-[1.15rem]">
                {selected.dek}
              </p>

              <div className="mt-5 flex flex-wrap gap-5 font-mono-hbm text-[9px] uppercase tracking-[0.18em] text-[#6f5b45]">
                <span>{selected.byline}</span>
                <span>{selected.publishedAt}</span>
                <span>Dallas desk treatment</span>
              </div>

              <p className="mt-8 max-w-3xl font-cormorant text-[1.25rem] font-medium italic leading-[1.45] text-[#2b1d11] md:text-[1.45rem]">
                {selected.lede}
              </p>

              <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem]">
                <div className="space-y-5">
                  {selected.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-luxury-sans text-[1rem] leading-[1.9] text-[#2f2419] md:text-[1.05rem]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {selected.metrics.length > 0 ? (
                  <aside className="rounded-2xl border border-[#bea884]/40 bg-[#eadbc1]/55 p-5">
                    <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">Signal box</p>
                    <div className="mt-4 space-y-4">
                      {selected.metrics.map((metric) => (
                        <div key={metric.label} className="border-b border-[#ccb896]/35 pb-3 last:border-b-0 last:pb-0">
                          <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-[#8e7760]">
                            {metric.label}
                          </p>
                          <p className="mt-1 font-cormorant text-xl font-semibold text-[#20160d]">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </aside>
                ) : null}
              </div>
            </article>

            <aside className="px-6 py-8 lg:px-8 lg:py-10">
              <div className="rounded-2xl border border-[#c4ae89]/40 bg-[#eadbc1]/45 p-5">
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">From the front page</p>
                <div className="mt-5 space-y-5">
                  {frontPage.map((story) => (
                    <Link
                      key={story.id}
                      href={`/newspaper?story=${story.id}`}
                      className="block border-b border-[#ccb896]/35 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-[#8f7860]">
                        {story.section} · {story.desk}
                      </p>
                      <h3 className="mt-2 font-cormorant text-[1.25rem] font-semibold leading-snug text-[#1f140c] transition-colors hover:text-[#6c4320]">
                        {story.headline}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#574633]">{story.dek}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {selected.related.length > 0 ? (
                <div className="mt-6 rounded-2xl border border-[#c4ae89]/40 bg-[#f5ebd9] p-5">
                  <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">Reading list</p>
                  <ul className="mt-4 space-y-3">
                    {selected.related.map((line) => (
                      <li key={line} className="border-l border-[#c7ad84]/50 pl-3 text-sm leading-relaxed text-[#4a3a28]">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-6 rounded-2xl border border-[#c4ae89]/40 bg-[#eadbc1]/45 p-5">
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">Elsewhere in the house</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    href="/investor-relations"
                    className="rounded-full border border-[#b38d61]/45 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-[#4f3a25] transition-colors hover:bg-[#dfcfb1]"
                  >
                    Investor Relations
                  </Link>
                  <Link
                    href="/research-reports"
                    className="rounded-full border border-[#b38d61]/45 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-[#4f3a25] transition-colors hover:bg-[#dfcfb1]"
                  >
                    Research Reports
                  </Link>
                  <Link
                    href="/"
                    className="rounded-full border border-[#b38d61]/45 px-3 py-1.5 font-mono-hbm text-[9px] uppercase tracking-[0.16em] text-[#4f3a25] transition-colors hover:bg-[#dfcfb1]"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          <section className="border-t border-[#bca882]/35 px-6 py-8 lg:px-10">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono-hbm text-[9px] uppercase tracking-[0.24em] text-[#8d6f4d]">More news</p>
                <h2 className="mt-2 font-cormorant text-[1.8rem] font-semibold tracking-[-0.02em] text-[#20160d]">
                  Late edition
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-[#5b4935]">
                {source === "supabase"
                  ? "Every story here is published from the editorial desk and synced live from Supabase."
                  : "The same four stories that drive the hero carousel also populate the lead package here. Select a story above to make it the front-page brief."}
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {briefings.map((story) => (
                <Link
                  key={story.id}
                  href={`/newspaper?story=${story.id}`}
                  className="rounded-2xl border border-[#c4ae89]/40 bg-[#f7eedf] p-5 transition-colors hover:bg-[#efe1ca]"
                >
                  <p className="font-mono-hbm text-[8px] uppercase tracking-[0.18em] text-[#8f7860]">
                    {story.section} · {story.desk}
                  </p>
                  <h3 className="mt-3 font-cormorant text-[1.3rem] font-semibold leading-snug text-[#24180f]">
                    {story.headline}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#574633]">{story.dek}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <FooterDark />
    </div>
  );
}

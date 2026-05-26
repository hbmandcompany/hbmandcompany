import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import FooterDark from "@/components/FooterDark";
import { SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search HBM & Company for finance, crypto, and infrastructure news, investigations, and desk briefings.",
  alternates: { canonical: `${SITE_URL}/search` },
  robots: { index: true, follow: true },
};

type SearchParams = { q?: string | string[] };

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const raw = searchParams.q;
  const query = typeof raw === "string" ? raw.trim() : Array.isArray(raw) ? raw[0]?.trim() ?? "" : "";

  return (
    <>
      <NavBar />
      <main className="relative min-h-screen bg-void pb-20 pt-32">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          <h1 className="font-cormorant text-display-md font-light text-cream">Search</h1>
          <form action="/search" method="get" className="mt-8">
            <label htmlFor="q" className="sr-only">
              Search term
            </label>
            <input
              id="q"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Finance, crypto, markets, investigations…"
              className="w-full rounded-lg border border-white/[0.1] bg-obsidian px-4 py-3 font-mono-hbm text-sm text-cream outline-none focus:border-gold/40"
            />
          </form>
          {query ? (
            <div className="mt-8 space-y-4 font-mono-hbm text-sm text-silver-dim">
              <p>
                Results for <span className="text-cream/80">&ldquo;{query}&rdquo;</span> — browse published briefings on
                the newspaper.
              </p>
              <Link href={`/newspaper?story=${encodeURIComponent(query)}`} className="text-gold/75 hover:text-gold">
                Open newspaper →
              </Link>
            </div>
          ) : (
            <p className="mt-8 font-mono-hbm text-sm text-silver-dim/70">
              Enter a topic to find finance, crypto, and infrastructure coverage from the HBM desk.
            </p>
          )}
        </div>
      </main>
      <FooterDark />
    </>
  );
}

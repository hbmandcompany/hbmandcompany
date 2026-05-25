import { getPublishedArticles } from "@/lib/supabase/queries/articles.server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import {
  ConfigMissingPanel,
  ConnectionBadge,
  ErrorPanel,
  JsonPanel,
} from "./SupabaseTestPanels";

export async function SupabaseServerTest() {
  if (!hasSupabaseEnv()) {
    return (
      <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-charcoal/40 p-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-cormorant text-2xl text-cream">Server Component</h2>
          <ConnectionBadge connected={false} />
        </header>
        <ConfigMissingPanel context="Server Component" />
      </section>
    );
  }

  const result = await getPublishedArticles();

  return (
    <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-charcoal/40 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-cormorant text-2xl text-cream">Server Component</h2>
        <ConnectionBadge connected={!result.error} />
      </header>

      <p className="text-body-md text-cream-dim">
        Fetched on the server via{" "}
        <code className="text-cream">lib/supabase/server.ts</code> — published
        articles ordered by <code className="text-cream">published_at</code>{" "}
        descending.
      </p>

      {result.error ? (
        <ErrorPanel
          title="Server query failed"
          message={result.error.message}
          hint={result.error.hint ?? result.error.details}
        />
      ) : (
        <JsonPanel
          label="articles (status = published)"
          data={result.data}
          count={result.count}
        />
      )}
    </section>
  );
}

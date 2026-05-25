import type { Metadata } from "next";
import { Suspense } from "react";
import { SupabaseConnectionTest } from "@/components/supabase/SupabaseConnectionTest";
import { SupabaseServerTest } from "@/components/supabase/SupabaseServerTest";
import { LoadingPanel } from "@/components/supabase/SupabaseTestPanels";

export const metadata: Metadata = {
  title: "Supabase Connection Test",
  description: "Temporary diagnostics page for HBM & Company Supabase integration.",
  robots: { index: false, follow: false },
};

export default function SupabaseTestPage() {
  return (
    <main className="min-h-screen bg-void px-6 py-16 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="space-y-3 border-b border-white/[0.08] pb-8">
          <p className="font-mono-hbm text-label-xs uppercase tracking-[0.26em] text-gold-dim">
            HBM & Company — Infrastructure
          </p>
          <h1 className="font-cormorant text-4xl text-cream md:text-5xl">
            Supabase Connection Test
          </h1>
          <p className="max-w-2xl text-body-md text-cream-dim">
            Temporary page to verify live database connectivity from both Server
            and Client Components. Remove or protect this route before public
            launch.
          </p>
        </header>

        <Suspense
          fallback={
            <LoadingPanel label="Server Component — awaiting Supabase response" />
          }
        >
          <SupabaseServerTest />
        </Suspense>

        <SupabaseConnectionTest />
      </div>
    </main>
  );
}

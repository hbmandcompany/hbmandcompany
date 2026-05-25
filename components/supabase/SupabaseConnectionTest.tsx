"use client";

import { useCallback, useState } from "react";
import { fetchPublishedArticlesClient } from "@/lib/supabase/queries/articles.client";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import type { Article } from "@/lib/supabase/types";
import {
  ConfigMissingPanel,
  ConnectionBadge,
  ErrorPanel,
  JsonPanel,
  LoadingPanel,
} from "./SupabaseTestPanels";

type ClientTestState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: Article[]; count: number }
  | { status: "error"; message: string; hint?: string };

export function SupabaseConnectionTest() {
  const [state, setState] = useState<ClientTestState>({ status: "idle" });
  const envReady = hasSupabaseEnv();

  const runTest = useCallback(async () => {
    if (!envReady) {
      setState({
        status: "error",
        message: "Supabase environment variables are not configured.",
        hint: "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
      });
      return;
    }

    setState({ status: "loading" });

    const result = await fetchPublishedArticlesClient();

    if (result.error) {
      setState({
        status: "error",
        message: result.error.message,
        hint: result.error.hint ?? result.error.details,
      });
      return;
    }

    setState({
      status: "success",
      data: result.data ?? [],
      count: result.count,
    });
  }, [envReady]);

  const connected = state.status === "success";

  return (
    <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-charcoal/40 p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-cormorant text-2xl text-cream">Client Component</h2>
        <ConnectionBadge connected={connected} />
      </header>

      <p className="text-body-md text-cream-dim">
        Fetched in the browser via{" "}
        <code className="text-cream">lib/supabase/client.ts</code>. Use this
        path for interactive editorial tools, subscriptions, and paywall checks.
      </p>

      {!envReady ? <ConfigMissingPanel context="Client Component" /> : null}

      <button
        type="button"
        onClick={runTest}
        disabled={state.status === "loading" || !envReady}
        className="rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 font-mono-hbm text-label-xs uppercase tracking-[0.2em] text-gold transition hover:border-gold/50 hover:bg-gold/15 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {state.status === "loading" ? "Testing…" : "Run client connection test"}
      </button>

      {state.status === "loading" ? (
        <LoadingPanel label="Client query in progress" />
      ) : null}

      {state.status === "error" ? (
        <ErrorPanel
          title="Client query failed"
          message={state.message}
          hint={state.hint}
        />
      ) : null}

      {state.status === "success" ? (
        <JsonPanel
          label="articles (status = published)"
          data={state.data}
          count={state.count}
        />
      ) : null}
    </section>
  );
}

"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { createBrowserClient } from "@supabase/auth-helpers-react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

const SupabaseContext = createContext<SupabaseClient<Database> | null>(null);

type SupabaseProviderProps = {
  children: ReactNode;
};

/**
 * Provides a shared browser Supabase client for Client Components.
 * Wrap editorial dashboards, paywalls, and subscription flows as they are added.
 */
export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const client = useMemo(() => {
    const { url, anonKey } = getPublicSupabaseEnv();
    return createBrowserClient<Database>(url, anonKey);
  }, []);

  return (
    <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>
  );
}

export function useSupabase(): SupabaseClient<Database> {
  const client = useContext(SupabaseContext);

  if (!client) {
    throw new Error("useSupabase must be used within a SupabaseProvider.");
  }

  return client;
}

import { createBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseEnv } from "./env";
import type { Database } from "./types";

let browserClient: SupabaseClient<Database> | undefined;

/**
 * Browser Supabase client for Client Components, hooks, and client-side queries.
 * Uses a singleton so auth session state stays consistent across the tree.
 */
export function createClient(): SupabaseClient<Database> {
  const { url, anonKey } = getPublicSupabaseEnv();

  if (!browserClient) {
    browserClient = createBrowserClient<Database>(url, anonKey);
  }

  return browserClient;
}

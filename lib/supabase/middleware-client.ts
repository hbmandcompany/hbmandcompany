import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getPublicSupabaseEnvOrNull } from "./env";
import type { Database } from "./types";

export function createMiddlewareSupabaseClient(request: NextRequest) {
  const env = getPublicSupabaseEnvOrNull();
  if (!env) {
    return null;
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient<Database>(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  return { supabase, getResponse: () => response, setResponse: (next: NextResponse) => { response = next; } };
}

export type MiddlewareSupabase = NonNullable<ReturnType<typeof createMiddlewareSupabaseClient>>;

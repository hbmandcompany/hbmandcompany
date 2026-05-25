/**
 * Public Supabase environment variables.
 * Safe for browser and server — never put service-role keys here.
 */

export class SupabaseConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseConfigError";
  }
}

export type SupabasePublicEnv = {
  url: string;
  anonKey: string;
};

export function hasSupabaseEnv(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

export function getPublicSupabaseEnv(): SupabasePublicEnv {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url) {
    throw new SupabaseConfigError(
      "Missing NEXT_PUBLIC_SUPABASE_URL. Copy .env.local.example to .env.local and add your Supabase project URL.",
    );
  }

  if (!anonKey) {
    throw new SupabaseConfigError(
      "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Copy .env.local.example to .env.local and add your anon key.",
    );
  }

  return { url, anonKey };
}

export function getPublicSupabaseEnvOrNull(): SupabasePublicEnv | null {
  if (!hasSupabaseEnv()) return null;
  return getPublicSupabaseEnv();
}

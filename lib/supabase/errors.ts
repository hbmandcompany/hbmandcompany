import type { PostgrestError } from "@supabase/supabase-js";
import { SupabaseConfigError } from "./env";

export class SupabaseQueryError extends Error {
  readonly code?: string;
  readonly hint?: string;
  readonly details?: string;

  constructor(message: string, pgError?: PostgrestError | null) {
    super(message);
    this.name = "SupabaseQueryError";
    this.code = pgError?.code;
    this.hint = pgError?.hint;
    this.details = pgError?.details;
  }
}

export function logSupabaseDiagnostic(scope: string, error: unknown): void {
  const prefix = `[Supabase:${scope}]`;

  if (error instanceof SupabaseQueryError) {
    console.error(prefix, {
      message: error.message,
      code: error.code,
      hint: error.hint,
      details: error.details,
    });
    return;
  }

  if (error instanceof SupabaseConfigError) {
    console.error(prefix, error.message);
    return;
  }

  if (error && typeof error === "object" && "message" in error) {
    console.error(prefix, (error as PostgrestError).message, error);
    return;
  }

  console.error(prefix, error);
}

export function formatSupabaseError(error: unknown): string {
  if (error instanceof SupabaseConfigError) return error.message;

  if (error instanceof SupabaseQueryError) {
    return [error.message, error.hint, error.details].filter(Boolean).join(" — ");
  }

  if (error instanceof Error) return error.message;

  return "An unexpected Supabase error occurred.";
}

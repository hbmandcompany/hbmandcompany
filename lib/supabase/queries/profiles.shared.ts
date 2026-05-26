import type { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseQueryError, logSupabaseDiagnostic } from "../errors";
import type { Database, DeskProfile } from "../types";

export type DeskProfileResult = {
  data: DeskProfile | null;
  error: SupabaseQueryError | null;
};

export async function getDeskProfileByUserId(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<DeskProfileResult> {
  const { data, error } = await supabase
    .from("desk_profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    logSupabaseDiagnostic("desk_profiles", error);
    return {
      data: null,
      error: new SupabaseQueryError("Failed to load desk profile.", error),
    };
  }

  return {
    data: (data as DeskProfile | null) ?? null,
    error: null,
  };
}

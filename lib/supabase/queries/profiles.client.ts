import { createClient } from "../client";
import { SupabaseQueryError } from "../errors";
import type { DeskProfileResult } from "./profiles.shared";
import { getDeskProfileByUserId } from "./profiles.shared";

export async function fetchDeskProfileClient(): Promise<DeskProfileResult> {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      return { data: null, error: new SupabaseQueryError(authError.message) };
    }

    if (!user) {
      return { data: null, error: null };
    }

    return getDeskProfileByUserId(supabase, user.id);
  } catch (error) {
    return {
      data: null,
      error: new SupabaseQueryError(error instanceof Error ? error.message : "Failed to load profile."),
    };
  }
}

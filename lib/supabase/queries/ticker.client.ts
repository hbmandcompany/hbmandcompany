import { createClient } from "../client";
import { SupabaseQueryError } from "../errors";
import type { TickerItemsResult, TickerSaveResult } from "./ticker.shared";
import { queryTickerItems, replaceTickerItems } from "./ticker.shared";

export async function fetchTickerItemsClient(): Promise<TickerItemsResult> {
  try {
    const supabase = createClient();
    return queryTickerItems(supabase);
  } catch (error) {
    return {
      data: null,
      error: new SupabaseQueryError(error instanceof Error ? error.message : "Failed to load ticker."),
    };
  }
}

export async function saveTickerItemsClient(headlines: string[]): Promise<TickerSaveResult> {
  try {
    const supabase = createClient();
    return replaceTickerItems(supabase, headlines);
  } catch (error) {
    return {
      data: null,
      error: new SupabaseQueryError(error instanceof Error ? error.message : "Failed to save ticker."),
    };
  }
}

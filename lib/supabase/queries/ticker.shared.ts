import type { PostgrestError } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseQueryError, logSupabaseDiagnostic } from "../errors";
import type { Database, TickerItem } from "../types";

export type TickerItemsResult = {
  data: TickerItem[] | null;
  error: SupabaseQueryError | null;
};

export type TickerSaveResult = {
  data: TickerItem[] | null;
  error: SupabaseQueryError | null;
};

function tickerError(message: string, pgError?: PostgrestError | null): TickerItemsResult {
  if (pgError) logSupabaseDiagnostic("ticker_items", pgError);
  return {
    data: null,
    error: new SupabaseQueryError(message, pgError),
  };
}

export async function queryTickerItems(
  supabase: SupabaseClient<Database>,
): Promise<TickerItemsResult> {
  const { data, error } = await supabase
    .from("ticker_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return tickerError("Failed to load ticker headlines.", error);
  }

  return {
    data: (data ?? []) as TickerItem[],
    error: null,
  };
}

export function tickerHeadlinesFromItems(items: TickerItem[]): string[] {
  return items.map((item) => item.headline.trim()).filter(Boolean);
}

/** Replace all ticker rows with an ordered headline list. */
export async function replaceTickerItems(
  supabase: SupabaseClient<Database>,
  headlines: string[],
): Promise<TickerSaveResult> {
  const cleaned = headlines.map((h) => h.trim()).filter(Boolean);

  const { error: deleteError } = await supabase
    .from("ticker_items")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    if (pgErrorIsMissingTable(deleteError)) {
      return {
        data: [],
        error: new SupabaseQueryError(
          "Ticker table not found. Run the ticker_items migration in Supabase.",
          deleteError,
        ),
      };
    }
    return { data: null, error: new SupabaseQueryError("Failed to clear ticker.", deleteError) };
  }

  if (cleaned.length === 0) {
    return { data: [], error: null };
  }

  const now = new Date().toISOString();
  const rows = cleaned.map((headline, index) => ({
    headline,
    sort_order: index,
    updated_at: now,
  }));

  const { data, error } = await supabase.from("ticker_items").insert(rows).select("*");

  if (error) {
    return { data: null, error: new SupabaseQueryError("Failed to save ticker headlines.", error) };
  }

  return {
    data: (data ?? []) as TickerItem[],
    error: null,
  };
}

function pgErrorIsMissingTable(error: PostgrestError): boolean {
  return error.code === "42P01" || error.message.toLowerCase().includes("ticker_items");
}

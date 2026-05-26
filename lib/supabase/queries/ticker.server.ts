import { createClient } from "../server";
import { queryTickerItems, tickerHeadlinesFromItems } from "./ticker.shared";

/** Ordered homepage hero ticker headlines from Supabase, or null when empty/unavailable. */
export async function getPublicTickerHeadlines(): Promise<string[] | null> {
  try {
    const supabase = createClient();
    const result = await queryTickerItems(supabase);

    if (result.error || !result.data?.length) {
      return null;
    }

    const headlines = tickerHeadlinesFromItems(result.data);
    return headlines.length > 0 ? headlines : null;
  } catch {
    return null;
  }
}

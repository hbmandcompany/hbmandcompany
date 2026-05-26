import { createClient } from "@/lib/supabase/server";
import { queryPublishedArticles } from "@/lib/supabase/queries/articles.shared";
import AnalyticsClient from "./AnalyticsClient";

export default async function NewsroomAnalyticsPage() {
  const supabase = createClient();
  const result = await queryPublishedArticles(supabase);
  const articles = result.data ?? [];

  return <AnalyticsClient articles={articles} />;
}

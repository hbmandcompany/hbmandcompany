import HomePageClient from "@/components/HomePageClient";
import { getPublicBriefings } from "@/lib/supabase/queries/briefings.server";

export default async function Page() {
  const { briefings, source } = await getPublicBriefings();

  return (
    <HomePageClient heroBriefings={source === "supabase" ? briefings : null} />
  );
}

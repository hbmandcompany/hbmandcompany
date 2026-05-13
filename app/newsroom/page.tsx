import { redirect } from "next/navigation";
import { getBriefingById } from "@/lib/newsroomBriefings";

type Search = { story?: string | string[] };

export default function NewsroomPage({ searchParams }: { searchParams: Search }) {
  const raw = searchParams.story;
  const id = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] : undefined;
  const story = id && getBriefingById(id) ? `?story=${id}` : "";

  redirect(`/newspaper${story}`);
}

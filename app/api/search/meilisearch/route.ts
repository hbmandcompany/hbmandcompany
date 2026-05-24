import { NextResponse } from "next/server";
import { queryMeilisearch } from "@/lib/search/meilisearch";

export async function POST(req: Request) {
  let body: { query?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const query = typeof body.query === "string" ? body.query.trim() : "";
  if (!query) {
    return NextResponse.json({ articles: [], documents: [], users: [], jobs: [] });
  }

  const results = await queryMeilisearch(query);
  return NextResponse.json(results);
}

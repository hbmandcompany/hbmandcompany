import { NextResponse } from "next/server";
import { queryLlm } from "@/lib/search/llm";

export async function POST(req: Request) {
  let body: { query?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const query = typeof body.query === "string" ? body.query.trim() : "";
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }

  try {
    const response = await queryLlm(query);
    return NextResponse.json(response);
  } catch (error) {
    console.error("LLM route error", error);
    return NextResponse.json({ error: "Unable to generate response" }, { status: 502 });
  }
}

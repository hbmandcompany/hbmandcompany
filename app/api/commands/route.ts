import { NextResponse } from "next/server";
import { executeCommand } from "@/lib/search/commands";

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

  const response = executeCommand(query);
  return NextResponse.json(response);
}

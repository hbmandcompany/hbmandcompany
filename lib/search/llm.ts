import type { AiResponse } from "@/components/desk/global-search/types";
import { getMockRecordsForAi } from "./mock-index";
import { queryMeilisearch } from "./meilisearch";

export async function queryLlm(query: string): Promise<AiResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  const searchResults = await queryMeilisearch(query);
  if (!apiKey) {
    const mock = getMockRecordsForAi(query);
    return {
      answer: mock.length
        ? `Based on desk records, the most relevant material for “${query}” is “${mock[0].title}”. ${mock.length > 1 ? `Also see “${mock[1].title}”.` : ""} Connect OPENAI_API_KEY and Supabase for live synthesis.`
        : `I couldn't find indexed material for “${query}”. Try a narrower keyword search or connect Meilisearch and Supabase for richer context.`,
      sources: mock.map((item) => ({
        id: item.id,
        title: item.title,
        type: item.type,
        href: item.href,
      })),
      suggested_actions: [
        { label: "Open newsroom", action: "open_newsroom", href: "/desk/newsroom" },
        { label: "Create article", action: "create_article", href: "/desk/newsroom/editor" },
      ],
    };
  }

  const context = JSON.stringify({ query, searchResults });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'You are the HBM desk assistant. Answer using provided search context. Return JSON: {"answer": string, "sources": [{"id": string, "title": string, "type": "article"|"document"|"case", "href"?: string}], "suggested_actions": [{"label": string, "action": string, "href"?: string}]}',
        },
        { role: "user", content: context },
      ],
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    console.error("LLM query failed", res.status);
    throw new Error("LLM request failed");
  }

  const payload = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = payload.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty LLM response");

  return JSON.parse(content) as AiResponse;
}

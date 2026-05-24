import type { SearchMode } from "./types";

const COMMAND_PATTERNS: { pattern: RegExp; mode: SearchMode }[] = [
  { pattern: /\b(create|new)\s+(article|story|draft)\b/i, mode: "command" },
  { pattern: /\bopen\s+(document|doc|file)\b/i, mode: "command" },
  { pattern: /\b(create|new)\s+case\b/i, mode: "command" },
  { pattern: /\bschedule\s+(a\s+)?meeting\b/i, mode: "command" },
  { pattern: /\bassign\b/i, mode: "command" },
];

const AI_PREFIXES = [
  "summarize",
  "explain",
  "analyze",
  "analyse",
  "what does",
  "what is",
  "what are",
  "how does",
  "why does",
  "tell me",
  "write",
];

export function detectSearchMode(query: string, override?: SearchMode | "auto"): SearchMode {
  if (override && override !== "auto") return override;

  const trimmed = query.trim();
  if (!trimmed) return "search";

  if (COMMAND_PATTERNS.some(({ pattern }) => pattern.test(trimmed))) {
    return "command";
  }

  const lower = trimmed.toLowerCase();
  if (AI_PREFIXES.some((prefix) => lower.startsWith(prefix))) {
    return "ai";
  }

  if (trimmed.endsWith("?")) return "ai";
  if (/^(who|what|when|where|why|how|can|could|should|is|are|do|does)\b/i.test(trimmed)) {
    return "ai";
  }

  return "search";
}

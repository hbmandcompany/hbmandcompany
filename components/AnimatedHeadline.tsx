"use client";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
  /** Kept for API compatibility; entrance animation removed to avoid load flash. */
  delay?: number;
  splitBy?: "word" | "letter";
  /** When splitting by word, keep all words on one line (no per-word wrap). */
  nowrap?: boolean;
}

/** Display headline — no Framer mount/SSR flash (no “prepage” blank beat). */
export default function AnimatedHeadline({
  text,
  className = "",
  splitBy = "word",
  nowrap = false,
}: AnimatedHeadlineProps) {
  const parts =
    splitBy === "word"
      ? text.split(/\s+/).filter(Boolean)
      : text.split("");

  if (splitBy === "letter") {
    return (
      <span className={`inline ${className}`.trim()}>
        {parts.map((ch, i) => (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex ${
        nowrap ? "flex-nowrap" : "flex-wrap"
      } items-baseline gap-x-[0.35em] ${className}`.trim()}
    >
      {parts.map((part, i) => (
        <span key={i} className="inline-block shrink-0">
          {part}
        </span>
      ))}
    </span>
  );
}

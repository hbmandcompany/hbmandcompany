import type { Article, ArticleStatus } from "@/lib/supabase/types";
import type { DeskStatusTone } from "@/components/desk/StatusPill";
import type { ArchiveHistoryItem, ArchiveSubmissionItem } from "@/components/desk/desk-archive-data";
import type { StoryRow } from "@/components/desk/desk-stories-data";

export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return base || `article-${Date.now()}`;
}

export function countWords(text: string | null | undefined): number {
  if (!text?.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

function formatRelativeTime(iso: string): string {
  const date = new Date(iso);
  const now = Date.now();
  const diffMs = now - date.getTime();
  const diffMins = Math.floor(diffMs / 60_000);
  const diffHours = Math.floor(diffMs / 3_600_000);
  const diffDays = Math.floor(diffMs / 86_400_000);

  if (diffMins < 1) return "Last edited just now";
  if (diffMins < 60) return `Last edited ${diffMins} min ago`;
  if (diffHours < 24) return `Last edited ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays === 1) return "Last edited yesterday";
  if (diffDays < 7) return `Last edited ${diffDays} days ago`;
  return `Updated ${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
}

function formatPublishedDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function deskStatusFromArticle(status: ArticleStatus): {
  label: string;
  tone: DeskStatusTone;
} {
  switch (status) {
    case "published":
      return { label: "PUBLISHED", tone: "green" };
    case "review":
      return { label: "IN REVIEW", tone: "amber" };
    case "archived":
      return { label: "ARCHIVED", tone: "neutral" };
    default:
      return { label: "DRAFT", tone: "neutral" };
  }
}

export function articleToStoryRow(article: Article): StoryRow {
  const { label, tone } = deskStatusFromArticle(article.status);
  const words = countWords(article.body) + countWords(article.title);

  return {
    id: article.id,
    status: label,
    tone,
    headline: article.title,
    section: "Desk",
    words: `${words.toLocaleString()} words`,
    meta:
      article.status === "review"
        ? `Submitted ${formatPublishedDate(article.updated_at)}`
        : formatRelativeTime(article.updated_at),
    dueWhen: article.status === "draft" ? "tomorrow" : article.status === "review" ? "today" : undefined,
  };
}

export function articleToArchiveHistory(article: Article): ArchiveHistoryItem {
  const { tone } = deskStatusFromArticle(article.status);
  const words = countWords(article.body) + countWords(article.title);

  return {
    id: article.id,
    headline: article.title,
    section: "Desk",
    words: `${words.toLocaleString()} words`,
    published: formatPublishedDate(article.published_at ?? article.updated_at),
    views: "—",
    status: article.status === "archived" ? "Retired" : "Published",
    tone: article.status === "archived" ? "neutral" : tone,
  };
}

export function articleToArchiveSubmission(article: Article): ArchiveSubmissionItem {
  const statusMap: Record<string, ArchiveSubmissionItem["status"]> = {
    draft: "Pending",
    review: "In review",
    published: "Approved",
    archived: "Returned",
  };

  const toneMap: Record<string, DeskStatusTone> = {
    draft: "amber",
    review: "blue",
    published: "green",
    archived: "red",
  };

  return {
    id: article.id,
    headline: article.title,
    section: "Desk",
    submitted: formatPublishedDate(article.updated_at),
    reviewer: "Editorial Desk",
    status: statusMap[article.status] ?? "Pending",
    tone: toneMap[article.status] ?? "amber",
  };
}

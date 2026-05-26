import { clsx } from "clsx";
import type { ArticleWeight } from "@/lib/supabase/types";

export const ARTICLE_WEIGHT_OPTIONS: ArticleWeight[] = [
  "Informative",
  "Opinion",
  "Analysis",
  "Breaking",
  "Feature",
  "Interview",
  "Review",
];

export const WEIGHT_BADGE_CLASSES: Record<ArticleWeight, string> = {
  Informative: "bg-[#e8d9b5] text-[#6a5843]",
  Opinion: "bg-[#dce8d5] text-[#4a6a3a]",
  Analysis: "bg-[#d5dde8] text-[#3a4e6a]",
  Breaking: "bg-[#e8d5d5] text-[#8b2020]",
  Feature: "bg-[#e8dfd5] text-[#7a5a3a]",
  Interview: "bg-[#e0d5e8] text-[#5a3a7a]",
  Review: "bg-[#e8e5d5] text-[#5a5a2a]",
};

export function isArticleWeight(value: string | null | undefined): value is ArticleWeight {
  return Boolean(value && value in WEIGHT_BADGE_CLASSES);
}

export function ArticleWeightBadge({
  weight,
  className,
}: {
  weight: string | null | undefined;
  className?: string;
}) {
  if (!weight || !isArticleWeight(weight)) return null;

  return (
    <span
      className={clsx(
        "inline-flex rounded-full px-2 py-0.5 font-robinhood text-[9px] uppercase tracking-[0.14em]",
        WEIGHT_BADGE_CLASSES[weight],
        className,
      )}
    >
      {weight}
    </span>
  );
}

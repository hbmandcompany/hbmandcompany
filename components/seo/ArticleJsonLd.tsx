import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import type { PublicArticleBriefing } from "@/lib/desk/article-to-briefing";

export default function ArticleJsonLd({ article }: { article: PublicArticleBriefing }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.headline,
    description: article.dek || article.lede,
    url: `${SITE_URL}/newspaper?story=${article.id}`,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    articleSection: article.section,
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Supabase database types for HBM & Company editorial platform.
 * Regenerate from your Supabase project when the schema evolves:
 *   npx supabase gen types typescript --project-id <id> > lib/supabase/types.ts
 */

export type ArticleStatus = "draft" | "review" | "published" | "archived";

export type ArticleWeight =
  | "Informative"
  | "Opinion"
  | "Analysis"
  | "Breaking"
  | "Feature"
  | "Interview"
  | "Review";

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  status: ArticleStatus;
  published_at: string | null;
  author_id: string | null;
  hero_image_url: string | null;
  weight: string | null;
  rejection_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type TickerItem = {
  id: string;
  headline: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type DeskProfileRole = "writer" | "principal" | "editor" | "analyst" | "admin";

export type DeskProfile = {
  id: string;
  role: DeskProfileRole;
  display_name: string | null;
  created_at: string;
};

export type Database = {
  public: {
    Tables: {
      articles: {
        Row: Article;
        Insert: Omit<Article, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Article>;
        Relationships: [];
      };
      ticker_items: {
        Row: TickerItem;
        Insert: Omit<TickerItem, "id" | "created_at" | "updated_at"> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<TickerItem>;
        Relationships: [];
      };
      desk_profiles: {
        Row: DeskProfile;
        Insert: {
          id: string;
          role?: DeskProfileRole;
          display_name?: string | null;
          created_at?: string;
        };
        Update: Partial<Omit<DeskProfile, "id">>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      article_status: ArticleStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};

export type PublishedArticlesResult = {
  data: Article[] | null;
  error: import("./errors").SupabaseQueryError | null;
  count: number;
};

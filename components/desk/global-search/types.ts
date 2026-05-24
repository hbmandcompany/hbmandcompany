export type SearchMode = "search" | "ai" | "command";

export type SearchResultItem = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  meta?: string;
};

export type GroupedSearchResults = {
  articles: SearchResultItem[];
  documents: SearchResultItem[];
  users: SearchResultItem[];
  jobs: SearchResultItem[];
};

export type AiSource = {
  id: string;
  title: string;
  type: "article" | "document" | "case";
  href?: string;
};

export type AiSuggestedAction = {
  label: string;
  action: string;
  href?: string;
};

export type AiResponse = {
  answer: string;
  sources: AiSource[];
  suggested_actions: AiSuggestedAction[];
};

export type CommandAction =
  | "create_article"
  | "open_document"
  | "create_case"
  | "schedule_meeting"
  | "assign";

export type CommandResponse = {
  success: boolean;
  action: CommandAction | null;
  message: string;
  redirectPath?: string;
  entityId?: string;
};

export type FlatResult =
  | { kind: "search"; group: keyof GroupedSearchResults; item: SearchResultItem }
  | { kind: "action"; label: string; href?: string; action?: string }
  | { kind: "command"; response: CommandResponse };

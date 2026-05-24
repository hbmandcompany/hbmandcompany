"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { detectSearchMode } from "./detect-mode";
import type {
  AiResponse,
  CommandResponse,
  FlatResult,
  GroupedSearchResults,
  SearchMode,
} from "./types";

type ModeOverride = SearchMode | "auto";

type GlobalSearchContextValue = {
  isOpen: boolean;
  query: string;
  mode: SearchMode;
  modeOverride: ModeOverride;
  searchResults: GroupedSearchResults | null;
  aiResponse: AiResponse | null;
  commandResponse: CommandResponse | null;
  loading: boolean;
  error: string | null;
  selectedIndex: number;
  flatResults: FlatResult[];
  open: () => void;
  close: () => void;
  toggle: () => void;
  setQuery: (value: string) => void;
  setModeOverride: (mode: ModeOverride) => void;
  selectNext: () => void;
  selectPrev: () => void;
  setSelectedIndex: (index: number) => void;
  executeSelected: () => void;
};

const GlobalSearchContext = createContext<GlobalSearchContextValue | null>(null);

function flattenSearchResults(results: GroupedSearchResults): FlatResult[] {
  const out: FlatResult[] = [];
  (["articles", "documents", "users", "jobs"] as const).forEach((group) => {
    results[group].forEach((item) => out.push({ kind: "search", group, item }));
  });
  return out;
}

function flattenAiResponse(response: AiResponse): FlatResult[] {
  return response.suggested_actions.map((action) => ({
    kind: "action" as const,
    label: action.label,
    href: action.href,
    action: action.action,
  }));
}

export function GlobalSearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQueryState] = useState("");
  const [modeOverride, setModeOverride] = useState<ModeOverride>("auto");
  const [searchResults, setSearchResults] = useState<GroupedSearchResults | null>(null);
  const [aiResponse, setAiResponse] = useState<AiResponse | null>(null);
  const [commandResponse, setCommandResponse] = useState<CommandResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const mode = useMemo(
    () => detectSearchMode(query, modeOverride),
    [query, modeOverride]
  );

  const flatResults = useMemo((): FlatResult[] => {
    if (mode === "search" && searchResults) return flattenSearchResults(searchResults);
    if (mode === "ai" && aiResponse) return flattenAiResponse(aiResponse);
    return [];
  }, [mode, searchResults, aiResponse]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setSelectedIndex(0);
  }, []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const setQuery = useCallback((value: string) => {
    setQueryState(value);
    setSelectedIndex(0);
    setError(null);
  }, []);

  const runFetch = useCallback(
    async (value: string, activeMode: SearchMode) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (!value.trim()) {
        setSearchResults(null);
        setAiResponse(null);
        setCommandResponse(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        if (activeMode === "search") {
          setAiResponse(null);
          setCommandResponse(null);
          const res = await fetch("/api/search/meilisearch", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: value }),
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("Search failed");
          setSearchResults((await res.json()) as GroupedSearchResults);
        } else if (activeMode === "ai") {
          setSearchResults(null);
          setCommandResponse(null);
          const res = await fetch("/api/search/llm", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: value }),
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("AI request failed");
          setAiResponse((await res.json()) as AiResponse);
        } else {
          setSearchResults(null);
          setAiResponse(null);
          const res = await fetch("/api/commands", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: value }),
            signal: controller.signal,
          });
          if (!res.ok) throw new Error("Command failed");
          setCommandResponse((await res.json()) as CommandResponse);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setError((err as Error).message || "Something went wrong");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      void runFetch(query, mode);
    }, 200);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, mode, isOpen, runFetch]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectNext = useCallback(() => {
    setSelectedIndex((i) => Math.min(i + 1, Math.max(flatResults.length - 1, 0)));
  }, [flatResults.length]);

  const selectPrev = useCallback(() => {
    setSelectedIndex((i) => Math.max(i - 1, 0));
  }, []);

  const executeSelected = useCallback(() => {
    if (mode === "command" && commandResponse?.success && commandResponse.redirectPath) {
      close();
      router.push(commandResponse.redirectPath);
      return;
    }

    const selected = flatResults[selectedIndex];
    if (selected?.kind === "search" && selected.item.href) {
      close();
      router.push(selected.item.href);
      return;
    }
    if (selected?.kind === "action" && selected.href) {
      close();
      router.push(selected.href);
    }
  }, [mode, commandResponse, flatResults, selectedIndex, close, router]);

  const value = useMemo(
    () => ({
      isOpen,
      query,
      mode,
      modeOverride,
      searchResults,
      aiResponse,
      commandResponse,
      loading,
      error,
      selectedIndex,
      flatResults,
      open,
      close,
      toggle,
      setQuery,
      setModeOverride,
      selectNext,
      selectPrev,
      setSelectedIndex,
      executeSelected,
    }),
    [
      isOpen,
      query,
      mode,
      modeOverride,
      searchResults,
      aiResponse,
      commandResponse,
      loading,
      error,
      selectedIndex,
      flatResults,
      open,
      close,
      toggle,
      setQuery,
      selectNext,
      selectPrev,
      executeSelected,
    ]
  );

  return <GlobalSearchContext.Provider value={value}>{children}</GlobalSearchContext.Provider>;
}

export function useGlobalSearchContext() {
  const ctx = useContext(GlobalSearchContext);
  if (!ctx) throw new Error("useGlobalSearchContext must be used within GlobalSearchProvider");
  return ctx;
}

"use client";

import { useGlobalSearchContext } from "./GlobalSearchProvider";

export function useGlobalSearch() {
  return useGlobalSearchContext();
}

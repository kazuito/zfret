"use client";

import { LS_KEYS } from "@/lib/constants";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback } from "react";

const MAX_HISTORY_SIZE = 10;

export function useSearchHistory() {
  const [queries, setQueries] = useLocalStorage<string[]>(
    LS_KEYS.SEARCH_HISTORY,
    [],
  );

  const clear = useCallback(() => {
    setQueries([]);
  }, [setQueries]);

  const add = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      if (trimmed.length === 0) return;

      setQueries((prev: string[]) => {
        // Remove existing (to move to top) and limit size
        return [trimmed, ...prev.filter((q) => q !== trimmed)].slice(
          0,
          MAX_HISTORY_SIZE,
        );
      });
    },
    [setQueries],
  );

  const remove = useCallback(
    (query: string) => {
      setQueries((prev: string[]) => prev.filter((q) => q !== query));
    },
    [setQueries],
  );

  return {
    queries,
    add,
    remove,
    clear,
  };
}

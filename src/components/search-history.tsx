"use client";

import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

type SearchHistoryProps = {
  queries: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

export const SearchHistory = ({
  queries,
  onSelect,
  onRemove,
  onClear,
}: SearchHistoryProps) => {
  if (queries.length === 0) return null;

  return (
    <div
      className="mt-3 flex flex-col gap-2 transition ease-out starting:scale-95"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between">
        <span className="text-foreground/60 text-xs">Recent searches</span>
        <Button variant="ghost" size="xs" onClick={onClear}>
          Clear
        </Button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {queries.map((query) => (
          <div
            key={query}
            className="bg-secondary/40 hover:bg-secondary/60 group flex items-center gap-1 rounded-full border py-1 pr-1 pl-3 text-sm transition-colors"
          >
            <button
              type="button"
              onClick={() => onSelect(query)}
              className="max-w-40 truncate"
            >
              {query}
            </button>
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-full transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(query);
              }}
            >
              <HugeiconsIcon icon={Cancel01Icon} size={12} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

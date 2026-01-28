"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon } from "@hugeicons/core-free-icons";

type RecentSearchesProps = {
  queries: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
};

export const RecentSearches = ({
  queries,
  onSelect,
  onRemove,
  onClear,
}: RecentSearchesProps) => {
  if (queries.length === 0) return null;

  return (
    <motion.div
      className="flex flex-col gap-2"
      onMouseDown={(e) => e.preventDefault()}
      initial={{
        scale: 0.95,
        height: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        height: "auto",
        opacity: 1,
      }}
      exit={{
        scale: 0.95,
        height: 0,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        damping: 46,
        stiffness: 660,
      }}
    >
      <div className="p-2">
        <div className="flex flex-col">
          {queries.slice(0, 5).map((query) => (
            <div key={query} className="border-b py-0.5 last:border-none">
              <div className="flex items-center justify-between gap-0.5">
                <button
                  type="button"
                  onClick={() => onSelect(query)}
                  className="hover:bg-accent/20 grow truncate rounded-md px-3 py-2 text-start text-sm"
                >
                  {query}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(query);
                  }}
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={12} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

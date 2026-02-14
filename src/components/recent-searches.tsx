"use client";

import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/button";

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
}: RecentSearchesProps) => {
  if (queries.length === 0) return null;

  return (
    <motion.div
      className="flex flex-col gap-2"
      onMouseDown={(e) => e.preventDefault()}
      variants={{ hidden: { opacity: 0, scale: 0.96, height: 0 } }}
      initial="hidden"
      animate={{ scale: 1, height: "auto", opacity: 1 }}
      exit="hidden"
      transition={{ type: "spring", damping: 46, stiffness: 660 }}
    >
      <div className="pt-2">
        <div className="flex flex-col">
          <AnimatePresence mode="popLayout" initial={false}>
            {queries.slice(0, 3).map((query) => (
              <motion.div
                layout
                key={query}
                className="border-b py-0.5 last:border-none"
                variants={{ hidden: { opacity: 0, scale: 0.96 } }}
                initial="hidden"
                animate={{ opacity: 1, scale: 1 }}
                exit="hidden"
                transition={{ type: "spring", damping: 46, stiffness: 660 }}
              >
                <div className="flex items-center justify-between gap-0.5">
                  <button
                    type="button"
                    onClick={() => onSelect(query)}
                    className="grow truncate rounded-lg px-3 py-2 text-start text-base hover:bg-accent/20"
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

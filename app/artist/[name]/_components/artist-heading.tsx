"use client";

import { User03Icon } from "@hugeicons/core-free-icons";
import { useQueryState } from "nuqs";
import { HeadingRoot, HeadingSuffix, HeadingTitle } from "@/components/heading";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ArtistHeading = ({ artistName }: { artistName: string }) => {
  const [filterQuery, setFilterQuery] = useQueryState("q");

  return (
    <HeadingRoot className="items-start max-sm:flex-col">
      <HeadingTitle>
        <div className="mr-2 grid size-8 place-content-center rounded-full bg-secondary text-muted-foreground sm:size-10 dark:bg-secondary/50">
          <Icon
            className="size-5 sm:size-6"
            icon={User03Icon}
            fill="currentColor"
          />
        </div>
        {artistName}
      </HeadingTitle>
      <HeadingSuffix>
        {filterQuery && (
          <Button variant="link" onClick={() => setFilterQuery("")}>
            Clear
          </Button>
        )}
        <Input
          type="search"
          onChange={(e) => setFilterQuery(e.target.value)}
          value={filterQuery ?? ""}
          placeholder="Search songs..."
          className="w-38 rounded-full transition-all focus:w-48"
        />
      </HeadingSuffix>
    </HeadingRoot>
  );
};

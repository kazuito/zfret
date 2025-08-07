"use client";

import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FavoriteItem, useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { HeartIcon, ListFilterIcon } from "lucide-react";
import { useMemo, useState } from "react";

const sortBy = {
  timestamp: {
    label: "Date Added",
    fn: (a: FavoriteItem, b: FavoriteItem) => b.timestamp - a.timestamp,
  },
  title: {
    label: "Title",
    fn: (a: FavoriteItem, b: FavoriteItem) => {
      const titleComparison = a.title.localeCompare(b.title);
      if (titleComparison === 0) {
        return a.artistName.localeCompare(b.artistName);
      }
      return titleComparison;
    },
  },
  artist: {
    label: "Artist",
    fn: (a: FavoriteItem, b: FavoriteItem) => {
      const artistComparison = a.artistName.localeCompare(b.artistName);
      if (artistComparison === 0) {
        return a.title.localeCompare(b.title);
      }
      return artistComparison;
    },
  },
};

const Page = () => {
  const { favorites } = useFavorites();
  const [selectedSort, setSelectedSort] = useState("timestamp");
  const [isAsc, setIsAsc] = useState(true);

  const toggleSortOrder = () => {
    setIsAsc((prev) => !prev);
  };

  const computedFavorites = useMemo(() => {
    if (!favorites || favorites.length === 0) return [];
    const sortFn = sortBy[selectedSort as keyof typeof sortBy]?.fn;
    if (!sortFn) return favorites;
    const sorted = [...favorites].sort(sortFn);
    return isAsc ? sorted : sorted.reverse();
  }, [selectedSort, favorites, isAsc]);

  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <PageHeading
        endContent={
          <div className="flex">
            <Button
              size="icon"
              variant="outline"
              onClick={toggleSortOrder}
              className="rounded-e-none border-e-0"
              title="Toggle sort order"
            >
              <ListFilterIcon
                className={cn(
                  "transition-all duration-140 ease-out",
                  isAsc && "rotate-x-180"
                )}
              />
              <span className="sr-only">Toggle sort order</span>
            </Button>
            <Select value={selectedSort} onValueChange={setSelectedSort}>
              <SelectTrigger className="rounded-s-none">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  {Object.entries(sortBy).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        }
      >
        <HeartIcon />
        Favorites
      </PageHeading>
      <List.Wrapper>
        <List.Content>
          {computedFavorites?.map((item) => {
            return (
              <List.Item
                key={item.link}
                href={item.link}
                description={item.artistName}
              >
                {item.title}
              </List.Item>
            );
          })}
        </List.Content>
      </List.Wrapper>
    </div>
  );
};

export default Page;

"use client";

import { FavouriteIcon, Sorting02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FavoriteItem, useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

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
    <div className="mx-auto max-w-3xl p-6 pt-0">
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
              <HugeiconsIcon
                icon={Sorting02Icon}
                size={20}
                className={cn(
                  "transition-all duration-140 ease-out",
                  isAsc && "rotate-x-180",
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
        <HugeiconsIcon icon={FavouriteIcon} size={20} strokeWidth={2.6} />
        Favorites
      </PageHeading>
      {computedFavorites.length === 0 ? (
        <div>
          No favorites yet. How about{" "}
          <Link href="/song/41824" className="text-blue-500">
            Lemon
          </Link>
          ?
        </div>
      ) : (
        <ListRoot>
          <ListContent>
            {computedFavorites.map((item) => {
              return (
                <ListItemLink key={item.link} href={item.link}>
                  <ListItemTitle>{item.title}</ListItemTitle>
                  <ListItemSubtitle>{item.artistName}</ListItemSubtitle>
                </ListItemLink>
              );
            })}
          </ListContent>
        </ListRoot>
      )}
    </div>
  );
};

export default Page;

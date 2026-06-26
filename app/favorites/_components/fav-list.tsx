"use client";

import Link from "next/link";
import { useQueryState } from "nuqs";
import { useMemo } from "react";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { sortFavoritesBy } from "@/features/favorites/constants";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { cn } from "@/lib/utils";

export const FavList = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { favorites } = useFavorites();
  const [sortKey] = useQueryState("sortKey", {
    defaultValue: "timestamp",
  });
  const [sortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const isAsc = sortOrder === "asc";

  const computedFavorites = useMemo(() => {
    if (!favorites || favorites.length === 0) return [];
    const sortFn = sortFavoritesBy[sortKey as keyof typeof sortFavoritesBy]?.fn;
    if (!sortFn) return favorites;
    const sorted = [...favorites].sort(sortFn);
    return isAsc ? sorted : sorted.reverse();
  }, [sortKey, favorites, isAsc]);

  return (
    <div className={cn("", className)} {...props}>
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

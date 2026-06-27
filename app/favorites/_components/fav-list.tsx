"use client";

import Link from "next/link";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { useFavSort } from "@/features/favorites/hooks/use-fav-sort";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { sortFavorites } from "@/features/favorites/sort";
import { cn } from "@/lib/utils";

export const FavList = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { favorites } = useFavorites();
  const { sortKey, sortOrder } = useFavSort();

  const computedFavorites = sortFavorites(favorites, {
    key: sortKey,
    order: sortOrder,
  });

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

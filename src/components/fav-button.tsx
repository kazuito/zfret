"use client";

import { FavoriteItem, useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  item: FavoriteItem;
};

const FavButton = ({ item }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.link === item.link);

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => toggleFavorite(item)}
      className={cn(
        "rounded-full duration-300 starting:scale-95 starting:opacity-0 transition ease-out",
        isFavorite
          ? "!bg-red-500/10 hover:!bg-red-500/20"
          : "opacity-50 hover:opacity-100"
      )}
      title="Toggle favorite"
    >
      {isFavorite ? (
        <HeartIcon className="text-red-500" fill="currentColor" />
      ) : (
        <HeartIcon />
      )}
      <span className="sr-only">Toggle favorite</span>
    </Button>
  );
};

export default FavButton;

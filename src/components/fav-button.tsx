"use client";

import { FavoriteItemInput, useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";

type Props = {
  item: FavoriteItemInput;
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
        "rounded-full transition duration-300 ease-out starting:scale-95 starting:opacity-0",
        isFavorite
          ? "!bg-red-500/10 hover:!bg-red-500/20"
          : "opacity-50 hover:opacity-100",
      )}
      title="Toggle favorite"
    >
      <HugeiconsIcon
        icon={FavouriteIcon}
        size={24}
        className={isFavorite ? "text-red-500" : ""}
      />
      <span className="sr-only">Toggle favorite</span>
    </Button>
  );
};

export default FavButton;

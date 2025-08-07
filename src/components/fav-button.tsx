"use client";

import { FavoriteItem, useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  item: FavoriteItem;
};

const FavButton = ({ item }: Props) => {
  const { loading, getIsFavorite, toggleFavorite } = useFavorites();

  const isFavorite = getIsFavorite(item);

  if (loading) {
    return null;
  }

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={() => toggleFavorite(item)}
      className={cn(
        "rounded-full",
        isFavorite && "!bg-red-500/10 hover:!bg-red-500/20"
      )}
      title="Toggle favorite"
    >
      {isFavorite ? (
        <HeartIcon
          className="text-red-500"
          fill="currentColor"
        />
      ) : (
        <HeartIcon />
      )}
      <span className="sr-only">Toggle favorite</span>
    </Button>
  );
};

export default FavButton;

"use client";

import { FavoriteItemInput, useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { Button } from "./ui/button";
import { motion } from "motion/react";

type Props = {
  item: FavoriteItemInput;
};

const FavButton = ({ item }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.link === item.link);

  return (
    <Button
      size="icon-lg"
      variant="secondary"
      onClick={() => toggleFavorite(item)}
      className={cn(
        "rounded-full transition duration-300 ease-out starting:scale-95 starting:opacity-0",
        isFavorite
          ? "bg-red-500/20! text-red-500"
          : "opacity-50 hover:opacity-100",
      )}
      title="Toggle favorite"
    >
      <motion.div
        key={isFavorite ? "filled" : "empty"}
        initial={isFavorite ? { scale: 0, rotate: -45 } : false}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
        }}
      >
        <HugeiconsIcon
          icon={FavouriteIcon}
          size={24}
          fill={isFavorite ? "red" : "none"}
        />
      </motion.div>
      <span className="sr-only">Toggle favorite</span>
    </Button>
  );
};

export default FavButton;

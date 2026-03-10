"use client";

import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { type FavoriteItemInput, useFavorites } from "../hooks/use-favorites";
import { Icon } from "./icon";
import { Button } from "./ui/button";

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
        "starting:scale-95 rounded-full starting:opacity-0 transition duration-300 ease-out",
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
        <Icon
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

"use client";

import { Sorting02Icon } from "@hugeicons/core-free-icons";
import { useQueryState } from "nuqs";
import { Icon } from "@/components/icon";
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
import { sortFavoritesBy } from "@/features/favorites/constants";
import { cn } from "@/lib/utils";

export const FavSort = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [sortKey, setSortKey] = useQueryState("sortKey", {
    defaultValue: "timestamp",
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc",
  });

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
  };

  return (
    <div className={cn("flex", className)} {...props}>
      <Button
        size="icon"
        variant="outline"
        onClick={toggleSortOrder}
        className="rounded-e-none border-e-0"
        title="Toggle sort order"
      >
        <Icon
          icon={Sorting02Icon}
          size={20}
          className={cn(
            "transition-all duration-140 ease-out",
            sortOrder === "asc" && "rotate-x-180",
          )}
        />
        <span className="sr-only">Toggle sort order</span>
      </Button>
      <Select value={sortKey} onValueChange={(value) => setSortKey(value)}>
        <SelectTrigger className="rounded-s-none">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Sort by</SelectLabel>
            {Object.entries(sortFavoritesBy).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

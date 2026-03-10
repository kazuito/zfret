import { ArrowTurnBackwardIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const SearchForm = ({
  className,
  ...props
}: React.ComponentProps<"form">) => {
  return <form className={cn("flex gap-2", className)} {...props} />;
};

export const SearchInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => {
  return (
    <Input
      type="search"
      name="q"
      aria-label="Search"
      placeholder="Search for songs or artists"
      className={cn("h-10 rounded-full px-4 text-base!", className)}
      autoFocus
      {...props}
    />
  );
};

export const SearchSubmit = ({
  className,
  ...props
}: React.ComponentProps<typeof Button>) => {
  return (
    <Button
      type="submit"
      className={cn("h-10 rounded-full px-4", className)}
      {...props}
    >
      Search
      <Icon
        icon={ArrowTurnBackwardIcon}
        size={20}
        strokeWidth={2.6}
        className="text-muted-foreground"
      />
    </Button>
  );
};

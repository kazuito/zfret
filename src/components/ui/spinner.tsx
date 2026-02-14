import { Loading03Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Icon } from "../icon";

function Spinner({
  className,
  strokeWidth,
  ...props
}: Omit<React.ComponentProps<typeof Icon>, "icon">) {
  return (
    <Icon
      icon={Loading03Icon}
      strokeWidth={strokeWidth ?? 2.4}
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };

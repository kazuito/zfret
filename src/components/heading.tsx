import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export const HeadingRoot = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex items-center py-10", className)} {...props} />
  );
};

export const HeadingContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("", className)} {...props} />;
};

export const HeadingTitle = ({
  className,
  ...props
}: React.ComponentProps<"h1">) => {
  return (
    <h1
      className={cn(
        "flex w-fit items-center gap-2 font-semibold text-xl sm:gap-3 sm:text-2xl [&_svg]:size-5 sm:[&_svg]:size-6",
        className,
      )}
      {...props}
    />
  );
};

export const HeadingSubtitle = ({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn("mt-1 w-fit text-foreground/60 sm:text-lg", className)}
      {...props}
    />
  );
};

export const HeadingSuffix = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("ml-auto", className)} {...props} />;
};

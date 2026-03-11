import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

export const ExhibitionRoot = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cn("", className)} {...props} />;
};

export const ExhibitionHeader = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cn("", className)} {...props} />;
};

export const ExhibitionTitle = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cn("text-lg", className)} {...props} />;
};

export const ExhibitionContent = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      className={cn(
        "no-scrollbar mt-6 flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto",
        className,
      )}
      {...props}
    />
  );
};

export const ExhibitionItem = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot.Root : "div";
  return <Comp className={cn("shrink-0 snap-center", className)} {...props} />;
};

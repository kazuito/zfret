"use client";

import { Slot } from "radix-ui";
import { useScrollShadow } from "@/hooks/use-scroll-shadow";
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
  const { ref, canScrollLeft, canScrollRight } = useScrollShadow();

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-linear-to-r from-background to-transparent transition duration-400",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-linear-to-l from-background to-transparent transition duration-400",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />
      <Comp
        ref={ref}
        className={cn(
          "no-scrollbar mt-6 flex w-full min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto",
        )}
        {...props}
      />
    </div>
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

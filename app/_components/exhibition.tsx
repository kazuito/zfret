"use client";

import { useRender } from "@base-ui/react/use-render";
import { cn } from "@/lib/utils";

export const ExhibitionRoot = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) => {
  return useRender({
    render: render ?? <div />,
    props: { className: cn(className), ...props },
  });
};

export const ExhibitionHeader = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) => {
  return useRender({
    render: render ?? <div />,
    props: { className: cn(className), ...props },
  });
};

export const ExhibitionTitle = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) => {
  return useRender({
    render: render ?? <div />,
    props: { className: cn("text-lg", className), ...props },
  });
};

export const ExhibitionContent = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) => {
  return useRender({
    render: render ?? <div />,
    props: {
      className: cn(
        "no-scrollbar scroll-fade-x mt-6 flex w-full min-w-0 gap-4 overflow-x-auto",
        className,
      ),
      ...props,
    },
  });
};

export const ExhibitionItem = ({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">) => {
  return useRender({
    render: render ?? <div />,
    props: { className: cn("shrink-0", className), ...props },
  });
};

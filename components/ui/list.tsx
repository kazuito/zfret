"use client";

import { useRender } from "@base-ui/react/use-render";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OnLinkPending } from "../on-link-pending";
import { Spinner } from "./spinner";

export const ListRoot = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl border border-border/60 bg-secondary/40 dark:bg-secondary/20",
        className,
      )}
      {...props}
    />
  );
};

export const ListHeader = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("px-6 py-4", className)} {...props} />;
};

export const ListTitle = ({
  render,
  className,
  ...props
}: useRender.ComponentProps<"div">) => {
  return useRender({
    render: render ?? <div />,
    props: {
      className: cn(
        "flex w-fit items-center gap-2 *:[svg]:size-4 *:[svg]:text-muted-foreground",
        className,
      ),
      ...props,
    },
  });
};

export const ListContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-1 p-1", className)} {...props} />
  );
};

export const ListItem = ({
  render,
  className,
  ...props
}: useRender.ComponentProps<"button">) => {
  return useRender({
    render: render ?? <button />,
    props: {
      className: cn(
        "flex min-w-0 items-center gap-3 rounded-lg border border-border/60 bg-background px-4 py-3 hover:bg-accent/20! active:bg-accent/15! dark:bg-secondary/20",
        className,
      ),
      ...props,
    },
  });
};

export const ListItemLink = ({
  children,
  ...props
}: React.ComponentProps<typeof Link>) => {
  return (
    <ListItem
      className="relative"
      render={
        <Link {...props}>
          {children}
          <OnLinkPending>
            <Spinner className="absolute right-4 text-muted-foreground" />
          </OnLinkPending>
        </Link>
      }
    />
  );
};

export const ListItemTitle = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("truncate font-medium", className)} {...props} />;
};

export const ListItemSubtitle = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("truncate text-muted-foreground text-sm", className)}
      {...props}
    />
  );
};

export const ListFooter = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return <div className={cn("flex justify-center py-4")} {...props} />;
};

"use client";

import {
  Cancel01Icon,
  Clock02Icon,
  FavouriteIcon,
  Home07Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const SidebarItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="group/item py-px">
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg px-2.5 py-1.5 group-hover/item:bg-accent/80 dark:group-hover/item:bg-accent/20 [&_svg]:size-4",
          isActive && "bg-accent dark:bg-accent/30!",
        )}
      >
        {children}
      </div>
    </Link>
  );
};

export const SidebarContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("flex grow flex-col bg-background px-1 py-3", className)}
      {...props}
    >
      <div className="flex items-center ps-4 pe-1 lg:mt-2">
        <Link href="/" className="font-medium text-sm">
          Z-FRET
        </Link>
        <Button
          variant="ghost"
          size="icon-lg"
          className="ml-auto rounded-full lg:hidden"
        >
          <Icon className="size-5" icon={Cancel01Icon} />
        </Button>
      </div>
      <div className="mt-4 px-2">
        <Button
          className="w-full rounded-full"
          variant="outline"
          size="lg"
          asChild
        >
          <Link href="/search">
            <Icon icon={SearchIcon} />
            Search
          </Link>
        </Button>
      </div>
      <div className="mt-2 flex flex-col px-1 lg:mt-4">
        <SidebarItem href="/">
          <Icon icon={Home07Icon} />
          Home
        </SidebarItem>
        <SidebarItem href="/favorites">
          <Icon icon={FavouriteIcon} />
          Favorites
        </SidebarItem>
        <SidebarItem href="/history">
          <Icon icon={Clock02Icon} />
          History
        </SidebarItem>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  return (
    <div className="sticky top-0 hidden h-dvh w-64 shrink-0 p-2 lg:flex">
      <SidebarContent className="rounded-2xl border bg-accent/10 shadow-xs" />
    </div>
  );
};

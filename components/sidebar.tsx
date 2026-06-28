"use client";

import {
  Cancel01Icon,
  Clock02Icon,
  FavouriteIcon,
  FolderHeartIcon,
  Home07Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { useFavorites } from "@/features/favorites/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

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
          nativeButton={false}
          render={<Link href="/search" />}
        >
          <Icon icon={SearchIcon} />
          Search
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
      </div>
      <div className="my-3 px-3">
        <Separator />
      </div>
      <div className="scroll-fade-y scrollbar-none w-full grow overflow-y-auto px-1">
        <SidebarFavList />
      </div>
      <div className="my-3 px-2">
        <Separator />
      </div>
      <div className="px-2">
        <SidebarItem href="/history">
          <Icon icon={Clock02Icon} />
          History
        </SidebarItem>
      </div>
    </div>
  );
};

export const SidebarFavList = () => {
  const { favorites } = useFavorites();

  const pathname = usePathname();

  return (
    <div className="w-full">
      {favorites.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-lg bg-accent/20 p-3">
          <div className="py-1">
            <Icon
              icon={FolderHeartIcon}
              className="size-4.5 text-foreground/60"
            />
          </div>
          <div className="text-balance text-center text-sm">
            Your favorites will appear here.
          </div>
          <div>
            <Button
              size="sm"
              variant="link"
              render={<Link href="/trending/songs" />}
              nativeButton={false}
            >
              Explore songs
            </Button>
          </div>
        </div>
      )}
      {favorites.map((item) => (
        <Link
          key={item.timestamp}
          href={item.link}
          className={cn(
            "flex items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-accent/80 dark:hover:bg-accent/20 [&_svg]:size-4",
            pathname === item.link && "bg-accent dark:bg-accent/30!",
          )}
          prefetch
        >
          {item.type === "song" && (
            <div className="min-w-0">
              <div className="truncate text-sm">{item.title}</div>
              <div className="text-muted-foreground text-xs">
                {item.artistName}
              </div>
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export const Sidebar = () => {
  return (
    <Suspense>
      <div className="sticky top-0 hidden h-dvh w-64 shrink-0 p-2 lg:flex">
        <SidebarContent className="w-full rounded-2xl border bg-accent/10 shadow-xs" />
      </div>
    </Suspense>
  );
};

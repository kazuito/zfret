"use client";

import { MenuIcon, SearchIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Header = () => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="fixed top-0 right-0 left-0 z-20 p-3 pb-0">
      <div className="z-10 mx-auto flex h-12 max-w-lg items-center rounded-full border bg-background/80 ps-5 pe-3 shadow-lg backdrop-blur-sm lg:hidden">
        <Link
          href="/"
          className={cn(
            "font-medium text-sm transition duration-300",
            open && "opacity-0",
          )}
        >
          Z-FRET
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            className="rounded-full text-muted-foreground"
          >
            <Link href="/search">
              <Icon icon={SearchIcon} strokeWidth={2.6} />
              Search
            </Link>
          </Button>
          <Button
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            <Icon className="size-5" strokeWidth={2.2} icon={MenuIcon} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

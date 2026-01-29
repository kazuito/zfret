"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { MenuIcon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

const Header = () => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="fixed top-0 right-0 left-0 z-20 p-3 pb-0">
      <div className="bg-background/80 z-10 mx-auto flex h-12 max-w-lg items-center rounded-full border ps-5 pe-3 shadow-lg backdrop-blur-sm lg:hidden">
        <Link
          href="/"
          className={cn(
            "text-sm font-medium transition duration-300",
            open && "opacity-0",
          )}
        >
          Z-FRET
        </Link>
        <div className="ml-auto">
          <Button
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
            onClick={() => setOpen(true)}
          >
            <HugeiconsIcon
              className="size-5"
              strokeWidth={2.2}
              icon={MenuIcon}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

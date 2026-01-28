"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock02Icon,
  FavouriteIcon,
  MenuIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Button } from "./ui/button";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

const Header = () => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="flex h-12 items-center border-b px-6 lg:hidden">
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
        <Button size="icon" variant="ghost" onClick={() => setOpen(true)}>
          <HugeiconsIcon icon={MenuIcon} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

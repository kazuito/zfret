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
    <div className="flex h-12 items-center border-b ps-6 pe-4 lg:hidden">
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
        <Button size="icon-lg" variant="ghost" onClick={() => setOpen(true)}>
          <HugeiconsIcon className="size-5" strokeWidth={2.2} icon={MenuIcon} />
        </Button>
      </div>
    </div>
  );
};

export default Header;

"use client";

import {
  Clock02Icon,
  FavouriteIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="fixed top-0 right-0 left-0 z-20 p-3 pb-0">
      <div className="ml-auto flex h-12 w-fit items-center gap-3 rounded-full border bg-background/80 ps-4 pe-2 shadow-lg backdrop-blur-sm lg:hidden">
        <Link href="/" className="font-medium text-sm transition duration-300">
          Z-FRET
        </Link>
        <div className="flex items-center gap-0.5">
          <Button
            asChild
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
          >
            <Link href="/history">
              <Icon icon={Clock02Icon} className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
          >
            <Link href="/favorites">
              <Icon icon={FavouriteIcon} className="size-5" />
            </Link>
          </Button>
          <Button
            asChild
            size="icon-lg"
            variant="ghost"
            className="rounded-full"
          >
            <Link href="/search">
              <Icon icon={SearchIcon} className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

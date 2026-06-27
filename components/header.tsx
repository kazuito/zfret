"use client";

import {
  Clock02Icon,
  FavouriteIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { Button } from "./ui/button";

const Header = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <div className="fixed top-0 right-0 left-0 z-20 flex justify-end p-3 pb-0 lg:hidden">
      <motion.div
        className="overflow-clip rounded-full border bg-background/80 shadow-xs backdrop-blur-xs"
        animate={{
          width: hidden ? 130 : "auto",
        }}
      >
        <div className="flex h-12 items-center justify-end px-2">
          <Link
            href="/"
            className={cn(
              "text-nowrap px-3 font-medium text-sm transition duration-300",
              hidden && "scale-95 opacity-0",
            )}
          >
            Z-FRET
          </Link>
          <div className="flex items-center gap-0.5">
            <Button
              nativeButton={false}
              render={<Link href="/history" />}
              size="icon-lg"
              variant="ghost"
              className="rounded-full"
            >
              <Icon icon={Clock02Icon} className="size-5" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/favorites" />}
              size="icon-lg"
              variant="ghost"
              className="rounded-full"
            >
              <Icon icon={FavouriteIcon} className="size-5" />
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/search" />}
              size="icon-lg"
              variant="ghost"
              className="rounded-full"
            >
              <Icon icon={SearchIcon} className="size-5" />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;

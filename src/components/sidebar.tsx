"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import {
  Cancel01Icon,
  Clock02Icon,
  FavouriteIcon,
  Home07Icon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import { Button } from "./ui/button";

export const SidebarItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const { setOpen } = useSidebar();
  const pathname = usePathname();
  const isActive = pathname === href;

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Link href={href} onClick={handleClick} className="group/item py-0.25">
      <div
        className={cn(
          "group-hover/item:bg-accent/80 dark:group-hover/item:bg-accent/20 flex items-center gap-2 rounded-lg px-2.5 py-1.5 [&_svg]:size-4",
          isActive ? "bg-accent dark:bg-accent/30!" : "",
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
  const { setOpen } = useSidebar();

  return (
    <div
      className={cn("bg-background flex grow flex-col px-1 py-3", className)}
      {...props}
    >
      <div className="flex items-center ps-4 pe-1 lg:mt-2">
        <Link href="/" className="text-sm font-medium">
          Z-FRET
        </Link>
        <Button
          variant="ghost"
          size="icon-lg"
          className="ml-auto rounded-full lg:hidden"
          onClick={() => setOpen(false)}
        >
          <HugeiconsIcon
            className="size-5"
            strokeWidth={2.2}
            icon={Cancel01Icon}
          />
        </Button>
      </div>
      <div className="mt-2 flex flex-col px-1 lg:mt-4">
        <SidebarItem href="/">
          <HugeiconsIcon strokeWidth={2.2} icon={Home07Icon} />
          Home
        </SidebarItem>
        <SidebarItem href="/search">
          <HugeiconsIcon strokeWidth={2.2} icon={SearchIcon} />
          Search
        </SidebarItem>
        <SidebarItem href="/favorites">
          <HugeiconsIcon strokeWidth={2.2} icon={FavouriteIcon} />
          Favorites
        </SidebarItem>
        <SidebarItem href="/history">
          <HugeiconsIcon strokeWidth={2.2} icon={Clock02Icon} />
          History
        </SidebarItem>
      </div>
    </div>
  );
};

export const FixedSidebar = () => {
  return (
    <div className="sticky top-0 hidden h-dvh w-64 shrink-0 p-2 lg:flex">
      <SidebarContent className="bg-accent/10 rounded-2xl border shadow-xs" />
    </div>
  );
};

export const FloatingSidebar = () => {
  const { open, setOpen } = useSidebar();

  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open, setOpen]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out fixed inset-0 z-100 bg-black/20 backdrop-blur-xs duration-300" />
        <Dialog.Content asChild>
          <div className="data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right fixed top-0 right-0 z-100 flex h-dvh w-70 shrink-0 flex-col p-2 duration-300 ease-out">
            <Dialog.Title className="sr-only">Sidebar</Dialog.Title>
            <SidebarContent className="bg-background rounded-2xl border shadow-xl" />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const Sidebar = () => {
  return (
    <>
      <FixedSidebar />
      <FloatingSidebar />
    </>
  );
};

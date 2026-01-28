"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import {
  Clock02Icon,
  FavouriteIcon,
  SearchIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { Dialog } from "radix-ui";
import { useEffect } from "react";

export const SidebarItem = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const { setOpen } = useSidebar();

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className="hover:bg-accent/50 flex items-center gap-2 rounded-lg px-2 py-1.5 [&_svg]:size-4"
    >
      {children}
    </Link>
  );
};

export const SidebarContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("bg-background flex grow flex-col p-3", className)}
      {...props}
    >
      <div className="mt-1 px-2">
        <Link href="/" className="text-sm font-medium">
          Z-FRET
        </Link>
      </div>
      <div className="mt-3 flex flex-col">
        <SidebarItem href="/search">
          <HugeiconsIcon icon={SearchIcon} />
          Search
        </SidebarItem>
        <SidebarItem href="/favorites">
          <HugeiconsIcon icon={FavouriteIcon} />
          Favorites
        </SidebarItem>
        <SidebarItem href="/history">
          <HugeiconsIcon icon={Clock02Icon} />
          History
        </SidebarItem>
      </div>
    </div>
  );
};

export const FixedSidebar = () => {
  return (
    <div className="sticky top-0 hidden h-dvh w-60 shrink-0 border-e lg:flex">
      <SidebarContent />
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
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out fixed inset-0 bg-black/20 backdrop-blur-xs duration-300" />
        <Dialog.Content asChild>
          <div className="data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right fixed top-0 right-0 flex h-dvh w-72 shrink-0 flex-col p-2 duration-300 ease-out">
            <Dialog.Title className="sr-only">Sidebar</Dialog.Title>
            <SidebarContent className="rounded-2xl border" />
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

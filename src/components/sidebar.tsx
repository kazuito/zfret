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
import { Dialog } from "radix-ui";
import { useEffect } from "react";
import { Icon } from "@/components/icon";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
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
    <Link href={href} onClick={handleClick} className="group/item py-px">
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
  const { setOpen } = useSidebar();

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
          onClick={() => setOpen(false)}
        >
          <Icon className="size-5" strokeWidth={2.2} icon={Cancel01Icon} />
        </Button>
      </div>
      <div className="mt-4 px-2">
        <Button
          className="w-full rounded-full"
          variant="outline"
          size="lg"
          onClick={() => setOpen(false)}
          asChild
        >
          <Link href="/search">
            <Icon icon={SearchIcon} strokeWidth={2.2} />
            Search
          </Link>
        </Button>
      </div>
      <div className="mt-2 flex flex-col px-1 lg:mt-4">
        <SidebarItem href="/">
          <Icon strokeWidth={2.2} icon={Home07Icon} />
          Home
        </SidebarItem>
        <SidebarItem href="/favorites">
          <Icon strokeWidth={2.2} icon={FavouriteIcon} />
          Favorites
        </SidebarItem>
        <SidebarItem href="/history">
          <Icon strokeWidth={2.2} icon={Clock02Icon} />
          History
        </SidebarItem>
      </div>
    </div>
  );
};

export const FixedSidebar = () => {
  return (
    <div className="sticky top-0 hidden h-dvh w-64 shrink-0 p-2 lg:flex">
      <SidebarContent className="rounded-2xl border bg-accent/10 shadow-xs" />
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
        <Dialog.Overlay className="data-[state=open]:fade-in data-[state=closed]:fade-out fixed inset-0 z-100 bg-black/20 backdrop-blur-xs duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in" />
        <Dialog.Content asChild>
          <div className="data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right fixed top-0 right-0 z-100 flex h-dvh w-70 shrink-0 flex-col p-2 duration-300 ease-out data-[state=closed]:animate-out data-[state=open]:animate-in">
            <Dialog.Title className="sr-only">Sidebar</Dialog.Title>
            <SidebarContent className="rounded-2xl border bg-background shadow-xl" />
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

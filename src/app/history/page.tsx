"use client";

import {
  Clock02Icon,
  Delete02Icon,
  MoreHorizontalIcon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { toast } from "sonner";
import {
  HeadingContent,
  HeadingRoot,
  HeadingSuffix,
  HeadingTitle,
} from "@/components/heading";
import { Icon } from "@/components/icon";
import { RelativeTime } from "@/components/relative-time";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { useBrowsingHistory } from "@/hooks/use-browsing-history";

const Page = () => {
  const { historyItems } = useBrowsingHistory();

  const computedHistory = historyItems?.toReversed() ?? [];

  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <HeadingRoot>
        <HeadingContent>
          <HeadingTitle>
            <Icon icon={Clock02Icon} size={20} strokeWidth={2.6} />
            History
          </HeadingTitle>
        </HeadingContent>
        <HeadingSuffix>
          <HistoryMenu />
        </HeadingSuffix>
      </HeadingRoot>
      {computedHistory.length === 0 ? (
        <div>
          No history yet.{" "}
          <Link href="/search" className="text-blue-500">
            Search?
          </Link>
        </div>
      ) : (
        <ListRoot>
          <ListContent>
            {computedHistory.map((item) => {
              return (
                <ListItemLink key={item.timestamp} href={item.link}>
                  {item.type === "song" && (
                    <>
                      <ListItemTitle>{item.title}</ListItemTitle>
                      <ListItemSubtitle>{item.artistName}</ListItemSubtitle>
                    </>
                  )}
                  {item.type === "artist" && (
                    <ListItemTitle>{item.name}</ListItemTitle>
                  )}
                  <span className="ml-auto hidden text-muted-foreground text-sm sm:inline">
                    <RelativeTime to={item.timestamp} />
                  </span>
                </ListItemLink>
              );
            })}
          </ListContent>
        </ListRoot>
      )}
    </div>
  );
};

const HistoryMenu = () => {
  const { clearAllHistory, historyItems, setHistoryItems } =
    useBrowsingHistory();

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear your history?")) {
      clearAllHistory();
      const currentItems = [...historyItems];
      toast.success("History cleared.", {
        action: {
          label: "Undo",
          onClick: () => {
            setHistoryItems(currentItems);
            toast.dismiss();
          },
        },
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon icon={MoreHorizontalIcon} size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-38">
        <DropdownMenuItem variant="destructive" onClick={handleClear}>
          <Icon icon={Delete02Icon} size={20} />
          Clear All History
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Page;

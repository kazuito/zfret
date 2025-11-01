"use client";

import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import RelativeTime from "@/components/relative-time";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBrowsingHistory } from "@/hooks/use-browsing-history";
import {
  AudioLinesIcon,
  EllipsisIcon,
  HistoryIcon,
  MicVocalIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const Page = () => {
  const { historyItems } = useBrowsingHistory();

  const computedHistory = historyItems?.toReversed() ?? [];

  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <PageHeading endContent={<HeaderContent />}>
        <HistoryIcon />
        History
      </PageHeading>
      {computedHistory.length === 0 ? (
        <div>
          No history yet.{" "}
          <Link href="/search" className="text-blue-500">
            Search?
          </Link>
        </div>
      ) : (
        <List.Wrapper>
          <List.Content>
            {computedHistory.map((item, i) => {
              if (item.type === "song") {
                return (
                  <List.Item
                    key={i}
                    href={item.link}
                    description={item.artistName}
                    prefix={<AudioLinesIcon className="text-foreground/50" />}
                    suffix={<RelativeTime to={item.timestamp} />}
                  >
                    {item.title}
                  </List.Item>
                );
              } else if (item.type === "artist")
                return (
                  <List.Item
                    key={i}
                    href={item.link}
                    prefix={<MicVocalIcon className="text-foreground/50" />}
                    suffix={<RelativeTime to={item.timestamp} />}
                  >
                    {item.name}
                  </List.Item>
                );
              return null;
            })}
          </List.Content>
        </List.Wrapper>
      )}
    </div>
  );
};

const HeaderContent = () => {
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
          <EllipsisIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem variant="destructive" onClick={handleClear}>
          <TrashIcon />
          Clear All History
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Page;

"use client";

import { Delete02Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBrowsingHistory } from "@/hooks/use-browsing-history";

export const HistoryMenu = () => {
  const { clearAllHistory, historyItems, setHistoryItems } =
    useBrowsingHistory();

  const handleClear = () => {
    if (!window.confirm("Are you sure you want to clear your history?")) return;

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

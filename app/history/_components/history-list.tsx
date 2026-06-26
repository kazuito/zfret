import Link from "next/link";
import { RelativeTime } from "@/components/relative-time";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { useBrowsingHistory } from "@/hooks/use-browsing-history";
import { cn } from "@/lib/utils";

export const HistoryList = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { historyItems } = useBrowsingHistory();

  const computedHistory = historyItems?.toReversed() ?? [];

  return (
    <div className={cn("", className)} {...props}>
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

"use client";

import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import RelativeTime from "@/components/relative-time";
import { useBrowsingHistory } from "@/hooks/use-browsing-history";
import { AudioLinesIcon, HistoryIcon, MicVocalIcon } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [history] = useBrowsingHistory();

  const computedHistory = history?.toReversed() ?? [];

  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <PageHeading>
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

export default Page;

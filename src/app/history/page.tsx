"use client";

import { List, ListItem } from "@/components/list";
import RelativeTime from "@/components/relative-time";
import { useBrowsingHistory } from "@/hooks/use-browsing-history";
import "dayjs/locale/ja";
import { HistoryIcon } from "lucide-react";

const Page = () => {
  const [history] = useBrowsingHistory();

  const reversedHistory = history?.toReversed() ?? [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <List prefix={<HistoryIcon />} title="閲覧履歴">
        {reversedHistory.map((item, i) => {
          if (item.type === "song") {
            return (
              <ListItem
                key={i}
                href={item.link}
                description={item.artistName}
                suffix={<RelativeTime to={item.timestamp} />}
              >
                {item.title}
              </ListItem>
            );
          } else if (item.type === "artist")
            return (
              <ListItem
                key={i}
                href={item.link}
                suffix={<RelativeTime to={item.timestamp} />}
              >
                {item.name}
              </ListItem>
            );
          return null;
        })}
      </List>
    </div>
  );
};

export default Page;

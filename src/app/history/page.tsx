"use client";

import { BrowsingHistoryItem } from "@/components/add-history";
import { List, ListItem } from "@/components/list";
import { useLocalStorage } from "react-use";

const Page = () => {
  const [history] = useLocalStorage<BrowsingHistoryItem[]>(
    "browsing-history",
    []
  );

  const reversedHistory = history?.reverse() ?? [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <List heading="閲覧履歴">
        {reversedHistory.map((item, i) => {
          if (item.type === "song") {
            return (
              <ListItem
                key={i}
                href={item.link}
                title={item.title}
                description={item.artistName}
              ></ListItem>
            );
          } else if (item.type === "artist")
            return (
              <ListItem key={i} href={item.link} title={item.name}></ListItem>
            );
          return null;
        })}
      </List>
    </div>
  );
};

export default Page;

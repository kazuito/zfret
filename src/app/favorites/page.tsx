'use client';

import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { useFavorites } from "@/hooks/use-favorites";
import { HeartIcon } from "lucide-react";

const Page = () => {
  const { favorites } = useFavorites();

  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <PageHeading>
        <HeartIcon />
        Favorites
      </PageHeading>
      <List.Wrapper>
        <List.Content>
          {favorites?.map((item) => {
            if (item.type === "song") {
              return (
                <List.Item
                  key={item.link}
                  href={item.link}
                  description={item.artistName}
                >
                  {item.title}
                </List.Item>
              );
            } else if (item.type === "artist") {
              return (
                <List.Item
                  key={item.link}
                  href={item.link}
                >
                  {item.name}
                </List.Item>
              );
            }
            return null;
          })}
        </List.Content>
      </List.Wrapper>
    </div>
  );
};

export default Page;

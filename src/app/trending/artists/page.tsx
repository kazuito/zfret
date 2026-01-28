"use cache";

import { List } from "@/components/ui/list";
import PageHeading from "@/components/page-heading";
import { fetchTopArtists } from "@/lib/song";
import { cacheLife } from "next/cache";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mic01Icon } from "@hugeicons/core-free-icons";

const Page = async () => {
  cacheLife("days");

  const artists = await fetchTopArtists({ limit: 100 });

  return (
    <>
      <PageHeading>
        <HugeiconsIcon icon={Mic01Icon} size={20} />
        TOP ARTISTS
      </PageHeading>
      <List.Root>
        <List.Content>
          {artists.map((artist, i) => (
            <List.Item
              key={artist.name}
              prefix={<div className="min-w-4">{i + 1}</div>}
              href={artist.url}
            >
              {artist.name}
            </List.Item>
          ))}
        </List.Content>
      </List.Root>
    </>
  );
};

export default Page;

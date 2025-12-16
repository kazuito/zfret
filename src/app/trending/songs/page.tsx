import { List } from "@/components/ui/list";
import PageHeading from "@/components/page-heading";
import { fetchTopSongs } from "@/lib/song";
import { cacheLife } from "next/cache";
import { HugeiconsIcon } from "@hugeicons/react";
import { MusicNote01Icon } from "@hugeicons/core-free-icons";

const Page = async () => {
  "use cache";
  cacheLife("days");

  const songs = await fetchTopSongs({ limit: 100 });

  return (
    <>
      <PageHeading>
        <HugeiconsIcon icon={MusicNote01Icon} size={20} />
        TOP SONGS
      </PageHeading>
      <List.Wrapper>
        <List.Content>
          {songs.map((song, i) => (
            <List.Item
              key={song.id}
              prefix={<div className="min-w-4">{i + 1}</div>}
              href={song.url}
              description={song.artistName}
            >
              {song.title}
            </List.Item>
          ))}
        </List.Content>
      </List.Wrapper>
    </>
  );
};

export default Page;

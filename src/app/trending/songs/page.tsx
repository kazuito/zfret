import { MusicNote02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PageHeading from "@/components/page-heading";
import { List } from "@/components/ui/list";
import { getTopSongs } from "@/lib/song/actions";

const Page = async () => {
  const songs = await getTopSongs({ limit: 100 });

  return (
    <>
      <PageHeading>
        <HugeiconsIcon icon={MusicNote02Icon} size={20} strokeWidth={2.6} />
        TOP SONGS
      </PageHeading>
      <List.Root>
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
      </List.Root>
    </>
  );
};

export default Page;

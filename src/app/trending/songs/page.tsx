import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchTopSongs } from "@/lib/song";
import { AudioLinesIcon } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 86400; // 1 day

const Page = async () => {
  const songs = await fetchTopSongs({ limit: 100 });

  return (
    <>
      <PageHeading>
        <AudioLinesIcon />
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

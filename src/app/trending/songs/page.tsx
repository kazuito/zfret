import { List, ListItem } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchTopSongs } from "@/lib/song";
import { AudioLinesIcon } from "lucide-react";

const Page = async () => {
  const songs = await fetchTopSongs({ limit: 100 });

  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <PageHeading>
        <AudioLinesIcon />
        TOP SONGS
      </PageHeading>
      <List>
        {songs.map((song, i) => (
          <ListItem
            key={song.id}
            prefix={<div className="min-w-4">{i + 1}</div>}
            href={song.url}
            description={song.artistName}
          >
            {song.title}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Page;

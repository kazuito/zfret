import { List, ListItem } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchTopArtists } from "@/lib/song";
import { MicVocalIcon } from "lucide-react";

const Page = async () => {
  const artists = await fetchTopArtists({ limit: 100 });

  return (
    <div className="max-w-3xl mx-auto p-6 pt-0">
      <PageHeading>
        <MicVocalIcon />
        TOP ARTISTS
      </PageHeading>
      <List>
        {artists.map((artist, i) => (
          <ListItem
            key={artist.name}
            prefix={<div className="min-w-4">{i + 1}</div>}
            href={artist.url}
          >
            {artist.name}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Page;

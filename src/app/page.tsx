import { List, ListItem } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import { AudioLinesIcon, MicVocalIcon } from "lucide-react";

export default async function Home() {
  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="p-6 pt-0 max-w-3xl mx-auto flex flex-col">
      <PageHeading>Z-FRET</PageHeading>
      <div className="flex flex-col gap-6">
        <List prefix={<AudioLinesIcon />} title="TOP SONGS">
          {topSongs.map((song, i) => (
            <ListItem
              key={i}
              href={`/song/${song.id}`}
              prefix={<div className="w-6">{i + 1}</div>}
              description={song.artistName}
            >
              {song.title}
            </ListItem>
          ))}
        </List>
        <List prefix={<MicVocalIcon />} title="TOP ARTISTS">
          {topArtists.map((artist, i) => (
            <ListItem
              key={i}
              href={artist.url}
              prefix={<div className="w-6">{i + 1}</div>}
            >
              {artist.name}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

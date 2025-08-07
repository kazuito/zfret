import { List, ListItem } from "@/components/list";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import { AudioLinesIcon, MicVocalIcon, TargetIcon } from "lucide-react";

export default async function Home() {
  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="p-6 pt-0 max-w-3xl mx-auto flex flex-col">
      <div className="sm:h-100 h-60 relative overflow-clip flex items-center justify-center">
        <TargetIcon className="absolute -z-1 w-[min(768px,100vw)] h-auto left-1/2 top-1/2 -translate-1/2 opacity-4" />
        <div>
          <div className="sm:text-5xl font-medium text-4xl">Z-FRET</div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <List prefix={<AudioLinesIcon />} title="TOP SONGS">
          {topSongs.map((song, i) => (
            <ListItem
              key={i}
              href={`/song/${song.id}`}
              prefix={<div className="min-w-4">{i + 1}</div>}
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

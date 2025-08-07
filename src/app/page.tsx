import { List, ListItem } from "@/components/list";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import { AudioLinesIcon, MicVocalIcon } from "lucide-react";

export default async function Home() {
  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <List prefix={<AudioLinesIcon />} title="人気曲ランキング">
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
      <div className="mt-6">
        <List prefix={<MicVocalIcon />} title="人気アーティストランキング">
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

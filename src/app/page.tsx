import { List, ListItem } from "@/components/list";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";

export default async function Home() {
  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <List heading={"人気曲ランキング"}>
        {topSongs.map((song, i) => (
          <ListItem
            key={i}
            href={`/song/${song.id}`}
            prefix={i + 1}
            title={song.title}
            description={song.artistName}
          />
        ))}
      </List>
      <div className="mt-6">
        <List heading={"人気アーティストランキング"}>
          {topArtists.map((artist, i) => (
            <ListItem
              key={i}
              href={artist.url}
              prefix={i + 1}
              title={artist.name}
            />
          ))}
        </List>
      </div>
    </div>
  );
}

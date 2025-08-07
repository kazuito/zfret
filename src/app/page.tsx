import { List } from "@/components/list";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import {
  ArrowRightIcon,
  AudioLinesIcon,
  MicVocalIcon,
  TargetIcon,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="p-6 pt-0 max-w-3xl mx-auto flex flex-col">
      <div className="sm:h-100 h-60 relative overflow-clip flex items-center justify-center">
        <TargetIcon className="absolute -z-1 w-[min(768px,100vw)] h-auto left-1/2 top-1/2 -translate-1/2 opacity-2 dark:opacity-3" />
        <div className="flex flex-col items-start sm:items-center gap-2">
          <div className="sm:text-5xl font-medium text-4xl">
            The Place for Chords
          </div>
          <div>A chord library of Japan Hits</div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <List.Wrapper>
          <List.Header asChild>
            <Link href="/trending/songs" className="w-fit">
              <AudioLinesIcon />
              TOP SONGS
            </Link>
          </List.Header>
          <List.Content>
            {topSongs.map((song, i) => (
              <List.Item
                key={i}
                href={`/song/${song.id}`}
                prefix={<div className="min-w-4">{i + 1}</div>}
                description={song.artistName}
              >
                {song.title}
              </List.Item>
            ))}
          </List.Content>
          <List.Footer>
            <List.FooterLink href="/trending/songs">
              View more top songs
              <ArrowRightIcon />
            </List.FooterLink>
          </List.Footer>
        </List.Wrapper>
        <List.Wrapper>
          <List.Header asChild>
            <Link href="/trending/artists" className="w-fit">
              <MicVocalIcon />
              TOP ARTISTS
            </Link>
          </List.Header>
          <List.Content>
            {topArtists.map((artist, i) => (
              <List.Item
                key={i}
                href={artist.url}
                prefix={<div className="w-6">{i + 1}</div>}
              >
                {artist.name}
              </List.Item>
            ))}
          </List.Content>
          <List.Footer>
            <List.FooterLink href="/trending/artists">
              View more top artists
              <ArrowRightIcon />
            </List.FooterLink>
          </List.Footer>
        </List.Wrapper>
      </div>
    </div>
  );
}

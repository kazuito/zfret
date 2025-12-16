import { List } from "@/components/list";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import {
  ArrowRightIcon,
  AudioLinesIcon,
  MicVocalIcon,
  SearchIcon,
} from "lucide-react";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  "use cache";
  cacheLife("days");

  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="mx-auto flex max-w-5xl flex-col p-6 pt-0">
      <section className="flex flex-col items-center gap-6 py-32">
        <div className="text-center text-3xl font-semibold tracking-tight md:text-4xl/6">
          The Chord Library for Music Lovers
        </div>
        <p className="text-lg">
          Explore chords and lyrics from iconic Japan Hits
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/trending/songs">
              <AudioLinesIcon />
              Top Songs
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">
              <SearchIcon />
              Search
            </Link>
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-6 md:flex-row pb-16">
        <List.Wrapper className="flex-1">
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
        <List.Wrapper className="flex-1">
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
      </section>
    </div>
  );
}

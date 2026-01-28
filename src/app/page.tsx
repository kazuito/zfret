"use cache";

import { List } from "@/components/ui/list";
import { fetchTopArtists, fetchTopSongs } from "@/lib/song";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  MusicNote02Icon,
  Mic01Icon,
  Search01Icon,
  ArrowRightIcon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Home() {
  cacheLife("days");

  const topSongs = await fetchTopSongs();
  const topArtists = await fetchTopArtists();

  return (
    <div className="mx-auto flex max-w-5xl flex-col p-6 pt-0">
      <section className="flex flex-col items-center gap-6 py-20 lg:py-28">
        <div className="text-center text-3xl font-semibold tracking-tight text-balance lg:text-4xl/6">
          The Chord Library for Music Lovers
        </div>
        <p className="text-center text-base text-balance lg:text-lg">
          Explore chords and lyrics from iconic Japan Hits
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/trending/songs">
              <HugeiconsIcon icon={MusicNote02Icon} strokeWidth={2.4} />
              Explore Songs
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">
              <HugeiconsIcon icon={Search01Icon} strokeWidth={2.4} />
              Search
            </Link>
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-6 pb-16 md:flex-row">
        <List.Root className="min-w-0 flex-1">
          <List.Header asChild>
            <Link href="/trending/songs" className="w-fit">
              <HugeiconsIcon icon={MusicNote02Icon} size={20} />
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
              Top Songs
              <HugeiconsIcon icon={ArrowRightIcon} size={20} />
            </List.FooterLink>
          </List.Footer>
        </List.Root>
        <List.Root className="min-w-0 flex-1">
          <List.Header asChild>
            <Link href="/trending/artists" className="w-fit">
              <HugeiconsIcon icon={Mic01Icon} size={20} />
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
              Top Artists
              <HugeiconsIcon icon={ArrowRightIcon} size={20} />
            </List.FooterLink>
          </List.Footer>
        </List.Root>
      </section>
    </div>
  );
}

"use cache";

import {
  ArrowRight01Icon,
  MusicNote02Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  ListContent,
  ListHeader,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
  ListTitle,
} from "@/components/ui/list";
import { getTopArtists, getTopSongs } from "@/lib/song/actions";

export default async function Home() {
  cacheLife("days");

  const topSongs = await getTopSongs({ limit: 10 });
  const topArtists = await getTopArtists({ limit: 10 });

  return (
    <div className="mx-auto flex max-w-5xl flex-col p-6 pt-0">
      <section className="flex flex-col items-center gap-6 py-20 lg:py-28">
        <div className="text-balance text-center font-semibold text-3xl tracking-tight lg:text-4xl/6">
          The Chord Library for Music Lovers
        </div>
        <p className="text-balance text-center text-base lg:text-lg">
          Explore chords and lyrics from iconic Japan Hits
        </p>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/trending/songs">
              <Icon icon={MusicNote02Icon} strokeWidth={2.4} />
              Explore Songs
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/search">
              <Icon icon={Search01Icon} strokeWidth={2.4} />
              Search
            </Link>
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-6 pb-16 md:flex-row">
        <ListRoot className="min-w-0 flex-1">
          <ListHeader>
            <ListTitle asChild>
              <Link href="/trending/songs">
                TOP SONGS
                <Icon icon={ArrowRight01Icon} strokeWidth={2.4} />
              </Link>
            </ListTitle>
          </ListHeader>
          <ListContent>
            {topSongs.map((song, i) => (
              <ListItemLink key={song.id} href={song.url}>
                <div className="-ml-2 w-8 text-center font-bold text-muted-foreground text-xl/0 italic">
                  {i + 1}
                </div>
                <ListItemTitle>{song.title}</ListItemTitle>
                <ListItemSubtitle>{song.artistName}</ListItemSubtitle>
              </ListItemLink>
            ))}
          </ListContent>
        </ListRoot>
        <ListRoot className="min-w-0 flex-1">
          <ListHeader>
            <ListTitle asChild>
              <Link href="/trending/artists">
                TOP ARTISTS
                <Icon icon={ArrowRight01Icon} strokeWidth={2.4} />
              </Link>
            </ListTitle>
          </ListHeader>
          <ListContent>
            {topArtists.map((artist, i) => (
              <ListItemLink key={artist.name} href={artist.url}>
                <div className="-ml-2 w-8 text-center font-bold text-muted-foreground text-xl/0 italic">
                  {i + 1}
                </div>
                <ListItemTitle>{artist.name}</ListItemTitle>
              </ListItemLink>
            ))}
          </ListContent>
        </ListRoot>
      </section>
    </div>
  );
}

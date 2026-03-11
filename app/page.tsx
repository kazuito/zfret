"use cache";

import { cacheLife } from "next/cache";
import { HeroSection } from "./_components/hero-section";
import { TopArtistList } from "./_components/top-artist-list";
import { TopSongList } from "./_components/top-song-list";

export default async function Home() {
  cacheLife("days");

  return (
    <div className="mx-auto flex max-w-5xl flex-col p-6 pt-0">
      <HeroSection />
      <div className="flex flex-col gap-12 pb-16">
        <TopSongList />
        <TopArtistList />
      </div>
    </div>
  );
}

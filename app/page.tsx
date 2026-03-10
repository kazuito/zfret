import { HeroSection } from "./_components/hero-section";
import { TopArtistList } from "./_components/top-artist-list";
import { TopSongList } from "./_components/top-song-list";

export default async function Home() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col p-6 pt-0">
      <HeroSection />
      <section className="flex flex-col gap-6 pb-16 md:flex-row">
        <TopSongList />
        <TopArtistList />
      </section>
    </div>
  );
}

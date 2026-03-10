import { MusicNote02Icon, Search01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
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
  );
};

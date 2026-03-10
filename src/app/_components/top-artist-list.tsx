import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/icon";
import {
  ListContent,
  ListHeader,
  ListItemLink,
  ListItemTitle,
  ListRoot,
  ListTitle,
} from "@/components/ui/list";
import { getTopArtists } from "@/lib/song/actions";

export const TopArtistList = async () => {
  const topArtists = await getTopArtists({ limit: 10 });

  return (
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
  );
};

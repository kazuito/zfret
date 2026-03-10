import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { Icon } from "@/components/icon";
import {
  ListContent,
  ListHeader,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
  ListTitle,
} from "@/components/ui/list";
import { getTopSongs } from "@/lib/song/actions";

export const TopSongList = async () => {
  const topSongs = await getTopSongs({ limit: 10 });

  return (
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
  );
};

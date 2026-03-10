import { MusicNote02Icon } from "@hugeicons/core-free-icons";
import { HeadingRoot, HeadingTitle } from "@/components/heading";
import { Icon } from "@/components/icon";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { getTopSongs } from "../../../features/song/actions";

const Page = async () => {
  const songs = await getTopSongs({ limit: 100 });

  return (
    <>
      <HeadingRoot>
        <HeadingTitle>
          <Icon icon={MusicNote02Icon} />
          TOP SONGS
        </HeadingTitle>
      </HeadingRoot>
      <ListRoot>
        <ListContent>
          {songs.map((song, i) => (
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
    </>
  );
};

export default Page;

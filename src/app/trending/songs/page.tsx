import { MusicNote02Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import PageHeading from "@/components/page-heading";
import {
  ListContent,
  ListItemLink,
  ListItemSubtitle,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { getTopSongs } from "@/lib/song/actions";

const Page = async () => {
  const songs = await getTopSongs({ limit: 100 });

  return (
    <>
      <PageHeading>
        <Icon icon={MusicNote02Icon} size={20} strokeWidth={2.6} />
        TOP SONGS
      </PageHeading>
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

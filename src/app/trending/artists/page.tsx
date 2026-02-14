import { Mic01Icon } from "@hugeicons/core-free-icons";
import { HeadingRoot, HeadingTitle } from "@/components/heading";
import { Icon } from "@/components/icon";
import { ListContent, ListItemLink, ListRoot } from "@/components/ui/list";
import { getTopArtists } from "@/lib/song/actions";

const Page = async () => {
  const artists = await getTopArtists({ limit: 100 });

  return (
    <>
      <HeadingRoot>
        <HeadingTitle>
          <Icon icon={Mic01Icon} size={20} strokeWidth={2.6} />
          TOP ARTISTS
        </HeadingTitle>
      </HeadingRoot>
      <ListRoot>
        <ListContent>
          {artists.map((artist, i) => (
            <ListItemLink key={artist.name} href={artist.url}>
              <div className="-ml-2 w-8 text-center font-bold text-muted-foreground text-xl/0 italic">
                {i + 1}
              </div>
              {artist.name}
            </ListItemLink>
          ))}
        </ListContent>
      </ListRoot>
    </>
  );
};

export default Page;

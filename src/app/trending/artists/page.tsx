import { Mic01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PageHeading from "@/components/page-heading";
import { ListContent, ListItemLink, ListRoot } from "@/components/ui/list";
import { getTopArtists } from "@/lib/song/actions";

const Page = async () => {
  const artists = await getTopArtists({ limit: 100 });

  return (
    <>
      <PageHeading>
        <HugeiconsIcon icon={Mic01Icon} size={20} strokeWidth={2.6} />
        TOP ARTISTS
      </PageHeading>
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

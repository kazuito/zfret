import { User03Icon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import AddHistory from "@/components/add-history";
import { ClientOnly } from "@/components/client-only";
import { Icon } from "@/components/icon";
import PageHeading from "@/components/page-heading";
import {
  ListContent,
  ListItemLink,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { getArtistSongs } from "@/lib/song/actions";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export async function generateStaticParams() {
  return [{ name: "あいみょん" }];
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { name } = await params;
  return {
    title: `${decodeURIComponent(name)} | Z-FRET`,
  };
};

const Page = async ({ params }: Props) => {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const songs = await getArtistSongs({
    name: decodedName,
  });

  const historyItem = {
    type: "artist" as const,
    name: decodedName,
    link: `/artist/${name}`,
  };

  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <ClientOnly>
        <AddHistory item={historyItem} />
      </ClientOnly>
      <PageHeading
        startContent={
          <div className="mr-3 grid size-8 place-content-center rounded-full bg-secondary text-muted-foreground sm:mr-4 sm:size-10 dark:bg-secondary/50">
            <Icon
              className="size-5 sm:size-6"
              icon={User03Icon}
              fill="currentColor"
            />
          </div>
        }
      >
        {decodedName}
      </PageHeading>
      <div>
        <ListRoot>
          <ListContent>
            {songs.map((song) => {
              return (
                <ListItemLink href={song.url} key={song.id}>
                  <ListItemTitle>{song.title}</ListItemTitle>
                </ListItemLink>
              );
            })}
          </ListContent>
        </ListRoot>
      </div>
    </div>
  );
};

export default Page;

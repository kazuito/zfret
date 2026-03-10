"use cache";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { cacheLife } from "next/cache";
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
import { getRelatedSongs } from "@/features/song/actions";

export const RelatedSongList = async ({
  artistName,
  songId,
  ...props
}: {
  artistName: string;
  songId: string;
} & React.ComponentProps<typeof ListRoot>) => {
  cacheLife("weeks");

  const relatedSongs = await getRelatedSongs({
    artistName,
    songId,
    limit: 10,
  });

  if (relatedSongs.length === 0) {
    return null;
  }

  return (
    <ListRoot {...props}>
      <ListHeader>
        <ListTitle asChild>
          <Link href={`/artist/${artistName}`} className="w-fit">
            {artistName}
            <Icon icon={ArrowRight01Icon} />
          </Link>
        </ListTitle>
      </ListHeader>
      <ListContent>
        {relatedSongs.map((relatedSong) => {
          return (
            <ListItemLink key={relatedSong.id} href={relatedSong.url}>
              <ListItemTitle>{relatedSong.title}</ListItemTitle>
            </ListItemLink>
          );
        })}
      </ListContent>
    </ListRoot>
  );
};

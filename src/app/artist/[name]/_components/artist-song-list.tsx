import {
  ListContent,
  ListItemLink,
  ListItemTitle,
  ListRoot,
} from "@/components/ui/list";
import { getArtistSongs } from "@/lib/song/actions";

export const ArtistSongList = async ({
  artistName,
}: {
  artistName: string;
}) => {
  const songs = await getArtistSongs({
    name: artistName,
  });
  return (
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
  );
};

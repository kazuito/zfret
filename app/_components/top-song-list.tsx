import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTopSongs } from "@/features/song/actions";
import { hashLinearGradient } from "@/lib/hash-gradient";
import {
  ExhibitionContent,
  ExhibitionHeader,
  ExhibitionItem,
  ExhibitionRoot,
  ExhibitionTitle,
} from "./exhibition";

export const TopSongList = async () => {
  const topSongs = await getTopSongs({ limit: 10 });

  return (
    <ExhibitionRoot>
      <ExhibitionHeader>
        <ExhibitionTitle>Top Songs</ExhibitionTitle>
      </ExhibitionHeader>
      <ExhibitionContent>
        {topSongs.map((song, i) => (
          <ExhibitionItem key={song.id} asChild>
            <Link href={`/song/${song.id}`} prefetch={false}>
              <Card className="m-px w-70 pt-0">
                <div
                  className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl bg-neutral-800/40"
                  style={{
                    backgroundImage: hashLinearGradient(
                      song.title + song.artistName,
                    ),
                  }}
                >
                  <div className="absolute inset-0 rounded-3xl backdrop-blur-xl"></div>
                </div>
                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">No.{i + 1}</Badge>
                  </CardAction>
                  <CardTitle>{song.title}</CardTitle>
                  <CardDescription>{song.artistName}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </ExhibitionItem>
        ))}
      </ExhibitionContent>
    </ExhibitionRoot>
  );
};

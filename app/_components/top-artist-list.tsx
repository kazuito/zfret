import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card";
import { getTopArtists } from "@/features/song/actions";
import { bgHashGradient } from "@/lib/hash-gradient";
import {
  ExhibitionContent,
  ExhibitionHeader,
  ExhibitionItem,
  ExhibitionRoot,
  ExhibitionTitle,
} from "./exhibition";

export const TopArtistList = async () => {
  const topArtists = await getTopArtists({ limit: 10 });

  return (
    <ExhibitionRoot>
      <ExhibitionHeader>
        <ExhibitionTitle>Top Artists</ExhibitionTitle>
      </ExhibitionHeader>
      <ExhibitionContent>
        {topArtists.map((artist, i) => (
          <ExhibitionItem key={artist.name} asChild>
            <Link href={`/artist/${artist.name}`} prefetch={false}>
              <Card className="w-70 pt-0">
                <div
                  className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl bg-neutral-800/40"
                  style={bgHashGradient(artist.name)}
                >
                  <div className="absolute inset-0 rounded-3xl backdrop-blur-xl"></div>
                </div>
                <CardHeader>
                  <CardAction>
                    <Badge variant="secondary">No.{i + 1}</Badge>
                  </CardAction>
                  <CardTitle>{artist.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </ExhibitionItem>
        ))}
      </ExhibitionContent>
    </ExhibitionRoot>
  );
};

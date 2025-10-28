import { List } from "@/components/list";
import PageHeading from "@/components/page-heading";
import { fetchTopArtists } from "@/lib/song";
import { MicVocalIcon } from "lucide-react";

export const dynamic = "force-static";
export const revalidate = 86400; // 1 day

const Page = async () => {
  const artists = await fetchTopArtists({ limit: 100 });

  return (
    <>
      <PageHeading>
        <MicVocalIcon />
        TOP ARTISTS
      </PageHeading>
      <List.Wrapper>
        <List.Content>
          {artists.map((artist, i) => (
            <List.Item
              key={artist.name}
              prefix={<div className="min-w-4">{i + 1}</div>}
              href={artist.url}
            >
              {artist.name}
            </List.Item>
          ))}
        </List.Content>
      </List.Wrapper>
    </>
  );
};

export default Page;

import { Mic01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import PageHeading from "@/components/page-heading";
import { List } from "@/components/ui/list";
import { getTopArtists } from "@/lib/song/actions";

const Page = async () => {
  const artists = await getTopArtists({ limit: 100 });

  return (
    <>
      <PageHeading>
        <HugeiconsIcon icon={Mic01Icon} size={20} strokeWidth={2.6} />
        TOP ARTISTS
      </PageHeading>
      <List.Root>
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
      </List.Root>
    </>
  );
};

export default Page;

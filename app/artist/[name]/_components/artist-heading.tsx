import { User03Icon } from "@hugeicons/core-free-icons";
import { HeadingRoot, HeadingTitle } from "../../../../components/heading";
import { Icon } from "../../../../components/icon";

export const ArtistHeading = ({ artistName }: { artistName: string }) => {
  return (
    <HeadingRoot>
      <HeadingTitle>
        <div className="mr-2 grid size-8 place-content-center rounded-full bg-secondary text-muted-foreground sm:size-10 dark:bg-secondary/50">
          <Icon
            className="size-5 sm:size-6"
            icon={User03Icon}
            fill="currentColor"
          />
        </div>
        {artistName}
      </HeadingTitle>
    </HeadingRoot>
  );
};

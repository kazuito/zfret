import { FavouriteIcon } from "@hugeicons/core-free-icons";
import { Suspense } from "react";
import {
  HeadingContent,
  HeadingRoot,
  HeadingSuffix,
  HeadingTitle,
} from "@/components/heading";
import { Icon } from "@/components/icon";
import { FavList } from "./_components/fav-list";
import { FavSort } from "./_components/fav-sort";

export const instant = false;

const Page = () => {
  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <HeadingRoot>
        <HeadingContent>
          <HeadingTitle>
            <Icon icon={FavouriteIcon} />
            Favorites
          </HeadingTitle>
        </HeadingContent>
        <HeadingSuffix>
          <Suspense>
            <FavSort />
          </Suspense>
        </HeadingSuffix>
      </HeadingRoot>
      <Suspense>
        <FavList />
      </Suspense>
    </div>
  );
};

export default Page;

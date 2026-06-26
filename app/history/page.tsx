"use client";

import {
  Clock02Icon,
} from "@hugeicons/core-free-icons";
import {
  HeadingContent,
  HeadingRoot,
  HeadingSuffix,
  HeadingTitle,
} from "@/components/heading";
import { Icon } from "@/components/icon";
import { HistoryList } from "./_components/history-list";
import { HistoryMenu } from "./_components/history-menu";

const Page = () => {
  return (
    <div className="mx-auto max-w-3xl p-6 pt-0">
      <HeadingRoot>
        <HeadingContent>
          <HeadingTitle>
            <Icon icon={Clock02Icon} size={20} strokeWidth={2.6} />
            History
          </HeadingTitle>
        </HeadingContent>
        <HeadingSuffix>
          <HistoryMenu />
        </HeadingSuffix>
      </HeadingRoot>
      <HistoryList />
    </div>
  );
};

export default Page;

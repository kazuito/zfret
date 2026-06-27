"use client";

import {
  GoBackward10SecIcon,
  GoForward10SecIcon,
  MenuIcon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TransposeControl } from "./transpose-control";
import { useVideoPlayer } from "./video-player";

export const SongControls = () => {
  const {
    state: { isPlaying, isStarted },
    action: { setIsPlaying, skip },
  } = useVideoPlayer();

  return (
    <div
      className={cn(
        "flex starting:scale-90 items-center gap-1 rounded-full border border-border/60 bg-background/40 p-1 starting:opacity-0 backdrop-blur-sm transition",
      )}
    >
      {isStarted && (
        <>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-12 rounded-full active:scale-90"
              onClick={() => skip(-10)}
            >
              <Icon icon={GoBackward10SecIcon} className="size-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-12 rounded-full active:scale-90"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Icon
                  icon={PauseIcon}
                  fill="currentColor"
                  strokeWidth={0}
                  className="size-8"
                />
              ) : (
                <Icon
                  icon={PlayIcon}
                  fill="currentColor"
                  strokeWidth={0}
                  className="size-8"
                />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-12 rounded-full active:scale-90"
              onClick={() => skip(10)}
            >
              <Icon icon={GoForward10SecIcon} className="size-6" />
            </Button>
          </div>
          <Separator orientation="vertical" className="my-2" />
        </>
      )}
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              className="size-12 rounded-full active:*:scale-90"
            />
          }
        >
          <Icon icon={MenuIcon} className="size-6 transition" />
        </PopoverTrigger>
        <PopoverContent className="w-fit" align="end">
          <TransposeControl />
        </PopoverContent>
      </Popover>
    </div>
  );
};

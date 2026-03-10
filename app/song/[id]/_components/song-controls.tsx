"use client";

import {
  GoBackward10SecIcon,
  GoForward10SecIcon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVideoPlayer } from "./video-player";

export const SongControls = () => {
  const { playing, setPlaying, skip, enabled } = useVideoPlayer();

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-border/60 bg-background/40 p-3 backdrop-blur-sm",
        !enabled && "hidden",
      )}
    >
      <Button
        variant="ghost"
        size="icon-lg"
        className="active:scale-90"
        onClick={() => skip(-10)}
      >
        <Icon icon={GoBackward10SecIcon} className="size-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon-lg"
        className="active:scale-90"
        onClick={() => setPlaying(!playing)}
      >
        {playing ? (
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
        className="active:scale-90"
        onClick={() => skip(10)}
      >
        <Icon icon={GoForward10SecIcon} className="size-6" />
      </Button>
    </div>
  );
};

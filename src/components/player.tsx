"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  PlayCircle02Icon,
  PlayIcon,
  Tap07Icon,
} from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  youtubeVideoId: string;
};

const Player = ({ youtubeVideoId }: Props) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="border-border/60 bg-secondary/30 w-full rounded-xl border p-1 sm:w-fit">
      <div className="flex aspect-video w-full items-center overflow-clip rounded-lg sm:w-lg">
        {showPlayer ? (
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
            controls
            className="h-full! w-full!"
            autoPlay
            playing={playing}
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          <button
            className="relative h-full w-full cursor-pointer overflow-clip"
            onClick={() => {
              setShowPlayer(true);
              setPlaying(true);
            }}
          >
            <div className="absolute inset-0 z-10 grid place-content-center">
              <div className="flex items-center gap-1.5 rounded-full bg-black/50 py-1 ps-2.5 pe-3 text-sm backdrop-blur-sm">
                <HugeiconsIcon icon={Tap07Icon} className="size-4.5" />
                Click to play
              </div>
            </div>
            <Image
              alt="YouTube Thumbnail"
              src={`https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`}
              fill
              sizes="(min-width: 640px) 640px, 100vw"
              className="object-cover blur-xs brightness-75"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Player;

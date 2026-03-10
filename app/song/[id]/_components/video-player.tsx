"use client";

import { Tap07Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Icon } from "@/components/icon";

export const VideoPlayer = ({ youtubeVideoId }: { youtubeVideoId: string }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="w-full rounded-xl border border-border/60 bg-secondary/30 p-1 sm:w-fit">
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
              <div className="flex items-center gap-1.5 rounded-full bg-black/50 py-1 ps-2.5 pe-3 text-sm text-white backdrop-blur-sm">
                <Icon icon={Tap07Icon} className="size-4.5" />
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

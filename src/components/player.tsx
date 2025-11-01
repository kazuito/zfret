"use client";

import { PlayIcon } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  youtubeVideoId: string;
};

const Player = ({ youtubeVideoId }: Props) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="border-border/60 bg-secondary/30 w-full rounded-md border p-1 sm:w-fit">
      <div className="group/player flex aspect-video w-full items-center overflow-clip rounded-sm sm:w-lg">
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
            className="relative h-full w-full cursor-pointer"
            onClick={() => {
              setShowPlayer(true);
              setPlaying(true);
            }}
          >
            <div className="bg-background/80 absolute inset-0 grid place-content-center backdrop-blur-xs">
              <div className="flex flex-col items-center gap-4">
                <PlayIcon
                  className="size-8 transition group-hover/player:scale-120 group-active/player:scale-90"
                  fill="currentColor"
                />
              </div>
            </div>
            <img
              alt="YouTube Thumbnail"
              src={`https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`}
              sizes="(min-width: 640px) 640px, 100vw"
              className="object-cover"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Player;

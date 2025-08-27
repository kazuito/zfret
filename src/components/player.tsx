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
    <div className="p-1 border border-border/60 rounded-md bg-secondary/30 sm:w-fit w-full">
      <div className="w-full sm:w-lg aspect-video flex items-center rounded-sm overflow-clip group/player">
        {showPlayer ? (
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
            controls
            className="w-full! h-full!"
            autoPlay
            playing={playing}
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        ) : (
          <button
            className="w-full h-full relative cursor-pointer"
            onClick={() => {
              setShowPlayer(true);
              setPlaying(true);
            }}
          >
            <div className="absolute inset-0 grid place-content-center bg-background/80 backdrop-blur-xs">
              <div className="flex flex-col items-center gap-4">
                <PlayIcon
                  className="size-8 group-hover/player:scale-120 transition group-active/player:scale-90"
                  fill="currentColor"
                />
              </div>
            </div>
            <img
              alt="YouTube Thumbnail"
              src={`https://img.youtube.com/vi/${youtubeVideoId}/mqdefault.jpg`}
              className="w-full h-full"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Player;

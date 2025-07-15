"use client";

import { PlayIcon, YoutubeIcon } from "lucide-react";
import { useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  youtubeVideoId: string;
};

const Player = ({ youtubeVideoId }: Props) => {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="">
      <div className="w-full sm:w-lg aspect-video flex items-center rounded-md overflow-clip">
        {showPlayer ? (
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
            controls
            className="w-full! h-full!"
            autoPlay
          />
        ) : (
          <button
            className="w-full h-full relative"
            onClick={() => setShowPlayer(true)}
          >
            <div className="absolute inset-0 grid place-content-center bg-background/80">
              <div className="flex flex-col items-center gap-4">
                <PlayIcon className="size-8" fill="currentColor" />
              </div>
            </div>
            <img
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

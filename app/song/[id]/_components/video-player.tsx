"use client";

import { Tap07Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Icon } from "@/components/icon";

type VideoPlayerState = {
  enabled: boolean;
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  skip: (sec: number) => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
};

const videoPlayerContext = createContext<VideoPlayerState | null>(null);

export const VideoPlayerProvider = ({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) => {
  const [playing, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const skip = (sec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime += sec;
  };

  return (
    <videoPlayerContext.Provider
      value={{ playing, setPlaying: setIsPlaying, videoRef, skip, enabled }}
    >
      {children}
    </videoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => {
  const context = useContext(videoPlayerContext);
  if (!context) {
    throw new Error("useVideoPlayer must be used within a VideoPlayerProvider");
  }
  return context;
};

export const VideoPlayer = ({ youtubeVideoId }: { youtubeVideoId: string }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const { playing, setPlaying, videoRef } = useVideoPlayer();

  useEffect(() => {
    if (playing) {
      setShowPlayer(true);
    }
  }, [playing]);

  return (
    <div className="w-full rounded-xl border border-border/60 bg-secondary/30 p-1 sm:w-fit">
      <div className="flex aspect-video w-full items-center overflow-clip rounded-lg sm:w-lg">
        {showPlayer ? (
          <ReactPlayer
            ref={videoRef}
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
            onClick={() => setPlaying(true)}
          >
            <div className="absolute inset-0 z-10 grid place-content-center">
              <div className="flex items-center gap-1.5 rounded-full bg-black/60 py-1 ps-2.5 pe-3 text-sm text-white backdrop-blur-sm">
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

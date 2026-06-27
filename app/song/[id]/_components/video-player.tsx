"use client";

import { Tap07Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import YouTube, { type YouTubePlayer } from "react-youtube";
import { Icon } from "@/components/icon";

type VideoPlayerContextValue = {
  state: {
    isEnabled: boolean;
    isStarted: boolean;
    isPlaying: boolean;
  };
  action: {
    setIsPlaying: (playing: boolean) => void;
    skip: (sec: number) => void;
  };
  meta: {
    playerRef: React.RefObject<YouTubePlayer | null>;
  };
};

const videoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

export const VideoPlayerProvider = ({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const skip = async (sec: number) => {
    const player = playerRef.current;
    if (!player) return;
    const current = await player.getCurrentTime();
    player.seekTo(current + sec, true);
  };

  useEffect(() => {
    if (isPlaying) {
      setIsStarted(true);
      playerRef.current?.playVideo();
    } else {
      playerRef.current?.pauseVideo();
    }
  }, [isPlaying]);

  return (
    <videoPlayerContext.Provider
      value={{
        state: {
          isEnabled: enabled,
          isStarted,
          isPlaying,
        },
        action: {
          setIsPlaying,
          skip,
        },
        meta: {
          playerRef,
        },
      }}
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
  const {
    state: { isPlaying },
    action: { setIsPlaying },
    meta: { playerRef },
  } = useVideoPlayer();

  useEffect(() => {
    if (isPlaying) {
      setShowPlayer(true);
    }
  }, [isPlaying]);

  return (
    <div className="w-full rounded-xl border border-border/60 bg-secondary/30 p-1 sm:w-fit">
      <div className="flex aspect-video w-full items-center overflow-clip rounded-lg sm:w-lg">
        {showPlayer ? (
          <YouTube
            videoId={youtubeVideoId}
            className="h-full w-full"
            iframeClassName="h-full w-full"
            opts={{
              width: "100%",
              height: "100%",
              playerVars: { autoplay: 1, controls: 1 },
            }}
            onReady={(event) => {
              playerRef.current = event.target;
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        ) : (
          <button
            className="relative h-full w-full cursor-pointer overflow-clip"
            onClick={() => setIsPlaying(true)}
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
              className="size-full object-cover blur-sm brightness-75"
              width={100}
              height={100}
              loading="eager"
            />
          </button>
        )}
      </div>
    </div>
  );
};

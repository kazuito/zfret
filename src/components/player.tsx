"use client";

import ReactPlayer from "react-player";

type Props = {
  youtubeVideoId: string;
};

const Player = ({ youtubeVideoId }: Props) => {
  return (
    <ReactPlayer
      src={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
      controls
      className="w-full! h-full! aspect-video! rounded-md overflow-clip"
    />
  );
};

export default Player;

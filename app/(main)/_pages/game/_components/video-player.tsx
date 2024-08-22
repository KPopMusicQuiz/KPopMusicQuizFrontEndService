import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

import { YouTubeConfig } from 'react-player/youtube';

const YOUTUBE_VIDEO_BASE_URL = "https://www.youtube.com/watch";

interface YoutubePlayerConfigProps {
  start: number;
  end?: number;
};

const YoutubePlayerConfig = ({
  start,
  end,
}: YoutubePlayerConfigProps): YouTubeConfig => {
  return {
    // https://developers.google.com/youtube/player_parameters#Parameters
    playerVars: {
      cc_load_policy: 0, // disable subitles
      iv_load_policy: 3, // disable annotations
      controls: 0,       // hides controls
      disablekb: 1,      // disable keyboard interactions
      showinfo: 1,
      start,
      end,
    },
  };
};

interface VideoPlayerProps {
  videoId: string;
  volume: number;
}

const VideoPlayer = ({
  videoId,
  volume,
}: VideoPlayerProps) => {
  const [mounted, setMounted] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const url = new URL(YOUTUBE_VIDEO_BASE_URL);
  url.searchParams.set("v", videoId);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="relative mx-auto" tabIndex={-1}>
      <ReactPlayer
        url={url.toString()}
        playing={true}
        controls={false}
        pip={false}
        volume={volume}
        playbackRate={1}
        width={640}
        height={360}
        config={YoutubePlayerConfig({
          start: 0,
        })}
      />

      <div
        className={cn(
          "absolute inset-0 bg-black cursor-pointer transition-opacity duration-500 ease-in-out",
          { "opacity-100" : isOverlayVisible, "opacity-0 pointer-events-none" : !isOverlayVisible },
        )}
        onClick={toggleOverlay}
        style={{ userSelect: "none" }}
      >
        <p className="text-white text-center text-lg mt-[40%]">Click to Reveal Video</p>
      </div>
      {!isOverlayVisible && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={toggleOverlay}
        ></div>
      )}
    </div>
  );
};

export default VideoPlayer;
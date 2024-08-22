"use client";

import { FaFlag, FaRegThumbsDown, FaRegThumbsUp, FaYoutube } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface SongInfoProps {
  songName: string;
  aritstName: string;
  releaseYear: string;
  videoLink: string;
  viewCount: number;
}

const SongInfo = ({
  songName,
  aritstName,
  releaseYear,
  videoLink,
  viewCount,
}: SongInfoProps) => {
  const url = new URL("https://www.youtube.com/watch");
  url.searchParams.set("v", videoLink);

  return (
    <Card className="w-56 bg-neutral-800 shadow-lg p-2 text-white">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-center">
          Song Info
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-center">
          <div>
            <p className="text-sm font-bold">Song Name</p>
            <p className="text-base">{songName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Artist</p>
            <p className="text-base">{aritstName}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Release Year</p>
            <p className="text-base">{releaseYear}</p>
          </div>
          <div>
            <p className="text-sm font-bold">Views</p>
            <p className="text-base">{formatNumber(viewCount)}</p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <FaYoutube className="text-lg" />
            <a target="_blank" href={url.toString()} rel="noopener noreferrer" className="text-blue-400 hover:underline">
              Youtube
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full justify-between items-center bg-neutral-700 rounded-lg p-2 space-x-2">
        <div className="flex space-x-2">
          <Button className="p-2 rounded-full bg-neutral-600 hover:bg-neutral-500">
            <FaRegThumbsUp />
          </Button>
          <Button className="p-2 rounded-full bg-neutral-600 hover:bg-neutral-500">
            <FaRegThumbsDown />
          </Button>
        </div>
        <Button className="flex items-center space-x-2 bg-neutral-600 hover:bg-neutral-500 px-3 py-1 rounded-lg">
          <FaFlag />
          <span>Report</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SongInfo;

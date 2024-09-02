"use client";

import { useState } from "react";
import GameNavBar from "./game-navbar";
import MembersList from "./_components/members-list";
import GameQuizContainer from "./game-quiz-container";

const GamePage = () => {

  const [volume, setVolume] = useState(0.1); // Initial volume set to 10%

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <>
      <GameNavBar volume={volume} handleVolumeChange={handleVolumeChange} />
      <div className="flex min-h-full w-full relative flex flex-col items-center space-y-[8%]">
        <GameQuizContainer volume={volume} />
        <MembersList />
      </div>
    </>
  );
};


export default GamePage;
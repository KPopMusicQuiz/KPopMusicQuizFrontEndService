"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import LandingPage from "./_pages/landing/landing-page";
import MainPage from "./_pages/mainmenu/mainmenu-page";
import GamePage from "./_pages/game/game-page";
import LobbyFinder from "./_pages/lobbyfinder/lobby-finder";
import { useState } from "react";

const Main = () => {
  const user = useCurrentUser();
  const [isLobbyFinderOpen, setLobbyFinderOpen] = useState(true);

  return (
    <>
    <LandingPage />
      {!!!user?.id && <LandingPage />}
      {!!user?.id &&
        <>
          {/* <GamePage /> */}
          {/* <LobbyFinder isChatOpen={isLobbyFinderOpen} /> */}
        </>
      }
    </>
  );
};

export default Main;

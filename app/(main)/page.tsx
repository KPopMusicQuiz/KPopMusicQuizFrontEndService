"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import LoginPage from "./_pages/login/login-page";
import MainPage from "./_pages/mainmenu/mainmenu-page";
import GamePage from "./_pages/game/game-page";
import LobbyFinder from "./_pages/lobbyfinder/lobby-finder";
import { useState } from "react";

const Home = () => {
  const user = useCurrentUser();
  const [isLobbyFinderOpen, setLobbyFinderOpen] = useState(true);

  return (
    <>
      {!!!user?.id && <LoginPage />}
      {!!user?.id &&
        <>
          <GamePage />
          {/* <LobbyFinder isChatOpen={isLobbyFinderOpen} /> */}
        </>
      }
    </>
  );
};

export default Home;

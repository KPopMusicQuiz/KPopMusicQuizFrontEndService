"use client";

import { useState } from "react";
import LobbyItem from "./lobby-item";


const LobbiesList = ({ lobbies }) => {
  const [selectedLobby, setSelectedLobby] = useState(-1);

  return (
    <div className="flex flex-1 flex-col overflow-y-auto h-[90%] w-full p-4 space-y-2 relative custom-scrollbar">
      {lobbies.map((lobby, index) => (
          <LobbyItem
            key={index}
            onClick={() => setSelectedLobby(index)}
            selected={selectedLobby === index}
            {...lobby}
          />
        ))}
    </div>
  );
};

export default LobbiesList;

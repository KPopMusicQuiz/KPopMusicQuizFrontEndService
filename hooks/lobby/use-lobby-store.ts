import { create } from "zustand";

export type Lobby = {
  id: string;
  name: string;
  password: string | null;
  host: string;
  players: { name: string }[];
  status: "Open" | "InGame";
  config: LobbyConfig;
};

export type LobbyConfig = {
  yearRange: string[];
  ost: boolean;
  teams: boolean;
};

interface LobbyStore {
  activeLobby: Lobby | null;
  switchLobby: (lobby: Lobby) => void;
  exitLobby: () => void;

};

export const useLobby = create<LobbyStore>((set) => ({
  activeLobby: null,
  switchLobby: (lobby) => set((state) => ({
    activeLobby: lobby,
  })),
  exitLobby: () => set(() => ({ activeLobby: null })),

}));

// click once to toggle lobby item and another click on the toggled item prompts join
/**
 * Lobby Schema
 * id
 * name
 * password?
 * status In-Game | Open(Full client side if filled)
 * profile Profile[] maybe abstract away to a different object just to handle ingame sesisons
 * config LobbyConfig or just string vals
 * hostProfileId
 */
/**
 * Lobby Item details on frontend
 * lobby name
 * status Open | Open (Private) | Full | In-Game (greenopen, redfull, yellowingame)
 * # of people (color change if friend exists)
 * Year Range
 * OSTs included tag if so
 * host name /// hosted by
 * onclick show lob detail on the right with option to join / spectate
 */
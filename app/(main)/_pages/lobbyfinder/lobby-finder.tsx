"use client";

import { motion } from "framer-motion";
import { RxMagnifyingGlass } from "react-icons/rx";

import { cn } from "@/lib/utils";
import LobbyDetail from "./_components/lobby-detail";
import LobbiesList from "./_components/lobbies-list";
import { Input } from "@/components/ui/input";


const LobbyFinder = ({ isChatOpen }) => {
  return (
    <motion.div
      className={cn(
        "dark:bg-gray-900 text-white overflow-y-auto shadow-lg rounded-lg relative \
           w-[90%] h-[90%] flex",
        isChatOpen ? "" : "",
      )}
      initial={{ y: "150%" }}
      animate={{ y: isChatOpen ? 0 : "150%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col w-[60%] h-full p-4 relative">
        <nav className="flex flex-col w-full h-[10%] mb-4">
          <div className="flex justify-between pl-4">
            <h2 className="text-3xl font-bold mb-6">Multiplayer Lounge</h2>
            <button className="bg-green-600 hover:bg-green-500 text-white py-2 w-28 rounded-lg mb-6">
              Create room
            </button>
          </div>
          <div className="flex">
            <div className="relative w-[90%] px-4">
              <Input
                className="w-full rounded-full text-sm text-white pr-10 focus:outline-none"
                type="text"
                placeholder="Search lobbies here..."
              />
              <RxMagnifyingGlass className="absolute right-4 top-0 m-3" />
            </div>
            <button className="w-28 bg-yellow-600 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg mb-6">
              Refresh
            </button>
          </div>
        </nav>
        <LobbiesList lobbies={lobbies} />
      </div>
      <div className="flex w-[40%] relative">
        <LobbyDetail />
      </div>
    </motion.div>
  );
};

export const lobbies = [
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
  {
    title: "room name",
    host: "blish",
    players: [
      { name: 'Player1', avatar: 'https://via.placeholder.com/40' },
      { name: 'Player2', avatar: 'https://via.placeholder.com/40' },
    ],
    password: "1234",
    config: {
      year: ["2014", "2024"],
      ost: true,
      teams: true,
    }
  },
];

export default LobbyFinder;

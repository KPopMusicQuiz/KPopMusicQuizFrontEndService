"use client";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface StandingsProps {
  userData: {
    userName: string;
    currentScore: number;
  }[];
}

const Standings = ({
  userData,
}: StandingsProps) => {
  return (
    <Card className="w-48 bg-neutral-800 rounded-lg shadow-lg relative text-white px-2">
      <CardHeader className="flex-row justify-center items-center space-x-2 p-2">
        <CardTitle className="text-lg font-semibold">
          Standings
        </CardTitle>
      </CardHeader>
      <Separator
        className="h-[2px] bg-zinc-400 dark:bg-zinc-700
        rounded-md w-auto mx-auto"
      />
      <CardContent className="px-0 py-2">
        <motion.ul layout transition={{ type: "spring", stiffness: 500, damping: 30 }} className="space-y-2">
          {userData.map((player, index) => (
            <motion.li layout key={index + 1} className="flex w-full px-2 space-x-2 justify-between items-center bg-neutral-700 rounded-md">
              <div className="flex items-center space-x-4 overflow-hidden">
                <span className="text-xs font-bold whitespace-nowrap">{index + 1}</span>
                <span className="text-md whitespace-nowrap overflow-hidden text-elmotion.lipsis">{player.userName}</span>
              </div>
              <span className="text-sm font-bold whitespace-nowrap">{player.currentScore}</span>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
};

export default Standings;

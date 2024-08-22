"use client";

import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ComponentPropsWithoutRef, useRef, useState } from "react";
import { FaCrown, FaLock, FaUnlock, FaUser } from "react-icons/fa";
import { lobbies } from "../lobby-finder";
import { useLobby } from "@/hooks/lobby/use-lobby-store";
import { cn } from "@/lib/utils";

const MovingBorder = ({
  children,
  duration = 4000,
  rx,
  ry,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  [key: string]: any;
}) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};


const LobbyItem = (
  props: (typeof lobbies)[number]
    & ComponentPropsWithoutRef<"div">
    & { selected: boolean }
) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={cn(
        "bg-transparent text-xl relative flex h-[10%] w-full bg-custom-slate-950 p-[1px] rounded-lg",
        hovered ? "border border-yellow-400/80" : ""
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <div className="absolute inset-0 rounded-lg overflow-hidden">
        <MovingBorder duration={4000} rx="30%" ry="30%">
          <div
            className={cn(
              "h-40 w-40 opacity-[0.8] bg-[radial-gradient(var(--green-500)_40%,transparent_60%)]",
              props.selected ? "" : "bg-none"
            )}
          />
        </MovingBorder>
      </div>
      <div
        className="relative bg-custom-slate-950/[0.9] border border-neutral-200 dark:border-slate-800 \
                   backdrop-blur-3xl text-white flex items-center justify-center w-full h-full p-4 text-sm \
                   antialiased rounded-lg"
      >
        <div className="flex flex-col flex-grow">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-bold">{props.title}</h3>
            {props.password
              ? <FaLock />
              : <FaUnlock />
            }
          </div>
          <p className="flex text-sm text-yellow-400 gap-2 items-center"><FaCrown />{props.host}</p>
          <div className="flex space-x-4 mt-2">
            <span className="bg-green-500 text-xs text-white px-2 py-1 rounded-full">Open {props.password ? "(Private)" : ""}</span>
            <span className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full">{props.config.teams ? "Teams" : "Single"}</span>
            <span className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full">{props.config.year[0] + "-" + props.config.year[1]}</span>
            <span className="bg-gray-700 text-xs text-white px-2 py-1 rounded-full">OSTs {props.config.ost ? "included" : "excluded"}</span>
          </div>
        </div>
        <span className="flex items-center gap-2">
          <FaUser /> {props.players.length}
        </span>
      </div>
    </div>
  );
};

export default LobbyItem;

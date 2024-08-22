"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { FaQuestion } from "react-icons/fa";
import { IoLogoGameControllerB } from "react-icons/io";
import { MdGroup, MdLeaderboard, MdPerson } from "react-icons/md";

import { SidebarDesktop } from "@/components/sidebar/sidebar-desktop";
import { SidebarMobile } from "@/components/sidebar/sidebar-mobile";
import { SidebarAuth, SidebarLink } from "@/components/sidebar/sidebar-props";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const links = [
    {
      label: "Play",
      href: "/",
      icon: IoLogoGameControllerB,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: MdPerson,
    },
    {
      label: "Settings",
      href: "/leaderboard",
      icon: MdLeaderboard,
    },
    {
      label: "Forum",
      href: "/forum",
      icon: MdGroup,
    },
    {
      label: "Help",
      href: "/help",
      icon: FaQuestion,
    },
  ];

  const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
    return (
      <>
        <SidebarDesktop {...props} />
        <SidebarMobile {...(props as React.ComponentProps<"div">)} />
      </>
    );
  };

  return (
    <div
      className="rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full h-full mx-auto \
                 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
    >
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <Link
            href="/"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
          >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-medium text-black dark:text-white whitespace-pre"
            >
              KPopMusicQuiz
            </motion.span>
          </Link>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <SidebarAuth />
      </SidebarBody>
      {children}
    </div>
  );
};

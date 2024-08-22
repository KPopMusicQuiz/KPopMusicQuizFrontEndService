"use client";

import { useMediaQuery } from "usehooks-ts";

import { useCurrentUser } from "@/hooks/use-current-user";
import { ChatDesktop } from "@/components/chat/chat-desktop";


export const Chat = () => {
  const user = useCurrentUser();
  const isDesktop = useMediaQuery("(min-width: 640px)", {
    initializeWithValue: false,
  });

  if (user?.id && isDesktop) {
    return <ChatDesktop />;
  }

  return;
};

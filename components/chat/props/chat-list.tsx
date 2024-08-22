"use client";

import axios from "axios";
import qs from "query-string";
import { FaHashtag } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { LuServerCrash } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import { TbLoader2 } from "react-icons/tb";

import { Channel, ChannelType, Conversation } from "@prisma/client";
import { useQueryClient, UseQueryResult } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/chat/use-chat-store";
import { useCurrentProfile } from "@/hooks/use-current-profile";
import { cn } from "@/lib/utils";

interface ChatListProps {
  channelsQuery: UseQueryResult,
  conversationsQuery: UseQueryResult,
}

export const ChatList = ({
  channelsQuery,
  conversationsQuery,
}: ChatListProps) => {
  const queryClient = useQueryClient();
  const { activeChat, switchChat, closeChat, unreadConversationIds } = useChat();
  const profile = useCurrentProfile();

  const pendingQuery = () => (
    <div className="flex flex-col flex-1 justify-center items-center">
      <TbLoader2 className="h-7 w-7 text-custom-slate-500 animate-spin my-4" />
    </div>
  );

  const errorQuery = () => (
    <div className="flex flex-col flex-1 justify-center items-center">
      <LuServerCrash className="h-7 w-7 text-custom-slate-500 my-4" />
    </div>
  );

  // also empty chatmessages
  const onCloseChannel = async (channelId: string) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          channelId,
          profileId: profile?.id,
        },
      });

      await axios.post(url);

      queryClient.setQueryData([`profile:${profile?.id}`, "channels"], (oldData: any) => {
        if (!oldData) return oldData;
        const newData = {
          ...oldData,
          items: oldData.items.filter((channel: Channel) => channel.id !== channelId),
        };

        return newData;
      });

      // TODO: consider wiping channelquery data to free up client query memory 
      // (does existing query reduce db transaction when fetching again?)
      closeChat();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollArea className="w-[10%] dark:bg-custom-slate-950">
      <div className="py-4">
        <div className="mb-2 ml-4 flex justify-between">
          <h4 className="text-md font-medium leading-none">Channels</h4>
        </div>
        {channelsQuery.status === "pending" && pendingQuery()}
        {channelsQuery.status === "error" && errorQuery()}
        {channelsQuery.status === "success" && channelsQuery.data?.items?.map((channel: Channel) => (
          <Button
            key={channel.name}
            className={cn(
              "flex w-full gap-2 justify-start rounded-none bg-transparent \
              text-white shadow-sm overflow-hidden relative group",
              activeChat?.id === channel.id
                ? "bg-custom-slate-600 hover:bg-custom-slate-600"
                : "hover:bg-custom-slate-700"
            )}
            onClick={() => switchChat(channel)}
          >
            <FaHashtag className="flex-none" />
            <span className="text-sm max-w-32 whitespace-nowrap overflow-hidden text-ellipsis">
              {channel.name}
            </span>
            {channel.type === ChannelType.PRIVATE &&
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 \
                           opacity-0 group-hover:opacity-100 transition-opacity \
                           hover:animate-pulse"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseChannel(channel.id);
                }}
              >
                <MdOutlineClose className="text-white" />
              </span>
            }
          </Button>
        ))}
      </div>
      <div className="py-4 pt-0">
        <h4 className="mb-2 ml-4 text-md font-medium leading-none">Conversations</h4>
        {conversationsQuery.status === "pending" && pendingQuery()}
        {conversationsQuery.status === "error" && errorQuery()}
        {conversationsQuery.status === "success" && conversationsQuery.data?.items?.map((conversation: Conversation) => (
          <Button
            key={conversation.id}
            className={cn(
              "flex w-full gap-2 justify-start rounded-none bg-transparent text-white shadow-sm overflow-hidden",
              activeChat?.id === conversation.id
                ? "bg-custom-slate-600 hover:bg-custom-slate-600"
                : "hover:bg-custom-slate-700"
            )}
            onClick={() => switchChat(conversation)}
          >
            <FiAtSign className="flex-none" />
            <span className="text-sm max-w-32 whitespace-nowrap overflow-hidden text-ellipsis">
              {profile?.id !== conversation.profileOneId ? conversation.profileOneName : conversation.profileTwoName}
            </span>
            {unreadConversationIds.includes(conversation.id) &&
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            }
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

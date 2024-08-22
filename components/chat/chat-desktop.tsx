"use client";

import { motion } from "framer-motion";
import { GrChatOption } from "react-icons/gr";
import { MdChat, MdKeyboardArrowDown } from "react-icons/md";

import { ChatInput } from "@/components/chat/props/chat-input";
import { ChatList } from "@/components/chat/props/chat-list";
import { ChatMessages } from "@/components/chat/props/chat-messages";
import { ChatPreview } from "@/components/chat/props/chat-preview";
import { useChatQuery } from "@/hooks/chat/use-chat-query";
import { useChatSocket } from "@/hooks/chat/use-chat-socket";
import { useChat } from "@/hooks/chat/use-chat-store";
import { useProfileQuery } from "@/hooks/use-profile-query";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";


export const ChatDesktop = () => {
  const { activeChat, isChatOpen, onChatClose } = useChat();

  const { channelsQuery, conversationsQuery } = useProfileQuery();
  const { messagesQuery } = useChatQuery();

  const latestMessage = messagesQuery.data?.pages[0]?.items[0];

  useChatSocket();

  return (
    <>
      <ChatPreview message={latestMessage} />
      <div className="absolute bottom-0 right-0 w-full z-10">
        <motion.div
          layout
          className="dark:bg-custom-slate-800 text-white overflow-y-auto shadow-lg overflow-hidden relative \
                     transition-margin-left transform duration-700 east-in-out shadow-lg"
          initial={{ y: "100%" }}
          animate={{ y: isChatOpen ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ height: isChatOpen ? "400px" : 0 }}
        >
          <div className="flex justify-between items-center pl-4 h-[15%] border-b-2 border-gray-700">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-[#C9F7F8]"><MdChat /> Chat</h3>
            <button onClick={onChatClose} className="text-xl pr-2">
              <MdKeyboardArrowDown />
            </button>
          </div>
          <div className="flex w-full h-[85%] relative">
            <ChatList channelsQuery={channelsQuery} conversationsQuery={conversationsQuery} />
            {activeChat &&
              <div className="flex flex-col w-[90%] text-white break-words whitespace-pre-wrap">
                <ChatMessages messagesQuery={messagesQuery} />
                <ChatInput />
              </div>
            }
            {!activeChat &&
              <div className="flex flex-col flex-1 w-[90%] dark:bg-custom-slate-800 justify-center items-center">
                <GrChatOption className="h-7 w-7 text-custom-slate-300 animate-pulse my-4" />
                <p className="text-xs text-custom-slate-300">
                  Click on a channel or a conversation on the left to start chatting!
                </p>
              </div>
            }
          </div>
        </motion.div>
      </div>
    </>
  );
};

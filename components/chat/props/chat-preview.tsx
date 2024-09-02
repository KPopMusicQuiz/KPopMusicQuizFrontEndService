"use client";

import { motion } from "framer-motion";
import { IoIosArrowForward } from "react-icons/io";
import { MdKeyboardArrowUp } from "react-icons/md";

import { useChat } from "@/hooks/chat/use-chat-store";
import { MessageWithProfile } from "@/hooks/chat/use-chat-socket";
import { cn } from "@/lib/utils";

interface ChatPreviewProps {
  message: MessageWithProfile | null,
}

export const ChatPreview = ({
  message,
}: ChatPreviewProps) => {
  const { activeChat, isChatOpen, toggleChat } = useChat();

  return (
    <div className="absolute bottom-0 right-0 w-full">
      <motion.div
        className={cn(
          "dark:bg-custom-slate-800 text-white overflow-y-auto shadow-lg overflow-hidden relative \
         transition-margin-left transform duration-700 east-in-out flex items-center space-x-2 opacity-80",
          isChatOpen ? "h-0" : "h-fit p-2",
        )}
        initial={{ y: 0 }}
        animate={{ y: isChatOpen ? "100%" : 0 }}
        transition={{ duration: 0.3, ease: "linear" }}
      >
        <IoIosArrowForward className="text-lg" />
        {activeChat && message &&
          <>
            <span className={"font-semibold text-gray-400"}>{message.profile.name}</span>
            <span className="text-sm">{message.content}</span>
          </>
        }
        <button
          className={cn(
            "absolute right-0 flex px-2 text-white rounded-t-lg border border-gray-600",
            isChatOpen ? "hidden" : "block"
          )}
          onClick={toggleChat}
        >
          <span className="text-lg flex items-center"><MdKeyboardArrowUp className="text-lg" />chat</span>
        </button>
      </motion.div>
    </div>
  );
};

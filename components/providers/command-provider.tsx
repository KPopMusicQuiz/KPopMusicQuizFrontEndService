"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { useChat } from "@/hooks/chat/use-chat-store";
import { useCurrentUser } from "@/hooks/use-current-user";

interface CommandKeys {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean
};

type CommandContextType = {
  availableCommands: CommandKeys[];
};

const CommandContext = createContext<CommandContextType>({
  availableCommands: [],
});

export const useCommand = () => {
  return useContext(CommandContext);
};

export const CommandProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [availableCommands, setAvailableCommands] = useState<CommandKeys[]>([]);
  const { toggleChat } = useChat();
  const user = useCurrentUser();

  const handleKeyDown = (command: CommandKeys, commandHandler: () => void) => {
    const { key, ctrl = false, alt = false, shift = false } = command;

    return ((event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        event.ctrlKey === ctrl &&
        event.altKey === alt &&
        event.shiftKey === shift
      ) {
        event.preventDefault();
        commandHandler();
      }
    });
  };

  useEffect(() => {
    // TBD
  }, []);

  useEffect(() => {
    if (user?.id){
      const toggleChatHandler = handleKeyDown(toggleChatCommand, toggleChat);

      window.addEventListener("keydown", toggleChatHandler);
      setAvailableCommands([...availableCommands, toggleChatCommand]);

      return () => {
        window.removeEventListener("keydown", toggleChatHandler);
      };
    }
  }, [user?.id]);

  return (
    <CommandContext.Provider value={{ availableCommands }}>
      {children}
    </CommandContext.Provider>
  );
};

const toggleChatCommand: CommandKeys = {
  key: "s",
  ctrl: true,
};

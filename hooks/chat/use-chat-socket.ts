import { useEffect } from "react";

import { Conversation, DirectMessage, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { ChatType, useChat } from "@/hooks/chat/use-chat-store";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export type MessageWithProfile = Message & {
  profile: Profile;
}

type DirectMessageWithProfile = DirectMessage & {
  profile: Profile;
  conversation: Conversation;
}

export const useChatSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const { activeChat, chatType, unreadConversationIds, onNewDirectMessage } = useChat();
  const profile = useCurrentProfile();

  const messagesKey = `chat:${activeChat?.id}:messages`;
  const directMessagesKey = `profile:${profile?.id}:direct-messages`;
  const chatQueryKey = `chat:${activeChat?.id}`;

  const queryUpdater = (message: MessageWithProfile | DirectMessageWithProfile) => (oldData: any) => {
    if (!oldData || !oldData.pages || oldData.pages.length === 0) {
      return {
        pages: [{
          items: [message],
        }]
      };
    }

    const newData = [...oldData.pages];

    newData[0] = {
      ...newData[0],
      items: [
        message,
        ...newData[0].items,
      ]
    };

    return {
      ...oldData,
      pages: newData
    };
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (chatType === ChatType.Channel) {
      // listening to messagesKey for any new messages for the active channel only
      socket.on(messagesKey, (message: MessageWithProfile) => {
        queryClient.setQueryData([chatQueryKey], queryUpdater(message));
      });
    }

    socket.on(directMessagesKey, (message: DirectMessageWithProfile) => {
      if (chatType === ChatType.Conversation && message.conversationId === activeChat?.id) {
        queryClient.setQueryData([chatQueryKey], queryUpdater(message));
      } else {
        // listening to directMessagesKey for any new DMs at all times
        if (!unreadConversationIds.includes(message.conversationId)) {
          queryClient.setQueryData([`profile:${profile?.id}`, "conversations"], (oldData: any) => {
            const data = oldData.items.some(conversation => conversation.id === message.conversationId)
             ? oldData
             : { ...oldData, items: message.conversation}

            return data;
          });
          onNewDirectMessage(message.conversationId);
        }
        // TODO: reorder conversationsQuery every new notification of DM if DM tab open
      }
    });

    return () => {
      socket.off(messagesKey);
      socket.off(directMessagesKey);
    }
  }, [
    queryClient,
    socket,
    activeChat,
    profile,
  ]);
};

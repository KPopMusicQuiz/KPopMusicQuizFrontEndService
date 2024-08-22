import { Channel, Conversation } from "@prisma/client";
import { create } from "zustand";

enum ChatInputPostUrl {
  channel = "api/socket/messages",
  conversation = "api/socket/direct-messages",
}

enum ChatMessagesFetchUrl {
  channel = "/api/messages",
  conversation = "/api/direct-messages",
}

export enum ChatType {
  Channel,
  Conversation
}

interface ChatStore {
  activeChat: Channel | Conversation | null;
  switchChat: (chat: Channel | Conversation) => void;
  closeChat: () => void;
  chatInputPostUrl: ChatInputPostUrl | null;
  chatMessagesFetchUrl: ChatMessagesFetchUrl | null;
  chatType: ChatType | null;
  unreadConversationIds: string[];
  onNewDirectMessage: (conversationId: string) => void;
  isChatOpen: boolean;
  onChatOpen: () => void;
  onChatClose: () => void;
};

export const useChat = create<ChatStore>((set) => ({
  activeChat: null,
  switchChat: (chat) => set((state) => ({
    activeChat: chat,
    chatInputPostUrl: (chat as Channel).name ? ChatInputPostUrl.channel : ChatInputPostUrl.conversation,
    chatMessagesFetchUrl: (chat as Channel).name ? ChatMessagesFetchUrl.channel : ChatMessagesFetchUrl.conversation,
    chatType: (chat as Channel).name ? ChatType.Channel : ChatType.Conversation,
    unreadConversationIds: state.unreadConversationIds.filter(id => id !== chat.id),
  })),
  closeChat: () => set(() => ({
    activeChat: null,
    chatInputPostUrl: null,
    chatMessagesFetchUrl: null,
    chatType: null,
  })),
  chatInputPostUrl: null,
  chatMessagesFetchUrl: null,
  chatType: null,
  unreadConversationIds: [],
  onNewDirectMessage: (conversationId) => set((state) => ({
    unreadConversationIds: [conversationId, ...state.unreadConversationIds]
  })),
  isChatOpen: false,
  onChatOpen: () => set(() => ({ isChatOpen: true })),
  onChatClose: () => set(() => ({ isChatOpen: false })),
}));

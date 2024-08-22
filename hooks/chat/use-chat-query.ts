import qs from "query-string";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { useChat } from "@/hooks/chat/use-chat-store";
import { useCurrentProfile } from "@/hooks/use-current-profile";

export const useChatQuery = () => {
  const { activeChat, chatMessagesFetchUrl, chatType } = useChat();
  const { isConnected } = useSocket();
  const profile = useCurrentProfile();

  const queryKey = `chat:${activeChat?.id}`;

  const fetchMessages = async ({ pageParam = undefined }) => {
    // above param is infinite loading maybe disable for lobby
    const url = qs.stringifyUrl({
      url: chatMessagesFetchUrl,
      query: {
        cursor: pageParam,
        [chatType]: activeChat?.id,
        profileId: profile?.id,
      }
    }, { skipNull: true });

    const res = await fetch(url);
    return res.json();
  };

  const messagesQuery = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchMessages,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: isConnected ? false : 1000,
  });

  return {
    messagesQuery
  };
};

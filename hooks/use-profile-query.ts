import qs from "query-string";

import { useQuery } from "@tanstack/react-query";

import { useCurrentProfile } from "@/hooks/use-current-profile";


export const useProfileQuery = () => {
  const profile = useCurrentProfile();

  const fetchChannels = async () => {
    const url = qs.stringifyUrl({
      url: "/api/channels",
      query: {
        profileId: profile?.id,
      },
    });

    const res = await fetch(url);
    return res.json();
  };

  const fetchConversations = async () => {
    const url = qs.stringifyUrl({
      url: "/api/conversations",
      query: {
        profileId: profile?.id,
      },
    });

    const res = await fetch(url);
    return res.json();
  };

  const channelsQuery = useQuery({
    queryKey: [`profile:${profile?.id}`, "channels"],
    queryFn: fetchChannels,
    refetchInterval: false,
  });

  const conversationsQuery= useQuery({
    queryKey: [`profile:${profile?.id}`, "conversations"],
    queryFn: fetchConversations,
    refetchInterval: false,
  });

  return {
    channelsQuery,
    conversationsQuery,
  };
};

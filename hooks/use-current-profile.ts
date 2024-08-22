import { useSession } from "next-auth/react";

export const useCurrentProfile = () => {
  const session = useSession();

  return session.data?.profile;
}
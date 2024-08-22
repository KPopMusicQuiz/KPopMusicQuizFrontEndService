import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isOAuth: boolean;
};

export type Profile {
  id?: string;
  userId?: string | null;
  name?: string | null;
  email?: string | null;
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
    profile: Profile;
  }
}
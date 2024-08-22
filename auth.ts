import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "./auth.config";
import { getAccountByUserId } from "./data/account";
import { getProfileByUserId } from "./data/profile";

export const {
  auth,
  handlers,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });

      await db.profile.create({
        data: {
          userId: user.id as string,
          name: user.name as string,
          email: user.email as string,
        }
      });
    },
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) {
        return false;
      };

      // TODO: ADD 2FA Check

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;

        const currentProfile = await getProfileByUserId(token.sub);

        if (currentProfile) {
          session.profile = {};
          session.profile.id = currentProfile.id;
          session.profile.userId = currentProfile.userId;
          session.profile.name = currentProfile.name;
          session.profile.email = currentProfile.email;
        }
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOauth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(token.sub);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // a week
  },
  //useSecureCookies: true,
  ...authConfig,
});
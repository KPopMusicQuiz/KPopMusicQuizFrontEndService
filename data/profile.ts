import { db } from "@/lib/db";

export const getProfileById = async (id: string) => {
  try {
    const account = await db.profile.findUnique({
      where: { id }
    });

    return account;
  } catch {
    return null;
  }
};

export const getProfileByUserId = async (userId: string) => {
  try {
    const account = await db.profile.findUnique({
      where: { userId }
    });

    return account;
  } catch {
    return null;
  }
};

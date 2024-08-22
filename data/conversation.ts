import { db } from "@/lib/db";

export const getOrCreateConversation = async (profileOneId: string, profileTwoId: string) => {
  const existingConversation = await findConversation(profileOneId, profileTwoId) ||
    findConversation(profileOneId, profileTwoId);
  
  if (!existingConversation) {
    const newConversation = await createNewConversation(profileOneId, profileTwoId);

    return newConversation;
  }

  return existingConversation;
};

const findConversation = async (profileOneId: string, profileTwoId: string) => {
  try {
    const conversation = await db.conversation.findFirst({
      where: {
        AND: [
          { profileOneId: profileOneId },
          { profileTwoId: profileTwoId },
        ]
      },
    });

    return conversation;
  } catch {
    return null;
  }
};

const createNewConversation = async (profileOneId: string, profileTwoId: string) => {
  try {
    const conversation = await db.conversation.create({
      data: {
        profileOneId,
        profileTwoId,
      }
    });

    return conversation;
  } catch {
    return null;
  }
};

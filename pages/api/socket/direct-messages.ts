import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { getProfileByUserId } from "@/data/profile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { content } = req.body;
    const { chatId, userId } = req.query;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!chatId) {
      return res.status(400).json({ error: "Conversation ID missing" });
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing " });
    }

    const profile = await getProfileByUserId(userId as string);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: chatId as string,
        OR: [
          {
            profileOneId: profile.id,
          },
          {
            profileTwoId: profile.id,
          }
        ]
      },
      include: {
        profileOne: true,
        profileTwo: true,
      }
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    const message = await db.directMessage.create({
      data: {
        content,
        conversationId: conversation.id as string,
        profileId: profile.id,
      },
      include: {
        profile: true,
        conversation: true,
      }
    });

    res?.socket?.server?.io?.emit(`profile:${conversation.profileOneId}:direct-messages`, message);
    res?.socket?.server?.io?.emit(`profile:${conversation.profileTwoId}:direct-messages`, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}

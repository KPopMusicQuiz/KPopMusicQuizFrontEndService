import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { getProfileByUserId } from "@/data/profile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed"});
  }

  try {
    const { content } = req.body;
    const { chatId, userId } = req.query;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized"});
    }

    if (!chatId) {
      return res.status(400).json({ error: "Channel ID missing"});
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing "});
    }

    const profile = await getProfileByUserId(userId as string);

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const channel = await db.channel.findUnique({
      where: {
        id: chatId as string,
      }
    });

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    const message = await db.message.create({
      data: {
        content,
        channelId: channel.id as string,
        profileId: profile.id,
      },
      include: {
        profile: true,
      }
    });

    const channelKey = `chat:${channel.id}:messages`;

    res?.socket?.server?.io?.emit(channelKey, message);

    return res.status(200).json(message);
  } catch (error) {
    console.log("[MESSAGES_POST]", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
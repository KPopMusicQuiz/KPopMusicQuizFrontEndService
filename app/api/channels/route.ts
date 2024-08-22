import { NextResponse } from "next/server";

import { ChannelType } from "@prisma/client";
import { db } from "@/lib/db";

export async function GET(
  req: Request
) {
  try {
    const { searchParams } = new URL(req.url);

    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const profile = await db.profile.findUnique({
      where: {
        id: profileId
      },
      include: {
        members: true
      }
    });

    if (!profile) {
      return new NextResponse("Profile missing", { status: 400 });
    }

    const privateChannelIds = profile.members.map(member => member.channelId)

    const channels = await db.channel.findMany({
      where: {
        OR: [
          { type: ChannelType.PUBLIC },
          { id: { in: privateChannelIds } },
        ]
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    if (!channels) {
      return new NextResponse("No channels found", { status: 400 });
    }

    return NextResponse.json({
      items: channels,
    });
  } catch (error) {
    console.log("[CHANNELS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: Request
) {
  try {
    const { searchParams } = new URL(req.url);

    const profileId = searchParams.get("profileId");
    const channelId = searchParams.get("channelId");

    if (!profileId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    const profile = await db.profile.findUnique({
      where: {
        id: profileId
      },
      include: {
        members: true
      }
    });

    if (!profile) {
      return new NextResponse("Profile missing", { status: 400 });
    }

    // TODO: add unique identifier to database for [member.channelId, member.profileId]
    const isMember = profile.members.filter(member => member.channelId === channelId);

    if (!isMember) {
      return new NextResponse("Not a member of the channel", { status: 404 });
    }

    console.log("4444")

    // TODO: add check if user bypassed frontend logic and is trying to unsubscribe from lobby chat
    // public already throws error cz member does not exist for public channels
    await db.member.delete({
      where: {
        id: isMember[0].id
      }
    });

    return new NextResponse("Successfully unsubscribed from channel", { status: 200 });
  } catch (error) {
    console.log("[CHANNELS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
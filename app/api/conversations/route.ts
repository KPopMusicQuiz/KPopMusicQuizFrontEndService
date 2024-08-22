import { NextResponse } from "next/server";

import { Conversation } from "@prisma/client";
import { db } from "@/lib/db";

const CONVERSATIONS_BATCH = 5;

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
      include:{
        conversationsInitiated: true,
        conversationsReceived: true,
      }
    });

    if (!profile) {
      return new NextResponse("Profile missing", { status: 400 });
    }

    const conversations: Conversation[] = [...profile.conversationsInitiated, ...profile.conversationsReceived];

    return NextResponse.json({
      items: conversations
    });
  } catch (error) {
    console.log("[CONVERSATIONS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// TODO: POST
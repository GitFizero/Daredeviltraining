import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { sessionId, durationMinutes } = await request.json();

    if (!sessionId || durationMinutes == null) {
      return NextResponse.json(
        { error: "sessionId and durationMinutes are required" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      session: {
        id: sessionId,
        status: "COMPLETED",
        durationMinutes,
      },
    });
  } catch (error) {
    console.error("Error completing workout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

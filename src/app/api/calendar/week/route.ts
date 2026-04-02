import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return empty events (Google Calendar will work once OAuth is fully configured)
    return NextResponse.json({ events: [] });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json({ events: [] });
  }
}

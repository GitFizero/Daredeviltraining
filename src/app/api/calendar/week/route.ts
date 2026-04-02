import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getWeekEvents } from "@/lib/google-calendar";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let events;
    try {
      events = await getWeekEvents(session.user.id);
    } catch (calendarError) {
      console.error("Google Calendar error:", calendarError);
      return NextResponse.json({ events: [] });
    }

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapped = events.map((event: any) => {
        const startStr = event.start?.dateTime ?? event.start?.date ?? "";
        const endStr = event.end?.dateTime ?? event.end?.date ?? "";
        const eventDate = startStr.split("T")[0];
        const dayOfWeek = new Date(startStr).getDay();

        return {
          id: event.id,
          title: event.summary ?? "Untitled",
          start: startStr,
          end: endStr,
          day: dayOfWeek,
          isToday: eventDate === todayStr,
        };
      }
    );

    return NextResponse.json({ events: mapped });
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

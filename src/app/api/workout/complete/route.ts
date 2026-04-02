import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateCalendarEvent } from "@/lib/google-calendar";

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

    const workoutSession = await prisma.workoutSession.findUnique({
      where: { id: sessionId },
      include: { exercises: true },
    });

    if (!workoutSession || workoutSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const totalVolume = workoutSession.exercises.reduce((sum, ex) => {
      const repsStr = ex.reps;
      const repsNumbers = repsStr.match(/\d+/g)?.map(Number) ?? [0];
      const avgReps =
        repsNumbers.reduce((a, b) => a + b, 0) / repsNumbers.length;
      return sum + ex.weightKg * ex.setsCompleted * avgReps;
    }, 0);

    const updated = await prisma.workoutSession.update({
      where: { id: sessionId },
      data: {
        status: "COMPLETED",
        durationMinutes,
        totalVolume: Math.round(totalVolume),
      },
      include: { exercises: { orderBy: { orderIndex: "asc" } } },
    });

    if (updated.calendarEventId) {
      try {
        const description = `Séance complétée ✅\nDurée: ${durationMinutes} min\nVolume total: ${Math.round(totalVolume)} kg`;
        await updateCalendarEvent(session.user.id, updated.calendarEventId, description, true);
      } catch (calendarError) {
        console.error("Failed to update calendar event:", calendarError);
      }
    }

    return NextResponse.json({ session: updated });
  } catch (error) {
    console.error("Error completing workout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { weeklyPlan } from "@/lib/workout-data";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const dayOfWeek = now.getDay();

    const dayPlan = weeklyPlan[dayOfWeek];

    if (!dayPlan || dayPlan.dayType === "REST") {
      return NextResponse.json({
        session: null,
        dayPlan: dayPlan ?? { label: "Repos complet", tag: "Repos", tagColor: "devil-blue", dayType: "REST", exercises: [] },
      });
    }

    // Build session from template data (no DB required)
    const exercises = (dayPlan.exercises ?? []).map((ex, index) => ({
      id: `ex-${dayOfWeek}-${index}`,
      exerciseName: ex.name,
      muscleGroup: ex.muscleGroup,
      orderIndex: index,
      sets: ex.sets,
      reps: ex.reps,
      weightKg: ex.weightKg,
      setsCompleted: 0,
      notes: ex.notes,
    }));

    const workoutSession = {
      id: `session-${dayOfWeek}-${now.toISOString().split("T")[0]}`,
      date: now.toISOString().split("T")[0],
      dayType: dayPlan.dayType,
      status: "PLANNED",
      exercises,
    };

    return NextResponse.json({
      session: workoutSession,
      dayPlan: {
        dayType: dayPlan.dayType,
        label: dayPlan.label,
        tag: dayPlan.tag,
        tagColor: dayPlan.tagColor,
        exercises: dayPlan.exercises,
      },
    });
  } catch (error) {
    console.error("Error fetching today's workout:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

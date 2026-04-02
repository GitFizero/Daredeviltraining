import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { weeklyPlan } from "@/lib/workout-data";
import { DayType } from "@/generated/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const now = new Date();
    const dayOfWeek = now.getDay();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const dayPlan = weeklyPlan[dayOfWeek];

    if (!dayPlan || dayPlan.dayType === "REST") {
      return NextResponse.json({
        session: null,
        dayPlan: dayPlan ?? { label: "Rest Day", tag: "REST", tagColor: "gray", dayType: "REST" },
      });
    }

    let workoutSession = await prisma.workoutSession.findUnique({
      where: { userId_date: { userId, date: today } },
      include: { exercises: { orderBy: { orderIndex: "asc" } } },
    });

    if (!workoutSession) {
      workoutSession = await prisma.workoutSession.create({
        data: {
          userId,
          date: today,
          dayType: dayPlan.dayType as DayType,
          status: "PLANNED",
          exercises: {
            create: (dayPlan.exercises ?? []).map(
              (ex: { name: string; muscleGroup: string; sets: number; reps: string; weightKg: number }, index: number) => ({
                exerciseName: ex.name,
                muscleGroup: ex.muscleGroup,
                orderIndex: index,
                sets: ex.sets,
                reps: ex.reps,
                weightKg: ex.weightKg,
                setsCompleted: 0,
              })
            ),
          },
        },
        include: { exercises: { orderBy: { orderIndex: "asc" } } },
      });
    }

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

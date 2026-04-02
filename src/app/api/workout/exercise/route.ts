import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { exerciseId, setsCompleted, weightKg, exerciseName, muscleGroup } =
      await request.json();

    if (!exerciseId) {
      return NextResponse.json(
        { error: "exerciseId is required" },
        { status: 400 }
      );
    }

    const exercise = await prisma.exerciseLog.findUnique({
      where: { id: exerciseId },
      include: { session: true },
    });

    if (!exercise || exercise.session.userId !== session.user.id) {
      return NextResponse.json({ error: "Exercise not found" }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};
    if (setsCompleted !== undefined) updateData.setsCompleted = setsCompleted;
    if (weightKg !== undefined) updateData.weightKg = weightKg;
    if (exerciseName !== undefined) updateData.exerciseName = exerciseName;
    if (muscleGroup !== undefined) updateData.muscleGroup = muscleGroup;

    const updated = await prisma.exerciseLog.update({
      where: { id: exerciseId },
      data: updateData,
    });

    return NextResponse.json({ exercise: updated });
  } catch (error) {
    console.error("Error updating exercise:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

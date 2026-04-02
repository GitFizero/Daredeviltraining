import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    // Return the updated fields (client-side state management, no DB)
    return NextResponse.json({
      exercise: {
        id: exerciseId,
        ...(setsCompleted !== undefined && { setsCompleted }),
        ...(weightKg !== undefined && { weightKg }),
        ...(exerciseName !== undefined && { exerciseName }),
        ...(muscleGroup !== undefined && { muscleGroup }),
      },
    });
  } catch (error) {
    console.error("Error updating exercise:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

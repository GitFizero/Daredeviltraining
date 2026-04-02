import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getTodayFitData, getWeeklySteps } from "@/lib/google-fit";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    let today: { steps: number; caloriesBurned: number; heartRate: number | null } = { steps: 0, caloriesBurned: 0, heartRate: null };
    let weeklySteps: { day: string; steps: number }[] = [];

    try {
      today = await getTodayFitData(userId);
    } catch (fitError) {
      console.error("Google Fit today error:", fitError);
    }

    try {
      weeklySteps = await getWeeklySteps(userId);
    } catch (fitError) {
      console.error("Google Fit weekly steps error:", fitError);
    }

    return NextResponse.json({
      today,
      weeklySteps,
    });
  } catch (error) {
    console.error("Error fetching fitness data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

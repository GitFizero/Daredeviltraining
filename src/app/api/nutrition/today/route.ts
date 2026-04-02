import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { trainingDayMeals, restDayMeals } from "@/lib/nutrition-data";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const dayOfWeek = now.getDay();

    const isTrainingDay = dayOfWeek >= 1 && dayOfWeek <= 5;
    const mealSuggestions = isTrainingDay ? trainingDayMeals : restDayMeals;

    const logs = await prisma.nutritionLog.findMany({
      where: { userId, date: today },
    });

    const logsByType = new Map(logs.map((log) => [log.mealType, log]));

    const meals = mealSuggestions.map((slot) => {
      const log = logsByType.get(slot.type as any);
      return {
        type: slot.type,
        label: slot.label,
        time: slot.time,
        suggestions: slot.suggestions,
        logged: log?.logged ?? false,
        loggedMeal: log?.mealName ?? null,
      };
    });

    const loggedMeals = logs.filter((l) => l.logged);
    const consumed = loggedMeals.reduce(
      (totals, log) => ({
        kcal: totals.kcal + log.kcal,
        proteinG: totals.proteinG + log.proteinG,
        carbsG: totals.carbsG + log.carbsG,
        fatG: totals.fatG + log.fatG,
      }),
      { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 }
    );

    const profile = await prisma.userProfile.findUnique({ where: { userId } });

    return NextResponse.json({
      isTrainingDay,
      meals,
      consumed,
      targets: {
        dailyKcalTarget: profile?.dailyKcalTarget ?? 2000,
        dailyProteinG: profile?.dailyProteinG ?? 154,
        dailyCarbsG: profile?.dailyCarbsG ?? 200,
        dailyFatG: profile?.dailyFatG ?? 55,
      },
    });
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { trainingDayMeals, restDayMeals } from "@/lib/nutrition-data";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const dayOfWeek = now.getDay();

    const isTrainingDay = dayOfWeek >= 1 && dayOfWeek <= 5;
    const mealSuggestions = isTrainingDay ? trainingDayMeals : restDayMeals;

    const meals = mealSuggestions.map((slot) => ({
      type: slot.type,
      label: slot.label,
      time: slot.time,
      suggestions: slot.suggestions,
      logged: false,
      loggedMeal: null,
    }));

    return NextResponse.json({
      isTrainingDay,
      meals,
      consumed: { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 },
      targets: {
        dailyKcalTarget: 2000,
        dailyProteinG: 154,
        dailyCarbsG: isTrainingDay ? 200 : 150,
        dailyFatG: 55,
      },
    });
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const VALID_MEAL_TYPES = ["REVEIL", "PRE_TRAINING", "POST_TRAINING", "DINER", "SNACK_SOIR"];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { mealType, mealName, kcal, proteinG, carbsG, fatG } =
      await request.json();

    if (!mealType || !mealName || kcal == null) {
      return NextResponse.json(
        { error: "mealType, mealName, and kcal are required" },
        { status: 400 }
      );
    }

    if (!VALID_MEAL_TYPES.includes(mealType)) {
      return NextResponse.json(
        { error: "Invalid mealType" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      log: {
        id: `log-${mealType}-${Date.now()}`,
        mealType,
        mealName,
        kcal,
        proteinG: proteinG ?? 0,
        carbsG: carbsG ?? 0,
        fatG: fatG ?? 0,
        logged: true,
      },
    });
  } catch (error) {
    console.error("Error logging meal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

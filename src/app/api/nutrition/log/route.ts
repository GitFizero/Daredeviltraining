import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { MealType } from "@/generated/prisma";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { mealType, mealName, kcal, proteinG, carbsG, fatG } =
      await request.json();

    if (!mealType || !mealName || kcal == null) {
      return NextResponse.json(
        { error: "mealType, mealName, and kcal are required" },
        { status: 400 }
      );
    }

    if (!Object.values(MealType).includes(mealType)) {
      return NextResponse.json(
        { error: "Invalid mealType" },
        { status: 400 }
      );
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const log = await prisma.nutritionLog.upsert({
      where: {
        userId_date_mealType: { userId, date: today, mealType },
      },
      update: {
        mealName,
        kcal,
        proteinG: proteinG ?? 0,
        carbsG: carbsG ?? 0,
        fatG: fatG ?? 0,
        logged: true,
      },
      create: {
        userId,
        date: today,
        mealType,
        mealName,
        kcal,
        proteinG: proteinG ?? 0,
        carbsG: carbsG ?? 0,
        fatG: fatG ?? 0,
        logged: true,
      },
    });

    return NextResponse.json({ log });
  } catch (error) {
    console.error("Error logging meal:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

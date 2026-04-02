import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const defaultProfile = {
  weightKg: 77,
  heightCm: 178,
  bodyFatPercent: 18,
  goalType: "lean_cut",
  dailyKcalTarget: 2000,
  dailyProteinG: 154,
  dailyCarbsG: 200,
  dailyFatG: 55,
  trainingWindow: "12h-14h",
};

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ profile: defaultProfile });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const allowedFields = [
      "weightKg", "heightCm", "bodyFatPercent", "goalType",
      "dailyKcalTarget", "dailyProteinG", "dailyCarbsG", "dailyFatG",
      "trainingWindow",
    ];

    const updateData: Record<string, unknown> = {};
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    return NextResponse.json({ profile: { ...defaultProfile, ...updateData } });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

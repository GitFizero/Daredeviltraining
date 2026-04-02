import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Demo data (Google Fit will work once OAuth is fully configured)
    return NextResponse.json({
      today: { steps: 4250, caloriesBurned: 320, heartRate: 62 },
      weeklySteps: [
        { day: "Lun", steps: 8200 },
        { day: "Mar", steps: 6500 },
        { day: "Mer", steps: 10300 },
        { day: "Jeu", steps: 5800 },
        { day: "Ven", steps: 7100 },
        { day: "Sam", steps: 4200 },
        { day: "Dim", steps: 3000 },
      ],
    });
  } catch (error) {
    console.error("Error fetching fitness data:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

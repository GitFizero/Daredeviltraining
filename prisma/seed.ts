import { PrismaClient, DayType, MealType } from "../src/generated/prisma";
import { weeklyPlan } from "../src/lib/workout-data";
import { trainingDayMeals } from "../src/lib/nutrition-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🔥 Seeding DAREDEVIL database...");

  // Create or find demo user
  const user = await prisma.user.upsert({
    where: { email: "gaetan@daredevil.app" },
    update: {},
    create: {
      email: "gaetan@daredevil.app",
      name: "Gaëtan",
    },
  });

  // Create user profile
  await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      weightKg: 77,
      heightCm: 178,
      bodyFatPercent: 18,
      goalType: "lean_cut",
      dailyKcalTarget: 2000,
      dailyProteinG: 154,
      dailyCarbsG: 200,
      dailyFatG: 55,
      trainingWindow: "12h-14h",
    },
  });

  // Seed workout sessions for this week
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  const dayTypeMap: Record<string, DayType> = {
    PUSH: DayType.PUSH,
    PULL: DayType.PULL,
    CARDIO_HIIT: DayType.CARDIO_HIIT,
    LEGS: DayType.LEGS,
    FULL_BODY: DayType.FULL_BODY,
    ACTIVE_RECOVERY: DayType.ACTIVE_RECOVERY,
    REST: DayType.REST,
  };

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    const jsDay = date.getDay(); // 0=Sun, 1=Mon, etc.
    const plan = weeklyPlan[jsDay];

    if (!plan || plan.dayType === "REST") continue;

    const session = await prisma.workoutSession.upsert({
      where: {
        userId_date: {
          userId: user.id,
          date: date,
        },
      },
      update: {},
      create: {
        userId: user.id,
        date: date,
        dayType: dayTypeMap[plan.dayType],
        status: "PLANNED",
      },
    });

    // Create exercise logs
    for (let j = 0; j < plan.exercises.length; j++) {
      const ex = plan.exercises[j];
      const existingLog = await prisma.exerciseLog.findFirst({
        where: { sessionId: session.id, orderIndex: j },
      });
      if (!existingLog) {
        await prisma.exerciseLog.create({
          data: {
            sessionId: session.id,
            exerciseName: ex.name,
            muscleGroup: ex.muscleGroup,
            orderIndex: j,
            sets: ex.sets,
            reps: ex.reps,
            weightKg: ex.weightKg,
            setsCompleted: 0,
            notes: ex.notes,
          },
        });
      }
    }
  }

  // Seed today's nutrition
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const mealTypeMap: Record<string, MealType> = {
    REVEIL: MealType.REVEIL,
    PRE_TRAINING: MealType.PRE_TRAINING,
    POST_TRAINING: MealType.POST_TRAINING,
    DINER: MealType.DINER,
    SNACK_SOIR: MealType.SNACK_SOIR,
  };

  for (const slot of trainingDayMeals) {
    const meal = slot.suggestions[0]; // Primary suggestion
    await prisma.nutritionLog.upsert({
      where: {
        userId_date_mealType: {
          userId: user.id,
          date: today,
          mealType: mealTypeMap[slot.type],
        },
      },
      update: {},
      create: {
        userId: user.id,
        date: today,
        mealType: mealTypeMap[slot.type],
        mealName: meal.name,
        kcal: meal.kcal,
        proteinG: meal.proteinG,
        carbsG: meal.carbsG,
        fatG: meal.fatG,
        logged: false,
      },
    });
  }

  console.log("✅ Seed complete! User:", user.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

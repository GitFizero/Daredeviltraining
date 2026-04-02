import { google } from "googleapis";
import { prisma } from "./prisma";

async function getFitnessClient(userId: string) {
  const account = await prisma.account.findFirst({
    where: { userId, provider: "google" },
  });
  if (!account?.access_token) throw new Error("No Google account linked");

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({
    access_token: account.access_token,
    refresh_token: account.refresh_token,
  });
  return google.fitness({ version: "v1", auth: oauth2Client });
}

export async function getTodayFitData(userId: string) {
  try {
    const fitness = await getFitnessClient(userId);
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startTimeMillis = startOfDay.getTime().toString();
    const endTimeMillis = now.getTime().toString();

    const aggregateParams = (dataType: string) => ({
      userId: "me",
      requestBody: {
        aggregateBy: [{ dataTypeName: dataType }],
        bucketByTime: { durationMillis: "86400000" },
        startTimeMillis,
        endTimeMillis,
      },
    });

    const [stepsRes, caloriesRes] = await Promise.all([
      fitness.users.dataset.aggregate(aggregateParams("com.google.step_count.delta")),
      fitness.users.dataset.aggregate(aggregateParams("com.google.calories.expended")),
    ]);

    const steps = stepsRes.data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0;
    const calories = Math.round(
      caloriesRes.data.bucket?.[0]?.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || 0
    );

    return { steps, caloriesBurned: calories, heartRate: null };
  } catch {
    return { steps: 0, caloriesBurned: 0, heartRate: null };
  }
}

export async function getWeeklySteps(userId: string) {
  try {
    const fitness = await getFitnessClient(userId);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    startOfWeek.setHours(0, 0, 0, 0);

    const res = await fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
        bucketByTime: { durationMillis: "86400000" },
        startTimeMillis: startOfWeek.getTime().toString(),
        endTimeMillis: now.getTime().toString(),
      },
    });

    return (res.data.bucket || []).map((bucket, i) => ({
      day: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i] || "",
      steps: bucket.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0,
    }));
  } catch {
    return ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => ({
      day,
      steps: 0,
    }));
  }
}

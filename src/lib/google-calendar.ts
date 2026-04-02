import { google } from "googleapis";
import { prisma } from "./prisma";

export async function getGoogleCalendarClient(userId: string) {
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
  return google.calendar({ version: "v3", auth: oauth2Client });
}

export async function getWeekEvents(userId: string) {
  const calendar = await getGoogleCalendarClient(userId);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59);

  const response = await calendar.events.list({
    calendarId: "primary",
    timeMin: startOfWeek.toISOString(),
    timeMax: endOfWeek.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
    q: "training",
  });
  return response.data.items || [];
}

export async function updateCalendarEvent(
  userId: string,
  eventId: string,
  description: string,
  completed: boolean
) {
  const calendar = await getGoogleCalendarClient(userId);
  await calendar.events.patch({
    calendarId: "primary",
    eventId,
    requestBody: {
      description,
      colorId: completed ? "10" : "11",
    },
  });
}

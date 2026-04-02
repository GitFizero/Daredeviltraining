import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    async signIn({ user }) {
      // Create default profile on first sign in
      const existingProfile = await prisma.userProfile.findUnique({
        where: { userId: user.id },
      });
      if (!existingProfile) {
        await prisma.userProfile.create({
          data: {
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
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "database",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

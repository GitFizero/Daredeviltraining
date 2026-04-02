import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "DAREDEVIL — Coaching Fitness",
  description: "Programme de coaching fitness personnalisé — Hell's Kitchen style",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DAREDEVIL",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-background text-foreground antialiased min-h-screen">
        <Providers>
          <main className="max-w-lg mx-auto pb-20">
            {children}
          </main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}

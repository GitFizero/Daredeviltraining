"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  emoji: string;
}

const navItems: NavItem[] = [
  { href: "/training", label: "Training", emoji: "💪" },
  { href: "/planning", label: "Planning", emoji: "📅" },
  { href: "/nutrition", label: "Nutrition", emoji: "🥩" },
  { href: "/dashboard", label: "Stats", emoji: "📊" },
  { href: "/profile", label: "Profil", emoji: "⚙️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Don't show nav on auth pages or landing
  if (pathname === "/" || pathname?.startsWith("/auth")) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-lg border-t border-devil-dim">
      <div className="flex items-center justify-around max-w-lg mx-auto" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-2 gap-0.5 transition-colors duration-200 ${
                isActive
                  ? "text-devil-red"
                  : "text-devil-muted"
              }`}
            >
              <span className={`text-lg leading-none ${isActive ? "scale-110" : ""} transition-transform`}>
                {item.emoji}
              </span>
              <span className="text-[9px] font-medium tracking-wide">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-devil-red mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

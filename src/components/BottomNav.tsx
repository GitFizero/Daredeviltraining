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
  { href: "/nutrition", label: "Nutrition", emoji: "🥩" },
  { href: "/dashboard", label: "Stats", emoji: "📊" },
  { href: "/profile", label: "Profil", emoji: "⚙️" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-devil-dim safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors duration-200 ${
                isActive
                  ? "text-devil-red border-t-2 border-devil-red"
                  : "text-devil-muted border-t-2 border-transparent"
              }`}
            >
              <span className="text-xl leading-none">{item.emoji}</span>
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

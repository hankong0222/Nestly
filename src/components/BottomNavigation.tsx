"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, ListChecks, Video, CircleUserRound } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/scan", label: "Scan", icon: ScanLine },
  { href: "/tasks", label: "Tasks", icon: ListChecks },
  { href: "/calls", label: "Calls", icon: Video },
  { href: "/profile", label: "Profile", icon: CircleUserRound },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2">
      <div className="flex items-center justify-between rounded-[1.75rem] glass-panel shadow-soft px-2 py-2">
        {ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="relative flex flex-1 flex-col items-center gap-1 py-1.5 rounded-2xl"
            >
              {active && (
                <span className="absolute inset-x-2 inset-y-0 rounded-2xl bg-white/80 shadow-card -z-10" />
              )}
              <Icon
                size={19}
                strokeWidth={active ? 2 : 1.6}
                className={active ? "text-lavender-600" : "text-charcoal-faint"}
              />
              <span
                className={cn(
                  "text-[10.5px] tracking-wide",
                  active ? "text-charcoal font-medium" : "text-charcoal-faint",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

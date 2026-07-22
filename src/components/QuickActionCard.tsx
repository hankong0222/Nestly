import Link from "next/link";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

export default function QuickActionCard({
  icon: Icon,
  label,
  description,
  href,
  tone = "lavender",
  className,
}: {
  icon: LucideIcon;
  label: string;
  description?: string;
  href: string;
  tone?: "lavender" | "blush";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col justify-between rounded-2xl bg-white p-4 shadow-card border border-black/[0.03] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift active:scale-[0.98]",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center w-10 h-10 rounded-xl mb-3",
          tone === "lavender"
            ? "bg-lavender-100 text-lavender-600"
            : "bg-blush-100 text-blush-500",
        )}
      >
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div>
        <p className="font-display text-[15px] leading-tight text-charcoal">
          {label}
        </p>
        {description && (
          <p className="text-xs text-charcoal-faint mt-1 leading-snug">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

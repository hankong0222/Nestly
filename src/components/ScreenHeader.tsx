"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/cn";

export default function ScreenHeader({
  title,
  onBack,
  className,
  trailing,
}: {
  title?: string;
  onBack?: () => void;
  className?: string;
  trailing?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className={cn("flex items-center justify-between px-6 pt-6 pb-2", className)}>
      <button
        type="button"
        onClick={onBack ?? (() => router.back())}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-card text-charcoal-soft"
      >
        <ChevronLeft size={18} strokeWidth={1.8} />
      </button>
      {title && (
        <p className="font-display text-[15px] text-charcoal">{title}</p>
      )}
      <div className="w-9 h-9 flex items-center justify-center">{trailing}</div>
    </div>
  );
}

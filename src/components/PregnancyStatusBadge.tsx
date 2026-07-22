import { cn } from "@/lib/cn";

export default function PregnancyStatusBadge({
  week,
  trimesterLabel,
  className,
}: {
  week: number;
  trimesterLabel: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full glass-panel px-4 py-2 shadow-card",
        className,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-lavender-500" />
      <span className="font-display text-sm text-charcoal">Week {week}</span>
      <span className="w-1 h-1 rounded-full bg-charcoal-faint" />
      <span className="text-xs text-charcoal-soft tracking-wide">
        {trimesterLabel}
      </span>
    </div>
  );
}

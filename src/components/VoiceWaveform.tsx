"use client";

import { cn } from "@/lib/cn";

const BAR_PATTERN = [
  { height: 0.5, delay: 0 },
  { height: 0.9, delay: 0.1 },
  { height: 0.4, delay: 0.2 },
  { height: 1, delay: 0.05 },
  { height: 0.6, delay: 0.25 },
  { height: 0.85, delay: 0.15 },
  { height: 0.45, delay: 0.3 },
];

export default function VoiceWaveform({
  active = true,
  className,
  tone = "light",
}: {
  active?: boolean;
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div
      className={cn("flex items-center gap-[3px] h-5", className)}
      aria-hidden="true"
    >
      {BAR_PATTERN.map((bar, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full origin-center",
            tone === "light" ? "bg-white/90" : "bg-lavender-500",
            active ? "animate-waveform" : "",
          )}
          style={{
            height: `${bar.height * 100}%`,
            animationDelay: `${bar.delay}s`,
            animationDuration: `${0.9 + bar.height * 0.4}s`,
            transform: active ? undefined : `scaleY(${0.25 + bar.height * 0.2})`,
          }}
        />
      ))}
    </div>
  );
}

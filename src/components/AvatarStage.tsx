"use client";

import { cn } from "@/lib/cn";
import VoiceWaveform from "./VoiceWaveform";

export type AvatarState = "idle" | "listening" | "speaking" | "thinking";

const SIZE_MAP = {
  hero: "w-64 h-64",
  large: "w-52 h-52",
  medium: "w-36 h-36",
  small: "w-16 h-16",
} as const;

export default function AvatarStage({
  state = "idle",
  size = "large",
  className,
}: {
  state?: AvatarState;
  size?: keyof typeof SIZE_MAP;
  className?: string;
}) {
  const showRing = state === "listening" || state === "thinking";

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      {/* ambient glow */}
      <div
        className={cn(
          "absolute rounded-full blur-3xl opacity-70",
          SIZE_MAP[size],
          "scale-125",
        )}
        style={{
          background:
            "radial-gradient(circle, var(--color-lavender-200) 0%, var(--color-blush-100) 55%, transparent 75%)",
        }}
      />

      {/* pulsing ring for listening / thinking */}
      {showRing && (
        <span
          className={cn(
            "absolute rounded-full border-2 border-lavender-300/70",
            SIZE_MAP[size],
            "scale-110 animate-ping",
          )}
          style={{ animationDuration: "2.2s" }}
        />
      )}

      <div
        className={cn(
          "relative rounded-full animate-breathe",
          SIZE_MAP[size],
        )}
      >
        <div className="relative w-full h-full rounded-full glass-panel shadow-lift overflow-hidden flex items-center justify-center">
          <BloomFace state={state} />
        </div>

        {state === "speaking" && (
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-3 rounded-full bg-charcoal/90 px-3 py-1.5 shadow-card">
            <VoiceWaveform active tone="light" className="h-3" />
          </div>
        )}
      </div>
    </div>
  );
}

function BloomFace({ state }: { state: AvatarState }) {
  const blink = state === "idle";
  return (
    <svg
      viewBox="0 0 200 220"
      className="w-[86%] h-[86%]"
      role="img"
      aria-label="Bloom, your virtual pregnancy concierge"
    >
      <defs>
        <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-lavender-400)" />
          <stop offset="100%" stopColor="var(--color-lavender-600)" />
        </linearGradient>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6e3d3" />
          <stop offset="100%" stopColor="#eccbb0" />
        </linearGradient>
        <linearGradient id="topGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-blush-300)" />
          <stop offset="100%" stopColor="var(--color-lavender-400)" />
        </linearGradient>
      </defs>

      {/* hair back */}
      <path
        d="M40 96C36 46 66 12 100 12C134 12 164 46 160 96C160 96 168 150 156 190C150 172 146 150 140 140C142 120 138 100 100 100C62 100 58 120 60 140C54 150 50 172 44 190C32 150 40 96 40 96Z"
        fill="url(#hairGrad)"
      />

      {/* shoulders / top */}
      <path
        d="M28 214C30 178 58 156 100 156C142 156 170 178 172 214C172 218 168 220 164 220H36C32 220 28 218 28 214Z"
        fill="url(#topGrad)"
      />

      {/* neck */}
      <rect x="86" y="132" width="28" height="30" rx="10" fill="#e6bda1" />

      {/* face */}
      <ellipse cx="100" cy="98" rx="50" ry="56" fill="url(#skinGrad)" />

      {/* soft cheek blush */}
      <ellipse cx="70" cy="112" rx="10" ry="6" fill="var(--color-blush-300)" opacity="0.55" />
      <ellipse cx="130" cy="112" rx="10" ry="6" fill="var(--color-blush-300)" opacity="0.55" />

      {/* hair front strands / bangs */}
      <path
        d="M52 78C56 52 76 38 100 38C124 38 144 52 148 78C140 64 122 58 100 58C78 58 60 64 52 78Z"
        fill="url(#hairGrad)"
      />
      <path d="M50 84C48 96 50 108 54 118C50 104 49 92 50 84Z" fill="url(#hairGrad)" />
      <path d="M150 84C152 96 150 108 146 118C150 104 151 92 150 84Z" fill="url(#hairGrad)" />

      {/* eyebrows */}
      <path d="M74 86C79 82 87 81 93 84" stroke="#7a5a45" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M126 86C121 82 113 81 107 84" stroke="#7a5a45" strokeWidth="3" strokeLinecap="round" fill="none" />

      {/* eyes */}
      {blink ? (
        <>
          <path d="M76 98C80 102 88 102 92 98" stroke="var(--color-charcoal)" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M108 98C112 102 120 102 124 98" stroke="var(--color-charcoal)" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="84" cy="98" rx="4.5" ry="5.5" fill="var(--color-charcoal)" />
          <ellipse cx="116" cy="98" rx="4.5" ry="5.5" fill="var(--color-charcoal)" />
        </>
      )}

      {/* nose */}
      <path d="M100 104C100 110 98 114 96 116" stroke="#c9997c" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* mouth */}
      <path
        d="M86 128C92 134 108 134 114 128"
        stroke="#a8594f"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

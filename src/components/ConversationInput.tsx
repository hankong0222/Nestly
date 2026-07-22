"use client";

import { Camera, Mic, ArrowUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import VoiceWaveform from "./VoiceWaveform";

export default function ConversationInput({
  placeholder = "Ask Bloom anything…",
  cameraHref = "/scan",
  className,
  onSubmit,
}: {
  placeholder?: string;
  cameraHref?: string;
  className?: string;
  onSubmit?: (value: string) => void;
}) {
  const [value, setValue] = useState("");
  const [listening, setListening] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full bg-white shadow-card border border-black/[0.04] pl-5 pr-1.5 py-1.5",
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        {listening ? (
          <div className="flex items-center gap-3 py-2.5">
            <VoiceWaveform active tone="dark" className="h-4" />
            <span className="text-sm text-lavender-600">Listening…</span>
          </div>
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && value.trim()) {
                onSubmit?.(value.trim());
                setValue("");
              }
            }}
            placeholder={placeholder}
            className="w-full bg-transparent outline-none text-[15px] text-charcoal placeholder:text-charcoal-faint py-2.5"
          />
        )}
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          type="button"
          onClick={() => setListening((v) => !v)}
          aria-pressed={listening}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200",
            listening
              ? "bg-lavender-500 text-white"
              : "text-charcoal-soft hover:bg-cream-soft",
          )}
        >
          <Mic size={18} strokeWidth={1.75} />
        </button>

        <Link
          href={cameraHref}
          className="flex items-center justify-center w-10 h-10 rounded-full text-charcoal-soft hover:bg-cream-soft transition-colors duration-200"
        >
          <Camera size={18} strokeWidth={1.75} />
        </Link>

        {value.trim() && !listening && (
          <button
            type="button"
            onClick={() => {
              onSubmit?.(value.trim());
              setValue("");
            }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-charcoal text-cream"
          >
            <ArrowUp size={18} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}

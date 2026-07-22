"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import Button from "@/components/Button";
import { cn } from "@/lib/cn";

const MOODS = [
  { label: "Calm", emoji: "🌿" },
  { label: "Tired", emoji: "🌙" },
  { label: "Anxious", emoji: "🌧" },
  { label: "Joyful", emoji: "🌸" },
  { label: "Uneasy", emoji: "🍃" },
];

const SYMPTOMS = [
  "Nausea",
  "Back pain",
  "Fatigue",
  "Swelling",
  "Cravings",
  "Trouble sleeping",
  "Braxton Hicks",
  "Heartburn",
];

export default function CheckInPage() {
  const router = useRouter();
  const [mood, setMood] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function toggleSymptom(s: string) {
    setSymptoms((list) =>
      list.includes(s) ? list.filter((x) => x !== s) : [...list, s],
    );
  }

  if (saved) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full px-6 text-center">
        <span className="text-5xl mb-4">🌸</span>
        <h1 className="font-display text-2xl text-charcoal mb-2">
          Thanks for checking in
        </h1>
        <p className="text-sm text-charcoal-faint max-w-[260px] text-balance mb-8">
          Bloom will keep an eye on patterns and let you know if anything is
          worth mentioning at your next visit.
        </p>
        <Button className="w-full max-w-xs" onClick={() => router.push("/home")}>
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full px-6 pt-6">
      <ScreenHeader />
      <h1 className="font-display text-2xl text-charcoal mt-2 mb-1">
        Daily check-in
      </h1>
      <p className="text-sm text-charcoal-faint mb-6">
        A quick moment for you and Bloom.
      </p>

      <p className="font-display text-[15px] text-charcoal mb-3">
        How are you feeling?
      </p>
      <div className="flex justify-between mb-8">
        {MOODS.map((m) => {
          const active = mood === m.label;
          return (
            <button
              key={m.label}
              type="button"
              onClick={() => setMood(m.label)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-2xl px-2.5 py-3 transition-all duration-200",
                active
                  ? "bg-charcoal text-cream shadow-card scale-105"
                  : "bg-white text-charcoal-soft shadow-card border border-black/[0.03]",
              )}
            >
              <span className="text-xl">{m.emoji}</span>
              <span className="text-[10px]">{m.label}</span>
            </button>
          );
        })}
      </div>

      <p className="font-display text-[15px] text-charcoal mb-3">
        Any symptoms today?
      </p>
      <div className="flex flex-wrap gap-2 mb-8">
        {SYMPTOMS.map((s) => {
          const active = symptoms.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => toggleSymptom(s)}
              className={cn(
                "rounded-full px-3.5 py-2 text-xs transition-colors duration-200",
                active
                  ? "bg-lavender-500 text-white"
                  : "bg-white text-charcoal-soft shadow-card border border-black/[0.03]",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>

      <p className="font-display text-[15px] text-charcoal mb-3">
        Anything else to share?
      </p>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="Optional notes for Bloom…"
        className="w-full rounded-2xl bg-white shadow-card border border-black/[0.03] p-4 text-sm text-charcoal placeholder:text-charcoal-faint outline-none resize-none mb-8 focus:border-lavender-300"
      />

      <div className="mt-auto pb-4">
        <Button
          className="w-full"
          disabled={!mood}
          onClick={() => setSaved(true)}
        >
          Save check-in
        </Button>
      </div>
    </div>
  );
}

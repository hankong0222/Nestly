"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import LiveCallStatus from "@/components/LiveCallStatus";
import { callProgressSteps } from "@/lib/mockData";

const RECIPIENT_NAMES: Record<string, string> = {
  Pharmacy: "GreenCare Pharmacy",
  Clinic: "Riverside OB-GYN",
  Store: "Willow Baby Co.",
  Other: "the requested contact",
};

const TRANSCRIPT = [
  {
    speaker: "Bloom",
    text: "Hi, I'm calling on behalf of a customer with a quick question about one of your products.",
  },
  { speaker: "Pharmacist", text: "Of course — what product is it?" },
  {
    speaker: "Bloom",
    text: "It's called Example Retinol Cream. She's currently pregnant and looking for a retinol-free alternative.",
  },
  {
    speaker: "Pharmacist",
    text: "Let me check... yes, we carry CeraHydrate Daily Cream — it's retinol-free.",
  },
  { speaker: "Bloom", text: "Wonderful. Is it in stock today, and what's the price?" },
  { speaker: "Pharmacist", text: "$24.99, and yes, we have it in stock." },
];

function LiveCall() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipient = searchParams.get("recipient") || "Pharmacy";
  const recipientName = RECIPIENT_NAMES[recipient] || RECIPIENT_NAMES.Other;

  const [elapsed, setElapsed] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);
  const [joined, setJoined] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (ended) return;
    const timer = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [ended]);

  useEffect(() => {
    if (ended) return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i >= callProgressSteps.length) {
        clearInterval(interval);
        setActiveStepIndex(callProgressSteps.length);
        setTimeout(() => {
          setEnded(true);
          router.push(`/calls/summary?recipient=${encodeURIComponent(recipient)}`);
        }, 1200);
      } else {
        setActiveStepIndex(i);
      }
    }, 2400);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  function endCall() {
    setEnded(true);
    router.push(`/calls/summary?recipient=${encodeURIComponent(recipient)}`);
  }

  return (
    <div className="flex flex-col min-h-full px-6 pt-6">
      <LiveCallStatus
        recipientName={recipientName}
        elapsedSeconds={elapsed}
        steps={callProgressSteps.map((s) => s.label)}
        activeStepIndex={activeStepIndex}
        muted={muted}
        onToggleMute={() => setMuted((m) => !m)}
        transcriptOpen={transcriptOpen}
        onToggleTranscript={() => setTranscriptOpen((v) => !v)}
        onJoinCall={() => setJoined((v) => !v)}
        onEndCall={endCall}
      />

      <AnimatePresence>
        {joined && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="text-center text-xs text-lavender-600 mt-4"
          >
            You&apos;ve joined the line — Bloom will keep guiding the call.
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transcriptOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTranscriptOpen(false)}
              className="fixed inset-0 z-40 bg-charcoal/40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] max-h-[70vh] overflow-y-auto scrollbar-thin rounded-t-[2rem] bg-cream shadow-soft"
            >
              <div className="sticky top-0 bg-cream pt-3 pb-2 flex justify-center">
                <span className="w-10 h-1 rounded-full bg-charcoal-faint/30" />
              </div>
              <div className="px-6 pb-8">
                <p className="font-display text-lg text-charcoal mb-4">
                  Live transcript
                </p>
                <div className="space-y-3">
                  {TRANSCRIPT.map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        line.speaker === "Bloom" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          line.speaker === "Bloom"
                            ? "bg-lavender-100 text-charcoal rounded-tl-sm"
                            : "bg-white shadow-card text-charcoal rounded-tr-sm"
                        }`}
                      >
                        <p className="text-[11px] text-charcoal-faint mb-0.5">
                          {line.speaker}
                        </p>
                        {line.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function LiveCallPage() {
  return (
    <Suspense fallback={null}>
      <LiveCall />
    </Suspense>
  );
}

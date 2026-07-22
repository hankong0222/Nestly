"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Building2, Pill, Store, MoreHorizontal } from "lucide-react";
import ScreenHeader from "@/components/ScreenHeader";
import AvatarStage from "@/components/AvatarStage";
import Button from "@/components/Button";
import type { CallRecipientType } from "@/lib/types";

const RECIPIENTS: { type: CallRecipientType; icon: typeof Building2 }[] = [
  { type: "Clinic", icon: Building2 },
  { type: "Pharmacy", icon: Pill },
  { type: "Store", icon: Store },
  { type: "Other", icon: MoreHorizontal },
];

function CallSetup() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [recipient, setRecipient] = useState<CallRecipientType>(
    (searchParams.get("recipient") as CallRecipientType) || "Pharmacy",
  );
  const [ask, setAsk] = useState(
    searchParams.get("ask") ||
      "Ask whether this pharmacy has a pregnancy-friendly alternative without retinol.",
  );

  return (
    <div className="flex flex-col min-h-full px-6 pt-6">
      <ScreenHeader />

      <div className="flex flex-col items-center text-center mt-2 mb-8">
        <AvatarStage state="idle" size="medium" />
        <h1 className="font-display text-2xl text-charcoal mt-5">
          Let Bloom make the video call
        </h1>
        <p className="text-sm text-charcoal-faint mt-1.5 max-w-[280px] text-balance">
          Bloom will join a video call and share only what you approve.
        </p>
      </div>

      <p className="font-display text-[15px] text-charcoal mb-3">
        Who should Bloom call?
      </p>
      <div className="grid grid-cols-4 gap-2.5 mb-7">
        {RECIPIENTS.map(({ type, icon: Icon }) => {
          const active = recipient === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setRecipient(type)}
              className={`flex flex-col items-center gap-2 rounded-2xl py-3.5 transition-colors duration-200 ${
                active
                  ? "bg-charcoal text-cream shadow-card"
                  : "bg-white text-charcoal-soft shadow-card border border-black/[0.03]"
              }`}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span className="text-[11px]">{type}</span>
            </button>
          );
        })}
      </div>

      <p className="font-display text-[15px] text-charcoal mb-3">
        What should Bloom ask?
      </p>
      <textarea
        value={ask}
        onChange={(e) => setAsk(e.target.value)}
        rows={4}
        className="w-full rounded-2xl bg-white shadow-card border border-black/[0.03] p-4 text-sm text-charcoal placeholder:text-charcoal-faint outline-none resize-none mb-8 focus:border-lavender-300"
      />

      <div className="mt-auto pb-4">
        <Button
          className="w-full"
          disabled={!ask.trim()}
          onClick={() =>
            router.push(
              `/calls/consent?recipient=${encodeURIComponent(
                recipient,
              )}&ask=${encodeURIComponent(ask.trim())}`,
            )
          }
        >
          Review &amp; approve
        </Button>
      </div>
    </div>
  );
}

export default function CallSetupPage() {
  return (
    <Suspense fallback={null}>
      <CallSetup />
    </Suspense>
  );
}

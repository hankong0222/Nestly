"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ScreenHeader from "@/components/ScreenHeader";
import CallConsentCard from "@/components/CallConsentCard";
import Button from "@/components/Button";
import { currentUser, scannedProductName } from "@/lib/mockData";

function ConsentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipient = searchParams.get("recipient") || "Pharmacy";
  const ask = searchParams.get("ask") || "";

  const shareItems = [
    { label: "First name", value: currentUser.firstName },
    { label: "Pregnancy status", value: "Yes" },
    { label: "Product name", value: scannedProductName },
  ];

  const askItems = [
    "Whether a pharmacist is available",
    "Whether there is a retinoid-free alternative",
    "Whether the product is currently in stock",
  ];

  return (
    <div className="flex flex-col min-h-full px-6 pt-6">
      <ScreenHeader title="Confirm the video call" />

      <p className="text-sm text-charcoal-faint mt-3 mb-5 text-balance">
        Bloom is ready to start a video call with a{" "}
        {recipient.toLowerCase()} on your behalf. Review what will be shared
        and asked before it connects.
      </p>

      {ask && (
        <div className="rounded-2xl bg-lavender-50 p-4 mb-5">
          <p className="text-xs text-lavender-700 leading-relaxed italic">
            &ldquo;{ask}&rdquo;
          </p>
        </div>
      )}

      <CallConsentCard shareItems={shareItems} askItems={askItems} />

      <div className="mt-auto pt-8 pb-4 flex flex-col gap-3">
        <Button
          className="w-full"
          onClick={() =>
            router.push(`/calls/live?recipient=${encodeURIComponent(recipient)}`)
          }
        >
          Approve and start call
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.back()}
        >
          Edit information
        </Button>
      </div>
    </div>
  );
}

export default function CallConsentPage() {
  return (
    <Suspense fallback={null}>
      <ConsentContent />
    </Suspense>
  );
}

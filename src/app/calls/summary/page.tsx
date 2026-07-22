"use client";

import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, Bookmark, BellPlus, Video } from "lucide-react";
import AvatarStage from "@/components/AvatarStage";
import CallSummaryCard from "@/components/CallSummaryCard";
import Button from "@/components/Button";
import { callSummaryResult } from "@/lib/mockData";

function SummaryContent() {
  return (
    <div className="flex flex-col min-h-full px-6 pt-12">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative">
          <AvatarStage state="idle" size="medium" />
          <span className="absolute -bottom-1 -right-1 flex items-center justify-center w-8 h-8 rounded-full bg-sage-500 text-white shadow-card">
            <CheckCircle2 size={16} strokeWidth={2} />
          </span>
        </div>
        <h1 className="font-display text-2xl text-charcoal mt-5">
          Video call completed
        </h1>
        <p className="text-sm text-charcoal-faint mt-1.5 max-w-[280px] text-balance">
          Here&apos;s a summary of what Bloom learned on your behalf.
        </p>
      </div>

      <CallSummaryCard result={callSummaryResult} />

      <div className="flex flex-col gap-3 mt-7 pb-6">
        <Button
          className="w-full"
          icon={<Bookmark size={16} strokeWidth={1.8} />}
        >
          Save result
        </Button>
        <Button
          variant="secondary"
          className="w-full"
          icon={<BellPlus size={16} strokeWidth={1.8} />}
        >
          Add reminder
        </Button>
        <Link href="/calls">
          <Button
            variant="ghost"
            className="w-full"
            icon={<Video size={16} strokeWidth={1.8} />}
          >
            Call another location
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function CallSummaryPage() {
  return (
    <Suspense fallback={null}>
      <SummaryContent />
    </Suspense>
  );
}

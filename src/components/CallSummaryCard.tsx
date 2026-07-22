import { CheckCircle2, Tag, PackageCheck, Stethoscope } from "lucide-react";
import type { CallSummaryResult } from "@/lib/types";

export default function CallSummaryCard({
  result,
}: {
  result: CallSummaryResult;
}) {
  return (
    <div className="rounded-3xl bg-white shadow-card border border-black/[0.03] p-5">
      <div className="flex items-start gap-3 mb-5">
        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sage-100 text-sage-600 shrink-0">
          <CheckCircle2 size={17} strokeWidth={1.8} />
        </span>
        <p className="font-display text-[16px] text-charcoal leading-snug pt-1.5">
          {result.headline}
        </p>
      </div>

      <div className="space-y-3">
        <Row icon={Tag} label="Product name" value={result.productName} />
        <Row icon={PackageCheck} label="Price" value={result.price} />
        <Row icon={PackageCheck} label="Availability" value={result.availability} />
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-lavender-50 p-4">
        <Stethoscope size={16} className="text-lavender-600 mt-0.5 shrink-0" strokeWidth={1.8} />
        <p className="text-xs text-charcoal-soft leading-relaxed">
          {result.note}
        </p>
      </div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-cream-soft px-3.5 py-2.5">
      <span className="flex items-center gap-2 text-xs text-charcoal-faint">
        <Icon size={13} strokeWidth={1.8} />
        {label}
      </span>
      <span className="text-sm font-medium text-charcoal">{value}</span>
    </div>
  );
}

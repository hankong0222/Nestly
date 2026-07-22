"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Sparkles, Video } from "lucide-react";
import ScreenHeader from "@/components/ScreenHeader";
import IngredientCard from "@/components/IngredientCard";
import EvidenceDrawer from "@/components/EvidenceDrawer";
import Button from "@/components/Button";
import { analyzedIngredients, scannedProductName } from "@/lib/mockData";
import type { Ingredient } from "@/lib/types";

export default function ScanResultPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Ingredient | null>(null);

  const counts = useMemo(() => {
    const flagged = analyzedIngredients.filter((i) => i.level === "flagged").length;
    const limited = analyzedIngredients.filter((i) => i.level === "limited").length;
    const clear = analyzedIngredients.filter((i) => i.level === "clear").length;
    return { flagged, limited, clear };
  }, []);

  return (
    <div className="flex flex-col min-h-full px-6 pt-6">
      <ScreenHeader title={scannedProductName} />

      <h1 className="font-display text-2xl text-charcoal mt-4 mb-1.5">
        Review recommended
      </h1>
      <p className="text-sm text-charcoal-soft leading-relaxed mb-5 text-balance">
        Bloom found one ingredient that may require professional guidance.
      </p>

      <div className="rounded-2xl bg-white shadow-card border border-black/[0.03] p-4 mb-6">
        <div className="grid grid-cols-3 divide-x divide-cream-soft">
          <SummaryStat count={counts.flagged} label="to review" tone="blush" />
          <SummaryStat count={counts.limited} label="limited evidence" tone="amber" />
          <SummaryStat count={counts.clear} label="no identified concern" tone="sage" />
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {analyzedIngredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            defaultOpen={ingredient.level === "flagged"}
            onViewSources={setSelected}
            onAskBloom={() => router.push("/home")}
            onCallPharmacist={(i) =>
              router.push(
                `/calls?recipient=Pharmacy&ask=${encodeURIComponent(
                  `Ask whether this pharmacy has a pregnancy-friendly alternative without ${i.name.toLowerCase()}.`,
                )}`,
              )
            }
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <Button
          variant="secondary"
          className="w-full"
          icon={<Bookmark size={16} strokeWidth={1.8} />}
        >
          Save product
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            className="w-full"
            icon={<Sparkles size={15} strokeWidth={1.8} />}
          >
            Find an alternative
          </Button>
          <Button
            className="w-full"
            icon={<Video size={15} strokeWidth={1.8} />}
            onClick={() =>
              router.push(
                `/calls?recipient=Pharmacy&ask=${encodeURIComponent(
                  "Ask whether this pharmacy has a pregnancy-friendly alternative without retinol.",
                )}`,
              )
            }
          >
            Ask Bloom to video call
          </Button>
        </div>
      </div>

      <p className="text-[11px] text-charcoal-faint text-center leading-relaxed mb-6">
        Bloom provides educational information and does not replace
        professional medical advice.
      </p>

      <EvidenceDrawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        ingredientName={selected?.name}
        sources={selected?.sources ?? []}
      />
    </div>
  );
}

function SummaryStat({
  count,
  label,
  tone,
}: {
  count: number;
  label: string;
  tone: "blush" | "amber" | "sage";
}) {
  const toneClass = {
    blush: "text-blush-500",
    amber: "text-amber-600",
    sage: "text-sage-600",
  }[tone];

  return (
    <div className="flex flex-col items-center text-center px-1.5">
      <p className={`font-display text-2xl ${toneClass}`}>{count}</p>
      <p className="text-[11px] text-charcoal-faint leading-tight mt-1">
        {label}
      </p>
    </div>
  );
}

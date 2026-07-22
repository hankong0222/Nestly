"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  TriangleAlert,
  CircleDot,
  CircleCheck,
  BookOpen,
  MessageCircle,
  Video,
} from "lucide-react";
import { cn } from "@/lib/cn";
import type { Ingredient } from "@/lib/types";

const LEVEL_META = {
  flagged: {
    icon: TriangleAlert,
    badge: "bg-blush-100 text-blush-500",
    label: "text-blush-500",
  },
  limited: {
    icon: CircleDot,
    badge: "bg-amber-100 text-amber-600",
    label: "text-amber-600",
  },
  clear: {
    icon: CircleCheck,
    badge: "bg-sage-100 text-sage-600",
    label: "text-sage-600",
  },
} as const;

export default function IngredientCard({
  ingredient,
  onViewSources,
  onAskBloom,
  onCallPharmacist,
  defaultOpen = false,
}: {
  ingredient: Ingredient;
  onViewSources?: (ingredient: Ingredient) => void;
  onAskBloom?: (ingredient: Ingredient) => void;
  onCallPharmacist?: (ingredient: Ingredient) => void;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [showWhy, setShowWhy] = useState(defaultOpen);
  const meta = LEVEL_META[ingredient.level];
  const Icon = meta.icon;

  return (
    <div className="rounded-2xl bg-white shadow-card border border-black/[0.03] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-full shrink-0",
              meta.badge,
            )}
          >
            <Icon size={16} strokeWidth={2} />
          </span>
          <span className="min-w-0">
            <p className="font-display text-[15px] text-charcoal truncate">
              {ingredient.name}
            </p>
            <p className={cn("text-xs mt-0.5", meta.label)}>
              {ingredient.status}
            </p>
          </span>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            "shrink-0 text-charcoal-faint transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0.5 border-t border-cream-soft">
              {ingredient.level === "flagged" ? (
                <>
                  <AnimatePresence initial={false}>
                    {showWhy && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-sm text-charcoal-soft leading-relaxed overflow-hidden pt-3"
                      >
                        {ingredient.explanation}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <div className="flex flex-wrap gap-2 pt-3">
                    <ActionPill
                      icon={TriangleAlert}
                      onClick={() => setShowWhy((v) => !v)}
                    >
                      Why was this flagged?
                    </ActionPill>
                    <ActionPill
                      icon={BookOpen}
                      onClick={() => onViewSources?.(ingredient)}
                    >
                      View sources
                    </ActionPill>
                    <ActionPill
                      icon={MessageCircle}
                      onClick={() => onAskBloom?.(ingredient)}
                    >
                      Ask Bloom
                    </ActionPill>
                    <ActionPill
                      icon={Video}
                      onClick={() => onCallPharmacist?.(ingredient)}
                    >
                      Video call a pharmacist
                    </ActionPill>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm text-charcoal-soft leading-relaxed pt-3">
                    {ingredient.explanation}
                  </p>
                  {ingredient.sources && ingredient.sources.length > 0 && (
                    <div className="pt-3">
                      <ActionPill
                        icon={BookOpen}
                        onClick={() => onViewSources?.(ingredient)}
                      >
                        View sources
                      </ActionPill>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionPill({
  icon: Icon,
  children,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full bg-cream-soft px-3 py-1.5 text-xs text-charcoal-soft hover:bg-lavender-100 hover:text-lavender-700 transition-colors duration-200"
    >
      <Icon size={13} strokeWidth={1.8} />
      {children}
    </button>
  );
}

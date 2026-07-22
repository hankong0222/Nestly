"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export default function AnalysisProgress({
  steps,
  activeIndex,
  className,
}: {
  steps: string[];
  activeIndex: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        const isLast = i === steps.length - 1;

        return (
          <div key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "flex items-center justify-center w-7 h-7 rounded-full border-2 transition-colors duration-300 shrink-0",
                  done && "bg-sage-500 border-sage-500",
                  active && "border-lavender-500 bg-white",
                  !done && !active && "border-cream-soft bg-white",
                )}
              >
                {done ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </motion.span>
                ) : active ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-lavender-500 animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-cream-soft" />
                )}
              </span>
              {!isLast && (
                <span
                  className={cn(
                    "w-[2px] flex-1 min-h-[22px] transition-colors duration-500",
                    done ? "bg-sage-300" : "bg-cream-soft",
                  )}
                />
              )}
            </div>
            <p
              className={cn(
                "text-[15px] pb-6 pt-0.5 transition-colors duration-300",
                done && "text-charcoal-soft",
                active && "text-charcoal font-medium",
                !done && !active && "text-charcoal-faint",
              )}
            >
              {step}
            </p>
          </div>
        );
      })}
    </div>
  );
}

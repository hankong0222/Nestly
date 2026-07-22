"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, BookOpen } from "lucide-react";
import type { EvidenceSource } from "@/lib/types";

export default function EvidenceDrawer({
  open,
  onClose,
  ingredientName,
  sources = [],
}: {
  open: boolean;
  onClose: () => void;
  ingredientName?: string;
  sources?: EvidenceSource[];
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-charcoal/40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[430px] max-h-[75vh] overflow-y-auto scrollbar-thin rounded-t-[2rem] bg-cream shadow-soft"
          >
            <div className="sticky top-0 bg-cream pt-3 pb-2 flex justify-center">
              <span className="w-10 h-1 rounded-full bg-charcoal-faint/30" />
            </div>
            <div className="px-6 pb-8">
              <div className="flex items-center justify-between mb-1">
                <p className="font-display text-lg text-charcoal">Sources</p>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-cream-soft text-charcoal-soft"
                >
                  <X size={18} />
                </button>
              </div>
              {ingredientName && (
                <p className="text-sm text-charcoal-faint mb-5">
                  Referenced for {ingredientName}
                </p>
              )}

              <div className="space-y-3">
                {sources.map((source) => (
                  <div
                    key={source.id}
                    className="rounded-2xl bg-white border border-black/[0.03] shadow-card p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lavender-100 text-lavender-600 shrink-0">
                        <BookOpen size={14} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-charcoal leading-snug">
                          {source.title}
                        </p>
                        <p className="text-xs text-lavender-600 mt-1">
                          {source.publisher}
                        </p>
                        <p className="text-xs text-charcoal-faint mt-1.5 leading-relaxed">
                          {source.note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-charcoal-faint text-center leading-relaxed mt-6">
                Bloom provides educational information and does not replace
                professional medical advice.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

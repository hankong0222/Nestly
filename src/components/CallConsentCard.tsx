import { ShieldCheck } from "lucide-react";

export type ConsentShareItem = { label: string; value: string };

export default function CallConsentCard({
  shareItems,
  askItems,
}: {
  shareItems: ConsentShareItem[];
  askItems: string[];
}) {
  return (
    <div className="rounded-3xl bg-white shadow-card border border-black/[0.03] p-5">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-lavender-100 text-lavender-600">
          <ShieldCheck size={15} strokeWidth={1.8} />
        </span>
        <p className="font-display text-[15px] text-charcoal">
          Bloom will share
        </p>
      </div>
      <dl className="space-y-2.5 mb-5">
        {shareItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <dt className="text-charcoal-faint">{item.label}</dt>
            <dd className="text-charcoal font-medium">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="h-px bg-cream-soft mb-5" />

      <p className="font-display text-[15px] text-charcoal mb-3">
        Bloom will ask
      </p>
      <ul className="space-y-2.5">
        {askItems.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-blush-300 mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

import { Stethoscope, ScanEye, FlaskConical, HeartHandshake, Plus } from "lucide-react";
import { appointments } from "@/lib/mockData";
import type { Appointment } from "@/lib/types";

const KIND_META: Record<
  Appointment["kind"],
  { icon: typeof Stethoscope; tone: "lavender" | "blush" }
> = {
  checkup: { icon: Stethoscope, tone: "lavender" },
  scan: { icon: ScanEye, tone: "blush" },
  lab: { icon: FlaskConical, tone: "lavender" },
  class: { icon: HeartHandshake, tone: "blush" },
};

export default function TasksPage() {
  return (
    <div className="flex flex-col min-h-full px-6 pt-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="font-display text-2xl text-charcoal">
          My appointments
        </h1>
        <button
          type="button"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-charcoal text-cream shadow-card"
        >
          <Plus size={16} strokeWidth={2} />
        </button>
      </div>
      <p className="text-sm text-charcoal-faint mb-6">
        Bloom keeps your visits and tasks organized.
      </p>

      <div className="flex flex-col gap-3">
        {appointments.map((apt) => {
          const meta = KIND_META[apt.kind];
          const Icon = meta.icon;
          return (
            <div
              key={apt.id}
              className="flex items-center gap-3.5 rounded-2xl bg-white shadow-card border border-black/[0.03] p-4"
            >
              <span
                className={`flex items-center justify-center w-11 h-11 rounded-xl shrink-0 ${
                  meta.tone === "lavender"
                    ? "bg-lavender-100 text-lavender-600"
                    : "bg-blush-100 text-blush-500"
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] text-charcoal truncate">
                  {apt.title}
                </p>
                <p className="text-xs text-charcoal-faint mt-0.5 truncate">
                  {apt.provider} · {apt.location}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-charcoal">{apt.date}</p>
                <p className="text-[11px] text-charcoal-faint mt-0.5">
                  {apt.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import {
  User,
  Bell,
  Pill,
  ShieldCheck,
  CircleHelp,
  LogOut,
  ChevronRight,
} from "lucide-react";
import AvatarStage from "@/components/AvatarStage";
import PregnancyStatusBadge from "@/components/PregnancyStatusBadge";
import { currentUser } from "@/lib/mockData";

const SETTINGS = [
  { icon: User, label: "Personal information" },
  { icon: Bell, label: "Notifications" },
  { icon: Pill, label: "Linked pharmacy" },
  { icon: ShieldCheck, label: "Privacy & data" },
  { icon: CircleHelp, label: "Help & support" },
];

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-full px-6 pt-8">
      <div className="flex flex-col items-center text-center mb-6">
        <AvatarStage state="idle" size="medium" />
        <h1 className="font-display text-2xl text-charcoal mt-4">
          {currentUser.firstName}
        </h1>
        <div className="mt-3">
          <PregnancyStatusBadge
            week={currentUser.week}
            trimesterLabel={currentUser.trimesterLabel}
          />
        </div>
      </div>

      <div className="rounded-2xl bg-white shadow-card border border-black/[0.03] overflow-hidden mb-6">
        {SETTINGS.map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            type="button"
            className={`w-full flex items-center gap-3.5 px-4 py-3.5 text-left ${
              i !== SETTINGS.length - 1 ? "border-b border-cream-soft" : ""
            }`}
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lavender-50 text-lavender-600 shrink-0">
              <Icon size={16} strokeWidth={1.75} />
            </span>
            <span className="flex-1 text-sm text-charcoal">{label}</span>
            <ChevronRight size={16} className="text-charcoal-faint" />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="flex items-center justify-center gap-2 text-sm text-blush-500 py-3"
      >
        <LogOut size={15} strokeWidth={1.8} />
        Log out
      </button>
    </div>
  );
}

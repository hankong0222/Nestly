import { ScanLine, Video, CalendarCheck, Sparkles } from "lucide-react";
import AvatarStage from "@/components/AvatarStage";
import ConversationInput from "@/components/ConversationInput";
import QuickActionCard from "@/components/QuickActionCard";
import PregnancyStatusBadge from "@/components/PregnancyStatusBadge";
import { currentUser } from "@/lib/mockData";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-full px-6 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl text-charcoal">
            Good morning, {currentUser.firstName}
          </h1>
          <p className="text-charcoal-faint text-sm mt-0.5">
            How are you feeling today?
          </p>
        </div>
        <div className="w-11 h-11 rounded-full glass-panel shadow-card flex items-center justify-center shrink-0">
          <AvatarStage state="idle" size="small" className="scale-[1.4]" />
        </div>
      </div>

      <div className="flex justify-center mb-5">
        <PregnancyStatusBadge
          week={currentUser.week}
          trimesterLabel={currentUser.trimesterLabel}
        />
      </div>

      <div className="flex justify-center my-4">
        <AvatarStage state="idle" size="large" />
      </div>

      <ConversationInput className="mb-7" />

      <div className="flex items-center gap-1.5 mb-3">
        <Sparkles size={13} className="text-lavender-400" />
        <p className="text-xs uppercase tracking-wider text-charcoal-faint">
          Quick actions
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        <QuickActionCard
          icon={ScanLine}
          label="Scan a product"
          description="Check an ingredient label"
          href="/scan"
          tone="lavender"
        />
        <QuickActionCard
          icon={Video}
          label="Video call"
          description="Let Bloom call for you"
          href="/calls"
          tone="blush"
        />
        <QuickActionCard
          icon={CalendarCheck}
          label="My appointments"
          description="Upcoming visits & tasks"
          href="/tasks"
          tone="lavender"
        />
        <QuickActionCard
          icon={Sparkles}
          label="Daily check-in"
          description="Log how you feel today"
          href="/checkin"
          tone="blush"
        />
      </div>
    </div>
  );
}

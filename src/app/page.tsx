import Link from "next/link";
import { ScanLine, MessageCircle, Video } from "lucide-react";
import AvatarStage from "@/components/AvatarStage";
import Button from "@/components/Button";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col min-h-full px-6 pt-14 pb-10">
      <div className="flex-1 flex flex-col items-center text-center">
        <AvatarStage state="idle" size="hero" className="animate-fade-up" />

        <h1
          className="font-display text-4xl text-charcoal mt-10 animate-fade-up"
          style={{ animationDelay: "0.05s" }}
        >
          Meet Bloom
        </h1>
        <p
          className="text-lavender-600 text-[15px] mt-2 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          Your personal pregnancy concierge.
        </p>
        <p
          className="text-charcoal-soft text-[15px] leading-relaxed mt-4 max-w-[300px] text-balance animate-fade-up"
          style={{ animationDelay: "0.15s" }}
        >
          Scan products, organize appointments, ask questions, and let Bloom
          video call on your behalf.
        </p>

        <div
          className="grid grid-cols-3 gap-3 w-full mt-9 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <CapabilityCard icon={ScanLine} label="Scan a product" />
          <CapabilityCard icon={MessageCircle} label="Ask Bloom" />
          <CapabilityCard icon={Video} label="Video call" />
        </div>
      </div>

      <div
        className="flex flex-col gap-3 mt-8 animate-fade-up"
        style={{ animationDelay: "0.25s" }}
      >
        <Link href="/home">
          <Button className="w-full">Get Started</Button>
        </Link>
        <Link href="/home">
          <Button variant="secondary" className="w-full">
            I already have an account
          </Button>
        </Link>
      </div>
    </div>
  );
}

function CapabilityCard({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-white shadow-card border border-black/[0.03] py-4 px-2">
      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-lavender-100 text-lavender-600">
        <Icon size={16} strokeWidth={1.75} />
      </span>
      <span className="text-xs text-charcoal-soft leading-tight text-center">
        {label}
      </span>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mic, MicOff, PhoneOff, Users, MessageSquareText, VideoOff } from "lucide-react";
import { cn } from "@/lib/cn";
import AvatarStage from "./AvatarStage";

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function LiveCallStatus({
  recipientName,
  elapsedSeconds,
  steps,
  activeStepIndex,
  muted,
  onToggleMute,
  onToggleTranscript,
  transcriptOpen,
  onJoinCall,
  onEndCall,
}: {
  recipientName: string;
  elapsedSeconds: number;
  steps: string[];
  activeStepIndex: number;
  muted: boolean;
  onToggleMute: () => void;
  onToggleTranscript: () => void;
  transcriptOpen: boolean;
  onJoinCall: () => void;
  onEndCall: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"requesting" | "granted" | "denied">(
    "requesting",
  );

  useEffect(() => {
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "user" }, audio: true })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraState("granted");
      })
      .catch(() => setCameraState("denied"));

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, []);

  // reflect the Mute control onto the real microphone track
  useEffect(() => {
    streamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !muted;
    });
  }, [muted]);

  return (
    <div className="flex flex-col items-center">
      {/* video call stage */}
      <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-charcoal shadow-lift mb-3">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(circle at 50% 35%, var(--color-lavender-700) 0%, var(--color-charcoal) 70%)",
          }}
        />
        <div className="relative h-full w-full flex items-center justify-center">
          <AvatarStage state="speaking" size="large" />
        </div>

        {/* top overlay: live indicator + timer */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/35 backdrop-blur px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blush-300 animate-pulse" />
            <span className="text-[11px] text-white/90 tracking-wide">
              VIDEO CALL
            </span>
          </span>
          <span className="rounded-full bg-black/35 backdrop-blur px-3 py-1.5 text-xs font-mono text-white/90">
            {formatTime(elapsedSeconds)}
          </span>
        </div>

        {/* recipient caption overlay */}
        <div className="absolute bottom-4 left-4 right-20">
          <p className="text-white text-sm font-medium leading-snug text-balance">
            {recipientName}
          </p>
          <p className="text-white/60 text-[11px] mt-0.5">Call in progress</p>
        </div>

        {/* self view PiP */}
        <div className="absolute bottom-4 right-4 w-16 h-20 rounded-xl overflow-hidden bg-white/10 backdrop-blur border border-white/20 flex flex-col items-center justify-center gap-1">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={cn(
              "absolute inset-0 w-full h-full object-cover scale-x-[-1]",
              cameraState !== "granted" && "hidden",
            )}
          />
          {cameraState !== "granted" && (
            <>
              <VideoOff size={16} className="text-white/70" strokeWidth={1.75} />
              <span className="text-[9px] text-white/50">You</span>
            </>
          )}
        </div>
      </div>

      <p className="font-display text-lg text-charcoal text-center text-balance px-4 mb-6">
        Bloom is on a video call with {recipientName}
      </p>

      <div className="w-full rounded-3xl bg-white shadow-card border border-black/[0.03] p-5 mb-6">
        <ul className="space-y-3">
          {steps.map((step, i) => {
            const done = i < activeStepIndex;
            const active = i === activeStepIndex;
            return (
              <li key={step} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full shrink-0 transition-colors duration-300",
                    done && "bg-sage-500",
                    active && "bg-lavender-500",
                    !done && !active && "bg-cream-soft",
                  )}
                >
                  {done && <Check size={12} className="text-white" strokeWidth={3} />}
                  {active && (
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  )}
                </span>
                <span
                  className={cn(
                    "text-sm",
                    active ? "text-charcoal font-medium" : "text-charcoal-soft",
                    !done && !active && "text-charcoal-faint",
                  )}
                >
                  {step}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid grid-cols-4 gap-3 w-full">
        <ControlButton
          icon={MessageSquareText}
          label="Transcript"
          active={transcriptOpen}
          onClick={onToggleTranscript}
        />
        <ControlButton
          icon={muted ? MicOff : Mic}
          label={muted ? "Unmute" : "Mute"}
          active={muted}
          onClick={onToggleMute}
        />
        <ControlButton icon={Users} label="Join call" onClick={onJoinCall} />
        <ControlButton
          icon={PhoneOff}
          label="End call"
          tone="danger"
          onClick={onEndCall}
        />
      </div>
    </div>
  );
}

function ControlButton({
  icon: Icon,
  label,
  onClick,
  active,
  tone,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  onClick: () => void;
  active?: boolean;
  tone?: "danger";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-1.5"
    >
      <span
        className={cn(
          "flex items-center justify-center w-12 h-12 rounded-full transition-colors duration-200 shadow-card",
          tone === "danger" && "bg-blush-400 text-white",
          !tone && active && "bg-lavender-500 text-white",
          !tone && !active && "bg-white text-charcoal-soft border border-black/[0.04]",
        )}
      >
        <Icon size={18} strokeWidth={1.8} />
      </span>
      <span className="text-[11px] text-charcoal-faint">{label}</span>
    </button>
  );
}

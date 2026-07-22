"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Upload, Keyboard, X, Plus, ScanLine, VideoOff } from "lucide-react";
import ScreenHeader from "@/components/ScreenHeader";
import AvatarStage from "@/components/AvatarStage";
import AnalysisProgress from "@/components/AnalysisProgress";
import Button from "@/components/Button";
import { analysisProgressSteps, scannedIngredients } from "@/lib/mockData";

type Step = "capture" | "processing" | "confirm" | "analyzing";
type CameraState = "requesting" | "granted" | "denied";

export default function ScanPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("capture");
  const [source, setSource] = useState<"scan" | "manual">("scan");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [cameraState, setCameraState] = useState<CameraState>("requesting");
  const [flash, setFlash] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // request the device camera while the user is on the capture screen
  useEffect(() => {
    if (step !== "capture") return;
    let cancelled = false;

    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: "environment" }, audio: false })
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
  }, [step]);

  function stopCamera() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  function startScan() {
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    stopCamera();
    setSource("scan");
    setStep("processing");
    setTimeout(() => {
      // Bloom's ingredient reading is a mocked demo response — every scan
      // resolves to the same illustrative product analysis.
      setIngredients(scannedIngredients);
      setStep("confirm");
    }, 1600);
  }

  function startManual() {
    stopCamera();
    setSource("manual");
    setIngredients([]);
    setStep("confirm");
  }

  function removeIngredient(name: string) {
    setIngredients((list) => list.filter((i) => i !== name));
  }

  function addIngredient() {
    const trimmed = newIngredient.trim();
    if (trimmed && !ingredients.includes(trimmed)) {
      setIngredients((list) => [...list, trimmed]);
    }
    setNewIngredient("");
  }

  useEffect(() => {
    if (step !== "analyzing") return;
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      if (i >= analysisProgressSteps.length) {
        clearInterval(interval);
        setActiveIndex(analysisProgressSteps.length);
        setTimeout(() => router.push("/scan/result"), 500);
      } else {
        setActiveIndex(i);
      }
    }, 850);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  if (step === "analyzing") {
    return (
      <div className="flex flex-col min-h-full px-6 pt-16 items-center">
        <AvatarStage state="thinking" size="medium" />
        <h2 className="font-display text-xl text-charcoal mt-6 mb-1 text-center">
          Bloom is analyzing your product
        </h2>
        <p className="text-sm text-charcoal-faint text-center mb-10">
          This usually takes just a moment.
        </p>
        <AnalysisProgress
          steps={analysisProgressSteps}
          activeIndex={activeIndex}
          className="w-full max-w-xs"
        />
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="flex flex-col min-h-full px-6 pt-6">
        <ScreenHeader onBack={() => setStep("capture")} />
        <h1 className="font-display text-2xl text-charcoal mt-2 mb-2 text-balance">
          {source === "scan"
            ? `Bloom found ${ingredients.length} ingredients.`
            : "Add the ingredients to check."}
        </h1>
        <p className="text-sm text-charcoal-faint mb-6">
          {source === "scan"
            ? "Please check that they were read correctly."
            : "Type each ingredient and press enter to add it."}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-1.5 rounded-full bg-white shadow-card border border-black/[0.03] pl-3.5 pr-2 py-2 text-sm text-charcoal"
            >
              {name}
              <button
                type="button"
                onClick={() => removeIngredient(name)}
                className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-cream-soft text-charcoal-faint"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-full bg-white shadow-card border border-black/[0.03] pl-4 pr-1.5 py-1.5 mb-8">
          <input
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addIngredient();
            }}
            placeholder="Add an ingredient…"
            className="flex-1 min-w-0 bg-transparent outline-none text-sm text-charcoal placeholder:text-charcoal-faint py-1.5"
          />
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-cream-soft text-charcoal-soft shrink-0"
          >
            <Plus size={15} />
          </button>
        </div>

        <div className="mt-auto pb-4">
          <Button
            className="w-full"
            disabled={ingredients.length === 0}
            onClick={() => {
              setActiveIndex(0);
              setStep("analyzing");
            }}
          >
            Analyze ingredients
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-full px-6 pt-6">
      <ScreenHeader />
      <h1 className="font-display text-2xl text-charcoal mt-2 mb-8 text-balance">
        What would you like Bloom to check?
      </h1>

      <div className="relative aspect-square w-full rounded-3xl bg-charcoal overflow-hidden mb-6">
        {cameraState === "granted" ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-lavender-700/40 via-charcoal to-blush-400/20" />
        )}

        {/* capture flash */}
        <div
          className={`absolute inset-0 bg-white transition-opacity duration-150 pointer-events-none ${
            flash ? "opacity-80" : "opacity-0"
          }`}
        />

        <div className="absolute inset-8 rounded-2xl border-2 border-dashed border-white/30">
          <Corner className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 rotate-0" />
          <Corner className="top-0 right-0 translate-x-1/2 -translate-y-1/2 rotate-90" />
          <Corner className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2 -rotate-90" />
          <Corner className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 rotate-180" />
          {step === "processing" && (
            <span className="absolute left-0 right-0 h-0.5 bg-lavender-300 shadow-[0_0_16px_4px_rgba(199,178,240,0.6)] animate-scan-line" />
          )}
        </div>
        <div className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-2">
          {step === "processing" ? (
            <p className="text-white/90 text-sm">Reading label…</p>
          ) : cameraState === "denied" ? (
            <>
              <VideoOff size={20} className="text-white/70" strokeWidth={1.5} />
              <p className="text-white/70 text-xs text-center px-8">
                Camera access is off. You can still upload a photo or take
                one to continue.
              </p>
            </>
          ) : (
            <>
              <ScanLine size={20} className="text-white/70" strokeWidth={1.5} />
              <p className="text-white/70 text-xs text-center px-8">
                Place the ingredient label inside the frame.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="w-full"
          icon={<Camera size={17} strokeWidth={1.8} />}
          onClick={startScan}
        >
          Take Photo
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) startScan();
          }}
        />
        <Button
          variant="secondary"
          className="w-full"
          icon={<Upload size={17} strokeWidth={1.8} />}
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Image
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          icon={<Keyboard size={17} strokeWidth={1.8} />}
          onClick={startManual}
        >
          Enter Ingredients Manually
        </Button>
      </div>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={`absolute text-lavender-300 ${className}`}
    >
      <path
        d="M2 16V6C2 3.79086 3.79086 2 6 2H16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

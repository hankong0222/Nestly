"use client";

import { cn } from "@/lib/cn";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "md" | "lg";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-charcoal text-cream hover:bg-lavender-700 shadow-card active:scale-[0.98]",
  secondary:
    "bg-white text-charcoal border border-lavender-200 hover:border-lavender-300 hover:bg-lavender-50 active:scale-[0.98]",
  ghost: "bg-transparent text-charcoal-soft hover:bg-cream-soft",
  danger: "bg-blush-400 text-white hover:bg-blush-500 active:scale-[0.98]",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-4",
};

export default function Button({
  children,
  variant = "primary",
  size = "lg",
  className,
  icon,
  ...props
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}

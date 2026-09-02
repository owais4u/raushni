"use client";

import { Languages } from "lucide-react";
import { useLocale } from "@/lib/i18n/LocaleProvider";

type LanguageToggleProps = {
  /** Visual variant for public dark header vs light/dashboard surfaces */
  variant?: "public" | "dashboard" | "auth" | "footer";
  className?: string;
  showLabel?: boolean;
};

const variantClasses: Record<NonNullable<LanguageToggleProps["variant"]>, string> = {
  public:
    "border-amber-300/80 bg-white/10 text-white hover:bg-white/15 focus:ring-amber-200 focus:ring-offset-[#120f0b]",
  dashboard:
    "border-white/10 bg-white/5 text-white hover:bg-white/10 focus:ring-accent focus:ring-offset-brand",
  auth: "border-stone-200 bg-white text-stone-800 hover:bg-stone-50 focus:ring-amber-200 focus:ring-offset-white",
  footer:
    "border-stone-300 bg-stone-50 text-stone-800 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900 focus:ring-amber-200 focus:ring-offset-white",
};

export default function LanguageToggle({
  variant = "public",
  className = "",
  showLabel = true,
}: LanguageToggleProps) {
  const { locale, toggleLocale, messages } = useLocale();
  const nextLabel = locale === "en" ? messages.common.hindi : messages.common.english;

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={`inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-full border px-3 text-xs font-bold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${variantClasses[variant]} ${className}`}
      aria-label={`${messages.common.language}: ${nextLabel}`}
      title={`${messages.common.language}: ${nextLabel}`}
    >
      <Languages size={14} aria-hidden="true" />
      {showLabel ? (
        <span className="tabular-nums">
          {locale === "en" ? "EN" : "हि"}
          <span className="mx-1 opacity-40">/</span>
          {locale === "en" ? "हि" : "EN"}
        </span>
      ) : (
        <span>{locale === "en" ? "EN" : "हि"}</span>
      )}
    </button>
  );
}

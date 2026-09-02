import { en } from "./messages/en";
import { hi } from "./messages/hi";
import type { Locale, Messages } from "./types";
import { DEFAULT_LOCALE, LOCALES } from "./types";

const catalogs: Record<Locale, Messages> = { en, hi };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as string[]).includes(value);
}

export function getMessages(locale: Locale): Messages {
  return catalogs[locale] ?? catalogs[DEFAULT_LOCALE];
}

/** Translate known public nav/footer labels by href; keep custom CMS labels as-is. */
export function translateNavLabel(locale: Locale, href: string, fallbackLabel: string): string {
  const mapped = getMessages(locale).nav[href];
  return mapped ?? fallbackLabel;
}

export type { Locale, Messages };
export { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY } from "./types";

import { cookies } from "next/headers";
import type { Locale } from "@/types";
import { locales, defaultLocale } from "./dictionary";

const COOKIE_NAME = "locale";

/** Reads the visitor's chosen language from a cookie (server-side). */
export function getLocale(): Locale {
  const value = cookies().get(COOKIE_NAME)?.value;
  if (value && (locales as string[]).includes(value)) {
    return value as Locale;
  }
  return defaultLocale;
}
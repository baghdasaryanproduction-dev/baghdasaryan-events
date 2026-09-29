"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/types";

const COOKIE_NAME = "locale";
const LOCALES: Locale[] = ["hy", "en"];

export function LanguageSelector({ current }: { current: Locale }) {
  const router = useRouter();

  function switchTo(locale: Locale) {
    if (locale === current) return;
    document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=31536000`;
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 text-sm text-char">
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          className={l === current ? "text-ink underline underline-offset-4" : "text-char hover:text-ink"}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

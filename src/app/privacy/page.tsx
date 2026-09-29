import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  const locale = getLocale();
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">{t.pages.privacy.title}</h1>
        <p className="mt-6 text-char">{t.pages.privacy.placeholder}</p>
      </main>
      <Footer locale={locale} />
    </>
  );
}
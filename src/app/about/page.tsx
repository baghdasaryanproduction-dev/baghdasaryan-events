import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  const locale = getLocale();
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">{t.pages.about.title}</h1>
        <p className="mt-6 max-w-prose text-char">{t.pages.about.placeholder}</p>
      </main>
      <Footer locale={locale} />
    </>
  );
}
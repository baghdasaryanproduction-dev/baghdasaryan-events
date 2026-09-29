import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProcessSteps } from "@/components/ProcessSteps";
import { DiasporaSection } from "@/components/DiasporaSection";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = { title: "Process" };

export default function ProcessPage() {
  const locale = getLocale();
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} />
      <main>
        <div className="mx-auto max-w-3xl px-6 pt-20">
          <h1 className="font-display text-4xl text-ink">{t.process.title}</h1>
          <p className="mt-4 text-char">{t.process.subtitle}</p>
        </div>
        <ProcessSteps locale={locale} />
        <DiasporaSection locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
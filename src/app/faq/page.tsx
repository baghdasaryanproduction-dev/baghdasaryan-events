import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getFAQs } from "@/lib/data/portfolio";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = { title: "FAQ" };

export default async function FAQPage() {
  const locale = getLocale();
  const t = getDictionary(locale);
  const faqs = await getFAQs("global");

  return (
    <>
      <Header locale={locale} />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">{t.pages.faq.title}</h1>
        <div className="mt-10">
          <FAQAccordion faqs={faqs} locale={locale} />
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
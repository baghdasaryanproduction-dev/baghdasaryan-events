import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceCard } from "@/components/ServiceCard";
import { getPublishedServices } from "@/lib/data/services";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = {
  title: "Services",
  description: "Weddings, celebrations, corporate events, and full event production in Armenia.",
};

export default async function ServicesPage() {
  const locale = getLocale();
  const t = getDictionary(locale);
  const services = await getPublishedServices();

  return (
    <>
      <Header locale={locale} />
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="max-w-xl font-display text-4xl text-ink">{t.pages.services.title}</h1>
        <p className="mt-4 max-w-prose text-char">{t.pages.services.subtitle}</p>
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} locale={locale} />
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
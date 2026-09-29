import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { ProcessSteps } from "@/components/ProcessSteps";
import { DiasporaSection } from "@/components/DiasporaSection";
import { ServiceCard } from "@/components/ServiceCard";
import { FloatingActions } from "@/components/FloatingActions";
import { getPublishedServices } from "@/lib/data/services";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Baghdasaryan Production",
  telephone: "+374-33-033-087",
  email: "baghdasaryanproduction@gmail.com",
  areaServed: "Armenia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://baghdasaryanevents.com",
};

export default async function HomePage() {
  const locale = getLocale();
  const t = getDictionary(locale);
  const services = (await getPublishedServices()).slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <TrustSection locale={locale} />

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between border-t border-line pt-12">
            <h2 className="font-display text-3xl text-ink">{t.home.servicesHeading}</h2>
            <Link href="/services" className="text-sm text-char hover:text-ink">
              {t.home.viewAllServices}
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} locale={locale} />
            ))}
          </div>
        </section>

        <ProcessSteps locale={locale} />
        <DiasporaSection locale={locale} />

        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="mx-auto max-w-lg font-display text-3xl text-ink">{t.home.finalCtaTitle}</h2>
          <Link
            href="/consultation"
            className="mt-8 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm text-paper"
          >
            {t.hero.ctaPrimary}
          </Link>
        </section>
      </main>
      <Footer locale={locale} />
      <FloatingActions />
    </>
  );
}
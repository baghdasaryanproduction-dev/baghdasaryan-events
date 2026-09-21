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

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Baghdasaryan Production",
  telephone: "+374-33-033-087",
  email: "baghdasaryanproduction@gmail.com",
  areaServed: "Armenia",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://baghdasaryanevents.com",
  // address, geo, and sameAs (social links) intentionally omitted until
  // the business supplies real, verifiable values — see MASTER PROMPT §38.
};

export default async function HomePage() {
  const services = (await getPublishedServices()).slice(0, 8);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
      />
      <Header />
      <main>
        <Hero />
        <TrustSection />

        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-end justify-between border-t border-line pt-12">
            <h2 className="font-display text-3xl text-ink">Ծառայություններ</h2>
            <Link href="/services" className="text-sm text-char hover:text-ink">
              Բոլոր ծառայությունները
            </Link>
          </div>
          <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </section>

        <ProcessSteps />
        <DiasporaSection />

        <section className="mx-auto max-w-6xl px-6 py-24 text-center">
          <h2 className="mx-auto max-w-lg font-display text-3xl text-ink">
            Պատրա՞ստ եք սկսել ձեր միջոցառման պլանավորումը
          </h2>
          <Link
            href="/consultation"
            className="mt-8 inline-block rounded-sm bg-ink px-7 py-3.5 text-sm text-paper"
          >
            Խնդրել խորհրդատվություն
          </Link>
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

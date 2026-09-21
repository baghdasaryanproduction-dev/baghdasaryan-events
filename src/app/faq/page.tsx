import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FAQAccordion } from "@/components/FAQAccordion";
import { getFAQs } from "@/lib/data/portfolio";

export const metadata: Metadata = { title: "FAQ" };

export default async function FAQPage() {
  const faqs = await getFAQs("global");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Հաճախ տրվող հարցեր</h1>
        <div className="mt-10">
          <FAQAccordion faqs={faqs} />
        </div>
      </main>
      <Footer />
    </>
  );
}

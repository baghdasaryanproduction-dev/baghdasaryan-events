import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Գաղտնիության քաղաքականություն</h1>
        {/* PLACEHOLDER — replace with counsel-reviewed policy before launch */}
        <p className="mt-6 text-char">
          [Placeholder — գաղտնիության քաղաքականության իրական տեքստը կավելացվի թողարկումից առաջ]
        </p>
      </main>
      <Footer />
    </>
  );
}

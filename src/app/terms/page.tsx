import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Պայմաններ</h1>
        {/* PLACEHOLDER — replace with counsel-reviewed terms before launch */}
        <p className="mt-6 text-char">
          [Placeholder — օգտագործման պայմանների իրական տեքստը կավելացվի թողարկումից առաջ]
        </p>
      </main>
      <Footer />
    </>
  );
}

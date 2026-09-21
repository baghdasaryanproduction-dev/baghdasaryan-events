import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Մեր մասին</h1>
        {/*
          PLACEHOLDER — replace with the company's real story via
          /admin/pages → About. Do not invent years of experience,
          event counts, or awards until the business supplies them.
        */}
        <p className="mt-6 max-w-prose text-char">
          [Placeholder — ընկերության իրական պատմությունը կլրացվի Admin Panel-ից]
        </p>
      </main>
      <Footer />
    </>
  );
}

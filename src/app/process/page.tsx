import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProcessSteps } from "@/components/ProcessSteps";
import { DiasporaSection } from "@/components/DiasporaSection";

export const metadata: Metadata = { title: "Process" };

export default function ProcessPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-3xl px-6 pt-20">
          <h1 className="font-display text-4xl text-ink">Ինչպես ենք աշխատում</h1>
          <p className="mt-4 text-char">
            Հստակ, կանխատեսելի գործընթաց՝ անկախ նրանից՝ դուք գտնվում եք Հայաստանում, թե արտերկրում։
          </p>
        </div>
        <ProcessSteps />
        <DiasporaSection />
      </main>
      <Footer />
    </>
  );
}

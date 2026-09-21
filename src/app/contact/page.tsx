import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Կապ</h1>
        <div className="mt-8 space-y-2 text-char">
          <p>Baghdasaryan Production</p>
          <p>
            <a href="tel:+37433033087" className="text-ink">+374 33 033 087</a>
          </p>
          <p>
            <a href="mailto:baghdasaryanproduction@gmail.com" className="text-ink">
              baghdasaryanproduction@gmail.com
            </a>
          </p>
          {/* Address, hours, and social links: add once supplied, via /admin/settings */}
        </div>

        <Link href="/consultation" className="mt-10 inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper">
          Խնդրել խորհրդատվություն
        </Link>
      </main>
      <Footer />
    </>
  );
}

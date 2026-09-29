import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionary";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const locale = getLocale();
  const t = getDictionary(locale);

  return (
    <>
      <Header locale={locale} />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">{t.pages.contact.title}</h1>
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
        </div>

        <Link href="/consultation" className="mt-10 inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper">
          {t.hero.ctaPrimary}
        </Link>
      </main>
      <Footer locale={locale} />
    </>
  );
}
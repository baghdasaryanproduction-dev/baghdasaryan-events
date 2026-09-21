import Link from "next/link";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

const NAV: { href: string; label: Partial<Record<Locale, string>> }[] = [
  { href: "/services", label: { hy: "Ծառայություններ", en: "Services" } },
  { href: "/services/weddings", label: { hy: "Հարսանեկան", en: "Weddings" } },
  { href: "/portfolio", label: { hy: "Օրինակագիր", en: "Portfolio" } },
  { href: "/process", label: { hy: "Գործընթաց", en: "Process" } },
  { href: "/about", label: { hy: "Մեր մասին", en: "About" } },
  { href: "/blog", label: { hy: "Բլոգ", en: "Blog" } },
  { href: "/contact", label: { hy: "Կապ", en: "Contact" } },
];

export function Header({ locale = "hy" as Locale }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg tracking-tight text-ink">
          Baghdasaryan Production
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-char transition-colors hover:text-ink"
            >
              {item.label[locale] ?? item.label.en}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSelector current={locale} />
          <Link
            href="/consultation"
            className="hidden rounded-sm border border-ink px-4 py-2 text-sm text-ink transition-colors hover:bg-ink hover:text-paper sm:inline-block"
          >
            {t.nav.requestConsultation}
          </Link>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}

function LanguageSelector({ current }: { current: Locale }) {
  return (
    <div className="flex items-center gap-2 text-sm text-char">
      {(["hy", "en"] as Locale[]).map((l) => (
        <span key={l} className={l === current ? "text-ink underline underline-offset-4" : ""}>
          {l.toUpperCase()}
        </span>
      ))}
    </div>
  );
}

function MobileNav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  return (
    <details className="lg:hidden">
      <summary className="list-none cursor-pointer px-1 text-xl leading-none text-ink">☰</summary>
      <div className="absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-4">
        <nav className="flex flex-col gap-3">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-base text-char">
              {item.label[locale] ?? item.label.en}
            </Link>
          ))}
          <Link href="/consultation" className="mt-2 rounded-sm bg-ink px-4 py-2 text-center text-paper">
            {t.nav.requestConsultation}
          </Link>
        </nav>
      </div>
    </details>
  );
}

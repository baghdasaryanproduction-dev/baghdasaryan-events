import Link from "next/link";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

export function Hero({ locale = "hy" as Locale }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Placeholder cover — replace via Admin → Homepage → Hero image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(169,131,90,0.18),_transparent_55%)]" />
      <div className="relative mx-auto flex min-h-[86vh] max-w-6xl flex-col justify-end px-6 pb-20 pt-40">
        <p className="mb-5 text-sm text-paper/70">{t.hero.eyebrow}</p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.08] tracking-tightest sm:text-6xl">
          {t.hero.title}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-paper/80">{t.hero.subtitle}</p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/consultation"
            className="rounded-sm bg-paper px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            {t.hero.ctaPrimary}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-sm border border-paper/40 px-6 py-3 text-sm text-paper transition-colors hover:border-paper"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}

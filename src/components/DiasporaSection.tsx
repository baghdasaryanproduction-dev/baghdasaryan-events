import Link from "next/link";
import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

export function DiasporaSection({ locale = "hy" as Locale }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_1.2fr]">
        <h2 className="font-display text-3xl leading-tight text-ink">{t.diaspora.title}</h2>
        <div>
          <p className="max-w-prose text-char">{t.diaspora.body}</p>
          <Link
            href="/consultation"
            className="mt-6 inline-block rounded-sm border border-ink px-5 py-2.5 text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {t.hero.ctaPrimary}
          </Link>
        </div>
      </div>
    </section>
  );
}

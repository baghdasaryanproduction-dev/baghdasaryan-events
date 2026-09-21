import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

export function TrustSection({ locale = "hy" as Locale }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const items = [t.trust.remotePlanning, t.trust.fullCoordination, t.trust.professionalExecution, t.trust.peaceOfMind];

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="max-w-md font-display text-3xl text-ink">{t.trust.title}</h2>
      <div className="mt-12 grid gap-10 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title}>
            <h3 className="text-base text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-char">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

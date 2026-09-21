import type { Locale } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

export function ProcessSteps({ locale = "hy" as Locale }: { locale?: Locale }) {
  const t = getDictionary(locale);

  return (
    <section className="bg-stone/50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="font-display text-3xl text-ink">{t.process.title}</h2>
        <ol className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.process.steps.map((step, i) => (
            <li key={step.title} className="border-t border-brass/40 pt-5">
              <span className="text-sm text-brass">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-base text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-char">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

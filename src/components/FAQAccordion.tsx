import type { Locale, FAQ } from "@/types";

export function FAQAccordion({ faqs, locale = "hy" as Locale }: { faqs: FAQ[]; locale?: Locale }) {
  if (faqs.length === 0) return null;

  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {faqs.map((faq) => (
        <details key={faq.id} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between text-ink">
            <span>{faq.question[locale] ?? faq.question.en}</span>
            <span className="text-char transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-char">
            {faq.answer[locale] ?? faq.answer.en}
          </p>
        </details>
      ))}
    </div>
  );
}

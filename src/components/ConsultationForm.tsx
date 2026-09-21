"use client";

import { useState, type FormEvent } from "react";
import type { Locale, LeadFormOption } from "@/types";
import { getDictionary } from "@/lib/i18n/dictionary";

interface Props {
  locale?: Locale;
  eventTypeOptions: LeadFormOption[];
  budgetOptions: LeadFormOption[];
}

export function ConsultationForm({ locale = "hy" as Locale, eventTypeOptions, budgetOptions }: Props) {
  const t = getDictionary(locale);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      full_name: String(form.get("full_name") || ""),
      event_type: String(form.get("event_type") || ""),
      event_location: String(form.get("event_location") || ""),
      guest_count: Number(form.get("guest_count") || 0),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      budget_range: String(form.get("budget_range") || ""),
      additional_information: String(form.get("additional_information") || ""),
      privacy_consent: form.get("privacy_consent") === "on",
      source: "website_consultation_form",
      website: String(form.get("website") || ""), // honeypot — must stay empty
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "submission_failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        locale === "hy"
          ? "Չհաջողվեց ուղարկել հարցումը։ Խնդրում ենք փորձել կրկին կամ կապվել մեզ հետ ուղղակիորեն։"
          : "We couldn't submit your request. Please try again or contact us directly."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-stone/40 p-10 text-center">
        <h3 className="font-display text-2xl text-ink">{t.consultation.successTitle}</h3>
        <p className="mt-3 text-char">{t.consultation.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6" noValidate>
      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <Field label={t.consultation.fields.fullName} required>
        <input name="full_name" required className={inputClass} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.consultation.fields.eventType} required>
          <select name="event_type" required className={inputClass} defaultValue="">
            <option value="" disabled>
              —
            </option>
            {eventTypeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label[locale] ?? opt.label.en}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t.consultation.fields.guestCount} required>
          <input name="guest_count" type="number" min={1} required className={inputClass} />
        </Field>
      </div>

      <Field label={t.consultation.fields.eventLocation} required>
        <input name="event_location" required className={inputClass} />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label={t.consultation.fields.email} required>
          <input name="email" type="email" required className={inputClass} />
        </Field>
        <Field label={t.consultation.fields.phone} required>
          <input name="phone" type="tel" required className={inputClass} />
        </Field>
      </div>

      <Field label={t.consultation.fields.budget} required>
        <select name="budget_range" required className={inputClass} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {budgetOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label[locale] ?? opt.label.en}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t.consultation.fields.additionalInfo}>
        <textarea name="additional_information" rows={4} className={inputClass} />
      </Field>

      <label className="flex items-start gap-3 text-sm text-char">
        <input type="checkbox" name="privacy_consent" required className="mt-1" />
        <span>{t.consultation.fields.privacyConsent}</span>
      </label>

      {status === "error" && <p className="text-sm text-red-700">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 w-fit rounded-sm bg-ink px-6 py-3 text-sm text-paper transition-opacity disabled:opacity-50"
      >
        {status === "submitting" ? "…" : t.consultation.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-char">
        {label}
        {required && <span className="text-brass"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink";

import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsultationForm } from "@/components/ConsultationForm";
import { createClient } from "@/lib/supabase/server";
import type { LeadFormOption } from "@/types";

export const metadata: Metadata = {
  title: "Request a Consultation",
  description: "Tell us about your event and our team will prepare a tailored proposal.",
};

const FALLBACK_EVENT_TYPES: LeadFormOption[] = [
  { field: "event_type", value: "wedding", label: { hy: "Հարսանեկան", en: "Wedding" }, sortOrder: 1 },
  { field: "event_type", value: "destination_wedding", label: { hy: "Ծանապար հարսանիք", en: "Destination Wedding" }, sortOrder: 2 },
  { field: "event_type", value: "baptism", label: { hy: "Մկրտություն", en: "Baptism" }, sortOrder: 3 },
  { field: "event_type", value: "birthday", label: { hy: "Ծննդյան օր", en: "Birthday" }, sortOrder: 4 },
  { field: "event_type", value: "engagement", label: { hy: "Նշանդրություն", en: "Engagement" }, sortOrder: 5 },
  { field: "event_type", value: "proposal", label: { hy: "Առաջարկություն", en: "Marriage Proposal" }, sortOrder: 6 },
  { field: "event_type", value: "gender_reveal", label: { hy: "Gender Reveal", en: "Gender Reveal" }, sortOrder: 7 },
  { field: "event_type", value: "corporate", label: { hy: "Կորպորատիվ", en: "Corporate Event" }, sortOrder: 8 },
  { field: "event_type", value: "private", label: { hy: "Մասնավոր", en: "Private Event" }, sortOrder: 9 },
  { field: "event_type", value: "other", label: { hy: "Այլ", en: "Other" }, sortOrder: 10 },
];

const FALLBACK_BUDGETS: LeadFormOption[] = [
  { field: "budget_range", value: "under_5k", label: { hy: "$5,000-ից պակաս", en: "Under $5,000" }, sortOrder: 1 },
  { field: "budget_range", value: "5k_10k", label: { hy: "$5,000–$10,000", en: "$5,000–$10,000" }, sortOrder: 2 },
  { field: "budget_range", value: "10k_20k", label: { hy: "$10,000–$20,000", en: "$10,000–$20,000" }, sortOrder: 3 },
  { field: "budget_range", value: "20k_50k", label: { hy: "$20,000–$50,000", en: "$20,000–$50,000" }, sortOrder: 4 },
  { field: "budget_range", value: "50k_plus", label: { hy: "$50,000+", en: "$50,000+" }, sortOrder: 5 },
  { field: "budget_range", value: "custom", label: { hy: "Չափ որոշված / անորոշ է", en: "Custom / Not decided" }, sortOrder: 6 },
];

async function getFormOptions() {
  const configured = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!configured) return { eventTypes: FALLBACK_EVENT_TYPES, budgets: FALLBACK_BUDGETS };

  const supabase = createClient();
  const { data } = await supabase
    .from("lead_form_options")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (!data || data.length === 0) return { eventTypes: FALLBACK_EVENT_TYPES, budgets: FALLBACK_BUDGETS };

  const mapped: LeadFormOption[] = data.map((r: any) => ({
    field: r.field,
    value: r.value,
    label: r.label,
    sortOrder: r.sort_order,
  }));

  return {
    eventTypes: mapped.filter((o) => o.field === "event_type"),
    budgets: mapped.filter((o) => o.field === "budget_range"),
  };
}

export default async function ConsultationPage() {
  const { eventTypes, budgets } = await getFormOptions();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Խնդրել խորհրդատվություն</h1>
        <p className="mt-4 text-char">
          Պատմեք մեզ ձեր միջոցառման մասին, և մեր թիմը կպատրաստի համապատասխան առաջարկ։
        </p>

        <div className="mt-12">
          <ConsultationForm eventTypeOptions={eventTypes} budgetOptions={budgets} />
        </div>
      </main>
      <Footer />
    </>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = createClient();

  const [{ count: newLeads }, { count: totalLeads }, { count: services }, { count: portfolio }, { count: testimonials }] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("portfolio_items").select("*", { count: "exact", head: true }),
      supabase.from("testimonials").select("*", { count: "exact", head: true }),
    ]);

  return {
    newLeads: newLeads ?? 0,
    totalLeads: totalLeads ?? 0,
    services: services ?? 0,
    portfolio: portfolio ?? 0,
    testimonials: testimonials ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "New leads", value: counts.newLeads, href: "/admin/leads?status=new", highlight: true },
    { label: "Total leads", value: counts.totalLeads, href: "/admin/leads" },
    { label: "Services published", value: counts.services, href: "/admin/services" },
    { label: "Portfolio items", value: counts.portfolio, href: "/admin/portfolio" },
    { label: "Testimonials", value: counts.testimonials, href: "/admin/testimonials" },
  ];

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-500">What needs your attention.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className={`rounded-lg border p-5 ${c.highlight ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white"}`}
          >
            <p className={`text-2xl font-semibold ${c.highlight ? "text-white" : "text-slate-900"}`}>{c.value}</p>
            <p className={`mt-1 text-sm ${c.highlight ? "text-slate-300" : "text-slate-500"}`}>{c.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

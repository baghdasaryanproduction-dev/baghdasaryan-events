import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/StatusBadge";
import type { LeadStatus } from "@/types";

interface Props {
  searchParams: { status?: string; q?: string };
}

export default async function AdminLeadsPage({ searchParams }: Props) {
  const supabase = createClient();

  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (searchParams.status) query = query.eq("status", searchParams.status);
  if (searchParams.q) {
    query = query.or(
      `full_name.ilike.%${searchParams.q}%,email.ilike.%${searchParams.q}%,phone.ilike.%${searchParams.q}%`
    );
  }

  const { data: leads } = await query;

  const statuses: LeadStatus[] = ["new", "contacted", "qualified", "proposal_sent", "booked", "completed", "lost"];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Leads</h1>
      </div>

      <form className="mt-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          name="q"
          defaultValue={searchParams.q}
          placeholder="Search name, email, phone…"
          className="w-64 rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
        <select name="status" defaultValue={searchParams.status || ""} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
          Filter
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Event</th>
              <th className="px-4 py-3 font-medium">Guests</th>
              <th className="px-4 py-3 font-medium">Budget</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(leads ?? []).map((lead: any) => (
              <tr key={lead.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/leads/${lead.id}`} className="font-medium text-slate-900 hover:underline">
                    {lead.full_name}
                  </Link>
                  <p className="text-xs text-slate-500">{lead.email}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{lead.event_type}</td>
                <td className="px-4 py-3 text-slate-600">{lead.guest_count}</td>
                <td className="px-4 py-3 text-slate-600">{lead.budget_range}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={lead.status} />
                </td>
                <td className="px-4 py-3 text-slate-500">{new Date(lead.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {(!leads || leads.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-slate-400">
                  No leads match these filters yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

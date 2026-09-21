import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LeadDetailForm } from "@/components/admin/LeadDetailForm";

export default async function AdminLeadDetailPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: lead } = await supabase.from("leads").select("*").eq("id", params.id).single();

  if (!lead) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-xl font-semibold text-slate-900">{lead.full_name}</h1>
      <p className="mt-1 text-sm text-slate-500">
        Submitted {new Date(lead.created_at).toLocaleString()} · {lead.source || "website"}
      </p>

      <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-5 text-sm">
        <Detail label="Event type" value={lead.event_type} />
        <Detail label="Guests" value={String(lead.guest_count)} />
        <Detail label="Location" value={lead.event_location} />
        <Detail label="Budget" value={lead.budget_range} />
        <Detail label="Email" value={lead.email} />
        <Detail label="Phone" value={lead.phone} />
      </dl>

      {lead.additional_information && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-5">
          <p className="text-xs font-medium text-slate-500">Additional information</p>
          <p className="mt-1 text-sm text-slate-800">{lead.additional_information}</p>
        </div>
      )}

      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
        <LeadDetailForm lead={lead} />
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-slate-900">{value}</dd>
    </div>
  );
}

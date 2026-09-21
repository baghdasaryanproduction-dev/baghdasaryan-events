import type { LeadStatus } from "@/types";

const STYLES: Record<LeadStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-amber-50 text-amber-700 border-amber-200",
  qualified: "bg-violet-50 text-violet-700 border-violet-200",
  proposal_sent: "bg-indigo-50 text-indigo-700 border-indigo-200",
  booked: "bg-emerald-50 text-emerald-700 border-emerald-200",
  completed: "bg-slate-100 text-slate-600 border-slate-300",
  lost: "bg-red-50 text-red-700 border-red-200",
};

const LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal_sent: "Proposal Sent",
  booked: "Booked",
  completed: "Completed",
  lost: "Lost",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      {LABELS[status]}
    </span>
  );
}

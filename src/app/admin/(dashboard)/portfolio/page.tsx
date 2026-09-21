import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPortfolioPage() {
  const supabase = createClient();
  const { data: items } = await supabase.from("portfolio_items").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-500">Create, edit, feature, and publish portfolio case studies.</p>
        </div>
        <Link href="/admin/portfolio/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
          + New item
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Event type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(items ?? []).map((p: any) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/portfolio/${p.id}`} className="font-medium text-slate-900 hover:underline">
                    {p.title?.en || p.title?.hy || "(untitled)"}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-500">{p.event_type}</td>
                <td className="px-4 py-3 text-slate-600">{p.status}</td>
                <td className="px-4 py-3 text-slate-500">{p.is_featured ? "Yes" : "—"}</td>
              </tr>
            ))}
            {(!items || items.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  No portfolio items yet — click "New item" to add the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

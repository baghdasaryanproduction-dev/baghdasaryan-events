import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminServicesPage() {
  const supabase = createClient();
  const { data: services } = await supabase.from("services").select("*").order("sort_order");

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500">Create, edit, publish, and reorder services.</p>
        </div>
        <Link href="/admin/services/new" className="rounded-md bg-slate-900 px-4 py-2 text-sm text-white">
          + New service
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {(services ?? []).map((s: any) => (
              <tr key={s.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/services/${s.id}`} className="font-medium text-slate-900 hover:underline">
                    {s.title?.en || s.title?.hy || "(untitled)"}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-500">{s.slug}</td>
                <td className="px-4 py-3 text-slate-600">{s.status}</td>
                <td className="px-4 py-3 text-slate-500">{s.sort_order}</td>
              </tr>
            ))}
            {(!services || services.length === 0) && (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-slate-400">
                  No services yet — click "New service" to add the first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

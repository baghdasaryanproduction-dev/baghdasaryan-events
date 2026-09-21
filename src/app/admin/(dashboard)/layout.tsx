import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/admin/SignOutButton";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/portfolio", label: "Portfolio" },
];

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already redirects unauthenticated visitors, but a server
  // component check is a second, independent line of defense.
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase.from("profiles").select("role, full_name").eq("id", user.id).single();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-60 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5">
          <p className="text-sm font-semibold text-slate-900">Baghdasaryan Production</p>
          <p className="text-xs text-slate-500">Admin Panel</p>
        </div>
        <nav className="flex flex-col gap-0.5 p-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-slate-200 p-3">
          <p className="px-3 text-xs text-slate-500">{profile?.full_name || user.email}</p>
          <p className="px-3 text-xs text-slate-400">{profile?.role ?? "editor"}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button onClick={handleSignOut} className="mt-2 w-full rounded-md px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100">
      Sign out
    </button>
  );
}

import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ServiceForm } from "@/components/admin/ServiceForm";

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: service } = await supabase.from("services").select("*").eq("id", params.id).single();

  if (!service) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit service</h1>
      <div className="mt-6">
        <ServiceForm
          initial={{
            id: service.id,
            slug: service.slug,
            category_slug: service.category_slug ?? "",
            title: service.title ?? {},
            short_description: service.short_description ?? {},
            full_description: service.full_description ?? {},
            inclusions: service.inclusions ?? [],
            cover_image_url: service.cover_image_url ?? "",
            status: service.status,
            sort_order: service.sort_order ?? 0,
          }}
        />
      </div>
    </div>
  );
}

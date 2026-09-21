import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PortfolioForm } from "@/components/admin/PortfolioForm";

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: item } = await supabase.from("portfolio_items").select("*").eq("id", params.id).single();

  if (!item) notFound();

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-900">Edit portfolio item</h1>
      <div className="mt-6">
        <PortfolioForm
          initial={{
            id: item.id,
            slug: item.slug,
            event_type: item.event_type,
            location: item.location ?? "",
            event_date: item.event_date ?? "",
            title: item.title ?? {},
            short_description: item.short_description ?? {},
            full_description: item.full_description ?? {},
            cover_image_url: item.cover_image_url ?? "",
            video_url: item.video_url ?? "",
            is_featured: item.is_featured ?? false,
            status: item.status,
          }}
        />
      </div>
    </div>
  );
}

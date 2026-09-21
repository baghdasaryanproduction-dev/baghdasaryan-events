import { createClient } from "@/lib/supabase/server";
import { PLACEHOLDER_SERVICES } from "@/lib/data/placeholders";
import type { Service } from "@/types";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPublishedServices(): Promise<Service[]> {
  if (!supabaseConfigured) return PLACEHOLDER_SERVICES.filter((s) => s.status === "published" || true);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return PLACEHOLDER_SERVICES;

  return data.map(mapService);
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  if (!supabaseConfigured) {
    return PLACEHOLDER_SERVICES.find((s) => s.slug === slug) ?? null;
  }

  const supabase = createClient();
  const { data, error } = await supabase.from("services").select("*").eq("slug", slug).single();

  if (error || !data) return PLACEHOLDER_SERVICES.find((s) => s.slug === slug) ?? null;
  return mapService(data);
}

function mapService(row: any): Service {
  return {
    id: row.id,
    slug: row.slug,
    categorySlug: row.category_slug,
    title: row.title ?? {},
    shortDescription: row.short_description ?? {},
    fullDescription: row.full_description ?? {},
    inclusions: row.inclusions ?? [],
    addOns: row.add_ons ?? [],
    coverImage: row.cover_image_url,
    gallery: row.gallery_urls ?? [],
    status: row.status,
    sortOrder: row.sort_order ?? 0,
    seoTitle: row.seo_title ?? {},
    seoDescription: row.seo_description ?? {},
  };
}

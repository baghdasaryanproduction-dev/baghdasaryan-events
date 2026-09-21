import { createClient } from "@/lib/supabase/server";
import { PLACEHOLDER_PORTFOLIO, PLACEHOLDER_FAQS } from "@/lib/data/placeholders";
import type { PortfolioItem, FAQ } from "@/types";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPublishedPortfolio(eventType?: string): Promise<PortfolioItem[]> {
  if (!supabaseConfigured) {
    return eventType
      ? PLACEHOLDER_PORTFOLIO.filter((p) => p.eventType === eventType)
      : PLACEHOLDER_PORTFOLIO;
  }

  const supabase = createClient();
  let query = supabase.from("portfolio_items").select("*").eq("status", "published");
  if (eventType) query = query.eq("event_type", eventType);
  const { data, error } = await query.order("created_at", { ascending: false });

  if (error || !data) return PLACEHOLDER_PORTFOLIO;
  return data.map(mapPortfolio);
}

export async function getPortfolioBySlug(slug: string): Promise<PortfolioItem | null> {
  if (!supabaseConfigured) return PLACEHOLDER_PORTFOLIO.find((p) => p.slug === slug) ?? null;

  const supabase = createClient();
  const { data, error } = await supabase.from("portfolio_items").select("*").eq("slug", slug).single();
  if (error || !data) return null;
  return mapPortfolio(data);
}

export async function getFAQs(pageScope = "global"): Promise<FAQ[]> {
  if (!supabaseConfigured) return PLACEHOLDER_FAQS.filter((f) => f.pageScope === pageScope);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("status", "published")
    .eq("page_scope", pageScope)
    .order("sort_order", { ascending: true });

  if (error || !data) return PLACEHOLDER_FAQS;
  return data.map((row: any) => ({
    id: row.id,
    question: row.question ?? {},
    answer: row.answer ?? {},
    pageScope: row.page_scope,
    status: row.status,
  }));
}

function mapPortfolio(row: any): PortfolioItem {
  return {
    id: row.id,
    slug: row.slug,
    eventType: row.event_type,
    location: row.location,
    eventDate: row.event_date,
    title: row.title ?? {},
    shortDescription: row.short_description ?? {},
    fullDescription: row.full_description ?? {},
    coverImage: row.cover_image_url,
    gallery: row.gallery_urls ?? [],
    videoUrl: row.video_url,
    isFeatured: row.is_featured ?? false,
    status: row.status,
  };
}

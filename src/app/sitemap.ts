import type { MetadataRoute } from "next";
import { getPublishedServices } from "@/lib/data/services";
import { getPublishedPortfolio } from "@/lib/data/portfolio";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://baghdasaryanevents.com";

const STATIC_ROUTES = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/process",
  "/faq",
  "/contact",
  "/consultation",
  "/privacy",
  "/terms",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, portfolio] = await Promise.all([getPublishedServices(), getPublishedPortfolio()]);

  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const serviceEntries = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
  }));

  const portfolioEntries = portfolio.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...serviceEntries, ...portfolioEntries];
}

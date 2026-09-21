import Link from "next/link";
import Image from "next/image";
import type { Locale, PortfolioItem } from "@/types";

export function PortfolioCard({ item, locale = "hy" as Locale }: { item: PortfolioItem; locale?: Locale }) {
  const title = item.title[locale] ?? item.title.en ?? item.slug;

  return (
    <Link href={`/portfolio/${item.slug}`} className="group mb-6 block break-inside-avoid">
      <div className="relative overflow-hidden bg-stone">
        {item.coverImage ? (
          <Image
            src={item.coverImage}
            alt={title}
            width={800}
            height={1000}
            className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[4/5] items-center justify-center text-xs text-char/50">
            {locale === "hy" ? "Նկար՝ ավելացնել Admin-ից" : "Image — add via Admin"}
          </div>
        )}
      </div>
      <p className="mt-3 text-sm text-ink">{title}</p>
      {item.location && <p className="text-xs text-char">{item.location}</p>}
    </Link>
  );
}

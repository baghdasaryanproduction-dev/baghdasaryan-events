import Link from "next/link";
import Image from "next/image";
import type { Locale, Service } from "@/types";

export function ServiceCard({ service, locale = "hy" as Locale }: { service: Service; locale?: Locale }) {
  const title = service.title[locale] ?? service.title.en ?? service.slug;
  const desc = service.shortDescription[locale] ?? service.shortDescription.en ?? "";

  return (
    <Link href={`/services/${service.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        {service.coverImage ? (
          <Image
            src={service.coverImage}
            alt={title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-char/50">
            {locale === "hy" ? "Նկար՝ ավելացնել Admin-ից" : "Image — add via Admin"}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-base text-ink">{title}</h3>
      <p className="mt-1 text-sm text-char">{desc}</p>
    </Link>
  );
}

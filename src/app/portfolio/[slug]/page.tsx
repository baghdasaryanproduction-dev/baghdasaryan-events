import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getPortfolioBySlug } from "@/lib/data/portfolio";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getPortfolioBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title.en || item.title.hy,
    description: item.shortDescription.en,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const item = await getPortfolioBySlug(params.slug);
  if (!item) notFound();

  return (
    <>
      <Header />
      <main>
        <div className="relative aspect-[16/9] w-full bg-stone">
          {item.coverImage && (
            <Image src={item.coverImage} alt={item.title.hy ?? ""} fill className="object-cover" />
          )}
        </div>

        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="font-display text-4xl text-ink">{item.title.hy ?? item.title.en}</h1>
          {item.location && <p className="mt-2 text-char">{item.location}</p>}
          <p className="mt-6 max-w-prose text-char">{item.fullDescription.hy ?? item.fullDescription.en}</p>

          <Link href="/consultation" className="mt-10 inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper">
            Խնդրել խորհրդատվություն
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

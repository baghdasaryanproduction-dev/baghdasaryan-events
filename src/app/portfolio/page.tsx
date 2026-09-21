import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PortfolioCard } from "@/components/PortfolioCard";
import { getPublishedPortfolio } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Real weddings and events produced by Baghdasaryan Production in Armenia.",
};

const FILTERS = [
  { value: undefined, label: "Բոլորը" },
  { value: "wedding", label: "Հարսանեկան" },
  { value: "baptism", label: "Մկրտություն" },
  { value: "birthday", label: "Ծննդյան օր" },
  { value: "engagement", label: "Նշանդրություն" },
  { value: "proposal", label: "Առաջարկություն" },
  { value: "corporate", label: "Կորպորատիվ" },
  { value: "private", label: "Մասնավոր" },
];

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const items = await getPublishedPortfolio(searchParams.type);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">Օրինակագիր</h1>

        <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-6 text-sm">
          {FILTERS.map((f) => (
            <Link
              key={f.label}
              href={f.value ? `/portfolio?type=${f.value}` : "/portfolio"}
              className={
                searchParams.type === f.value || (!searchParams.type && !f.value)
                  ? "text-ink underline underline-offset-4"
                  : "text-char hover:text-ink"
              }
            >
              {f.label}
            </Link>
          ))}
        </nav>

        {items.length === 0 ? (
          <p className="mt-14 text-char">Այս կատեգորիայում դեռ նախագծեր չկան։</p>
        ) : (
          <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {items.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

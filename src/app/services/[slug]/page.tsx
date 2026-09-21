import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getServiceBySlug, getPublishedServices } from "@/lib/data/services";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);
  if (!service) return {};
  const title = service.seoTitle?.en || service.title.en || service.title.hy;
  const description = service.seoDescription?.en || service.shortDescription.en;
  return { title, description };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="font-display text-4xl text-ink">{service.title.hy ?? service.title.en}</h1>
        <p className="mt-4 text-lg text-char">{service.shortDescription.hy ?? service.shortDescription.en}</p>

        <div className="prose prose-ink mt-10 max-w-prose text-char">
          <p>{service.fullDescription.hy ?? service.fullDescription.en}</p>
        </div>

        {service.inclusions.length > 0 && (
          <div className="mt-10">
            <h2 className="font-display text-xl text-ink">Ներառված է</h2>
            <ul className="mt-3 space-y-1.5 text-char">
              {service.inclusions.map((inc, i) => (
                <li key={i}>{inc.hy ?? inc.en}</li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href="/consultation"
          className="mt-12 inline-block rounded-sm bg-ink px-6 py-3 text-sm text-paper"
        >
          Խնդրել խորհրդատվություն
        </Link>
      </main>
      <Footer />
    </>
  );
}

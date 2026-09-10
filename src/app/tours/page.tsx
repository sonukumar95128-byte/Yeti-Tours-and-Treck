import ToursGrid from "@/components/tours/ToursGrid";
import { getAllPackages, getCategories, formatPrice } from "@/lib/tours";
import type { TourCardData } from "@/components/home/FeaturedTours";
import SectionDivider from "@/components/site/SectionDivider";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Bhutan tours and treks",
  description:
    "Culture tours, festival itineraries and Himalayan treks from Yeti Tours & Trek, licensed operator No. 50002238 in Taba, Thimphu. SDF listed separately on every quote.",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Bhutan tours and treks | Yeti Tours & Trek",
    description:
      "Published touring packages from a licensed Bhutanese operator. SDF and visa fees are itemised on your quote.",
    url: "/tours",
  },
};

export default async function ToursPage() {
  const [all, categories] = await Promise.all([getAllPackages(), getCategories()]);

  const packages: TourCardData[] = all.map((p) => ({
    slug: p.slug,
    title: p.title,
    categoryId: p.categoryId,
    categoryLabel: p.category.label,
    summary: p.summary,
    durationDays: p.durationDays,
    durationNights: p.durationNights,
    locations: p.locations,
    coverImage: p.coverImage,
    priceLabel: formatPrice(p.priceFrom, p.priceNote),
  }));

  return (
    <section className="py-20 bg-mist min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-forest font-bold text-xs uppercase tracking-widest block mb-2">
            All Journeys
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Tours &amp; Treks in the Kingdom of Bhutan
          </h1>
          <SectionDivider />
          <p className="text-gray-600">
            From cultural valley classics to high-altitude expeditions. Published prices are touring
            costs; SDF (US$100 per adult per night) and visa fees are confirmed on your quote.
          </p>
        </div>
        <ToursGrid packages={packages} categories={categories} />
      </div>
    </section>
  );
}

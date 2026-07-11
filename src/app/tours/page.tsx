import ToursGrid from "@/components/tours/ToursGrid";
import { getAllPackages, getCategories, formatPrice } from "@/lib/tours";
import type { TourCardData } from "@/components/home/FeaturedTours";
import SectionDivider from "@/components/site/SectionDivider";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Tours & Treks | Yeti Tours & Treks",
  description: "Browse handcrafted Bhutan tour and trek packages by Yeti Tours & Treks.",
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
            From cultural valley classics to high-altitude expeditions — find the journey that
            matches your pace.
          </p>
        </div>
        <ToursGrid packages={packages} categories={categories} />
      </div>
    </section>
  );
}

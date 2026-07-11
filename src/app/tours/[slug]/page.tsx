import { notFound } from "next/navigation";
import { getPackageBySlug, formatPrice, parseHighlights } from "@/lib/tours";
import BookingForm from "@/components/tours/BookingForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) return { title: "Tour Not Found | Yeti Tours & Treks" };
  return {
    title: `${pkg.title} | Yeti Tours & Treks`,
    description: pkg.summary,
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getPackageBySlug(slug);
  if (!pkg) notFound();

  const priceLabel = formatPrice(pkg.priceFrom, pkg.priceNote);
  const highlights = parseHighlights(pkg.highlights);

  return (
    <div className="bg-white">
      <div
        className="relative h-80 sm:h-96 bg-cover bg-center flex items-end"
        style={{ backgroundImage: `url('${pkg.coverImage}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-white w-full">
          <span className="inline-block bg-gold text-ink text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider mb-3">
            {pkg.category.label}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mb-3">{pkg.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm font-semibold">
            <span>
              🕐 {pkg.durationNights}N {pkg.durationDays}D
            </span>
            <span>📍 {pkg.locations}</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="font-bold text-ink text-lg mb-2">Overview</h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {pkg.overview}
            </p>
          </div>

          {highlights.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h2 className="font-bold text-ink text-lg mb-3">Experience Highlights</h2>
              <ul className="space-y-2 text-sm text-gray-600">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-forest mt-1 mr-2">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pkg.itinerary.length > 0 && (
            <div className="border-t border-slate-100 pt-6">
              <h2 className="font-bold text-ink text-lg mb-4">Day-by-Day Itinerary</h2>
              <div className="space-y-5 pl-4 border-l-2 border-forest/30">
                {pkg.itinerary.map((day) => (
                  <div key={day.id}>
                    <p className="text-ink font-semibold text-sm mb-1">
                      Day {day.dayNumber}: {day.title}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 border border-slate-200 sticky top-24">
            <span className="text-xs uppercase text-slate-400 font-bold tracking-wider">
              All-Inclusive Pricing
            </span>
            <p className="text-forest font-bold text-lg mt-1 mb-4">{priceLabel}</p>
          </div>
          <BookingForm packageId={pkg.id} packageTitle={pkg.title} />
        </div>
      </div>
    </div>
  );
}

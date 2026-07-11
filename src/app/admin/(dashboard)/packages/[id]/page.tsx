import { notFound } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import PackageForm from "@/components/admin/PackageForm";
import { parseHighlights } from "@/lib/tour-constants";
import { getCategories } from "@/lib/tours";

export const dynamic = "force-dynamic";

export default async function EditPackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prisma = getPrisma();
  const [pkg, categories] = await Promise.all([
    prisma.tourPackage.findUnique({
      where: { id },
      include: { itinerary: { orderBy: { dayNumber: "asc" } } },
    }),
    getCategories(),
  ]);
  if (!pkg) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-ink mb-6">Edit: {pkg.title}</h1>
      <PackageForm
        categories={categories}
        initial={{
          id: pkg.id,
          title: pkg.title,
          categoryId: pkg.categoryId,
          summary: pkg.summary,
          overview: pkg.overview,
          durationDays: pkg.durationDays,
          durationNights: pkg.durationNights,
          locations: pkg.locations,
          highlights: parseHighlights(pkg.highlights),
          priceFrom: pkg.priceFrom ? Number(pkg.priceFrom) : null,
          priceNote: pkg.priceNote ?? "",
          coverImage: pkg.coverImage,
          featured: pkg.featured,
          published: pkg.published,
          itinerary: pkg.itinerary.map((d) => ({
            dayNumber: d.dayNumber,
            title: d.title,
            description: d.description,
          })),
        }}
      />
    </div>
  );
}

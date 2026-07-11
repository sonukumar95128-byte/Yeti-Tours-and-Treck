import { getPrisma } from "@/lib/prisma";

export async function getFeaturedPackages() {
  const prisma = getPrisma();
  return prisma.tourPackage.findMany({
    where: { published: true, featured: true },
    orderBy: { createdAt: "asc" },
    include: { category: true },
  });
}

export async function getAllPackages() {
  const prisma = getPrisma();
  return prisma.tourPackage.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    include: { category: true },
  });
}

export async function getPackageBySlug(slug: string) {
  const prisma = getPrisma();
  return prisma.tourPackage.findFirst({
    where: { slug, published: true },
    include: {
      itinerary: { orderBy: { dayNumber: "asc" } },
      category: true,
    },
  });
}

export async function getCategories() {
  const prisma = getPrisma();
  return prisma.category.findMany({ orderBy: { order: "asc" } });
}

export async function getDestinations() {
  const prisma = getPrisma();
  return prisma.destination.findMany({ orderBy: { order: "asc" } });
}

export async function getTestimonials() {
  const prisma = getPrisma();
  return prisma.testimonial.findMany({ orderBy: { order: "asc" } });
}

export { formatPrice, parseHighlights, serializeHighlights } from "@/lib/tour-constants";

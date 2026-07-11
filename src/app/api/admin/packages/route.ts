import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";
import { slugify } from "@/lib/slugify";
import { serializeHighlights } from "@/lib/tour-constants";

interface ItineraryInput {
  dayNumber: number;
  title: string;
  description: string;
}

interface PackageInput {
  title: string;
  categoryId: string;
  summary: string;
  overview: string;
  durationDays: number;
  durationNights: number;
  locations: string;
  highlights: string[];
  priceFrom: number | null;
  priceNote: string | null;
  coverImage: string;
  featured: boolean;
  published: boolean;
  itinerary: ItineraryInput[];
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await request.json().catch(() => null)) as PackageInput | null;
  if (!body || !body.title?.trim()) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!body.categoryId) {
    return NextResponse.json({ error: "Category is required" }, { status: 400 });
  }

  const prisma = getPrisma();
  const baseSlug = slugify(body.title);
  let slug = baseSlug;
  let n = 1;
  while (await prisma.tourPackage.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++n}`;
  }

  const pkg = await prisma.tourPackage.create({
    data: {
      slug,
      title: body.title.trim(),
      categoryId: body.categoryId,
      summary: body.summary ?? "",
      overview: body.overview ?? "",
      durationDays: Number(body.durationDays) || 0,
      durationNights: Number(body.durationNights) || 0,
      locations: body.locations ?? "",
      highlights: serializeHighlights(Array.isArray(body.highlights) ? body.highlights : []),
      priceFrom: body.priceFrom ? body.priceFrom : null,
      priceNote: body.priceNote?.trim() || null,
      coverImage: body.coverImage?.trim() || "",
      featured: !!body.featured,
      published: body.published !== false,
      itinerary: {
        create: (body.itinerary ?? []).map((d) => ({
          dayNumber: d.dayNumber,
          title: d.title,
          description: d.description,
        })),
      },
    },
  });

  return NextResponse.json({ id: pkg.id, slug: pkg.slug }, { status: 201 });
}

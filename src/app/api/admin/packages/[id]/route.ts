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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const prisma = getPrisma();
  const existing = await prisma.tourPackage.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data: Record<string, unknown> = {};

  if (typeof body.title === "string" && body.title.trim() && body.title !== existing.title) {
    data.title = body.title.trim();
    const baseSlug = slugify(body.title);
    let slug = baseSlug;
    let n = 1;
    while (await prisma.tourPackage.findFirst({ where: { slug, NOT: { id } } })) {
      slug = `${baseSlug}-${++n}`;
    }
    data.slug = slug;
  }
  if (typeof body.categoryId === "string" && body.categoryId) data.categoryId = body.categoryId;
  if (typeof body.summary === "string") data.summary = body.summary;
  if (typeof body.overview === "string") data.overview = body.overview;
  if (body.durationDays !== undefined) data.durationDays = Number(body.durationDays) || 0;
  if (body.durationNights !== undefined) data.durationNights = Number(body.durationNights) || 0;
  if (typeof body.locations === "string") data.locations = body.locations;
  if (Array.isArray(body.highlights)) data.highlights = serializeHighlights(body.highlights);
  if ("priceFrom" in body) data.priceFrom = body.priceFrom ? Number(body.priceFrom) : null;
  if ("priceNote" in body) data.priceNote = (body.priceNote as string)?.trim() || null;
  if (typeof body.coverImage === "string") data.coverImage = body.coverImage.trim();
  if (typeof body.featured === "boolean") data.featured = body.featured;
  if (typeof body.published === "boolean") data.published = body.published;

  const itinerary = body.itinerary as ItineraryInput[] | undefined;

  await prisma.$transaction(async (tx) => {
    await tx.tourPackage.update({ where: { id }, data });
    if (Array.isArray(itinerary)) {
      await tx.itineraryDay.deleteMany({ where: { packageId: id } });
      if (itinerary.length > 0) {
        await tx.itineraryDay.createMany({
          data: itinerary.map((d) => ({
            packageId: id,
            dayNumber: d.dayNumber,
            title: d.title,
            description: d.description,
          })),
        });
      }
    }
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const prisma = getPrisma();
  await prisma.tourPackage.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}

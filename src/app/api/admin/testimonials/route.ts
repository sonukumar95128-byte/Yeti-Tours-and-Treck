import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await request.json().catch(() => null)) as {
    quote?: string;
    name?: string;
    place?: string;
    initials?: string;
    order?: number;
  } | null;
  if (!body?.name?.trim() || !body?.quote?.trim()) {
    return NextResponse.json({ error: "Name and quote are required" }, { status: 400 });
  }

  const prisma = getPrisma();
  const count = await prisma.testimonial.count();
  const testimonial = await prisma.testimonial.create({
    data: {
      quote: body.quote.trim(),
      name: body.name.trim(),
      place: body.place?.trim() ?? "",
      initials: body.initials?.trim().toUpperCase() || body.name.trim().slice(0, 2).toUpperCase(),
      order: body.order ?? count + 1,
    },
  });

  return NextResponse.json(testimonial, { status: 201 });
}

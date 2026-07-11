import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const data: Record<string, unknown> = {};
  if (typeof body.quote === "string" && body.quote.trim()) data.quote = body.quote.trim();
  if (typeof body.name === "string" && body.name.trim()) data.name = body.name.trim();
  if (typeof body.place === "string") data.place = body.place.trim();
  if (typeof body.initials === "string") data.initials = body.initials.trim().toUpperCase();
  if (typeof body.order === "number") data.order = body.order;

  const prisma = getPrisma();
  await prisma.testimonial.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const prisma = getPrisma();
  await prisma.testimonial.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}

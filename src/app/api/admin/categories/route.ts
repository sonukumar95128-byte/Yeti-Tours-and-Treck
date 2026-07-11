import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";
import { slugify } from "@/lib/slugify";

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await request.json().catch(() => null)) as { label?: string; order?: number } | null;
  if (!body?.label?.trim()) {
    return NextResponse.json({ error: "Label is required" }, { status: 400 });
  }

  const prisma = getPrisma();
  const baseSlug = slugify(body.label);
  let slug = baseSlug;
  let n = 1;
  while (await prisma.category.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${++n}`;
  }

  const count = await prisma.category.count();
  const category = await prisma.category.create({
    data: { slug, label: body.label.trim(), order: body.order ?? count + 1 },
  });

  return NextResponse.json(category, { status: 201 });
}

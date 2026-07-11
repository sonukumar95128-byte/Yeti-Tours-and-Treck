import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = (await request.json().catch(() => null)) as {
    name?: string;
    description?: string;
    image?: string;
    order?: number;
  } | null;
  if (!body?.name?.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const prisma = getPrisma();
  const count = await prisma.destination.count();
  const destination = await prisma.destination.create({
    data: {
      name: body.name.trim(),
      description: body.description?.trim() ?? "",
      image: body.image?.trim() ?? "",
      order: body.order ?? count + 1,
    },
  });

  return NextResponse.json(destination, { status: 201 });
}

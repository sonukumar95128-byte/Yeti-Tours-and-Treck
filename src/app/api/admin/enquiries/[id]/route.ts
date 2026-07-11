import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";

const VALID_STATUSES = ["NEW", "CONTACTED", "CONFIRMED", "CLOSED"];

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { id } = await params;
  const body = (await request.json().catch(() => null)) as { status?: string } | null;

  if (!body?.status || !VALID_STATUSES.includes(body.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const prisma = getPrisma();
  await prisma.enquiry.update({ where: { id }, data: { status: body.status as never } });
  return NextResponse.json({ ok: true });
}

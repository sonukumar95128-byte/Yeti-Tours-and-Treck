import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";

function startOfDay(d: Date): Date {
  const copy = new Date(d);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function csvEscape(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const HEADERS = [
  "Created",
  "Type",
  "Status",
  "Name",
  "Email",
  "Phone",
  "Country",
  "Package",
  "Travel Date",
  "Adults",
  "Children",
  "Season",
  "Interest",
  "Message",
];

export async function GET(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");

  const createdAt: { gte?: Date; lte?: Date } = {};
  if (from) createdAt.gte = startOfDay(new Date(from));
  if (to) {
    const end = startOfDay(new Date(to));
    end.setHours(23, 59, 59, 999);
    createdAt.lte = end;
  }

  const prisma = getPrisma();
  const enquiries = await prisma.enquiry.findMany({
    where: from || to ? { createdAt } : undefined,
    orderBy: { createdAt: "desc" },
    include: { package: { select: { title: true } } },
  });

  const rows = enquiries.map((e) =>
    [
      e.createdAt.toISOString(),
      e.type,
      e.status,
      e.name,
      e.email,
      e.phone ?? "",
      e.country ?? "",
      e.package?.title ?? "",
      e.travelDate ? e.travelDate.toISOString().slice(0, 10) : "",
      e.travelers ?? "",
      e.children ?? "",
      e.season ?? "",
      e.interest ?? "",
      e.message ?? "",
    ]
      .map(csvEscape)
      .join(",")
  );

  const csv = [HEADERS.join(","), ...rows].join("\n");
  const filename = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

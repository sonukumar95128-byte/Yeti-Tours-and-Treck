import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    type,
    packageId,
    name,
    email,
    phone,
    country,
    travelDate,
    travelers,
    children,
    season,
    interest,
    message,
  } = body as Record<string, unknown>;

  if (typeof name !== "string" || !name.trim() || typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const toInt = (value: unknown): number | null => {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim()) return parseInt(value, 10);
    return null;
  };

  const prisma = getPrisma();

  const enquiry = await prisma.enquiry.create({
    data: {
      type: type === "BOOKING" ? "BOOKING" : "GENERAL",
      packageId: typeof packageId === "string" && packageId ? packageId : null,
      name: name.trim(),
      email: email.trim(),
      phone: typeof phone === "string" && phone.trim() ? phone.trim() : null,
      country: typeof country === "string" && country.trim() ? country.trim() : null,
      travelDate: typeof travelDate === "string" && travelDate ? new Date(travelDate) : null,
      travelers: toInt(travelers),
      children: toInt(children),
      season: typeof season === "string" && season ? season : null,
      interest: typeof interest === "string" && interest ? interest : null,
      message: typeof message === "string" && message.trim() ? message.trim() : null,
    },
  });

  return NextResponse.json({ id: enquiry.id }, { status: 201 });
}

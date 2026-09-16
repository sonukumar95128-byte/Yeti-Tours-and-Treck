import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { clientIp, hitRateLimit } from "@/lib/rateLimit";

const MAX_PER_IP_PER_HOUR = 10;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function int(value: unknown, min: number, max: number): number | null {
  const n = typeof value === "number" ? value : typeof value === "string" ? parseInt(value, 10) : NaN;
  return Number.isInteger(n) && n >= min && n <= max ? n : null;
}

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
    website,
  } = body as Record<string, unknown>;

  // Honeypot: the "website" field is hidden from people, so only bots fill it in.
  // Pretend success so they don't retry.
  if (typeof website === "string" && website.trim()) {
    return NextResponse.json({ id: "ok" }, { status: 201 });
  }

  if (!(await hitRateLimit("enquiry", clientIp(request), MAX_PER_IP_PER_HOUR, 60 * 60 * 1000))) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again later or contact us on WhatsApp." },
      { status: 429 }
    );
  }

  const cleanName = text(name, 120);
  const cleanEmail = text(email, 200);
  if (!cleanName || !cleanEmail || !EMAIL_RE.test(cleanEmail)) {
    return NextResponse.json({ error: "A valid name and email are required" }, { status: 400 });
  }

  const prisma = getPrisma();

  let validPackageId: string | null = null;
  if (typeof packageId === "string" && packageId.length <= 40) {
    const pkg = await prisma.tourPackage.findUnique({ where: { id: packageId }, select: { id: true } });
    validPackageId = pkg?.id ?? null;
  }

  let date: Date | null = null;
  if (typeof travelDate === "string" && travelDate) {
    const d = new Date(travelDate);
    if (!Number.isNaN(d.getTime())) date = d;
  }

  const enquiry = await prisma.enquiry.create({
    data: {
      type: type === "BOOKING" ? "BOOKING" : "GENERAL",
      packageId: validPackageId,
      name: cleanName,
      email: cleanEmail,
      phone: text(phone, 40),
      country: text(country, 80),
      travelDate: date,
      travelers: int(travelers, 1, 100),
      children: int(children, 0, 100),
      season: text(season, 100),
      interest: text(interest, 100),
      message: text(message, 3000),
    },
  });

  return NextResponse.json({ id: enquiry.id }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/adminSession";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
// Vercel caps request bodies at 4.5MB; the client resizes before sending.
const MAX_BYTES = 4 * 1024 * 1024;

function detectImageType(b: Uint8Array): string | null {
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg";
  if (b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  const riff = String.fromCharCode(...b.slice(0, 4));
  const webp = String.fromCharCode(...b.slice(8, 12));
  if (riff === "RIFF" && webp === "WEBP") return "image/webp";
  return null;
}

export async function POST(request: NextRequest) {
  if (!(await isAdminRequest())) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file received" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, or WebP images are allowed" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Image is too large (max 4MB)" }, { status: 400 });
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const mimeType = detectImageType(bytes);
  // Trust the file's actual bytes, not the type the browser claims.
  if (!mimeType) {
    return NextResponse.json({ error: "Only JPG, PNG, or WebP images are allowed" }, { status: 400 });
  }

  const prisma = getPrisma();
  const image = await prisma.uploadedImage.create({ data: { mimeType, data: bytes } });

  return NextResponse.json({ url: `/api/images/${image.id}` }, { status: 201 });
}

import { NextRequest, NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prisma = getPrisma();
  const image = await prisma.uploadedImage.findUnique({ where: { id } });
  if (!image) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(image.data, {
    status: 200,
    headers: {
      "Content-Type": image.mimeType,
      // Uploads are immutable (a new upload gets a new id), so cache aggressively.
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

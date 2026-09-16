import crypto from "crypto";
import type { NextRequest } from "next/server";
import { getPrisma } from "@/lib/prisma";

/** Client IP as reported by Vercel's edge (the first x-forwarded-for hop is set by Vercel). */
export function clientIp(request: NextRequest): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    "unknown"
  );
}

// IPs are hashed so the database never holds raw visitor addresses.
function hashKey(scope: string, id: string): string {
  const salt = process.env.ADMIN_SESSION_SECRET ?? "";
  return `${scope}:${crypto.createHash("sha256").update(salt + id).digest("hex").slice(0, 32)}`;
}

/**
 * Counts one hit against `scope`/`id`. Returns false once more than `limit`
 * hits land inside `windowMs`.
 */
export async function hitRateLimit(scope: string, id: string, limit: number, windowMs: number) {
  const prisma = getPrisma();
  const key = hashKey(scope, id);
  const now = new Date();
  const resetAt = new Date(now.getTime() + windowMs);

  const row = await prisma.rateLimit.upsert({
    where: { key },
    create: { key, count: 1, resetAt },
    update: { count: { increment: 1 } },
  });

  if (row.resetAt < now) {
    await prisma.rateLimit.update({ where: { key }, data: { count: 1, resetAt } });
    return true;
  }
  return row.count <= limit;
}

export async function clearRateLimit(scope: string, id: string) {
  await getPrisma().rateLimit.deleteMany({ where: { key: hashKey(scope, id) } });
}

import { NextRequest, NextResponse } from "next/server";
import { passwordMatches, signAdminToken, SESSION_MAX_AGE_SECONDS } from "@/lib/adminSession";
import { clearRateLimit, clientIp, hitRateLimit } from "@/lib/rateLimit";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS_PER_IP = 5;
// Caps distributed guessing from many IPs; the real admin is locked out for at most 15 minutes.
const MAX_ATTEMPTS_GLOBAL = 30;

function safeNext(raw: unknown): string {
  const next = typeof raw === "string" ? raw : "";
  const bs = String.fromCharCode(92); // backslash: browsers treat "/\evil.com" like "//evil.com"
  return next.startsWith("/") && !next.startsWith("//") && !next.includes(bs) ? next : "/admin";
}

export async function POST(request: NextRequest) {
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const ip = clientIp(request);
  const formData = await request.formData().catch(() => null);
  const next = safeNext(formData?.get("next"));

  const failUrl = (error: string) => {
    const url = new URL("/admin/login", origin);
    url.searchParams.set("next", next);
    url.searchParams.set("error", error);
    return NextResponse.redirect(url, { status: 303 });
  };

  const ipAllowed = await hitRateLimit("login-ip", ip, MAX_ATTEMPTS_PER_IP, WINDOW_MS);
  const globalAllowed = await hitRateLimit("login-all", "all", MAX_ATTEMPTS_GLOBAL, WINDOW_MS);
  if (!ipAllowed || !globalAllowed) return failUrl("locked");

  if (!passwordMatches(formData?.get("password"))) {
    // Slow down automated guessing.
    await new Promise((r) => setTimeout(r, 800));
    return failUrl("1");
  }

  await clearRateLimit("login-ip", ip);

  const response = NextResponse.redirect(new URL(next, origin), { status: 303 });
  response.cookies.set("admin_auth", signAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

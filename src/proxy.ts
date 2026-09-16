import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/adminSession";

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

// Blocks cross-site form/fetch submissions (CSRF): state-changing requests
// must come from a page on this same site.
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return request.headers.get("sec-fetch-site") !== "cross-site";
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isApi = pathname.startsWith("/api/");

  if (isApi && !SAFE_METHODS.has(request.method) && !isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const isPublicAdminPath =
    pathname.startsWith("/admin/login") ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout";

  if ((pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) && !isPublicAdminPath) {
    if (!verifyAdminToken(request.cookies.get("admin_auth")?.value)) {
      if (isApi) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      const loginUrl = new URL("/admin/login", request.nextUrl.origin);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};

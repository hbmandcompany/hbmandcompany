import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isDeskHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.split(":")[0].toLowerCase();
  return host === "desk.hbmandcompany.com" || host === "desk.localhost" || host.startsWith("desk.");
}

export function middleware(request: NextRequest) {
  if (!isDeskHost(request.headers.get("host"))) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/desk")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/desk/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

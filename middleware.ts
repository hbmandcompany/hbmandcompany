import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getShopRedirectOrigin, isShopHost } from "@/lib/site-urls";

function isDeskHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.split(":")[0].toLowerCase();
  return host === "desk.hbmandcompany.com" || host === "desk.localhost" || host.startsWith("desk.");
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host");
  const { pathname, search } = request.nextUrl;

  if (isShopHost(host)) {
    if (pathname.startsWith("/shop") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    if (pathname === "/") {
      const url = request.nextUrl.clone();
      url.pathname = "/shop";
      return NextResponse.rewrite(url);
    }

    const url = request.nextUrl.clone();
    url.pathname = "/shop";
    return NextResponse.redirect(url);
  }

  if (isDeskHost(host)) {
    if (pathname.startsWith("/desk") || pathname.startsWith("/_next") || pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = "/desk/login";
    return NextResponse.redirect(url);
  }

  if (pathname === "/shop" || pathname.startsWith("/shop/")) {
    const shopOrigin = getShopRedirectOrigin(host);
    const suffix = pathname === "/shop" ? "" : pathname.slice("/shop".length);
    const destination = `${shopOrigin}${suffix}${search}`;
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

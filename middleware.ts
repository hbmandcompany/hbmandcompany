import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getShopRedirectOrigin, isDeskHost, isShopHost } from "@/lib/site-urls";

const DESK_ROLE_COOKIE = "desk-role";

const WRITER_ALLOWED_PREFIXES = ["/desk/newsroom", "/desk/wallet", "/desk/settings"];

function isDeskLoginPath(pathname: string): boolean {
  return pathname === "/desk/login" || pathname === "/login";
}

function isWriterAllowed(pathname: string): boolean {
  if (pathname.startsWith("/desk/newsroom/ticker")) return false;
  return WRITER_ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function deskLoginRedirectUrl(request: NextRequest, host: string | null): URL {
  const url = request.nextUrl.clone();
  if (isDeskHost(host)) {
    url.pathname = "/";
  } else {
    url.pathname = "/desk/login";
  }
  return url;
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
    if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    if (pathname === "/desk/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      return NextResponse.redirect(url);
    }

    if (pathname === "/" || pathname === "/login") {
      const url = request.nextUrl.clone();
      url.pathname = "/desk/login";
      return NextResponse.rewrite(url);
    }

    if (pathname.startsWith("/desk")) {
      const role = request.cookies.get(DESK_ROLE_COOKIE)?.value;
      const onLogin = isDeskLoginPath(pathname);

      if (!role && !onLogin && pathname.startsWith("/desk")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }

      if (role === "writer" && pathname.startsWith("/desk") && !isWriterAllowed(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = "/desk/newsroom";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/desk")) {
    const role = request.cookies.get(DESK_ROLE_COOKIE)?.value;
    const onLogin = isDeskLoginPath(pathname);

    if (!role && !onLogin) {
      return NextResponse.redirect(deskLoginRedirectUrl(request, host));
    }

    if (role === "writer" && !onLogin && !isWriterAllowed(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = "/desk/newsroom";
      return NextResponse.redirect(url);
    }
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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isWriterRestrictedRole,
  profileRoleToDeskRole,
  routeForRole,
  type DeskProfileRole,
  type DeskRole,
} from "@/lib/desk/desk-auth";
import { createMiddlewareSupabaseClient } from "@/lib/supabase/middleware-client";
import { getShopRedirectOrigin, isDeskHost, isShopHost } from "@/lib/site-urls";

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

async function getDeskSession(request: NextRequest) {
  const client = createMiddlewareSupabaseClient(request);
  if (!client) {
    return { user: null, role: null as DeskRole | null, response: NextResponse.next({ request }) };
  }

  const { supabase, getResponse } = client;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, role: null, response: getResponse() };
  }

  const { data: profile } = await supabase
    .from("desk_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const role = profile?.role ? profileRoleToDeskRole(profile.role as DeskProfileRole) : null;
  return { user, role, response: getResponse() };
}

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => to.cookies.set(cookie));
}

function applyWriterGuard(pathname: string, role: DeskRole | null, request: NextRequest, response: NextResponse) {
  if (role && isWriterRestrictedRole(role) && pathname.startsWith("/desk") && !isWriterAllowed(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/desk/newsroom";
    const redirect = NextResponse.redirect(url);
    copyCookies(response, redirect);
    return redirect;
  }
  return response;
}

export async function middleware(request: NextRequest) {
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
    if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/auth")) {
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
      const onLogin = isDeskLoginPath(pathname);
      const session = await getDeskSession(request);

      if (!session.user && !onLogin) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        const redirect = NextResponse.redirect(url);
        copyCookies(session.response, redirect);
        return redirect;
      }

      if (session.user && !session.role && !onLogin) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("error", "no-profile");
        const redirect = NextResponse.redirect(url);
        copyCookies(session.response, redirect);
        return redirect;
      }

      return applyWriterGuard(pathname, session.role, request, session.response);
    }

    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/desk")) {
    const onLogin = isDeskLoginPath(pathname);
    const session = await getDeskSession(request);

    if (!session.user && !onLogin) {
      const redirect = NextResponse.redirect(deskLoginRedirectUrl(request, host));
      copyCookies(session.response, redirect);
      return redirect;
    }

    if (session.user && !session.role && !onLogin) {
      const loginUrl = deskLoginRedirectUrl(request, host);
      loginUrl.searchParams.set("error", "no-profile");
      const redirect = NextResponse.redirect(loginUrl);
      copyCookies(session.response, redirect);
      return redirect;
    }

    if (session.user && session.role && onLogin) {
      const redirect = NextResponse.redirect(new URL(routeForRole(session.role), request.url));
      copyCookies(session.response, redirect);
      return redirect;
    }

    return applyWriterGuard(pathname, session.role, request, session.response);
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

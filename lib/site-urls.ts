const PRODUCTION_SHOP_ORIGIN = "https://shop.hbmandcompany.com";

/** Public shop origin — override with NEXT_PUBLIC_SHOP_URL if needed. */
export function getShopOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_SHOP_URL?.trim().replace(/\/$/, "");
  if (configured) return configured;

  if (process.env.NODE_ENV === "development") {
    return "http://shop.localhost:3000";
  }

  return PRODUCTION_SHOP_ORIGIN;
}

/** Absolute shop URL (subdomain root, not /shop path on main site). */
export function getShopUrl(path = ""): string {
  const origin = getShopOrigin();
  if (!path || path === "/") return origin;

  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalized}`;
}

/** Resolve shop redirect target from incoming request host (middleware). */
export function getShopRedirectOrigin(hostHeader: string | null): string {
  if (!hostHeader) return PRODUCTION_SHOP_ORIGIN;

  const host = hostHeader.toLowerCase();

  if (host.includes("localhost") || host.startsWith("127.0.0.1")) {
    const port = host.includes(":") ? host.split(":")[1] : "3000";
    return `http://shop.localhost:${port}`;
  }

  return PRODUCTION_SHOP_ORIGIN;
}

export function isShopHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.split(":")[0].toLowerCase();
  return host === "shop.hbmandcompany.com" || host === "shop.localhost" || host.startsWith("shop.");
}

export function isDeskHost(hostHeader: string | null): boolean {
  if (!hostHeader) return false;
  const host = hostHeader.split(":")[0].toLowerCase();
  return host === "desk.hbmandcompany.com" || host === "desk.localhost" || host.startsWith("desk.");
}

/** Login path: clean `/` on desk subdomain, `/desk/login` on main site. */
export function getDeskLoginPath(hostHeader?: string | null): string {
  const host =
    hostHeader ??
    (typeof window !== "undefined" ? window.location.host : null);
  return isDeskHost(host) ? "/" : "/desk/login";
}

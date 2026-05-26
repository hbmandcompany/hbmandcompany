import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { getShopOrigin } from "@/lib/site-urls";

const shopHost = getShopOrigin();

const routes: {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  host?: string;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/company", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.85 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.8, host: shopHost },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/stake", changeFrequency: "monthly", priority: 0.8 },
  { path: "/subscription", changeFrequency: "monthly", priority: 0.8 },
  { path: "/newspaper", changeFrequency: "daily", priority: 0.9 },
  { path: "/search", changeFrequency: "monthly", priority: 0.5 },
  { path: "/team", changeFrequency: "monthly", priority: 0.75 },
  { path: "/values", changeFrequency: "monthly", priority: 0.75 },
  { path: "/press-kit", changeFrequency: "monthly", priority: 0.55 },
  { path: "/base", changeFrequency: "monthly", priority: 0.88 },
  { path: "/ethereum", changeFrequency: "monthly", priority: 0.88 },
  { path: "/governance", changeFrequency: "monthly", priority: 0.88 },
  { path: "/documentation", changeFrequency: "monthly", priority: 0.85 },
  { path: "/treasury", changeFrequency: "monthly", priority: 0.85 },
  { path: "/acquire-hbm", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(({ path, changeFrequency, priority, host: routeHost }) => ({
    url: path === "" ? SITE_URL : routeHost ? routeHost : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

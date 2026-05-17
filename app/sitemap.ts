import type { MetadataRoute } from "next";

const host = "https://hbmandcompany.com";

const routes: {
  path: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/team", changeFrequency: "monthly", priority: 0.75 },
  { path: "/values", changeFrequency: "monthly", priority: 0.75 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.65 },
  { path: "/press-kit", changeFrequency: "monthly", priority: 0.55 },
  { path: "/legal-entity", changeFrequency: "yearly", priority: 0.45 },
  { path: "/base", changeFrequency: "monthly", priority: 0.88 },
  { path: "/ethereum", changeFrequency: "monthly", priority: 0.88 },
  { path: "/governance", changeFrequency: "monthly", priority: 0.88 },
  { path: "/documentation", changeFrequency: "monthly", priority: 0.85 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.85 },
  { path: "/treasury", changeFrequency: "monthly", priority: 0.85 },
  { path: "/shop", changeFrequency: "weekly", priority: 0.85 },
  { path: "/acquire-hbm", changeFrequency: "monthly", priority: 0.75 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "" ? host : `${host}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

/** Canonical public site URL for metadata, schema, and sitemaps. */
export const SITE_URL = "https://hbmandcompany.com";

export const SITE_NAME = "HBM & Company";

export const DEFAULT_TITLE = "HBM & Company | Music, Film & Culture News";

export const DEFAULT_DESCRIPTION =
  "Culture news and intelligence for music, film, and the arts. Original reviews, industry reporting, and editorial coverage from the HBM desk.";

/** Shared favicon config — relative paths so icons resolve on all subdomains. */
export const SITE_ICONS = {
  icon: [
    { url: "/icon.svg", type: "image/svg+xml" },
    { url: "/apple-icon.png", type: "image/png", sizes: "180x180" },
  ],
  apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  shortcut: "/icon.svg",
} as const;

export const OG_IMAGE = `${SITE_URL}/og-image.png`;

/** Organization logo for schema.org (SVG icon until a dedicated logo.png is added). */
export const LOGO_URL = `${SITE_URL}/icon.svg`;

export const CONTACT_EMAIL = "contact@hbmandcompany.com";

export const SOCIAL_PROFILES = [
  "https://twitter.com/hbmandcompany",
  "https://linkedin.com/company/hbmandcompany",
] as const;

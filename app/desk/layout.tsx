import type { Metadata } from "next";
import { SITE_ICONS } from "@/lib/seo/site";

export const metadata: Metadata = {
  icons: SITE_ICONS,
};

export default function DeskRootLayout({ children }: { children: React.ReactNode }) {
  return children;
}

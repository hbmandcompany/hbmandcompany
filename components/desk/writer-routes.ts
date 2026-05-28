import type { DeskNavItem } from "./desk-routes";

export const writerNav: DeskNavItem[] = [
  { section: "NEWSROOM", href: "/desk/newsroom/editor?mode=write", label: "Story", icon: "file" },
  { section: "NEWSROOM", href: "/desk/newsroom/archive", label: "Archive", icon: "files" },
  { section: "NEWSROOM", href: "/desk/newsroom/analytics", label: "Analytics", icon: "analytics" },

  { section: "ACCOUNT", href: "/desk/wallet", label: "Wallet", icon: "wallet" },
  { section: "ACCOUNT", href: "/desk/settings", label: "Settings", icon: "gear" },
];

import type { DeskNavItem } from "./desk-routes";

export const writerNav: DeskNavItem[] = [
  { section: "NEWSROOM", href: "/desk/newsroom", label: "My Stories", icon: "file" },
  { section: "NEWSROOM", href: "/desk/newsroom/editor", label: "Story Editor", icon: "send" },
  { section: "NEWSROOM", href: "/desk/submissions", label: "Submissions", icon: "send" },

  { section: "ANALYTICS", href: "/desk/intelligence", label: "Engagement", icon: "search" },

  { section: "EDITORIAL", href: "/desk/starred", label: "From the Editor", icon: "star" },
  { section: "EDITORIAL", href: "/desk/calendar", label: "Deadlines", icon: "calendar" },

  { section: "ACCOUNT", href: "/desk/settings", label: "Settings", icon: "gear" },
];

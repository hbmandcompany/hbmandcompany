export type DeskNavItem = {
  section: string;
  href: string;
  label: string;
  icon:
    | "mail"
    | "star"
    | "grid"
    | "calendar"
    | "video"
    | "scroll"
    | "vote"
    | "wallet"
    | "landmark"
    | "file"
    | "search"
    | "send"
    | "files"
    | "users"
    | "gear";
};

export const deskNav: DeskNavItem[] = [
  { section: "INBOX", href: "/desk", label: "Inbox", icon: "mail" },
  { section: "INBOX", href: "/desk/starred", label: "Starred", icon: "star" },

  { section: "WORKSPACE", href: "/desk/board", label: "Board", icon: "grid" },
  { section: "WORKSPACE", href: "/desk/calendar", label: "Calendar", icon: "calendar" },
  { section: "WORKSPACE", href: "/desk/meetings", label: "Meetings", icon: "video" },

  { section: "GOVERNANCE", href: "/desk/governance", label: "Proposals", icon: "scroll" },
  { section: "GOVERNANCE", href: "/desk/voting", label: "Voting", icon: "vote" },

  { section: "ASSETS", href: "/desk/wallet", label: "Wallet", icon: "wallet" },
  { section: "ASSETS", href: "/desk/treasury", label: "Treasury", icon: "landmark" },

  { section: "INTELLIGENCE", href: "/desk/intelligence", label: "Briefs", icon: "file" },
  { section: "INTELLIGENCE", href: "/desk/research", label: "Research", icon: "search" },

  { section: "PIPELINE", href: "/desk/submissions", label: "Submissions", icon: "send" },
  { section: "PIPELINE", href: "/desk/documents", label: "Documents", icon: "files" },

  { section: "PEOPLE", href: "/desk/directory", label: "Directory", icon: "users" },
  { section: "PEOPLE", href: "/desk/settings", label: "Settings", icon: "gear" },
];

export function deskBreadcrumb(pathname: string): { section: string; page: string } {
  if (pathname === "/desk") return { section: "INBOX", page: "Inbox" };
  const item = deskNav.find((n) => n.href === pathname);
  if (item) return { section: item.section, page: item.label };
  return { section: "DESK", page: "Workspace" };
}


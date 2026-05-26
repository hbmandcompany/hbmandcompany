export type DeskRole =
  | "principal"
  | "writer"
  | "editor"
  | "analyst"
  | "admin"
  | "applicant"
  | "organization";

export type DeskProfileRole = Extract<DeskRole, "writer" | "principal" | "editor" | "analyst" | "admin">;

export type DeskProfile = {
  id: string;
  role: DeskProfileRole;
  display_name: string | null;
  created_at: string;
};

export function isDeskProfileRole(value: string): value is DeskProfileRole {
  return value === "writer" || value === "principal" || value === "editor" || value === "analyst" || value === "admin";
}

export function profileRoleToDeskRole(role: string): DeskRole {
  if (isDeskProfileRole(role)) return role;
  return "writer";
}

/** Writers are restricted to newsroom, wallet, and settings routes. */
export function isWriterRestrictedRole(role: DeskRole): boolean {
  return role === "writer";
}

const roleLabels: Record<DeskRole, string> = {
  principal: "Principal",
  writer: "Writer",
  editor: "Editor",
  analyst: "Analyst",
  admin: "Admin",
  applicant: "Applicant",
  organization: "Organization",
};

export function roleLabelFor(role: DeskRole): string {
  return roleLabels[role];
}

export function routeForRole(role: DeskRole): string {
  switch (role) {
    case "principal":
      return "/desk";
    case "writer":
      return "/desk/newsroom";
    case "editor":
      return "/desk/newsroom/editor";
    case "analyst":
      return "/desk/intelligence";
    case "admin":
      return "/desk/admin";
    case "applicant":
      return "/desk/applications";
    case "organization":
      return "/desk/orgs";
    default:
      return "/desk/newsroom";
  }
}

"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readDeskRoleCookie, setDeskRoleCookie, type DeskRoleCookie } from "./desk-auth-cookie";

export type DeskRole =
  | "principal"
  | "writer"
  | "editor"
  | "analyst"
  | "admin"
  | "applicant"
  | "organization";

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

type DeskAuthContextValue = {
  currentRole: DeskRole;
  setRole: (role: DeskRole) => void;
  signInAs: (role: DeskRoleCookie) => void;
};

const DeskAuthContext = createContext<DeskAuthContextValue | null>(null);

export function DeskAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<DeskRole>("writer");

  useEffect(() => {
    const cookieRole = readDeskRoleCookie();
    if (cookieRole === "writer") setCurrentRole("writer");
    if (cookieRole === "principal") setCurrentRole("principal");
  }, []);

  const value = useMemo(
    () => ({
      currentRole,
      setRole: (role: DeskRole) => {
        setCurrentRole(role);
        if (role === "writer" || role === "principal") {
          setDeskRoleCookie(role);
        }
      },
      signInAs: (role: DeskRoleCookie) => {
        setDeskRoleCookie(role);
        setCurrentRole(role === "writer" ? "writer" : "principal");
      },
    }),
    [currentRole],
  );

  return <DeskAuthContext.Provider value={value}>{children}</DeskAuthContext.Provider>;
}

export function useDeskAuth() {
  const ctx = useContext(DeskAuthContext);
  if (!ctx) throw new Error("useDeskAuth must be used within DeskAuthProvider");
  return ctx;
}

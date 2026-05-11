"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type DeskUser = {
  id: string;
  name: string;
  role: string;
  vertical?: string;
  station?: string;
  initials: string;
};

export const deskUsers: DeskUser[] = [
  { id: "john", name: "John Mercer", role: "Principal", initials: "JM" },
  { id: "elena", name: "Elena Vasquez", role: "Station Chief", station: "Dallas", initials: "EV" },
  { id: "tomas", name: "Tomás Kessler", role: "Desk Chief", vertical: "DeFi Vertical", initials: "TK" },
  { id: "adaeze", name: "Adaeze Obi", role: "Desk Officer", vertical: "Infrastructure", initials: "AO" },
  { id: "marcus", name: "Marcus Lin", role: "Controller", initials: "ML" },
  { id: "sophie", name: "Sophie Maier", role: "Desk Officer", vertical: "Governance", initials: "SM" },
];

type DeskContextValue = {
  user: DeskUser;
  setUserId: (id: string) => void;
  allUsers: DeskUser[];
};

const DeskContext = createContext<DeskContextValue | null>(null);

export function DeskProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string>("tomas");

  const value = useMemo<DeskContextValue>(() => {
    const user = deskUsers.find((u) => u.id === userId) ?? deskUsers[2];
    return { user, setUserId, allUsers: deskUsers };
  }, [userId]);

  return <DeskContext.Provider value={value}>{children}</DeskContext.Provider>;
}

export function useDesk() {
  const ctx = useContext(DeskContext);
  if (!ctx) throw new Error("useDesk must be used within DeskProvider");
  return ctx;
}


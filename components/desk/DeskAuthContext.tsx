"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { fetchDeskProfileClient } from "@/lib/supabase/queries/profiles.client";
import { profileRoleToDeskRole, routeForRole, roleLabelFor, type DeskRole } from "@/lib/desk/desk-auth";

export type { DeskRole };
export { routeForRole, roleLabelFor };

type DeskAuthContextValue = {
  currentRole: DeskRole;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null; role: DeskRole | null }>;
  signOut: () => Promise<void>;
};

const DeskAuthContext = createContext<DeskAuthContextValue | null>(null);

export function DeskAuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<DeskRole>("writer");
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const supabase = createClient();

    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      const { data: profile } = await fetchDeskProfileClient();
      if (profile) {
        setCurrentRole(profileRoleToDeskRole(profile.role));
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    }

    void loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        setCurrentRole("writer");
        setIsLoading(false);
        return;
      }
      void loadProfile();
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      currentRole,
      isLoading,
      isAuthenticated,
      signIn: async (email: string, password: string) => {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          return { error: error.message, role: null };
        }

        const { data: profile, error: profileError } = await fetchDeskProfileClient();
        if (profileError) {
          await supabase.auth.signOut();
          return { error: profileError.message, role: null };
        }
        if (!profile) {
          await supabase.auth.signOut();
          return { error: "No desk profile found for this account.", role: null };
        }

        const role = profileRoleToDeskRole(profile.role);
        setCurrentRole(role);
        setIsAuthenticated(true);
        return { error: null, role };
      },
      signOut: async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setCurrentRole("writer");
      },
    }),
    [currentRole, isLoading, isAuthenticated],
  );

  return <DeskAuthContext.Provider value={value}>{children}</DeskAuthContext.Provider>;
}

export function useDeskAuth() {
  const ctx = useContext(DeskAuthContext);
  if (!ctx) throw new Error("useDeskAuth must be used within DeskAuthProvider");
  return ctx;
}

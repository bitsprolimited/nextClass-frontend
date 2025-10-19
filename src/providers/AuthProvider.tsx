"use client";

import { createContext, useContext, ReactNode } from "react";
import { authClient, BetterAuthSession } from "../lib/auth-client";
import { BetterFetchError } from "better-auth/react";
import { SessionQueryParams } from "better-auth";

interface AuthContextType {
  session: BetterAuthSession | null;
  isLoading: boolean;
  error: BetterFetchError | null;
  refetch: (
    queryParams?:
      | {
          query?: SessionQueryParams | undefined;
        }
      | undefined
  ) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    data: session,
    isPending: isLoading,
    refetch,
    error,
  } = authClient.useSession();

  return (
    <AuthContext.Provider value={{ session, isLoading, error, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

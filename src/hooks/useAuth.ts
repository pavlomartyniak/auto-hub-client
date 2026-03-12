"use client";

import { useCallback, useState } from "react";

type AuthState = {
  isAuthenticated: boolean;
  userEmail?: string;
};

// Minimal stub for now; replace with real auth provider later
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
  });

  const login = useCallback((email: string) => {
    setState({ isAuthenticated: true, userEmail: email });
  }, []);

  const logout = useCallback(() => {
    setState({ isAuthenticated: false });
  }, []);

  return { ...state, login, logout };
}

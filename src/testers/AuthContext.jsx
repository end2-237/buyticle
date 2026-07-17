import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Navigate, useLocation } from "react-router-dom";
import * as store from "./store";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => store.getCurrentUser());

  useEffect(() => store.subscribe(() => setUser(store.getCurrentUser())), []);

  const value = {
    user,
    register: useCallback((data) => store.register(data), []),
    login: useCallback((data) => store.login(data), []),
    logout: useCallback(() => store.logout(), []),
    completeOnboarding: useCallback((p) => store.completeOnboarding(p), []),
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/* Route guard — redirects to login (and onboarding if incomplete) */
export function Protected({ children, requireOnboarded = true, admin = false }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) return <Navigate to="/testers/login" replace state={{ from: loc.pathname }} />;
  if (admin && user.role !== "admin") return <Navigate to="/testers/dashboard" replace />;
  if (requireOnboarded && !user.onboarded) return <Navigate to="/testers/onboarding" replace />;
  return children;
}

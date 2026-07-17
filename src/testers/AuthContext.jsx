import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import * as store from "./store";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    store.ensureSeed();
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) { setUser(null); setLoading(false); return; }
      try {
        const profile = await store.ensureTesterDoc(fbUser.uid, fbUser.email);
        setUser({ id: fbUser.uid, email: fbUser.email, ...profile });
      } catch {
        setUser({ id: fbUser.uid, email: fbUser.email, role: "tester", onboarded: false, profile: {}, points: 0 });
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // Refresh the merged profile (after onboarding / points change)
  const refresh = useCallback(async () => {
    if (!auth.currentUser) return;
    const profile = await store.ensureTesterDoc(auth.currentUser.uid, auth.currentUser.email);
    setUser({ id: auth.currentUser.uid, email: auth.currentUser.email, ...profile });
  }, []);

  const value = {
    user, loading,
    register: useCallback((d) => store.registerUser(d), []),
    login: useCallback((d) => store.loginUser(d), []),
    logout: useCallback(() => store.logoutUser(), []),
    completeOnboarding: useCallback(async (p) => {
      await store.completeOnboarding(auth.currentUser.uid, p);
      await refresh();
    }, [refresh]),
    refresh,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function Spinner() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#EDECEA]">
      <div className="w-10 h-10 rounded-full border-2 border-[#FF4500] border-t-transparent animate-spin" />
    </div>
  );
}

/* Route guard */
export function Protected({ children, requireOnboarded = true, admin = false }) {
  const { user, loading } = useAuth();
  const loc = useLocation();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/testers/login" replace state={{ from: loc.pathname }} />;
  if (admin && user.role !== "admin") return <Navigate to="/testers/dashboard" replace />;
  if (requireOnboarded && !user.onboarded) return <Navigate to="/testers/onboarding" replace />;
  return children;
}

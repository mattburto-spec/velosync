"use client";

import { createSupabaseBrowser } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { User } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Nuclear session clear — bypasses GoTrueClient lock queue entirely.
 * Removes all Supabase auth keys from localStorage and cookies so the
 * singleton client starts fresh on next page load.
 */
function nukeStaleSession() {
  // Clear localStorage keys
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && (key.startsWith("sb-") || key.includes("supabase"))) {
      localStorage.removeItem(key);
    }
  }
  // Clear auth cookies
  document.cookie.split(";").forEach((c) => {
    const name = c.trim().split("=")[0];
    if (name.startsWith("sb-")) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });
}

interface AuthState {
  authUser: SupabaseUser | null;
  profile: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({
  authUser: null,
  profile: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    if (!hasSupabase) {
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowser();

    const getUser = async () => {
      try {
        // Race getUser against a timeout — stale session tokens can cause
        // the GoTrueClient internal lock queue to hang indefinitely.
        // signOut() also uses the lock, so we can't call it as a fallback.
        // Instead we nuke localStorage/cookies directly to break the deadlock.
        const result = await Promise.race([
          supabase.auth.getUser(),
          new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000)),
        ]);

        if (!result) {
          console.warn("[VeloSync] getUser timed out — nuking stale session");
          nukeStaleSession();
          setLoading(false);
          // Reload so the singleton client re-initializes without a stale token
          window.location.reload();
          return;
        }

        const { data: { user } } = result;
        setAuthUser(user);

        if (user) {
          const { data } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();
          setProfile(data);
        }
      } catch (err) {
        console.warn("[VeloSync] getUser failed — nuking stale session:", err);
        nukeStaleSession();
      }

      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setAuthUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [hasSupabase]);

  const signOut = async () => {
    if (!hasSupabase) return;
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    setAuthUser(null);
    setProfile(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ authUser, profile, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

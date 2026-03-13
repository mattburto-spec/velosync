"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";

  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
      return;
    }
    setError(null);
    setLoading(true);
    console.log("[VeloSync] Attempting login for:", email);

    try {
      const supabase = createSupabaseBrowser();

      // Race signIn against a timeout — if the GoTrueClient lock queue is
      // blocked by a hung getUser(), this will never resolve on the singleton.
      // In that case, nuke the stale session and reload to get a fresh client.
      const signInResult = await Promise.race([
        supabase.auth.signInWithPassword({ email, password }),
        new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 6000)),
      ]);

      if (signInResult === "timeout") {
        console.warn("[VeloSync] signIn timed out — clearing stale session");
        // Bypass GoTrueClient lock: clear storage directly
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("sb-") || key.includes("supabase"))) {
            localStorage.removeItem(key);
          }
        }
        document.cookie.split(";").forEach((c) => {
          const name = c.trim().split("=")[0];
          if (name.startsWith("sb-")) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
          }
        });
        // Reload to get a fresh singleton, then user can try again
        window.location.reload();
        return;
      }

      const { error: authError, data } = signInResult;

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      console.log("[VeloSync] Login success, redirecting to:", redirect);
      window.location.href = redirect;
    } catch (err) {
      console.error("[VeloSync] Login exception:", err);
      setError("An unexpected error occurred. Check the console.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!hasSupabase) {
      setError("Supabase is not configured.");
      return;
    }
    const supabase = createSupabaseBrowser();
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?redirect=${encodeURIComponent(redirect)}`,
      },
    });

    if (authError) {
      setError(authError.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-midnight items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(200,85,61,0.12),transparent)]" />
        <div className="relative text-center px-12">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/15">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8553D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5" />
                <circle cx="18.5" cy="17.5" r="3.5" />
                <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
              </svg>
            </div>
            <span className="text-3xl font-display font-bold text-white tracking-tight">VeloSync</span>
          </div>
          <p className="text-white/40 text-lg max-w-sm mx-auto leading-relaxed">
            Track every gram. Pack smarter. Ride further.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-surface px-4">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 text-center">
            <div className="lg:hidden mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-midnight mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8553D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="5.5" cy="17.5" r="3.5" />
                <circle cx="18.5" cy="17.5" r="3.5" />
                <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
              </svg>
            </div>
            <h1 className="text-2xl font-display font-bold text-slate-text">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-muted">
              Sign in to your VeloSync account
            </p>
          </div>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-surface-warm bg-white px-4 py-2.5 text-sm font-medium text-slate-text hover:bg-surface transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-surface-warm" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-surface-warm" />
          </div>

          {/* Email/Password form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-copper hover:text-copper-light transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

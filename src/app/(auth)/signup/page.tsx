"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const hasSupabase = !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasSupabase) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local");
      return;
    }
    setError(null);
    setLoading(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    const supabase = createSupabaseBrowser();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: displayName,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check if user was auto-confirmed (email confirmation disabled)
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      // Auto-confirmed — redirect to dashboard
      window.location.href = "/dashboard";
      return;
    }

    // Email confirmation required — show success message
    setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface px-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-summit/10 text-summit">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl font-display font-bold text-slate-text">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-muted">
            We sent a confirmation link to <strong>{email}</strong>. Click the
            link to activate your account.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-copper hover:text-copper-light transition-colors"
          >
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-midnight items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(91,143,185,0.1),transparent)]" />
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
            Your gear. Your bikes. Your way.
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
              Create your account
            </h1>
            <p className="mt-1 text-sm text-muted">
              Start tracking your gear in seconds
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Display Name"
              type="text"
              placeholder="Trail name or real name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
              autoComplete="name"
            />
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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <Button type="submit" loading={loading} className="w-full">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-copper hover:text-copper-light transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // Disable navigator.locks which deadlocks with @supabase/ssr singleton
        lock: (name: string, acquireTimeout: number, fn: () => Promise<any>) => fn(),
      },
    }
  );
}

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Anon-key client for public reads (RLS restricts it to SELECT on content
 * tables and INSERT on leads). Safe to use in server components; never
 * carries elevated privileges.
 */
export function getSupabaseClient() {
  if (!url || !anonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY env vars."
    );
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false },
    global: {
      // Explicit no-store keeps every page that reads content dynamically
      // rendered (fresh on every request) instead of Next.js attempting to
      // statically prerender it at build time using this fetch's result.
      fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
    },
  });
}

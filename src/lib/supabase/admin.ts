import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Service-role client. Bypasses Row Level Security entirely -- only import
 * this from Server Actions / Route Handlers that have already verified the
 * admin session via requireAdminSession(). Never expose to client code.
 */
export function getSupabaseAdminClient() {
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars."
    );
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

import { NextRequest, NextResponse } from "next/server";

// TEMPORARY — one-time env var recovery. Delete this file after use.
const DEBUG_TOKEN = "6693093d35bfd17ede86be9a2b20ca50cec0ada561d13c2f";

const KEYS = [
  "ADMIN_PASSWORD",
  "ADMIN_SESSION_SECRET",
  "ADMIN_USERNAME",
  "CRON_SECRET",
  "GOOGLE_PLACES_API_KEY",
  "GOOGLE_PLACES_PLACE_ID",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
];

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("key");
  if (token !== DEBUG_TOKEN) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  for (const key of KEYS) {
    console.log(`[env-recovery] ${key}=${process.env[key] ?? "(unset)"}`);
  }

  return NextResponse.json({ logged: true });
}

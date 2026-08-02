import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * Supabase's free tier pauses a project after 7 days with no API activity.
 * This just needs to execute a query, not return anything meaningful --
 * runs daily (see vercel.json) to stay comfortably inside that window even
 * if a run or two fails or the site gets no real visitors for a while.
 */
export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase.from("site_settings").select("key").limit(1);
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pingedAt: new Date().toISOString() });
}

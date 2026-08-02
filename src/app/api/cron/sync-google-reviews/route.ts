import { NextRequest, NextResponse } from "next/server";
import { syncGoogleReviews } from "@/lib/reviews-sync";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await syncGoogleReviews();
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

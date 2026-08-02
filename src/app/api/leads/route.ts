import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const lead = {
      name: String(body.name ?? "").trim(),
      phone: String(body.phone ?? "").trim(),
      email: body.email ? String(body.email).trim() : null,
      destination: body.destination ? String(body.destination).trim() : null,
      package: body.package ? String(body.package).trim() : null,
      budget: body.budget ? String(body.budget).trim() : null,
      dates: body.dates ? String(body.dates).trim() : null,
      travelers: body.travelers ? String(body.travelers).trim() : null,
      message: body.message ? String(body.message).trim() : null,
      source_page: String(body.sourcePage ?? "unknown").trim(),
    };

    if (!lead.name || !lead.phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    const supabase = getSupabaseClient();
    const { error } = await supabase.from("leads").insert(lead);
    if (error) {
      console.error("Leads API error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Leads API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

export async function deleteLead(id: string) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdminSession } from "@/lib/admin-session";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { syncGoogleReviews, type ReviewsSyncResult } from "@/lib/reviews-sync";

function revalidateReviewPaths() {
  revalidatePath("/");
  revalidatePath("/reviews");
  revalidatePath("/admin");
  revalidatePath("/admin/reviews");
}

export async function setReviewHidden(id: string, hidden: boolean) {
  await requireAdminSession();
  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("reviews").update({ is_hidden: hidden }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidateReviewPaths();
}

export async function runReviewsSync(): Promise<ReviewsSyncResult> {
  await requireAdminSession();
  const result = await syncGoogleReviews();
  revalidateReviewPaths();
  return result;
}

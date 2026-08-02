"use server";

import { redirect } from "next/navigation";
import { clearAdminSessionCookie } from "@/lib/admin-session";

export async function logout() {
  await clearAdminSessionCookie();
  redirect("/admin/login");
}

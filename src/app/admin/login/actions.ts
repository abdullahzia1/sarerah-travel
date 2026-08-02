"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials } from "@/lib/admin-auth";
import { setAdminSessionCookie } from "@/lib/admin-session";

export interface LoginState {
  error?: string;
}

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!verifyAdminCredentials(username, password)) {
    return { error: "Invalid username or password." };
  }

  await setAdminSessionCookie(username);
  redirect(from.startsWith("/admin") ? from : "/admin");
}

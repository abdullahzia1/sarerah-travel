import "server-only";
import { cookies } from "next/headers";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_MS,
  createSessionToken,
  verifySessionToken,
  type AdminSessionPayload,
} from "@/lib/admin-auth";

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);
}

/** Call at the top of every admin Server Action / Route Handler mutation. */
export async function requireAdminSession(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized: admin session required.");
  return session;
}

export async function setAdminSessionCookie(username: string) {
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, createSessionToken(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_MS / 1000,
  });
}

export async function clearAdminSessionCookie() {
  const store = await cookies();
  store.delete(ADMIN_SESSION_COOKIE);
}

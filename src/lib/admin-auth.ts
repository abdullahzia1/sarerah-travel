import { createHmac, timingSafeEqual } from "crypto";

/**
 * MVP admin auth: a single hardcoded username/password (from env vars)
 * gates a signed, httpOnly session cookie. Not a full auth system --
 * intended to be swapped for Supabase Auth (or similar) later. Kept
 * dependency-free (Node's built-in crypto) and framework-agnostic so it
 * can run both in Server Actions/Route Handlers and in middleware.
 */

export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export interface AdminSessionPayload {
  u: string;
  exp: number;
}

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET env var.");
  return secret;
}

function sign(encodedPayload: string, secret: string): string {
  return createHmac("sha256", secret).update(encodedPayload).digest("base64url");
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Compare against itself so a length mismatch doesn't short-circuit faster.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export function createSessionToken(username: string): string {
  const payload: AdminSessionPayload = { u: username, exp: Date.now() + ADMIN_SESSION_TTL_MS };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded, getSecret());
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): AdminSessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;

  let secret: string;
  try {
    secret = getSecret();
  } catch {
    return null;
  }

  const expected = sign(encoded, secret);
  if (!timingSafeStringEqual(signature, expected)) return null;

  try {
    const payload: AdminSessionPayload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    );
    if (typeof payload.exp !== "number" || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedUser || !expectedPass) return false;
  const userOk = timingSafeStringEqual(username, expectedUser);
  const passOk = timingSafeStringEqual(password, expectedPass);
  return userOk && passOk;
}

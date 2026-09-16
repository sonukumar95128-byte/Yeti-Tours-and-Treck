import crypto from "crypto";
import { cookies } from "next/headers";

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

// The password is mixed into the signing key, so changing ADMIN_PASSWORD
// (or ADMIN_SESSION_SECRET) immediately logs out every existing session.
function secret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  const p = process.env.ADMIN_PASSWORD;
  if (!s && !p) throw new Error("ADMIN_SESSION_SECRET is not set");
  return `${s ?? ""}:${p ?? ""}`;
}

function sign(ts: string): string {
  return crypto.createHmac("sha256", secret()).update(ts).digest("hex");
}

export function signAdminToken(): string {
  const ts = Date.now().toString();
  return `${ts}.${sign(ts)}`;
}

export function verifyAdminToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;
  const ts = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^\d+$/.test(ts) || !/^[0-9a-f]{64}$/.test(sig)) return false;

  // Reject expired tokens server-side; the cookie's maxAge alone can be ignored by an attacker.
  const age = Date.now() - Number(ts);
  if (age < 0 || age > SESSION_MAX_AGE_SECONDS * 1000) return false;

  try {
    return crypto.timingSafeEqual(Buffer.from(sign(ts), "hex"), Buffer.from(sig, "hex"));
  } catch {
    return false;
  }
}

/** Constant-time password check. */
export function passwordMatches(input: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  const a = crypto.createHash("sha256").update(input).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export async function isAdminRequest(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminToken(jar.get("admin_auth")?.value);
}

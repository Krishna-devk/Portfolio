import { cookies } from "next/headers";
import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
const ENCRYPTION_KEY = process.env.ADMIN_JWT_SECRET || "default-secret-key-must-be-32-bytes-long!";
const IV_LENGTH = 16; // For AES, this is always 16

function getSecretKey(): Buffer {
  // Ensure key is exactly 32 bytes
  return crypto.createHash("sha256").update(ENCRYPTION_KEY).digest();
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string): string {
  try {
    const textParts = text.split(":");
    const ivHex = textParts.shift();
    if (!ivHex) return "";
    const iv = Buffer.from(ivHex, "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  } catch (error) {
    console.error("Failed to decrypt token:", error);
    return "";
  }
}

export async function createSession(adminId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const sessionData = JSON.stringify({ userId: adminId, expires: expiresAt.getTime() });
  const encryptedSession = encrypt(sessionData);

  const cookieStore = await cookies();
  cookieStore.set("admin_session", encryptedSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getSession(): Promise<{ userId: string } | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");
    if (!sessionCookie) return null;

    const decrypted = decrypt(sessionCookie.value);
    if (!decrypted) return null;

    const session = JSON.parse(decrypted);
    if (session.expires < Date.now()) {
      return null;
    }

    return { userId: session.userId };
  } catch (error) {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

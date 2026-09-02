/**
 * Lightweight, self-hosted CAPTCHA.
 * A signed arithmetic challenge — no third-party keys required.
 */

const TTL_MS = 10 * 60 * 1000; // challenge valid for 10 minutes

function secret() {
  return (
    process.env["CAPTCHA_SECRET"] ??
    process.env["LOVABLE_API_KEY"] ??
    "portfolio-captcha-fallback-secret"
  );
}

async function sign(payload: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function createChallenge() {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const answer = a + b;
  const expires = Date.now() + TTL_MS;
  const payload = `${answer}.${expires}`;
  const token = `${payload}.${await sign(payload)}`;
  return { question: `What is ${a} + ${b}?`, token };
}

export async function verifyChallenge(token: string, answer: string) {
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expected, expires, signature] = parts;
  if (!expected || !expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  if ((await sign(`${expected}.${expires}`)) !== signature) return false;
  return answer.trim() === expected;
}

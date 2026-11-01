/**
 * Gate auth: one shared password, a signed session cookie, no database.
 *
 * Secrets come from the Cloudflare Worker environment (never from the repo):
 *   GATE_PASSWORD   the password you type at the gate
 *   SESSION_SECRET  long random string used to sign the session cookie (32+ chars)
 *
 * The gate fails closed: if either secret is missing or too short, nobody gets in.
 */

export const GATE_COOKIE = 'dtf_gate';
export const SESSION_SECONDS = 60 * 60 * 8; // 8 hours
const MIN_SECRET_LENGTH = 32;

const enc = new TextEncoder();
const dec = new TextDecoder();

export interface GateConfig {
  password: string;
  secret: string;
}

/** Reads the secrets from the Worker env. Returns null when the gate is not configured. */
export function getGateConfig(locals: unknown): GateConfig | null {
  const env = (locals as { runtime?: { env?: Record<string, unknown> } })?.runtime?.env;
  const password = env?.GATE_PASSWORD;
  const secret = env?.SESSION_SECRET;
  if (typeof password !== 'string' || password.length === 0) return null;
  if (typeof secret !== 'string' || secret.length < MIN_SECRET_LENGTH) return null;
  return { password, secret };
}

function toB64url(bytes: Uint8Array): string {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array<ArrayBuffer> {
  const pad = '='.repeat((4 - (s.length % 4)) % 4);
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ]);
}

/**
 * Constant-time password check. Both values are HMACed with the secret, and the comparison is done
 * by WebCrypto's verify(), so response time does not leak how much of a guess was correct.
 */
export async function checkPassword(input: string, config: GateConfig): Promise<boolean> {
  const key = await hmacKey(`pw:${config.secret}`);
  const expected = await crypto.subtle.sign('HMAC', key, enc.encode(config.password));
  return crypto.subtle.verify('HMAC', key, expected, enc.encode(input));
}

/** Creates a signed session token: base64url(payload).base64url(signature). */
export async function createSession(config: GateConfig, now = Date.now()): Promise<string> {
  const payload = JSON.stringify({
    exp: now + SESSION_SECONDS * 1000,
    n: toB64url(crypto.getRandomValues(new Uint8Array(12))),
  });
  const body = toB64url(enc.encode(payload));
  const key = await hmacKey(`session:${config.secret}`);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(body)));
  return `${body}.${toB64url(sig)}`;
}

/** True only for a token we signed, that has not expired, and has not been altered. */
export async function verifySession(
  token: string | undefined,
  config: GateConfig,
  now = Date.now(),
): Promise<boolean> {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  try {
    const [body, sig] = parts;
    const key = await hmacKey(`session:${config.secret}`);
    const ok = await crypto.subtle.verify('HMAC', key, fromB64url(sig), enc.encode(body));
    if (!ok) return false;
    const { exp } = JSON.parse(dec.decode(fromB64url(body)));
    return typeof exp === 'number' && exp > now;
  } catch {
    return false;
  }
}

/** Blocks cross-site form posts: the Origin header, when present, must match this site. */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

/** Slows down wrong guesses. Real rate limiting should also be set in Cloudflare (see README). */
export const FAILED_LOGIN_DELAY_MS = 1200;
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

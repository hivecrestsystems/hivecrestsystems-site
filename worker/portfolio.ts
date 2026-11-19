// Portfolio request endpoint (POST /api/portfolio).
//
// Checks a request from the homepage form, confirms the Turnstile token, then emails it
// to the business inbox with Reply-To set to the visitor. Nothing is stored. This module
// has no Workers-only imports, so `npm run test:worker` can run it in Node.

import { PROJECT_TYPES, TURNSTILE_ACTION } from '../src/data/portfolio-form.ts';

export interface Env {
  /** Static site files (dist/). */
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Email Service send binding. Until a sending domain is onboarded it can only reach verified addresses. */
  EMAIL: { send(message: OutgoingEmail): Promise<{ messageId: string }> };
  /** Secret: where requests are emailed. Kept out of this public repository. */
  FORM_TO?: string;
  /** Secret: Turnstile secret key. */
  TURNSTILE_SECRET_KEY?: string;
  /** "production", "dev" or "preview"; anything but production is marked in the subject. */
  SITE_ENV?: string;
  /**
   * Local development only (.dev.vars): Cloudflare's Turnstile test keys report
   * "example.com" and no action. Setting this accepts them. Never set it on a real Worker.
   */
  TURNSTILE_EXPECTED_HOSTNAME?: string;
}

interface Address {
  email: string;
  name: string;
}

export interface OutgoingEmail {
  to: string;
  from: Address;
  replyTo: Address;
  subject: string;
  text: string;
  html: string;
}

export interface PortfolioRequest {
  name: string;
  email: string;
  type: string;
  note: string;
}

const SENDER: Address = { email: 'website@hivecrestsystems.com', name: 'Hivecrest Systems website' };
const MAX_BODY_BYTES = 16_384;
const LIMITS = { name: 100, email: 254, note: 2000, token: 2048 };
const EMAIL_PATTERN = /^[^\s@<>()[\]",;:\\]+@[^\s@<>()[\]",;:\\]+\.[a-z]{2,}$/i;
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type Parsed =
  | { kind: 'ok'; request: PortfolioRequest; token: string }
  | { kind: 'spam' }
  | { kind: 'invalid'; fields: string[] };

/** Single-line text: no control characters, runs of whitespace collapsed. */
function line(value: unknown): string {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim() : '';
}

/** Multi-line text: keeps line breaks and tabs, drops other control characters. */
function block(value: unknown): string {
  return typeof value === 'string'
    ? value.replace(/\r\n?/g, '\n').replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').trim()
    : '';
}

export function parseRequest(body: unknown): Parsed {
  const data = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  // Honeypot: people never see the "website" field, so anything in it came from a bot.
  if (line(data.website) !== '') return { kind: 'spam' };

  const request: PortfolioRequest = {
    name: line(data.name),
    email: line(data.email),
    type: line(data.type),
    note: block(data.note),
  };
  const token = typeof data.token === 'string' ? data.token : '';

  const fields: string[] = [];
  if (!request.name || request.name.length > LIMITS.name) fields.push('name');
  if (request.email.length > LIMITS.email || !EMAIL_PATTERN.test(request.email)) fields.push('email');
  if (!(PROJECT_TYPES as readonly string[]).includes(request.type)) fields.push('type');
  if (request.note.length > LIMITS.note) fields.push('note');
  if (!token || token.length > LIMITS.token) fields.push('token');
  return fields.length ? { kind: 'invalid', fields } : { kind: 'ok', request, token };
}

/**
 * Checks a Turnstile token with Cloudflare. Fails closed on any error. Results from
 * Cloudflare's test keys (which report no action) count only when `allowTestKeys` is
 * set, which happens only in local development.
 */
export async function verifyTurnstile(
  token: string,
  options: {
    secret: string;
    expectedHostname: string;
    remoteip?: string | null;
    allowTestKeys?: boolean;
    fetchImpl?: typeof fetch;
  },
): Promise<boolean> {
  const body = new URLSearchParams({ secret: options.secret, response: token });
  if (options.remoteip) body.set('remoteip', options.remoteip);
  try {
    const response = await (options.fetchImpl ?? fetch)(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
      metadata?: { result_with_testing_key?: boolean };
    };
    if (result.success !== true || result.hostname !== options.expectedHostname) return false;
    if (result.metadata?.result_with_testing_key) return options.allowTestKeys === true;
    return result.action === TURNSTILE_ACTION;
  } catch {
    return false;
  }
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

export function buildEmail(
  request: PortfolioRequest,
  context: { to: string; siteEnv: string; site: string; receivedAt: Date },
): OutgoingEmail {
  const tag = context.siteEnv === 'production' ? '' : `[${context.siteEnv}] `;
  const note = request.note || '(none)';
  const when = context.receivedAt.toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
  const rows: [string, string][] = [
    ['Name', request.name],
    ['Email', request.email],
    ['Planning', request.type],
  ];
  const text = [
    'New portfolio request from the website.',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Note:',
    note,
    '',
    `Sent from ${context.site} on ${when}.`,
    `Reply to this email to answer ${request.name} directly.`,
  ].join('\n');
  const html = [
    '<p>New portfolio request from the website.</p>',
    '<table cellpadding="4">',
    ...rows.map(([label, value]) => `<tr><th align="left">${label}</th><td>${escapeHtml(value)}</td></tr>`),
    '</table>',
    `<p><strong>Note</strong><br>${escapeHtml(note).replace(/\n/g, '<br>')}</p>`,
    `<p style="color:#5F5E5A">Sent from ${escapeHtml(context.site)} on ${when}. Reply to this email to answer ${escapeHtml(request.name)} directly.</p>`,
  ].join('\n');
  return {
    to: context.to,
    from: SENDER,
    replyTo: { email: request.email, name: request.name },
    subject: `${tag}Portfolio request: ${request.type} – ${request.name}`,
    text,
    html,
  };
}

function json(status: number, body: Record<string, unknown>, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });
}

export async function handlePortfolio(
  request: Request,
  env: Env,
  deps: { fetchImpl?: typeof fetch; now?: () => Date } = {},
): Promise<Response> {
  if (request.method !== 'POST') return json(405, { ok: false, error: 'method' }, { Allow: 'POST' });

  // Only the site's own pages may post here.
  const url = new URL(request.url);
  if (request.headers.get('Origin') !== url.origin) return json(403, { ok: false, error: 'origin' });
  if (!(request.headers.get('Content-Type') ?? '').startsWith('application/json')) {
    return json(415, { ok: false, error: 'content-type' });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'too-large' });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'invalid', fields: [] });
  }

  const parsed = parseRequest(body);
  // Bots get the same answer as people, so they can't tell they were caught.
  if (parsed.kind === 'spam') return json(200, { ok: true });
  if (parsed.kind === 'invalid') return json(400, { ok: false, error: 'invalid', fields: parsed.fields });

  if (!env.TURNSTILE_SECRET_KEY || !env.FORM_TO) {
    console.error('portfolio: FORM_TO or TURNSTILE_SECRET_KEY is not set');
    return json(500, { ok: false, error: 'config' });
  }
  const human = await verifyTurnstile(parsed.token, {
    secret: env.TURNSTILE_SECRET_KEY,
    expectedHostname: env.TURNSTILE_EXPECTED_HOSTNAME || url.hostname,
    allowTestKeys: Boolean(env.TURNSTILE_EXPECTED_HOSTNAME),
    remoteip: request.headers.get('CF-Connecting-IP'),
    fetchImpl: deps.fetchImpl,
  });
  if (!human) return json(403, { ok: false, error: 'verification' });

  const email = buildEmail(parsed.request, {
    to: env.FORM_TO,
    siteEnv: env.SITE_ENV || 'production',
    site: url.origin,
    receivedAt: (deps.now ?? (() => new Date()))(),
  });
  try {
    await env.EMAIL.send(email);
  } catch (error) {
    // Log the error code only: the request itself holds personal details.
    console.error('portfolio: send failed', (error as { code?: string }).code ?? 'unknown');
    return json(502, { ok: false, error: 'send' });
  }
  return json(200, { ok: true });
}

// Tests for the portfolio request endpoint. Run with `npm run test:worker` (Node's own
// test runner; no Cloudflare runtime needed).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { handlePortfolio, type Env, type OutgoingEmail } from './portfolio.ts';

const ORIGIN = 'https://dev.hivecrestsystems.com';
const VALID = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  type: 'A new website or redesign',
  note: 'We need a new site.\nBy spring.',
  website: '',
  token: 'turnstile-token',
};

function setup(overrides: Partial<Env> = {}, siteverify: Record<string, unknown> | 'error' = {}) {
  const sent: OutgoingEmail[] = [];
  const verifyCalls: URLSearchParams[] = [];
  const env: Env = {
    ASSETS: { fetch: async () => new Response('asset') },
    EMAIL: {
      async send(message) {
        sent.push(message);
        return { messageId: 'm1' };
      },
    },
    FORM_TO: 'owner@example.com',
    TURNSTILE_SECRET_KEY: 'secret',
    SITE_ENV: 'dev',
    ...overrides,
  };
  const fetchImpl = (async (_url: string, init: RequestInit) => {
    verifyCalls.push(init.body as URLSearchParams);
    if (siteverify === 'error') throw new Error('network');
    return Response.json({ success: true, action: 'portfolio', hostname: 'dev.hivecrestsystems.com', ...siteverify });
  }) as unknown as typeof fetch;
  const post = (body: unknown, headers: Record<string, string> = {}) =>
    handlePortfolio(
      new Request(`${ORIGIN}/api/portfolio`, {
        method: 'POST',
        headers: { Origin: ORIGIN, 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.9', ...headers },
        body: typeof body === 'string' ? body : JSON.stringify(body),
      }),
      env,
      { fetchImpl, now: () => new Date('2026-11-19T03:04:05Z') },
    );
  return { env, sent, verifyCalls, post };
}

test('a valid request is checked with Turnstile and emailed to the business inbox', async () => {
  const { sent, verifyCalls, post } = setup();
  const response = await post(VALID);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });

  assert.equal(verifyCalls.length, 1);
  assert.equal(verifyCalls[0].get('secret'), 'secret');
  assert.equal(verifyCalls[0].get('response'), 'turnstile-token');
  assert.equal(verifyCalls[0].get('remoteip'), '203.0.113.9');

  assert.equal(sent.length, 1);
  const [email] = sent;
  assert.equal(email.to, 'owner@example.com');
  assert.equal(email.from.email, 'website@hivecrestsystems.com');
  assert.deepEqual(email.replyTo, { email: 'ada@example.com', name: 'Ada Lovelace' });
  assert.equal(email.subject, '[dev] Portfolio request: A new website or redesign – Ada Lovelace');
  assert.match(email.text, /Name: Ada Lovelace\nEmail: ada@example.com\nPlanning: A new website or redesign/);
  assert.match(email.text, /We need a new site.\nBy spring./);
  assert.match(email.text, /Sent from https:\/\/dev.hivecrestsystems.com on 2026-11-19 03:04 UTC/);
  assert.match(email.html, /We need a new site.<br>By spring./);
});

test('production requests have no tag in the subject', async () => {
  const { sent, post } = setup({ SITE_ENV: 'production' });
  await post(VALID);
  assert.equal(sent[0].subject, 'Portfolio request: A new website or redesign – Ada Lovelace');
});

test('the email escapes HTML and keeps header fields on one line', async () => {
  const { sent, post } = setup();
  await post({ ...VALID, name: '<b>Eve</b>\r\nBcc: x@example.com', note: '<script>alert(1)</script>' });
  const [email] = sent;
  assert.equal(email.replyTo.name, '<b>Eve</b> Bcc: x@example.com');
  assert.doesNotMatch(email.subject, /[\r\n]/);
  assert.doesNotMatch(email.html, /<script>|<b>Eve/);
  assert.match(email.html, /&lt;script&gt;/);
});

test('a filled-in honeypot looks like success but sends nothing', async () => {
  const { sent, verifyCalls, post } = setup();
  const response = await post({ ...VALID, website: 'https://spam.example' });
  assert.equal(response.status, 200);
  assert.equal(sent.length, 0);
  assert.equal(verifyCalls.length, 0);
});

test('invalid fields are rejected without checking Turnstile or sending', async () => {
  const cases: [Record<string, unknown>, string[]][] = [
    [{ ...VALID, name: '   ' }, ['name']],
    [{ ...VALID, name: 'x'.repeat(101) }, ['name']],
    [{ ...VALID, email: 'not-an-email' }, ['email']],
    [{ ...VALID, email: 'a@b.c\nBcc: x@y.z' }, ['email']],
    [{ ...VALID, type: 'Free money' }, ['type']],
    [{ ...VALID, note: 'x'.repeat(2001) }, ['note']],
    [{ ...VALID, token: '' }, ['token']],
    [{}, ['name', 'email', 'type', 'token']],
  ];
  for (const [body, fields] of cases) {
    const { sent, verifyCalls, post } = setup();
    const response = await post(body);
    assert.equal(response.status, 400, JSON.stringify(body).slice(0, 60));
    assert.deepEqual((await response.json()).fields, fields);
    assert.equal(sent.length, 0);
    assert.equal(verifyCalls.length, 0);
  }
});

test('a failed or mismatched Turnstile check is refused', async () => {
  for (const verdict of [
    { success: false },
    { action: 'login' },
    { hostname: 'evil.example' },
    'error' as const,
  ]) {
    const { sent, post } = setup({}, verdict);
    const response = await post(VALID);
    assert.equal(response.status, 403, JSON.stringify(verdict));
    assert.equal(sent.length, 0);
  }
});

test("Cloudflare's Turnstile test keys only work with the local-development setting", async () => {
  const testKeyResult = { hostname: 'example.com', action: undefined, metadata: { result_with_testing_key: true } };
  const deployed = setup({}, testKeyResult);
  assert.equal((await deployed.post(VALID)).status, 403);
  assert.equal(deployed.sent.length, 0);

  const local = setup({ TURNSTILE_EXPECTED_HOSTNAME: 'example.com' }, testKeyResult);
  assert.equal((await local.post(VALID)).status, 200);
  assert.equal(local.sent.length, 1);
});

test('requests from other sites, non-JSON bodies and other methods are refused', async () => {
  const { sent, post, env } = setup();
  assert.equal((await post(VALID, { Origin: 'https://evil.example' })).status, 403);
  assert.equal((await post(VALID, { Origin: '' })).status, 403);
  assert.equal((await post('name=Ada', { 'Content-Type': 'application/x-www-form-urlencoded' })).status, 415);
  assert.equal((await post('{not json')).status, 400);
  assert.equal((await post({ ...VALID, note: 'x'.repeat(20_000) })).status, 413);
  const get = await handlePortfolio(new Request(`${ORIGIN}/api/portfolio`), env);
  assert.equal(get.status, 405);
  assert.equal(get.headers.get('Allow'), 'POST');
  assert.equal(sent.length, 0);
});

test('missing secrets and failed sends are reported as errors', async () => {
  // These paths log on purpose; keep the test output clean.
  const original = console.error;
  console.error = () => {};
  try {
    assert.equal((await setup({ FORM_TO: '' }).post(VALID)).status, 500);
    assert.equal((await setup({ TURNSTILE_SECRET_KEY: undefined }).post(VALID)).status, 500);

    const failing = setup({
      EMAIL: {
        async send() {
          throw Object.assign(new Error('nope'), { code: 'E_RECIPIENT_NOT_ALLOWED' });
        },
      },
    });
    const response = await failing.post(VALID);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false, error: 'send' });
  } finally {
    console.error = original;
  }
});

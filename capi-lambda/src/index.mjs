// Meta Conversions API relay + first-party A/B event log.
//
// A single-purpose AWS Lambda behind a public Function URL. The static landing
// page POSTs here for two things:
//   1. Buy clicks (`type:'initiate_checkout'`, or no type for old clients) —
//      forwarded to Meta's Conversions API server-side so the event survives ad
//      blockers / iOS / ITP / the redirect race; deduped with the browser pixel
//      via a shared `event_id`.
//   2. Experiment exposures (`type:'exposure'`) — NOT sent to Meta, only logged.
//
// Every event is also logged to a DynamoDB table (`DDB_TABLE`) so BookManager
// can build a per-variant conversion funnel (unique visitors → buy clicks).
// The DynamoDB write is best-effort and never blocks/breaks the Meta forward.
//
// Secrets (FB_ACCESS_TOKEN) come from Lambda env vars, never the client. CORS is
// owned entirely by the Function URL Cors config (see template.yaml) — this code
// must not emit Access-Control-Allow-Origin (double ACAO breaks browsers).

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutItemCommand } from '@aws-sdk/client-dynamodb';

const GRAPH_VERSION = 'v21.0';

const PIXEL_ID = process.env.PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.TEST_EVENT_CODE || '';
const DDB_TABLE = process.env.DDB_TABLE || '';

// Reused across warm invocations. Region comes from the Lambda runtime env.
const ddb = DDB_TABLE ? new DynamoDBClient({}) : null;

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const TTL_DAYS = 60;

/**
 * Best-effort append to the A/B event log. One item per (experiment, date,
 * variant, dedupe-key). Exposures are keyed by external_id so repeat visits in
 * a day collapse to one item → BookManager counts items = unique visitors.
 * Conversions are keyed by event_id (one row per buy click).
 */
async function logAbEvent({ type, experiment, variant, externalId, eventId, sourceUrl }) {
  if (!ddb || !experiment || !variant) return;
  const now = new Date();
  const date = now.toISOString().slice(0, 10); // YYYY-MM-DD (UTC)
  const dedupe =
    type === 'exposure'
      ? externalId || `anon-${now.getTime()}-${Math.random().toString(16).slice(2)}`
      : eventId || `${now.getTime()}-${Math.random().toString(16).slice(2)}`;
  const shortType = type === 'exposure' ? 'exp' : 'ic';
  const item = {
    pk: { S: `${experiment}#${date}` },
    sk: { S: `${variant}#${shortType}#${dedupe}` },
    experiment: { S: experiment },
    variant: { S: variant },
    type: { S: type },
    date: { S: date },
    ts: { N: String(now.getTime()) },
    expires_at: { N: String(Math.floor(now.getTime() / 1000) + TTL_DAYS * 86400) },
  };
  if (externalId) item.external_id = { S: String(externalId) };
  if (sourceUrl) item.event_source_url = { S: String(sourceUrl) };
  try {
    await ddb.send(new PutItemCommand({ TableName: DDB_TABLE, Item: item }));
  } catch (err) {
    console.error('DDB log failed', err?.name || err);
  }
}

export const handler = async (event) => {
  const method =
    event?.requestContext?.http?.method || event?.httpMethod || 'POST';

  // Preflight is normally answered by the Function URL Cors layer before we run.
  if (method === 'OPTIONS') return { statusCode: 204, body: '' };
  if (method !== 'POST') return json(405, { error: 'method_not_allowed' });

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  const type = payload.type || 'initiate_checkout';
  const experiment = payload.experiment ? String(payload.experiment) : '';
  const variant = payload.variant ? String(payload.variant) : '';
  const externalId = payload.external_id ? String(payload.external_id) : '';

  // --- Exposure: log only, never forward to Meta. ---
  if (type === 'exposure') {
    await logAbEvent({ type, experiment, variant, externalId, sourceUrl: payload.event_source_url });
    return json(200, { ok: true, logged: true });
  }

  // --- Conversion (InitiateCheckout): log + forward to Meta. ---
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing PIXEL_ID or FB_ACCESS_TOKEN env var');
    return json(500, { error: 'server_misconfigured' });
  }

  // Log first-party (best-effort) so the funnel has this conversion even if Meta
  // is slow/erroring.
  await logAbEvent({
    type: 'initiate_checkout',
    experiment,
    variant,
    externalId,
    eventId: payload.event_id,
    sourceUrl: payload.event_source_url,
  });

  // Real end-user IP + UA come from the browser's direct call to this URL.
  const headers = event.headers || {};
  const ip =
    event?.requestContext?.http?.sourceIp ||
    (headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    undefined;
  const userAgent = headers['user-agent'] || headers['User-Agent'] || undefined;

  const user_data = {};
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;
  if (payload.fbp) user_data.fbp = payload.fbp;
  if (payload.fbc) user_data.fbc = payload.fbc;
  if (payload.external_id) user_data.external_id = String(payload.external_id);

  const serverEvent = {
    event_name: 'InitiateCheckout',
    event_time: Math.floor(Date.now() / 1000),
    event_id: payload.event_id, // shared with the browser pixel → dedup
    action_source: 'website',
    event_source_url: payload.event_source_url,
    user_data,
    custom_data: payload.custom_data || {},
  };

  const body = { data: [serverEvent] };
  if (TEST_EVENT_CODE) body.test_event_code = TEST_EVENT_CODE;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(
    ACCESS_TOKEN,
  )}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('Meta CAPI error', res.status, JSON.stringify(data));
      return json(502, { error: 'capi_error', status: res.status });
    }
    return json(200, { ok: true, events_received: data.events_received ?? 1 });
  } catch (err) {
    console.error('CAPI request failed', err);
    return json(502, { error: 'capi_request_failed' });
  }
};

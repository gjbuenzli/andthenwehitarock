// Meta Conversions API relay — a single-purpose AWS Lambda behind a public
// Function URL. The static landing page (GitHub Pages, no backend of its own)
// POSTs an InitiateCheckout here on every buy-button click; we forward it to
// Meta server-side so the event survives ad blockers / iOS / ITP / the redirect
// race that drops the browser pixel. The browser and this server event share an
// `event_id`, so Meta deduplicates them (no double counting).
//
// Secrets (FB_ACCESS_TOKEN especially) come from Lambda env vars set at deploy,
// never from the client. No dependencies — Node 20's global fetch + crypto.

const GRAPH_VERSION = 'v21.0';

const PIXEL_ID = process.env.PIXEL_ID;
const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
// Optional: paste a code from Events Manager → Test Events to see events land
// in the test view without affecting live optimization. Leave unset in prod.
const TEST_EVENT_CODE = process.env.TEST_EVENT_CODE || '';
// The site origin allowed to call this endpoint (CORS). '*' as a fallback.
const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOW_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

const json = (status, body) => ({
  statusCode: status,
  headers: { 'Content-Type': 'application/json', ...corsHeaders },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  const method =
    event?.requestContext?.http?.method || event?.httpMethod || 'POST';

  // CORS preflight
  if (method === 'OPTIONS') return { statusCode: 204, headers: corsHeaders, body: '' };
  if (method !== 'POST') return json(405, { error: 'method_not_allowed' });

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing PIXEL_ID or FB_ACCESS_TOKEN env var');
    return json(500, { error: 'server_misconfigured' });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Real end-user IP + UA come from the browser's direct call to this URL.
  const headers = event.headers || {};
  const ip =
    event?.requestContext?.http?.sourceIp ||
    (headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    undefined;
  const userAgent = headers['user-agent'] || headers['User-Agent'] || undefined;

  // Build the user_data block. fbp/fbc/ip/ua are NOT hashed per Meta's spec;
  // we collect no email/phone, so there's nothing to SHA-256 here.
  const user_data = {};
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;
  if (payload.fbp) user_data.fbp = payload.fbp;
  if (payload.fbc) user_data.fbc = payload.fbc;

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

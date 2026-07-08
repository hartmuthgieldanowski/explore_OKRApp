import { validateCompleteRequest, runComplete } from './_lib/anthropic.js';

// Vercel serverless function — mirrors server/index.js's POST /api/complete
// so the same client code works locally (via the Express dev server) and
// in production (via this function), without exposing the API key to the browser.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const validated = validateCompleteRequest(req.body);
  if (validated.error) {
    res.status(400).json({ error: validated.error });
    return;
  }

  try {
    const text = await runComplete(validated);
    res.status(200).json({ text });
  } catch (err) {
    console.error('[api/complete] Anthropic request failed:', err?.message || err);
    res.status(502).json({ error: 'Die KI ist gerade nicht erreichbar.' });
  }
}

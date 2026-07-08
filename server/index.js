import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateCompleteRequest, runComplete } from '../api/_lib/anthropic.js';

const PORT = process.env.PORT || 3001;

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('[server] ANTHROPIC_API_KEY is not set — AI requests will fail. Copy server/.env.example to server/.env and add your key.');
}

const app = express();

app.use(cors());
app.use(express.json({ limit: '256kb' }));
app.use(
  rateLimit({
    windowMs: 60_000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Mirrors the design prototype's window.claude.complete({ system, messages, max_tokens })
// so the client can stay simple. Keeps the API key server-side only.
// Shares its logic with api/complete.js (the Vercel serverless equivalent) via api/_lib/anthropic.js.
app.post('/api/complete', async (req, res) => {
  const validated = validateCompleteRequest(req.body);
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }
  try {
    const text = await runComplete(validated);
    res.json({ text });
  } catch (err) {
    console.error('[server] Anthropic request failed:', err?.message || err);
    res.status(502).json({ error: 'Die KI ist gerade nicht erreichbar.' });
  }
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

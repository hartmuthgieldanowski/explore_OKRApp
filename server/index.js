import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateCompleteRequest, runComplete } from '../api/_lib/anthropic.js';
import {
  verifyGoogleIdToken,
  signSession,
  verifySession,
  readSessionCookie,
  buildSessionCookie,
  buildClearedCookie,
} from '../api/_lib/auth.js';

const PORT = process.env.PORT || 3001;

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn('[server] ANTHROPIC_API_KEY is not set — AI requests will fail. Copy server/.env.example to server/.env and add your key.');
}
if (!process.env.GOOGLE_CLIENT_ID || !process.env.SESSION_SECRET) {
  console.warn('[server] GOOGLE_CLIENT_ID / SESSION_SECRET are not set — Google sign-in will fail.');
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

// Mirrors api/auth/{google,me,logout}.js (the Vercel serverless equivalents)
// via api/_lib/auth.js, same pattern as the /api/complete proxy above.
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body || {};
  if (typeof credential !== 'string' || !credential) {
    return res.status(400).json({ error: 'credential is required' });
  }
  try {
    const user = await verifyGoogleIdToken(credential);
    const session = signSession(user);
    res.setHeader('Set-Cookie', buildSessionCookie(session));
    res.json({ user });
  } catch (err) {
    console.error('[server] Google verification failed:', err?.message || err);
    res.status(401).json({ error: 'Google-Anmeldung fehlgeschlagen.' });
  }
});

app.get('/api/auth/me', (req, res) => {
  const token = readSessionCookie(req.headers.cookie);
  const user = token && verifySession(token);
  if (!user) return res.status(401).json({ error: 'Not signed in' });
  res.json({ user });
});

app.post('/api/auth/logout', (_req, res) => {
  res.setHeader('Set-Cookie', buildClearedCookie());
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});

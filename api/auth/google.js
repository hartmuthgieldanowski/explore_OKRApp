import { verifyGoogleIdToken, signSession, buildSessionCookie } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { credential } = req.body || {};
  if (typeof credential !== 'string' || !credential) {
    res.status(400).json({ error: 'credential is required' });
    return;
  }

  try {
    const user = await verifyGoogleIdToken(credential);
    const session = signSession(user);
    res.setHeader('Set-Cookie', buildSessionCookie(session));
    res.status(200).json({ user });
  } catch (err) {
    console.error('[api/auth/google] verification failed:', err?.message || err);
    res.status(401).json({ error: 'Google-Anmeldung fehlgeschlagen.' });
  }
}

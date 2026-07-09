import { readSessionCookie, verifySession } from '../_lib/auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const token = readSessionCookie(req.headers.cookie);
  const user = token && verifySession(token);
  if (!user) {
    res.status(401).json({ error: 'Not signed in' });
    return;
  }
  res.status(200).json({ user });
}

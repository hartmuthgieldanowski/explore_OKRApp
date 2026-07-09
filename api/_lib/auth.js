import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

export const SESSION_COOKIE = 'wwpk_session';
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 30; // 30 days

let googleClient;
function getGoogleClient() {
  if (!googleClient) googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  return googleClient;
}

// Verifies the ID token's signature, audience, and issuer against Google's
// public keys — no client secret needed for this (identity-only) flow.
export async function verifyGoogleIdToken(idToken) {
  const ticket = await getGoogleClient().verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload || !payload.sub) throw new Error('Invalid Google token payload');
  return {
    id: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture,
  };
}

// Our own long-lived session, independent of the ~1h Google ID token lifetime.
export function signSession(user) {
  if (!process.env.SESSION_SECRET) throw new Error('SESSION_SECRET is not set');
  return jwt.sign(
    { uid: user.id, email: user.email, name: user.name, picture: user.picture },
    process.env.SESSION_SECRET,
    { expiresIn: SESSION_MAX_AGE_SEC }
  );
}

export function verifySession(token) {
  try {
    const payload = jwt.verify(token, process.env.SESSION_SECRET);
    return { id: payload.uid, email: payload.email, name: payload.name, picture: payload.picture };
  } catch (e) {
    return null;
  }
}

export function readSessionCookie(cookieHeader) {
  const cookies = parse(cookieHeader || '');
  return cookies[SESSION_COOKIE] || null;
}

export function buildSessionCookie(token) {
  return serialize(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
  });
}

export function buildClearedCookie() {
  return serialize(SESSION_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}

export async function fetchMe() {
  const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user || null;
}

export async function signInWithGoogle(credential) {
  const res = await fetch('/api/auth/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    body: JSON.stringify({ credential }),
  });
  if (!res.ok) throw new Error('Google sign-in failed');
  const data = await res.json();
  return data.user;
}

export async function signOut() {
  await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
}

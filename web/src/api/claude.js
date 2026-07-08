export async function complete({ system, messages, max_tokens }) {
  const res = await fetch('/api/complete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ system, messages, max_tokens }),
  });
  if (!res.ok) {
    throw new Error('AI request failed');
  }
  const data = await res.json();
  return data.text || '';
}

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-4-8';
const MAX_TOKENS_CAP = 2000;

let client;
function getClient() {
  if (!client) client = new Anthropic();
  return client;
}

export function validateCompleteRequest(body) {
  const { system, messages, max_tokens } = body || {};

  if (typeof system !== 'string' || !system.trim()) {
    return { error: 'system is required' };
  }
  if (!Array.isArray(messages) || !messages.length) {
    return { error: 'messages is required' };
  }
  const cleanMessages = messages
    .filter((m) => m && typeof m.content === 'string' && (m.role === 'user' || m.role === 'assistant'))
    .map((m) => ({ role: m.role, content: m.content }));
  if (!cleanMessages.length) {
    return { error: 'messages must contain at least one valid entry' };
  }

  return {
    system,
    messages: cleanMessages,
    max_tokens: Math.min(Number(max_tokens) || 1000, MAX_TOKENS_CAP),
  };
}

export async function runComplete({ system, messages, max_tokens }) {
  const response = await getClient().messages.create({
    model: MODEL,
    max_tokens,
    system,
    messages,
  });
  return response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');
}

// Telegram sender (server-only).
//
// Sends a message to the shop owner's own Telegram chat (a single configured
// CHAT_ID) as a notification — this is a personal demo, not a way to deliver
// codes to arbitrary customers.

import { getTelegramConfig } from '@/lib/env';

export async function sendTelegram(text: string): Promise<unknown> {
  const { botToken, chatId } = getTelegramConfig();
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  const data = (await res.json()) as { ok: boolean; description?: string };
  if (!data.ok) throw new Error('Telegram error: ' + (data.description || 'unknown'));
  return data;
}

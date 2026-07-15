// Centralized environment access (server-side only).
// Read env vars ONLY through this module — never scatter process.env in code.

export function getTelegramConfig(): { botToken: string; chatId: string } {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    throw new Error(
      'Telegram is not configured. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in the .env file.'
    );
  }
  return { botToken, chatId };
}

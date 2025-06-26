import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: NextRequest) {
  const { message, to } = await req.json();

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const recipient = to || process.env.RECIPIENT_PHONE_NUMBER;
  if (!recipient) {
    return NextResponse.json({ success: false, error: 'No recipient phone number provided or set in RECIPIENT_PHONE_NUMBER env var.' }, { status: 400 });
  }
  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipient,
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
} 
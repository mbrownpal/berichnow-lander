import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const kitApiKey = process.env.KIT_API_KEY;
    if (!kitApiKey) {
      console.error('KIT_API_KEY not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Subscribe to Kit
    const response = await fetch('https://api.convertkit.com/v3/forms/7534577/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: kitApiKey,
        email: email,
        tags: [7719949], // "Be Rich Now Landing" tag
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Kit API error:', response.status, errorText);
      return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

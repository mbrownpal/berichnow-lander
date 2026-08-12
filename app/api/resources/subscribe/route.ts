import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30; // seconds

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const KIT_API_KEY = process.env.KIT_API_KEY;
    if (!KIT_API_KEY) {
      console.error('[Resources] KIT_API_KEY not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Add subscriber with custom field for automation
    const kitResponse = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'X-Kit-Api-Key': KIT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        fields: {
          rh_source: 'book-resources',
        },
      }),
    });

    if (!kitResponse.ok) {
      const errorData = await kitResponse.json();
      console.error('[Resources] Kit API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    const kitData = await kitResponse.json();
    console.log('[Resources] Successfully added subscriber:', email, 'with source: book-resources');

    return NextResponse.json({ success: true, subscriber: kitData });
  } catch (error) {
    console.error('[Resources] Subscribe error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

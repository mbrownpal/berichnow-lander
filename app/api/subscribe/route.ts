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
      console.error('[Homepage] KIT_API_KEY not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Create subscriber with custom field for tracking
    const kitResponse = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: {
        'X-Kit-Api-Key': KIT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        fields: {
          rh_source: 'homepage-chapter-one',
        },
      }),
    });

    if (!kitResponse.ok) {
      const errorData = await kitResponse.json();
      console.error('[Homepage] Kit API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again.' },
        { status: 500 }
      );
    }

    const kitData = await kitResponse.json();
    console.log('[Homepage] Successfully added subscriber:', email);

    // Add "Free Chapter" tag (ID: 22420114)
    // This triggers the Visual Automation you configured in Kit
    const tagResponse = await fetch('https://api.kit.com/v4/tags/22420114/subscribers', {
      method: 'POST',
      headers: {
        'X-Kit-Api-Key': KIT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
      }),
    });

    if (tagResponse.ok) {
      console.log('[Homepage] Successfully added "Free Chapter" tag');
    } else {
      const tagError = await tagResponse.json();
      console.error('[Homepage] Failed to add tag:', tagError);
    }

    return NextResponse.json({ success: true, subscriber: kitData });
  } catch (error) {
    console.error('[Homepage] Subscribe error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

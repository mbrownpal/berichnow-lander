// Generic subscribe route for standalone lead magnets. Mirrors app/api/plan/subscribe/route.ts
// (Kit v4 API + tag, no Resend). Delivery email 1 is sent by a Kit automation on the magnet's tag.
// Do not point /plan or /resources at this route.
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const MAGNETS: Record<string, { tagEnv: string; rhSource: string; label: string }> = {
  'money-stories': {
    tagEnv: 'KIT_TAG_MONEY_STORIES',
    rhSource: 'money-stories',
    label: 'MoneyStories',
  },
  'escape-velocity': {
    tagEnv: 'KIT_TAG_ESCAPE_VELOCITY',
    rhSource: 'escape-velocity',
    label: 'EscapeVelocity',
  },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email;
    const magnet = body?.magnet;
    const config = typeof magnet === 'string' ? MAGNETS[magnet] : undefined;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    if (!config) {
      return NextResponse.json({ error: 'Unknown magnet' }, { status: 400 });
    }

    const KIT_API_KEY = process.env.KIT_API_KEY;
    if (!KIT_API_KEY) return NextResponse.json({ error: 'API key not configured' }, { status: 500 });

    const kitRes = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: { 'X-Kit-Api-Key': KIT_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: email,
        fields: { rh_source: config.rhSource },
      }),
    });
    if (!kitRes.ok) {
      console.error(`[${config.label}] Kit API error:`, await kitRes.text());
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }
    const subscriberId = (await kitRes.json()).subscriber?.id;

    // Kit ignores tags on create, so tag in a second call. The delivery automation triggers on this tag.
    const tagId = Number(process.env[config.tagEnv] ?? '');
    if (subscriberId && tagId) {
      const tagRes = await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers/${subscriberId}`, {
        method: 'POST',
        headers: { 'X-Kit-Api-Key': KIT_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!tagRes.ok) console.error(`[${config.label}] Kit tagging error:`, tagRes.status, await tagRes.text());
    } else if (subscriberId && !tagId) {
      console.warn(`[${config.label}] ${config.tagEnv} is not set; subscriber created without a tag`);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Magnet] Subscribe error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

// Mirrors app/api/resources/subscribe/route.ts (Kit v4 API + tag), minus the Resend email. The Kit welcome sequence is delivered by a Kit automation on this tag.
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30;

const TAG_ID = Number(process.env.KIT_TAG_ANNUAL_PLANNING_STACK ?? 26461992); // AnnualPlanningStack tag, created in Kit Nov 26, 2026

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    const KIT_API_KEY = process.env.KIT_API_KEY;
    if (!KIT_API_KEY) return NextResponse.json({ error: 'API key not configured' }, { status: 500 });

    const kitRes = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers: { 'X-Kit-Api-Key': KIT_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: email,
        fields: { rh_source: 'annual-planning' },
      }),
    });
    if (!kitRes.ok) {
      console.error('[Plan] Kit API error:', await kitRes.text());
      return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 });
    }
    const subscriberId = (await kitRes.json()).subscriber?.id;

    // Kit ignores tags on create, so tag in a second call. The Annual Planning Stack automation in Kit triggers on this tag.
    if (subscriberId && TAG_ID) {
      const tagRes = await fetch(`https://api.kit.com/v4/tags/${TAG_ID}/subscribers/${subscriberId}`, {
        method: 'POST',
        headers: { 'X-Kit-Api-Key': KIT_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!tagRes.ok) console.error('[Plan] Kit tagging error:', tagRes.status, await tagRes.text());
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Plan] Subscribe error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const maxDuration = 30; // seconds

const KIT_API_KEY = process.env.KIT_API_KEY;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    if (!KIT_API_KEY) {
      console.error('[Homepage] KIT_API_KEY not configured');
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // 1. Create subscriber in Kit (for main list management)
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
    const subscriberId = kitData.subscriber?.id;
    console.log('[Homepage] Kit subscriber created:', email, 'ID:', subscriberId);

    // 1b. Tag the subscriber with 'Free Chapter' tag (ID: 22420114)
    if (subscriberId) {
      try {
        const tagId = 22420114; // 'Free Chapter' tag
        await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers/${subscriberId}`, {
          method: 'POST',
          headers: {
            'X-Kit-Api-Key': KIT_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        console.log('[Homepage] Kit subscriber tagged with: Free Chapter');
      } catch (tagError) {
        console.error('[Homepage] Kit tagging error:', tagError);
        // Non-critical - continue
      }
    }

    // 2. Fire Resend Automation event (triggers 3-email sequence)
    try {
      await resend.events.send({
        event: 'free_chapter_signup',
        email: email,
        payload: {
          source: 'homepage-chapter-one',
          subscribed_at: new Date().toISOString(),
        },
      });
      console.log('[Homepage] Resend automation triggered:', email);
    } catch (resendError) {
      console.error('[Homepage] Resend event error:', resendError);
      // Don't fail the request - subscriber was created
    }

    // 3. Optional: Track in Supabase for analytics
    const now = new Date();
    const { error: supabaseError } = await supabase
      .from('free_chapter_subscribers')
      .upsert({
        email,
        source: 'homepage-chapter-one',
        subscribed_at: now.toISOString(),
      }, {
        onConflict: 'email'
      });

    if (supabaseError) {
      console.error('[Homepage] Supabase error:', supabaseError);
      // Non-critical - continue
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

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

const EMAIL_1_TEMPLATE = {
  subject: 'why I wrote this',
  body: `Hey,

I'm glad you're here. Your copy of chapter one is waiting for you here: 

Open in Browser: https://berichnow.com/resources/chapter-one.html
Download PDF: https://berichnow.com/resources/chapter-one.pdf

WHY I WROTE THIS

This book is the culmination of nearly three years of writing, and almost a decade of deep personal work before that. I burned it down and started again three different times, which is two more than I would recommend to anyone in their right mind.

But the result is the book I wish I had fifteen years ago, when I was just starting my entrepreneurial journey. It's the culmination of everything I learned from making and subsequently losing a fortune, only to make it back again. Beyond that, it contains the stories I've witnessed from thousands of hours of coaching other founders to find their own inner wealth.

I wrote this book because I want to share the lessons I learned the hard way so you don't have to. But mostly I wrote it because I want to share with everyone the truth I discovered along the way:

True wealth is available to you, right now, exactly as you are.

There's a way to help get that message into the hands that need it, and in a few days I'll tell you exactly how. A book like this reaches the right people because someone hands it to them and says, "This made me think of you." That is the part I can't do, and it's yours.

I hope it resonates with you. And if it does, I hope you hand it to someone you care about.

With gratitude,

mb`
};

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
    console.log('[Homepage] Kit subscriber created:', email);

    // 2. Track in Supabase for email sequence
    const now = new Date();
    const { error: supabaseError } = await supabase
      .from('free_chapter_subscribers')
      .upsert({
        email,
        source: 'homepage-chapter-one',
        subscribed_at: now.toISOString(),
        email_1_sent_at: now.toISOString(),
        current_email: 1,
      }, {
        onConflict: 'email'
      });

    if (supabaseError) {
      console.error('[Homepage] Supabase error:', supabaseError);
      // Don't fail the request - Kit subscriber was created successfully
    } else {
      console.log('[Homepage] Supabase tracking added:', email);
    }

    // 3. Send Email 1 immediately via Resend
    try {
      await resend.emails.send({
        from: 'Mike Brown <mike@unbreakablewealth.com>',
        replyTo: 'mike@mbrown.co',
        to: email,
        subject: EMAIL_1_TEMPLATE.subject,
        text: EMAIL_1_TEMPLATE.body,
      });
      console.log('[Homepage] Email 1 sent:', email);
    } catch (emailError) {
      console.error('[Homepage] Email send error:', emailError);
      // Don't fail the request - subscriber was created
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

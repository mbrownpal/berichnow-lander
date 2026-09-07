import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const maxDuration = 30; // seconds

const resend = new Resend(process.env.RESEND_API_KEY);

function generateResourcesEmail(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Be Rich Now Resources</title>
    </head>
    <body style="font-family: Georgia, 'Times New Roman', serif; color: #2a2520; background: #ffffff; line-height: 1.7; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        
        <!-- Header -->
        <div style="text-align: center; padding: 40px 0 60px; border-bottom: 2px solid #B87333; margin-bottom: 48px;">
          <div style="font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 3px; color: #B87333; margin-bottom: 20px; text-transform: uppercase; font-weight: bold;">Be Rich Now</div>
          <h1 style="font-size: 36px; font-weight: 400; margin: 0; color: #2a2520;">Resources</h1>
        </div>
        
        <!-- Intro -->
        <p style="font-size: 19px; line-height: 1.8; color: #655d52; margin-bottom: 40px; text-align: center;">
          Reading the book will change how you think about wealth.<br/>Doing the work will change how you live.
        </p>
        
        <!-- Resources -->
        <div style="margin-bottom: 60px;">
          
          <!-- Resource 1 -->
          <div style="margin-bottom: 48px;">
            <div style="font-family: 'Courier New', monospace; font-size: 14px; letter-spacing: 2px; color: #B87333; margin-bottom: 12px; text-transform: uppercase; font-weight: bold;">01. The Unbreakable Year</div>
            <p style="font-size: 17px; line-height: 1.7; color: #4a4540; margin-bottom: 18px;">
              Map the life you actually want and price it out month by month until you arrive at your Ideal Spend.
            </p>
            <div style="margin-bottom: 8px;">
              <a href="https://berichnow.com/resources/unbreakable-year.html" style="display: inline-block; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #B87333; text-decoration: underline; padding: 8px 0; font-weight: bold;">
                OPEN WORKBOOK →
              </a>
            </div>
            <div>
              <a href="https://berichnow.com/resources/Unbreakable-Year-Workbook.pdf" style="display: inline-block; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #B87333; text-decoration: underline; padding: 8px 0; font-weight: bold;">
                DOWNLOAD PDF
              </a>
            </div>
          </div>
          
          <!-- Resource 2 -->
          <div style="margin-bottom: 48px;">
            <div style="font-family: 'Courier New', monospace; font-size: 14px; letter-spacing: 2px; color: #B87333; margin-bottom: 12px; text-transform: uppercase; font-weight: bold;">02. Money Stories Workbook</div>
            <p style="font-size: 17px; line-height: 1.7; color: #4a4540; margin-bottom: 18px;">
              Surface the inherited scripts running your financial decisions, then name the fear sitting underneath each one.
            </p>
            <div style="margin-bottom: 8px;">
              <a href="https://berichnow.com/resources/money-stories.html" style="display: inline-block; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #B87333; text-decoration: underline; padding: 8px 0; font-weight: bold;">
                OPEN WORKBOOK →
              </a>
            </div>
            <div>
              <a href="https://berichnow.com/resources/Money-Stories-Workbook.pdf" style="display: inline-block; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #B87333; text-decoration: underline; padding: 8px 0; font-weight: bold;">
                DOWNLOAD PDF
              </a>
            </div>
          </div>
          
          <!-- Resource 3 -->
          <div style="margin-bottom: 48px;">
            <div style="font-family: 'Courier New', monospace; font-size: 14px; letter-spacing: 2px; color: #B87333; margin-bottom: 12px; text-transform: uppercase; font-weight: bold;">03. Escape Velocity Wealth Snapshot</div>
            <p style="font-size: 17px; line-height: 1.7; color: #4a4540; margin-bottom: 18px;">
              Calculate the number that makes work optional, along with the timeline to reach it down to the month.
            </p>
            <div>
              <a href="https://berichnow.com/resources/calculator" style="display: inline-block; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #B87333; text-decoration: underline; padding: 8px 0; font-weight: bold;">
                OPEN CALCULATOR →
              </a>
            </div>
          </div>
          
          <!-- Resource 4 -->
          <div style="margin-bottom: 48px;">
            <div style="font-family: 'Courier New', monospace; font-size: 14px; letter-spacing: 2px; color: #B87333; margin-bottom: 12px; text-transform: uppercase; font-weight: bold;">04. The Freedom Audit</div>
            <p style="font-size: 17px; line-height: 1.7; color: #4a4540; margin-bottom: 18px;">
              Score yourself across the five pillars and find out which one is costing you the most right now.
            </p>
            <div>
              <a href="https://freedomaudit.berichnow.com" style="display: inline-block; font-family: 'Courier New', monospace; font-size: 13px; letter-spacing: 1.5px; text-transform: uppercase; color: #B87333; text-decoration: underline; padding: 8px 0; font-weight: bold;">
                TAKE THE AUDIT →
              </a>
            </div>
          </div>
          
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; padding-top: 40px; border-top: 1px solid rgba(184, 115, 51, 0.3); margin-top: 60px;">
          <p style="font-size: 16px; color: #655d52; margin-bottom: 12px; line-height: 1.6;">
            Start with the Unbreakable Year. Everything downstream depends on knowing what your ideal life actually costs.
          </p>
          <p style="font-size: 15px; color: #655d52; margin-top: 24px;">
            — Mike Brown<br/>
            <span style="font-family: 'Courier New', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase;">Be Rich Now</span>
          </p>
          <p style="font-size: 13px; color: #A09B91; margin-top: 32px; line-height: 1.5;">
            It's not you, it's me? No worries - you can <a href="https://8c46a433.unsubscribe.kit-mail3.com/o8ux834vnqaqh60moomhvhqpmwzlpboh97429" style="color: #B87333; text-decoration: underline;">unsubscribe</a>
          </p>
        </div>
        
      </div>
    </body>
    </html>
  `;
}

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

    // Send email via Resend first
    try {
      await resend.emails.send({
        from: 'Be Rich Now <mike@mbrown.co>',
        replyTo: 'mike@mbrown.co',
        to: email,
        subject: 'Your Be Rich Now Resources',
        html: generateResourcesEmail(),
      });
      console.log('[Resources] Email sent successfully via Resend');
    } catch (emailError) {
      console.error('[Resources] Resend email error:', emailError);
      // Don't fail the whole flow if email fails - continue with Kit tagging
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
          rh_source: 'book-resources',
        },
        tags: ['resources'], // Add "resources" tag
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
    console.log('[Resources] Successfully added subscriber with "resources" tag:', email);

    return NextResponse.json({ success: true, subscriber: kitData });
  } catch (error) {
    console.error('[Resources] Subscribe error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

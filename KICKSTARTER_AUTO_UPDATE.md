# Kickstarter Stats Auto-Update (Gmail Method)

## How It Works

**Email arrives:** 10:08 AM Eastern daily from Kickstarter  
**Cron runs:** 10:15 AM Eastern (7 minutes later)  
**Method:** Parse stats from Gmail instead of web scraping

## Cron Job Details

**Schedule:** Every day at 10:15 AM Eastern  
**Job ID:** `a686369c-2c3e-4a4a-9600-3f0c0a6a880e`  
**Job Name:** `kickstarter-gmail-stats`

## What It Does

1. Searches Gmail for today's Kickstarter daily update email:
   - **From:** no-reply@kickstarter.com
   - **Subject:** "Good morning! There's new activity on Be Rich Now"
2. Extracts stats from email:
   - % Funded (e.g., "192%")
   - Backers count (e.g., "66 backers")
   - Days remaining (e.g., "28 days left")
3. Updates: `app/kickstarter-event/KickstarterPage.tsx`
4. Commits and pushes to GitHub if stats changed
5. Vercel auto-deploys the updated page
6. Sends you a confirmation message

## Example Daily Email

```
Subject: Good morning! There's new activity on Be Rich Now: How to Want Everything You Have
From: Kickstarter <no-reply@kickstarter.com>
Time: 10:08 AM Eastern

$38,415 pledged towards $20,000 goal

192%          66            28
funded        backers       days left
```

## Next Run

**First run:** Tomorrow at 10:15 AM EDT  
**Then:** Every morning at 10:15 AM EDT

## Managing the Job

```bash
# List all cron jobs
openclaw cron list

# View this job
openclaw cron list | grep kickstarter

# Disable (pause updates)
openclaw cron disable a686369c-2c3e-4a4a-9600-3f0c0a6a880e

# Re-enable
openclaw cron enable a686369c-2c3e-4a4a-9600-3f0c0a6a880e

# Remove completely
openclaw cron remove a686369c-2c3e-4a4a-9600-3f0c0a6a880e

# Trigger manually (test it works)
openclaw cron run a686369c-2c3e-4a4a-9600-3f0c0a6a880e
```

## What Gets Updated

**File:** `app/kickstarter-event/KickstarterPage.tsx`

**Lines updated:**
```tsx
<div className="stat-num">192%</div>  // % funded
<div className="stat-num">66</div>    // backers
<div className="stat-num">28</div>    // days left
```

## Monitoring

Updates will be announced back to this chat each morning after they complete.

**Success message:**
> ✅ Kickstarter stats updated from Gmail: 192% funded, 66 backers, 28 days left

**No changes:**
> ℹ️ Kickstarter stats unchanged (still 192% funded, 66 backers, 28 days left)

**Error (email not found):**
> ⚠️ Could not find today's Kickstarter email. Email may not have arrived yet.

## Why Gmail Instead of Web Scraping?

✅ **More reliable:** Kickstarter emails have consistent format  
✅ **No bot detection:** Gmail API doesn't trigger anti-scraping measures  
✅ **Simpler parsing:** Plain text stats in email vs. dynamic JavaScript rendering  
✅ **Official data:** Comes directly from Kickstarter, not scraped from public page

## Manual Override

If you need to manually update stats outside the daily schedule:
```bash
# Trigger the Gmail check now
openclaw cron run a686369c-2c3e-4a4a-9600-3f0c0a6a880e
```

Or just edit `app/kickstarter-event/KickstarterPage.tsx` directly and push.

## Troubleshooting

**If updates stop working:**

1. Check if Kickstarter is still sending daily emails at 10:08 AM
2. Verify the email subject hasn't changed
3. Check Gmail for the email manually
4. Run the cron job manually to see error messages

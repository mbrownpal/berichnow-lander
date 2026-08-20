# Kickstarter Stats Auto-Update

## Cron Job

**Schedule:** Every day at 6:00 AM Eastern  
**Job ID:** `ab3b1e6d-e556-43f3-9631-e880db280113`  
**Job Name:** `kickstarter-stats-update`

## What It Does

1. Scrapes live stats from: https://www.kickstarter.com/projects/michaelwinslowbrown/be-rich-now-how-to-want-everything-you-have
2. Extracts:
   - % Funded
   - Backer count
   - Days remaining
3. Updates: `app/kickstarter-event/KickstarterPage.tsx`
4. Commits and pushes to GitHub if stats changed
5. Vercel auto-deploys the updated page

## Next Run

First run: **Friday, August 21, 2026 at 6:00 AM EDT**  
Then: Every morning at 6:00 AM EDT

## Managing the Job

```bash
# List all cron jobs
openclaw cron list

# View this job
openclaw cron list | grep kickstarter

# Disable (pause updates)
openclaw cron disable ab3b1e6d-e556-43f3-9631-e880db280113

# Re-enable
openclaw cron enable ab3b1e6d-e556-43f3-9631-e880db280113

# Remove completely
openclaw cron remove ab3b1e6d-e556-43f3-9631-e880db280113

# Trigger manually (test it works)
openclaw cron run ab3b1e6d-e556-43f3-9631-e880db280113
```

## What Gets Updated

**File:** `app/kickstarter-event/KickstarterPage.tsx`

**Lines updated:**
```tsx
<div className="stat-num">171%</div>  // % funded
<div className="stat-num">50</div>    // backers
<div className="stat-num">29</div>    // days left
```

## Monitoring

Updates will be announced back to this chat each morning after they complete.

You'll see a message like:
> ✅ Kickstarter stats updated: 182% funded, 67 backers, 28 days left

If no changes, you'll see:
> ℹ️ Kickstarter stats unchanged (still 171% funded, 50 backers, 29 days left)

## Manual Override

If you need to manually update stats outside the daily schedule:
```bash
openclaw cron run ab3b1e6d-e556-43f3-9631-e880db280113
```

Or just edit `app/kickstarter-event/KickstarterPage.tsx` directly and push.

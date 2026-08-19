# Kickstarter Landing Page - Launch Checklist

**Page URL:** `berichnow.com/kickstarter-event`

## ✅ Completed

- [x] Page built and deployed
- [x] Meta Pixel tracking integrated (tracks "Lead" events on all CTA clicks)
- [x] Google Analytics integrated (via main layout)
- [x] Responsive design (mobile sticky CTA)
- [x] Fade-in animations
- [x] SEO metadata

## 🔴 Before Launch (3 Things)

### 1. Add Kickstarter URL to Vercel

Once your Kickstarter campaign is live:

1. Go to Vercel project → **Settings** → **Environment Variables**
2. Add:
   - **Name:** `NEXT_PUBLIC_KICKSTARTER_URL`
   - **Value:** `https://www.kickstarter.com/projects/YOUR-ACTUAL-SLUG`
   - **Environments:** Production, Preview, Development
3. **Redeploy** the site

**Current placeholder:** `https://www.kickstarter.com/projects/REPLACE-WITH-SLUG`

### 2. Add Book Cover Image

Upload your book cover to:
`public/assets/be-rich-now-cover.jpg`

**Recommended specs:**
- Size: 1200x1800px (2:3 ratio)
- Format: JPG or PNG
- High-quality render or Kickstarter hero shot

Then commit and push:
```bash
git add public/assets/be-rich-now-cover.jpg
git commit -m "Add Be Rich Now book cover for Kickstarter page"
git push origin main
```

### 3. Update Campaign Stats

As the campaign progresses, update these numbers in:
`app/kickstarter-event/KickstarterPage.tsx` (lines ~356-368)

```tsx
<div className="stats fade d3">
  <div className="stat">
    <div className="stat-num">171%</div>  {/* Update % funded */}
    <div className="stat-label">Funded</div>
  </div>
  <div className="stat">
    <div className="stat-num">54</div>  {/* Update backer count */}
    <div className="stat-label">Backers</div>
  </div>
  <div className="stat">
    <div className="stat-num">29</div>  {/* Update days remaining */}
    <div className="stat-label">Days left</div>
  </div>
</div>
```

Also update the closing date (line ~376):
```tsx
<p className="btn-note">The campaign closes September 17</p>
```

## 📊 Tracking

**Meta Pixel events tracked:**
- Event: `Lead`
- Placements: `hero`, `footer`, `sticky`
- Trigger: CTA button clicks

**View in Meta Events Manager:**
1. Go to Events Manager
2. Select pixel: 805390589299003
3. Check "Lead" events with placement data

**Google Analytics:**
- Property: Be Rich Now (G-WWSLTDPSMR)
- Page views auto-tracked
- Check Realtime reports after launch

## 🚀 After Launch

Once all 3 items above are complete, the page is production-ready at:
**https://berichnow.com/kickstarter-event**

Share this URL in:
- Email to existing list
- Social media posts
- Direct messages to backers
- Anywhere you want to drive Kickstarter traffic

The page will automatically track all clicks to Kickstarter via Meta Pixel and GA4.

# FIX: Kickstarter Buttons Still Point to Placeholder

## The Problem
The buttons on https://www.berichnow.com/kickstarter-event still show:
`https://www.kickstarter.com/projects/REPLACE-WITH-SLUG`

Instead of:
`https://www.kickstarter.com/projects/michaelwinslowbrown/be-rich-now-how-to-want-everything-you-have`

## Why It's Happening
The environment variable `NEXT_PUBLIC_KICKSTARTER_URL` hasn't been added to Vercel yet. Without it, the code falls back to the placeholder value.

## How to Fix It (5 Minutes)

### Step 1: Go to Vercel
Open: https://vercel.com/dashboard

### Step 2: Select Your Project
Click on your **Be Rich Now** project (or whatever it's named in Vercel)

### Step 3: Open Settings
Click **Settings** in the top navigation

### Step 4: Go to Environment Variables
Click **Environment Variables** in the left sidebar

### Step 5: Add New Variable
Click the **Add New** button

### Step 6: Fill in the Form

**Key (copy this exactly):**
```
NEXT_PUBLIC_KICKSTARTER_URL
```

**Value (copy this exactly):**
```
https://www.kickstarter.com/projects/michaelwinslowbrown/be-rich-now-how-to-want-everything-you-have
```

**Environments:**
- ✅ Check **Production**
- ✅ Check **Preview**
- ✅ Check **Development**

### Step 7: Save
Click **Save**

### Step 8: Redeploy
1. Click **Deployments** in the top navigation
2. Find the latest deployment (top of the list)
3. Click the **3 dots** (•••) menu on the right
4. Click **Redeploy**
5. Click **Redeploy** again to confirm

### Step 9: Wait & Verify
Wait ~2 minutes for the deployment to finish, then check:
https://www.berichnow.com/kickstarter-event

All buttons should now link to your live campaign.

---

## Still Not Working?

If the buttons still show the placeholder after following these steps:

1. **Clear your browser cache** (hard refresh: Ctrl+Shift+R or Cmd+Shift+R)
2. **Check Vercel deployment logs** to make sure it deployed successfully
3. **Verify the environment variable** was saved correctly in Vercel Settings → Environment Variables

---

## Technical Details

The code in `app/kickstarter-event/page.tsx` pulls the URL from:
```typescript
const KICKSTARTER_URL = process.env.NEXT_PUBLIC_KICKSTARTER_URL || "https://www.kickstarter.com/projects/REPLACE-WITH-SLUG";
```

When `NEXT_PUBLIC_KICKSTARTER_URL` is undefined (not set in Vercel), it falls back to the placeholder.

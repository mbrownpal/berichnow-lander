# Kickstarter stats are final

The campaign is over. Published results on `/kickstarter-event` stay at **327% funded** and **220 backers**. Do not update those numbers.

There is no GitHub Actions workflow, Vercel cron, or script in this repo that refreshes them. The daily commits were made by an OpenClaw cron on Mike Brown's machine (`mike@mbrown.co`, GitHub user `mbrownpal`), not by a workflow in this repository.

Retired OpenClaw jobs (do not re-enable):

- `kickstarter-gmail-stats` — `0dc6fa09-64cb-4a68-9d53-a279ffb2416a` (noon Mountain; the job that was still committing)
- `kickstarter-gmail-stats` — `a686369c-2c3e-4a4a-9600-3f0c0a6a880e` (earlier Gmail schedule)
- `kickstarter-stats-update` — `ab3b1e6d-e556-43f3-9631-e880db280113` (earlier page-scrape schedule)

OpenClaw is not installed in this repository, so those jobs have to be removed on the machine that runs OpenClaw:

```bash
openclaw cron remove 0dc6fa09-64cb-4a68-9d53-a279ffb2416a
openclaw cron remove a686369c-2c3e-4a4a-9600-3f0c0a6a880e
openclaw cron remove ab3b1e6d-e556-43f3-9631-e880db280113
```

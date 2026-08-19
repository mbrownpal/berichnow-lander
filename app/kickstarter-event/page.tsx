import type { Metadata } from 'next';
import KickstarterPage from './KickstarterPage';

export const metadata: Metadata = {
  title: 'Be Rich Now: How to Want Everything You Have',
  description: 'Funded in under 24 hours on Kickstarter.',
  openGraph: {
    title: 'Be Rich Now: How to Want Everything You Have',
    description: 'Funded in under 24 hours on Kickstarter.',
    type: 'website',
  },
};

export default function Page() {
  // TODO: Replace with actual Kickstarter URL when campaign goes live
  const KICKSTARTER_URL = process.env.NEXT_PUBLIC_KICKSTARTER_URL || "https://www.kickstarter.com/projects/REPLACE-WITH-SLUG";

  return <KickstarterPage kickstarterUrl={KICKSTARTER_URL} />;
}

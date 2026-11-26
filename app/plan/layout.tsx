import type { Metadata } from 'next';

const title = 'The Annual Planning Stack: a free guide to design your year | Be Rich Now';
const description =
  'The three exercises Claire and I use to design the year ahead: a Year in Review, the Unbreakable Year, and a Word of the Year. Free to download.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'The Annual Planning Stack',
    description,
    url: 'https://www.berichnow.com/plan',
    type: 'website',
  },
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}

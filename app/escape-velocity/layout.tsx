import type { Metadata } from 'next';

const title = 'Escape Velocity: the number that covers your ideal life | Be Rich Now';
const description =
  'A free calculator for the point where your assets cover your ideal life without you ever touching the principal. Nothing is saved or sent.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'Escape Velocity',
    description,
    url: 'https://www.berichnow.com/escape-velocity',
    type: 'website',
  },
};

export default function EscapeVelocityLayout({ children }: { children: React.ReactNode }) {
  return children;
}

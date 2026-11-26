import type { Metadata } from 'next';

const title = 'Escape Velocity Calculator | Be Rich Now';
const description =
  'The point where your assets cover your ideal life without you ever touching the principal. Nothing is saved or sent.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'Escape Velocity',
    description,
    url: 'https://www.berichnow.com/magnets/escape-velocity',
    type: 'website',
  },
};

export default function EscapeVelocityCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

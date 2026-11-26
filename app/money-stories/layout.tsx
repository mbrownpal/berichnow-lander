import type { Metadata } from 'next';

const title = 'The Money Stories Workbook: a free guided excavation | Be Rich Now';
const description =
  'A guided excavation of the beliefs that are spending your money for you. The companion workbook to Be Rich Now, free to download.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title: 'The Money Stories Workbook',
    description,
    url: 'https://www.berichnow.com/money-stories',
    type: 'website',
  },
};

export default function MoneyStoriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

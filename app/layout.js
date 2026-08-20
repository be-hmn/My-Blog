import '../styles/globals.css';
// eslint-disable-next-line camelcase
import { Noto_Sans_KR as NotoSansKR, Noto_Serif_KR as NotoSerifKR } from 'next/font/google';
import Providers from '../components/providers';

import { Analytics } from '@vercel/analytics/react';

const notoSansKr = NotoSansKR({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
});

const notoSerifKr = NotoSerifKR({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-serif',
});

export const metadata = {
  title: '학습노트',
  description: '학습 내용 기록 및 실습 노트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${notoSansKr.variable} ${notoSerifKr.variable} ${notoSansKr.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

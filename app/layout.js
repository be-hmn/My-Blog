import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Providers from '../components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: '학습노트',
  description: '학습 내용 기록 및 실습 노트',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

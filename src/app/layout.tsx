import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RFO Fizika — Azərbaycan Fizika Olimpiadasına Hazırlıq',
  description: 'RFO Fizika hazırlığı üçün vahid platforma - Azerbaycanın ən yaxşı gənc fizikələri üçün məsələlər, kitablar, resurslar və süni intellekt dəstəyi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}